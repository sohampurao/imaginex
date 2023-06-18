import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import OurWork from '../models/OurWorkModel.js';

const OurWorkRouter = express.Router();

OurWorkRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const ourwork = await OurWork.find();
    res.send(ourwork);
  })
);

OurWorkRouter.get(
  '/:slug',
  expressAsyncHandler(async (req, res) => {
    const workSlug = req.params.slug;
    const ourwork = await OurWork.findOne({ 'work.slug': workSlug });
    if (ourwork) {
      const work = ourwork.work.find((work) => work.slug === workSlug);
      res.send(work);
    } else {
      res.status(404).send({ message: 'Work not found.' });
    }
  })
);

export default OurWorkRouter;
