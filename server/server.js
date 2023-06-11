import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';
import BlogPostRouter from './routes/BlogPostRoutes.js';
import CarouselRouter from './routes/CarouselRoutes.js';
import AdminRouter from './routes/AdminRoutes.js';
import FeaturesRouter from './routes/FeaturesRoutes.js';
import AboutusRouter from './routes/AboutusRoutes.js';

// basic configuration
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// this api responds to seed route
app.use('/api/seed', seedRouter);

// this connects the application to MongoDB database
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('connected to DB');
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use('/api/carousel', CarouselRouter);

app.use('/api/blogposts', BlogPostRouter);

app.use('/api/features', FeaturesRouter);

app.use('/api/aboutus', AboutusRouter);

app.use('/api/admins', AdminRouter);

app.use((error, req, res, next) => {
  res.status(500).send({ message: error.message });
});

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/dist/index.html'));
});

app.get('/', (req, res) => {
  res.send('Server is active!');
});

// represents the port on which sever will run
const port = 5000;
app.listen(port, () => {
  console.log(`Serve at: http://localhost:${port}`);
});
