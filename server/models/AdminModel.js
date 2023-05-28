import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profileImage: {
      type: String,
      default: '/images/profile/profile-picture.webp',
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;
