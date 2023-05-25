import express from 'express';
import dotenv from 'dotenv';
import data from './data/Data.js';
import cors from 'cors';
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.get('/carousel', (req, res) => {
  res.send(data.items);
});

app.get('/blogposts/slug/:slug', (req, res) => {
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
