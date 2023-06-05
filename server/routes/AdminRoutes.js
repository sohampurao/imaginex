import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Admin from '../models/AdminModel.js';
import bcrypt from 'bcryptjs';
import { generateToken, isAdmin, isAuth } from '../utils.js';

const AdminRouter = express.Router();

AdminRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const admins = await Admin.find({});
    res.send(admins);
  })
);

AdminRouter.delete(
  '/delete/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const adminId = req.params.id;
    const admin = await Admin.findById(adminId);
    if (admin) {
      await admin.deleteOne();
      res.send('Admin deleted successfully');
    } else {
      res.status(404).send({ message: 'Admin not found' });
    }
  })
);

AdminRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const admin = await Admin.findOne({ email: req.body.email });
    if (admin) {
      if (bcrypt.compareSync(req.body.password, admin.password)) {
        res.send({
          _id: admin._id,
          firstName: admin.firstName,
          lastName: admin.lastName,
          profileImage: admin.profileImage,
          email: admin.email,
          isAdmin: admin.isAdmin,
          token: generateToken(admin),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invaild email or password' });
  })
);

const saltRounds = 10;
AdminRouter.post(
  '/addadmin',
  expressAsyncHandler(async (req, res) => {
    const newAdmin = new Admin({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, saltRounds),
    });
    const admin = await newAdmin.save();
    res.send({
      _id: admin._id,
      firstName: admin.firstName,
      lastName: admin.lastName,
      // profileImage: admin.profileImage,
      email: admin.email,
      isAdmin: admin.isAdmin,
      token: generateToken(admin),
    });
  })
);
export default AdminRouter;
