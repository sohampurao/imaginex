import express from 'express';
import Carousel from '../models/CarouselModel.js';
import expressAsyncHandler from 'express-async-handler';
import { isAdmin, isAuth } from '../utils.js';

const CarouselRouter = express.Router();

CarouselRouter.get('/', async (req, res) => {
  const CarouselItems = await Carousel.find();
  res.send(CarouselItems);
});

CarouselRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const CarouselItems = await Carousel.find();
    res.send(CarouselItems);
  })
);

export default CarouselRouter;
