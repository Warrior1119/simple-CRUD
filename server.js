const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
  {id: 1, name: 'course 1' },
  {id: 2, name: 'course 2' },
  {id: 3, name: 'course 3' }
]
app.get('/', function(req, res) {
  res.send('Hello World!!!');
});

app.get('/api/courses', function(req, res) {
  res.send([1, 2, 3]);
});

app.get('/api/courses/:id', function(req, res) {
  var course = courses.find(c => c.id === req.params.id);
  if (!course) {
    res.status(404).send('This course with the given ID was not found');
  }
  res.send(course);
});

app.post('/api/courses', function(req, res) {
  if (!req.body.name || req.body.name.length < 3) {
    // 400 Bad Request
    res.status(400).send('Name is required and should be minimum 3 characters.'); 
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  }
  courses.push(course);
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
