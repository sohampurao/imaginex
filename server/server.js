import express from 'express';
import dotenv from 'dotenv';
import data from './data/Data.js';
import cors from 'cors';
import mongoose from 'mongoose';

// basic configuration
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// this connects the application to MongoDB database
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('connected to DB');
  })
  .catch((error) => {
    console.log(error.message);
  });

app.get('/carousel', (req, res) => {
  res.send(data.items);
});

app.get('/blogpost/slug/:slug', (req, res) => {
  const blogpost = data.blogposts.find((x) => x.slug === req.params.slug);
  if (blogpost) {
    res.send(blogpost);
  } else {
    res.status(404).send({ message: 'Post not Found' });
  }
});

app.get('/blogposts', (req, res) => {
  res.send(data.blogposts);
});

app.get('/', (req, res) => {
  res.send('Server is active!');
});

// represents the port on which sever will run
const port = 5000;
app.listen(port, () => {
  console.log(`Serve at: http://localhost:${port}`);
});
