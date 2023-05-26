import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema(
  {
    path: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true, unique: true },
    admin: {
      image: { type: String, required: true },
      fullname: { type: String, required: true },
      isAdmin: { type: Boolean, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);
export default BlogPost;
