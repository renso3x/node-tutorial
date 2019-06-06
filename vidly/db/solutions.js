const config = require('config');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const moviesRouter = require('./routes/movies');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// connect
mongoose.connect('mongodb://localhost/mongo-excercises', {
  useNewUrlParser: true
})
  .then(() => console.log('You are now connected'))
  .catch(() => console.log('Error connecting in mongodb'));

const courseSchema = new mongoose.Schema({
  _id: String,
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
  return await Course.find({ tags: 'backend', isPublished: true })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
}

async function displayCourse() {
  const courses = await getCourses();
  console.log(`Courses: ${courses}`);
}

displayCourse();

async function getPublishedCourses() {
  return await Course.find({ isPublished: true })
    .or([{ tags: 'frontend' }, { tags: 'backend' }])
    .sort({ price: -1 })
    .select({ name: 1, author: 1, price: 1 });
}

async function publishedCourse() {
  const courses = await getPublishedCourses();
  console.log(`Published Courses: ${courses}`);
}

publishedCourse();

async function publishCourseByPrice() {
  return await Course.find({ isPublished: true })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
    .sort('-price')
    .select({ name: 1, author: 1, price: 1 });
}

async function displayQuery() {
  const courses = await publishCourseByPrice();
  console.log(courses);
}

displayQuery();

query first before update
async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;

  course.name = 'Node.js Course by Romeo';
  course.author = 'Romeo';

  const result = await course.save();
  console.log(result);
}

updateCourse('5a68fdf95db93f6477053ddd');

update first
async function updateCourse(id) {
  const course = await Course.findByIdAndUpdate(id, {
    $set: {
      isPublished: true
    }
  }, { new: true });

  console.log(course);
}

updateCourse('5a68fdf95db93f6477053ddd');

// delete
async function deleteCourse(id) {
  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}

deleteCourse('5a68fdf95db93f6477053ddd');

// Log only if dev environment
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
}

app.listen(config.get('port'), () => {
  console.log(`Application: ${config.get('name')}. Running in port ${config.get('port')}`);
  console.log(`App Password: ${config.get('password')}`)
});
