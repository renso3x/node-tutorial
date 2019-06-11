const request = require('supertest');
const { User } = require('../../db/user');
const { Genre } = require('../../db/genre');

let server;
describe('/auth/middleware', () => {
  // GET THE SERVER
  beforeEach(() => server = require('../../index'));
  afterEach(async () => {
    // MUST CLOSE THE SERVER IN EACH TEST
    server.close();
  });
  let token;
  const exec = () => {
    return request(server)
      .post('/api/genre')
      .set('x-auth-token', token)
      .send({ name: 'genre2' });
  };

  beforeEach(() => {
    token = new User().generateAuthToken();
  });

  it('should return 401 if no token', async () => {
    token = '';

    const res = await exec();

    expect(res.status).toBe(401);
  });

  it('should return 400 if invalid token', async () => {
    token = 'a';

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 200 if has valid token', async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });

});


