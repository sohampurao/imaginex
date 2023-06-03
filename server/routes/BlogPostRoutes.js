import express from 'express';
import BlogPost from '../models/BlogPostModel.js';
import expressAsyncHandler from 'express-async-handler';
import { isAdmin, isAuth } from '../utils.js';

const BlogPostRouter = express.Router();

BlogPostRouter.get('/', async (req, res) => {
  const BlogPosts = await BlogPost.find();
  res.send(BlogPosts);
});

BlogPostRouter.get(
  '/edit/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const blogPostId = req.params.id;
    const blogPost = await BlogPost.findById(blogPostId);
    if (blogPost) {
      res.send({ blogPost });
    }
    res.status(404).send({ message: 'BlogPost not found' });
  })
);

BlogPostRouter.put(
  '/update/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const blogPostId = req.params.id;
    const blogPost = await BlogPost.findById(blogPostId);
    if (blogPost) {
      (blogPost.path = req.body.path),
        (blogPost.title = req.body.title),
        (blogPost.mediaType = req.body.mediaType),
        (blogPost.description = req.body.description),
        (blogPost.category = req.body.category),
        (blogPost.admin.firstName = req.body.adminInfo.firstName);
      blogPost.admin.lastName = req.body.adminInfo.lastName;
      blogPost.admin.profileImage = req.body.adminInfo.profileImage;
      blogPost.admin.isAdmin = req.body.adminInfo.isAdmin;
      await blogPost.save();
      res.send({ message: 'Blog Post Updated!' });
    }
    res.status(404).send({ message: 'Blog Post Not Found' });
  })
);

BlogPostRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const admin = req.body.adminInfo;
    const newBlogPost = new BlogPost({
      path: 'https://my.matterport.com/show/?m=XYZ46qV7SaP',
      mediaType: 'matterport',
      title: 'This is the sample title',
      description: 'This is the sample discription',
      slug: 'slug-' + Date.now(),
      category: 'Sample Flats',
      admin: {
        firstName: admin.firstName,
        lastName: admin.lastName,
        image: admin.profileImage,
        isAdmin: admin.isAdmin,
      },
    });
    const blogPost = await newBlogPost.save();
    res.send({ message: 'New Blog Post is created!', blogPost });
  })
);

BlogPostRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const blogposts = await BlogPost.find();
    res.send(blogposts);
  })
);

BlogPostRouter.get(
  '/virtualtours',
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const category = query.category || '';
    const categoryFilter = category && category !== 'all' ? { category } : {};
    const blogPosts = await BlogPost.find({
      ...categoryFilter,
    });
    res.send(blogPosts);
  })
);

BlogPostRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await BlogPost.find().distinct('category');
    res.send(categories);
  })
);

BlogPostRouter.get('/slug/:slug', async (req, res) => {
  const blogpost = await BlogPost.findOne({ slug: req.params.slug });
  if (blogpost) {
    res.send(blogpost);
  } else {
    res.status(404).send({ message: 'Post not Found' });
  }
});

export default BlogPostRouter;
