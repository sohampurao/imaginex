import express from 'express';
import Carousel from '../models/CarouselModel.js';

const CarouselRouter = express.Router();

CarouselRouter.get('/', async (req, res) => {
  const CarouselItems = await Carousel.find();
  res.send(CarouselItems);
});

export default CarouselRouter;
