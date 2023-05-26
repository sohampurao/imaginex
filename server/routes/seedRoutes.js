import express from 'express';
import BlogPost from '../models/BlogPostModel.js';
import data from '../data/Data.js';
import Carousel from '../models/CarouselModel.js';
import Admin from '../models/AdminModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  // This first removes all Carousel items form database and  add default one
  await Carousel.deleteMany({});
  const createCarouselItems = await Carousel.insertMany(data.items);
  // This first removes all blog post form database and  add default one
  await BlogPost.deleteMany({});
  const createdBlogPosts = await BlogPost.insertMany(data.blogposts);
  // This first removes all form database and  add default one
  await Admin.deleteMany({});
  const createdAdmins = await Admin.insertMany(data.admins);
  res.send({ createCarouselItems, createdBlogPosts, createdAdmins });
});

export default seedRouter;
