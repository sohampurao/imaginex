import jwt from 'jsonwebtoken';
export const generateToken = (admin) => {
  return jwt.sign(
    {
      _id: admin._id,
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.isAdmin,
      isAdmin: admin.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};
