import express from 'express';
import BlogPost from '../models/BlogPostModel.js';
import data from '../data/Data.js';
import Carousel from '../models/CarouselModel.js';
import Admin from '../models/AdminModel.js';
import Features from '../models/FeaturesModel.js';
import Aboutus from '../models/AboutusModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  // This first removes all Carousel items form database and  add default one
  await Carousel.deleteMany({});
  const createCarouselItems = await Carousel.insertMany(data.items);

  await BlogPost.deleteMany({});
  const createdBlogPosts = await BlogPost.insertMany(data.blogposts);

  await Admin.deleteMany({});
  const createdAdmins = await Admin.insertMany(data.admins);

  await Features.deleteMany({});
  const createFeatures = await Features.insertMany(data.features);

  await Aboutus.deleteMany({});
  const createAboutus = await Aboutus.insertMany(data.aboutus);
  res.send({
    createCarouselItems,
    createdBlogPosts,
    createdAdmins,
    createFeatures,
    createAboutus,
  });
});

export default seedRouter;
