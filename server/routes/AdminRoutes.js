import express from 'express';
import Admin from '../models/AdminModel.js';

const AdminRouter = express.Router();

AdminRouter.get('/', async (req, res) => {
  const Admins = await Admin.find();
  res.send(Admins);
});

export default AdminRouter;
