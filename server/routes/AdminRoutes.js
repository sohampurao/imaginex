import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Admin from '../models/AdminModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils.js';

const AdminRouter = express.Router();

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

export default AdminRouter;
