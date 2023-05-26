import mongoose from 'mongoose';
import { generateToken } from '../utils.js';

const AdminSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;
