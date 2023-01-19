const { default: mongoose } = require('mongoose')
const Blog = require('../model/blog.model')
const User = require('../model/user.model')

exports.getAllBlogs = async (req, res, next) => {
  let blogs
  try {
    blogs = await Blog.find().populate('user')
  } catch (error) {
    return console.log(error)
  }
  if (!blogs) {
    return res.status(404).send({ message: 'No Blogs Found' })
  }
  return res.status(200).send({ blogs })
}

exports.addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body
  let existingUser
  try {
    existingUser = await User.findById(user)
  } catch (error) {
    return console.log(error)
  }
  if (!existingUser) {
    return res.status(400).send({ message: 'Unable to Find User by This Id' })
  }
  const blog = new Blog({
    title,
    description,
    image,
    user
  })
  try {
    const session = await mongoose.startSession()
    session.startTransaction()
    await blog.save({ session })
    existingUser.blogs.push(blog)
    await existingUser.save({ session })
    await session.commitTransaction()
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error })
  }
  return res.status(200).send({ blog })
}

exports.updateBlog = async (req, res, next) => {
  const { title, description } = req.body
  const blogId = req.params.id
  let blog
  try {
    blog = await Blog.findByIdAndUpdate(blogId, { title, description })
  } catch (error) {
    return console.log(error)
  }
  if (!blog) {
    return res.status(500).send({ message: 'Unable to Update the Blog' })
  }
  return res.status(200).send({ blog })
}

exports.getById = async (req, res, next) => {
  const id = req.params.id
  let blog
  try {
    blog = await Blog.findById(id)
  } catch (error) {
    return console.log(error)
  }
  if (!blog) {
    return res.status(404).send({ message: 'No Blog Found' })
  }
  return res.status(200).send({ blog })
}

exports.deleteBlog = async (req, res, next) => {
  const id = req.params.id
  let blog
  try {
    blog = await Blog.findByIdAndRemove(id).populate('user')
    await blog.user.blogs.pull(blog)
    await blog.user.save()
  } catch (error) {
    return console.log(error)
  }
  if (!blog) {
    return res.status(500).send({ message: 'Unable to Delete' })
  }
  return res.status(200).send({ message: 'Deleted Successfully' })
}

exports.getByUserId = async (req, res, next) => {
  const userId = req.params.id
  let userBlogs
  try {
    userBlogs = await User.findById(userId).populate('blogs')
  } catch (error) {
    return console.log(error)
  }
  if (!userBlogs) {
    return res.status(404).send({ message: 'No Blog Found' })
  }
  return res.status(200).send({ user: userBlogs })
}
