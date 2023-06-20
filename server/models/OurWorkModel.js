import mongoose from 'mongoose';

const WorkSchema = new mongoose.Schema(
  {
    thumbnail: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    model: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const OurWorkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    work: [WorkSchema],
  },
  {
    timestamps: true,
  }
);

export const Work = mongoose.model('Work', WorkSchema);
const OurWork = mongoose.model('OurWork', OurWorkSchema);
export default OurWork;
