import express from 'express';
import BlogPost from '../models/BlogPostModel.js';

const BlogPostRouter = express.Router();

BlogPostRouter.get('/', async (req, res) => {
  const BlogPosts = await BlogPost.find();
  res.send(BlogPosts);
});

BlogPostRouter.get('/slug/:slug', async (req, res) => {
  const blogpost = await BlogPost.findOne({ slug: req.params.slug });
  if (blogpost) {
    res.send(blogpost);
  } else {
    res.status(404).send({ message: 'Post not Found' });
  }
});

export default BlogPostRouter;
