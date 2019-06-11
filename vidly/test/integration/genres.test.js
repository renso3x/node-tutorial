const request = require('supertest');
const { User } = require('../../db/user');
const { Genre } = require('../../db/genre');

let server;
describe('/api/genres', () => {
  // GET THE SERVER
  beforeEach(() => server = require('../../index'));
  afterEach(async () => {
    // remove all the collection
    await Genre.remove({});

    // MUST CLOSE THE SERVER IN EACH TEST
    server.close();
  });

  describe('GET / ', () => {
    it('should return all genres', async () => {

      // populate the genre collection
      await Genre.collection.insertMany([{
        name: 'adventure',
      }, {
        name: 'timekeeper'
      }]);

      const res = await request(server).get('/api/genre');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(g => g.name === 'adventure')).toBeTruthy();
      expect(res.body.some(g => g.name === 'timekeeper')).toBeTruthy();
    });
  });

  describe('GET /:id ', () => {
    it('should return a genre given by an id', async () => {
      const genre = new Genre({ name: 'genre1' });
      await genre.save();

      const res = await request(server).get(`/api/genre/${genre._id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', genre.name);
    });

    it('should return 404 if invalid id', async () => {
      const res = await request(server).get(`/api/genre/123`);

      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    //specifc test
    it('should return 401 if not logged in', async () => {
      const res = await request(server)
        .post('/api/genre')
        .send({ name: 'genre2' });

      expect(res.status).toBe(401);
    });

    it('should return 400 if genre is min of 3 characters', async () => {
      //generate a jwt token
      const token = new User().generateAuthToken();

      const res = await request(server)
        .post('/api/genre')
        .set('x-auth-token', token)
        .send({ name: 'aa' });

      expect(res.status).toBe(400);
    });
    it('should return 400 if genre is max of 50 characters', async () => {
      //generate a jwt token
      const token = new User().generateAuthToken();

      const name = new Array(52).join('a');

      const res = await request(server)
        .post('/api/genre')
        .set('x-auth-token', token)
        .send({ name: name });

      expect(res.status).toBe(400);
    });

    // Happy Path
    it('should return 200 and saved', async () => {
      //generate a jwt token
      const token = new User().generateAuthToken();

      await request(server)
        .post('/api/genre')
        .set('x-auth-token', token)
        .send({ name: 'genre2' });

      const genre = await Genre.find({ name: 'genre2' });

      expect(genre).toBeTruthy();
    });

    it('should return 200 if it is valid', async () => {
      //generate a jwt token
      const token = new User().generateAuthToken();

      const res = await request(server)
        .post('/api/genre')
        .set('x-auth-token', token)
        .send({ name: 'genre2' });

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name');
    });

  });
});