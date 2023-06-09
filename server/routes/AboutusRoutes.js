import express from 'express';
import Aboutus from '../models/AboutusModel.js';
import expressAsyncHandler from 'express-async-handler';
import { isAdmin, isAuth } from '../utils.js';

const AboutusRouter = express.Router();

AboutusRouter.get('/', async (req, res) => {
  const AboutusData = await Aboutus.find();
  res.send(AboutusData);
});

AboutusRouter.get(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const AboutusId = req.params.id;
    const aboutusElement = await Aboutus.findById(AboutusId);
    if (aboutusElement) {
      res.send(aboutusElement);
    } else {
      res.status(404).send({ message: 'AboutUs detial not found.' });
    }
  })
);

AboutusRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const AboutusId = req.params.id;
    const aboutusElement = await Aboutus.findById(AboutusId);
    if (aboutusElement) {
      aboutusElement.profileImage = req.body.profileImage;
      aboutusElement.firstName = req.body.firstName;
      aboutusElement.lastName = req.body.lastName;
      aboutusElement.position = req.body.position;
      aboutusElement.description = req.body.description;
      aboutusElement.facebookURL = req.body.facebookURL;
      aboutusElement.linkedinURL = req.body.linkedinURL;
      aboutusElement.whatsappNo = req.body.whatsappNo;
      aboutusElement.instagramURL = req.body.instagramURL;
      await aboutusElement.save();
      return res.send({ message: 'Information Updated successfully.' });
    } else {
      res.status(404).send({ message: 'AboutUs element not found.' });
    }
  })
);

export default AboutusRouter;
