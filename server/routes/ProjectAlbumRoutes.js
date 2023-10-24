import express from 'express';
import ProjectAlbum from '../models/ProjectAlbums.js';
import expressAsyncHandler from 'express-async-handler';
import { isAdmin, isAuth } from '../utils.js';

const ProjectAlbumRouter = express.Router();

ProjectAlbumRouter.get('/', async (req, res) => {
  const ProjectAlbums = await ProjectAlbum.find();
  res.send(ProjectAlbums);
});

ProjectAlbumRouter.get(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const albumId = req.params.id;
    const album = await ProjectAlbum.findById(albumId);
    if (album) {
      res.send({ album });
    } else {
      res.status(404).send({ message: 'Album not found' });
    }
  })
);

ProjectAlbumRouter.get('/images/:id', async (req, res) => {
  const projectAlbumId = req.params.id;
  const projectAlbum = await ProjectAlbum.findById(projectAlbumId);
  if (projectAlbum) {
    const images = projectAlbum.images;
    res.send({ images });
  } else {
    res.status(404).send({ message: 'Project album not found.' });
  }
});

ProjectAlbumRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newAlbum = new ProjectAlbum({
      thumbnail:
        'https://placehold.co/500x300?text=Im+just+a+placeholder+replace+me!',
      title: 'This is sample title',
      images: [],
    });
    const album = await newAlbum.save();
    res.send({ message: 'New Album is created.', album });
  })
);

ProjectAlbumRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const Album = await ProjectAlbum.findById(req.params.id);
    if (Album) {
      await Album.deleteOne();
      res.send({ message: 'Album deleted successfully' });
    } else {
      res.status(404).send({ message: 'Album not found' });
    }
  })
);

ProjectAlbumRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const albumId = req.params.id;
    const album = await ProjectAlbum.findById(albumId);
    if (album) {
      (album.title = req.body.title),
        (album.thumbnail = req.body.thumbnail),
        (album.images = req.body.images),
        await album.save();
      res.send({ message: 'Album Updated!' });
    } else {
      res.status(404).send({ message: 'Album not Found' });
    }
  })
);

ProjectAlbumRouter.put(
  '/images/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const albumId = req.params.id;
    const album = await ProjectAlbum.findById(albumId);
    if (album) {
      (album.images = req.body.images), await album.save();
      res.send({ message: 'Album images updated.' });
    } else {
      res.status(404).send({ message: 'Album not Found' });
    }
  })
);
export default ProjectAlbumRouter;
