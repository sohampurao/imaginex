import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import OurWork, { Work } from '../models/OurWorkModel.js';
import { isAdmin, isAuth } from '../utils.js';

const OurWorkRouter = express.Router();

OurWorkRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const ourwork = await OurWork.find();
    res.send(ourwork);
  })
);

OurWorkRouter.get(
  '/edit/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const workId = req.params.id;
    const work = await OurWork.findById(workId);
    if (work) {
      res.send(work);
    } else {
      res.status(404).send({ message: 'Work not found.' });
    }
  })
);

OurWorkRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const ourworkId = req.params.id;
    const ourwork = await OurWork.findById(ourworkId);
    if (ourwork) {
      ourwork.title = req.body.title;
      ourwork.description = req.body.description;
      await ourwork.save();
      res.send({ message: 'ourwork saved' });
    } else {
      res.status(404).send({ message: 'OurWork not found.' });
    }
  })
);

OurWorkRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newOurWork = new OurWork({
      title: 'sample title',
      description: 'This is the sample description',
      work: {
        thumbnail:
          'https://placehold.co/900x600?text=Im+just+a+placeholder+replace+me',
        title: 'This is the sample title',
        description: 'This is the sample description.',
        model: 'https://my.matterport.com/show/?m=XYZ46qV7SaP',
      },
    });
    const ourwork = await newOurWork.save();
    res.send({ message: 'Ourwork created successfully', ourwork });
  })
);

OurWorkRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const ourworkId = req.params.id;
    const ourwork = await OurWork.findById(ourworkId);
    if (ourwork) {
      await ourwork.deleteOne();
      res.send({ message: 'Ourwork deleted successfully.' });
    } else {
      res.status(404).send({ message: 'OurWork not found.' });
    }
  })
);

OurWorkRouter.get(
  '/work/:id',
  expressAsyncHandler(async (req, res) => {
    const workId = req.params.id;
    const ourwork = await OurWork.findOne({ 'work._id': workId });
    if (ourwork) {
      const work = ourwork.work.find((work) => work.id === workId);
      res.send({ work, ourworkId: ourwork.id });
    } else {
      res.status(404).send({ message: 'Work not found.' });
    }
  })
);

OurWorkRouter.post(
  '/work/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const workData = {
      thumbnail:
        'https://placehold.co/900x600?text=Im+just+a+placeholder+replace+me',
      title: 'This is the sample title',
      description: 'This is the sample description.',
      model: 'https://my.matterport.com/show/?m=XYZ46qV7SaP',
    };
    const ourworkId = req.params.id;
    const ourwork = await OurWork.findById(ourworkId);
    if (ourwork) {
      const newWork = new Work(workData);
      ourwork.work.push(newWork);
      await ourwork.save();
      res
        .status(201)
        .json({ message: 'Work created successfully', work: newWork });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  })
);

OurWorkRouter.put(
  '/work/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const updatedData = req.body;
    const workId = req.params.id;
    const ourwork = await OurWork.findOne({ 'work._id': workId });
    if (ourwork) {
      const work = ourwork.work.id(workId);
      if (work) {
        work.set(updatedData);
        await ourwork.save();
        res.send({ message: 'work saved successfully' });
      }
    } else {
      res.status(404).send({ message: 'Work not found.' });
    }
  })
);

OurWorkRouter.delete(
  '/work/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const workId = req.params.id;
    const ourwork = await OurWork.findOne({ 'work._id': workId });
    if (ourwork) {
      ourwork.work.pull(workId);
      await ourwork.save();
      res.send({ message: 'Work deleted successfully.' });
    } else {
      res.status(404).send({ message: 'Work not found.' });
    }
  })
);

export default OurWorkRouter;
