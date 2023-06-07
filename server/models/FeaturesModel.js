import mongoose from 'mongoose';

const FeaturesSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    admin: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      profileImage: { type: String, required: true },
      isAdmin: { type: Boolean, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const Features = mongoose.model('Features', FeaturesSchema);

export default Features;
