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
      return res.send({ carouselItem });
    } else {
      return res.status(404).send({ message: 'Carousel Item not found' });
    }
  })
);

CarouselRouter.put(
  '/update/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const carouselItemId = req.params.id;
    const carouselItem = await Carousel.findById(carouselItemId);
    if (carouselItem) {
      carouselItem.image = req.body.image;
      carouselItem.title = req.body.title;
      carouselItem.subtitle = req.body.subtitle;
      await carouselItem.save();
      res.send({ message: 'Carousel Item Updated' });
    } else {
      res.status(404).send({ message: 'Carousel Item Not Found' });
    }
  })
);

CarouselRouter.delete(
  '/delete/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const carouselItem = await Carousel.findById(req.params.id);
    if (carouselItem) {
      await carouselItem.deleteOne();
      res.send({ message: 'Carousel item deleted' });
    } else {
      res.status(404).send({ message: 'Carousel item not found' });
    }
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
    return res.send(CarouselItems);
  })
);

export default CarouselRouter;
