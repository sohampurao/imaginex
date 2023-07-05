import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Admin from '../models/AdminModel.js';
import bcrypt from 'bcrypt';
import { generateToken, isAdmin, isAuth } from '../utils.js';

const AdminRouter = express.Router();

AdminRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const admins = await Admin.find({ isOwner: false });
    res.send(admins);
  })
);

AdminRouter.get(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const adminId = req.params.id;
    const admin = await Admin.findById(adminId);
    if (admin) {
      return res.send(admin);
    } else {
      return res.status(404).send({ message: 'Admin not Found.' });
    }
  })
);

AdminRouter.put(
  `/:id`,
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const adminId = req.params.id;
    const admin = await Admin.findById(adminId);
    if (admin) {
      if (bcrypt.compareSync(req.body.password, admin.password)) {
        (admin.profileImage = req.body.profileImage),
          (admin.firstName = req.body.firstName),
          (admin.lastName = req.body.lastName),
          (admin.email = req.body.email),
          await admin.save();
        return res.send({
          message: 'Admin updated successfully',
          adminInfo: {
            _id: admin._id,
            profileImage: admin.profileImage,
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email,
            isAdmin: admin.isAdmin,
            isOwner: admin.isOwner,
            token: generateToken(admin),
          },
        });
      } else {
        return res.status(401).send({ message: 'Invaild password' });
      }
    } else {
      res.send({ message: 'Admin Not Found' });
    }
  })
);

AdminRouter.put(
  `/changepassword/:id`,
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newPassword = req.body.newPassword;
    const password = req.body.password;
    const admin = await Admin.findById(req.params.id);
    if (admin) {
      if (bcrypt.compareSync(password, admin.password)) {
        admin.password = bcrypt.hashSync(newPassword, 10);
        await admin.save();
        return res.send({ message: 'Admin updated successfully' });
      } else {
        return res.status(401).send({ message: 'Invaild current password' });
      }
    } else {
      res.send({ message: 'Admin Not Found' });
    }
  })
);

AdminRouter.delete(
  '/:id',
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
          profileImage: admin.profileImage,
          firstName: admin.firstName,
          lastName: admin.lastName,
          email: admin.email,
          isAdmin: admin.isAdmin,
          isOwner: admin.isOwner,
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
      profileImage: req.body.profileImage,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, saltRounds),
    });
    const admin = await newAdmin.save();
    res.send({
      _id: admin._id,
      profileImage: admin.profileImage,
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      isAdmin: admin.isAdmin,
      token: generateToken(admin),
    });
  })
);

export default AdminRouter;
