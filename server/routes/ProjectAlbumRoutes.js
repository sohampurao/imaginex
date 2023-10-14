import express from 'express';
import ProjectAlbum from '../models/ProjectAlbums.js';
import expressAsyncHandler from 'express-async-handler';
import { isAdmin, isAuth } from '../utils.js';

const ProjectAlbumRouter = express.Router();

ProjectAlbumRouter.get('/', async (req, res) => {
  const ProjectAlbums = await ProjectAlbum.find();
  res.send(ProjectAlbums);
});

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

export default ProjectAlbumRouter;
