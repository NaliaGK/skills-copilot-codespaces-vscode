// Create web server
const express = require('express');
const app = express();
app.use(express.static('public'));
// Use JSON
app.use(express.json());
// Use body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Use MongoDB
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
// Connection to MongoDB
let db;
MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if (err) {
    console.log(err);
    return;
  }
  db = client.db('mydb');
  // Start server
  app.listen(3000, () => {
    console.log('Server started');
  });
});
// Get comments
app.get('/comments', (req, res) => {
  db.collection('comments').find().toArray((err, data) => {
    res.json(data);
  });
});
// Add comment
app.post('/comments', (req, res) => {
  const comment = {
    name: req.body.name,
    text: req.body.text
  };
  db.collection('comments').insertOne(comment, (err, result) => {
    res.send();
  });
});
// Delete comment
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  db.collection('comments').deleteOne({ _id: ObjectId(id) }, (err, result) => {
    res.send();
  });
});
// Update comment
app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  db.collection('comments').updateOne({ _id: ObjectId(id) }, { $set: { text: req.body.text } }, (err, result) => {
    res.send();
  });
});