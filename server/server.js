import express from 'express';
import dotenv from 'dotenv';
import data from './data/Data.js';
import cors from 'cors';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';
import BlogPostRouter from './routes/BlogPostRoutes.js';
import CarouselRouter from './routes/CarouselRoutes.js';

// basic configuration
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// this api responds to seed route
app.use('/seed', seedRouter);

// this connects the application to MongoDB database
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('connected to DB');
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use('/blogposts', BlogPostRouter);

app.use('/carousel', CarouselRouter);

app.get('/', (req, res) => {
  res.send('Server is active!');
});

// represents the port on which sever will run
const port = 5000;
app.listen(port, () => {
  console.log(`Serve at: http://localhost:${port}`);
});
