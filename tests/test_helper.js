const Blog = require('../models/blog');

const initialBlogs = [
    {
        title: "test",
        author: "Joshua Lindsay",
        url: "www.google.com",
        likes: 3
    },
    {
        title: "jimmy",
        author: "Joshua Lindsay",
        url: "www.facebook.com",
        likes: 3
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon' })
    await blog.save()
    await blog.remove()
  
    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}