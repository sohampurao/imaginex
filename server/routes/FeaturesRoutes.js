import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Features from '../models/FeaturesModel.js';
const FeaturesRouter = express.Router();

FeaturesRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const features = await Features.find();
    res.send(features);
  })
);

export default FeaturesRouter;
