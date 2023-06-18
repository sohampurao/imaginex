import mongoose from 'mongoose';

const WorkSchema = new mongoose.Schema(
  {
    thumbnail: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    slug: { type: String, required: true, unique: true },
    model: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const OurWorkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  work: [WorkSchema],
});

const OurWork = mongoose.model('OurWork', OurWorkSchema);
export default OurWork;
