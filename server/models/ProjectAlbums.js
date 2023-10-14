import mongoose from 'mongoose';

const ProjectAlbumSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: [String],
  },
  {
    timestamps: true,
  }
);

const ProjectAlbum = mongoose.model('ProjectAlbum', ProjectAlbumSchema);
export default ProjectAlbum;
