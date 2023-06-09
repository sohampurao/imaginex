import mongoose from 'mongoose';

const AboutusSchema = new mongoose.Schema({
  profileImage: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  position: { type: String, required: true },
  description: { type: String },
  facebookURL: { type: String },
  linkedinURL: { type: String },
  whatsappNo: { type: Number },
  instagramURL: { type: String },
});

const Aboutus = mongoose.model('AboutUs', AboutusSchema);
export default Aboutus;
