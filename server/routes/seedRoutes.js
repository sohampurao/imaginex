import express from 'express';
import BlogPost from '../models/BlogPostModel.js';
import data from '../data/Data.js';
import Carousel from '../models/CarouselModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  // This first removes all Carousel items form database and  add default one
  await Carousel.deleteMany({});
  const createCarouselItems = await Carousel.insertMany(data.items);
  // This first removes all blog post form database and  add default one
  await BlogPost.deleteMany({});
  const createdBlogPost = await BlogPost.insertMany(data.blogposts);
  res.send({ createCarouselItems, createdBlogPost });
});

export default seedRouter;
