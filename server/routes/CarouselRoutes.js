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
  '/admin/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const carouselItemId = req.params.id;
    const carouselItem = await Carousel.findById(carouselItemId);
    if (carouselItem) {
      res.send({ carouselItem });
    }
    res.status(404).send({ message: 'Carousel Item not found' });
  })
);

CarouselRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newCarouselItem = new Carousel({
      image:
        'https://placehold.co/1000x500?text=4000×2000+Image+Size+is+recommended',
      title: 'This is Sample Title',
      subtitle: 'This is Sample Subtitle',
    });
    const carouselItem = await newCarouselItem.save();
    res.send({ message: 'New Carousel Item is Created!', carouselItem });
  })
);

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
