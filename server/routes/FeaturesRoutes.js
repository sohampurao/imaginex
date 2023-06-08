import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Features from '../models/FeaturesModel.js';
import { isAuth, isAdmin } from '../utils.js';

const FeaturesRouter = express.Router();

FeaturesRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const features = await Features.find();
    res.send(features);
  })
);

FeaturesRouter.get(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const featureId = req.params.id;
    const feature = await Features.findById(featureId);
    if (feature) {
      return res.send(feature);
    } else {
      res.status(404).send({ message: 'Feature not found.' });
    }
  })
);

FeaturesRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const admin = req.body.adminInfo;
    const newCreatedFeature = new Features({
      image:
        'https://placehold.co/800x600?text=Im+just+a+placeholder+replace+me',
      title: 'This is the sample title.',
      description: 'This is the sample description.',
      admin: {
        firstName: req.admin.firstName,
        lastName: req.admin.lastName,
        profileImage: req.admin.profileImage,
        isAdmin: req.admin.isAdmin,
      },
    });
    const feature = await newCreatedFeature.save();
    res.send({ message: 'New sample feature created successfully.', feature });
  })
);

FeaturesRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const admin = req.body.adminInfo;
    const featureId = req.params.id;
    const feature = await Features.findById(featureId);

    if (feature) {
      (feature.image = req.body.image),
        (feature.title = req.body.title),
        (feature.description = req.body.description),
        (feature.admin = {
          firstName: admin.firstName,
          lastName: admin.lastName,
          profileImage: admin.profileImage,
          isAdmin: admin.isAdmin,
        }),
        await feature.save();
      res.send({
        message: 'New sample feature created successfully.',
      });
    } else {
      res.send({
        message: 'Feature not found.',
      });
    }
  })
);

FeaturesRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const featureId = req.params.id;
    const feature = Features.findById(featureId);
    if (feature) {
      await feature.deleteOne();
      res.send({ message: 'Feature deleted successfully.' });
    } else {
      res.status(404).send({ message: 'Feature not found.' });
    }
  })
);

export default FeaturesRouter;
