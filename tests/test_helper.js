const Blog = require('../models/blog');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const passwordHash = bcrypt.hash('sekret', 10);

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

const initalUsers = [
    {
        username: 'root', 
        passwordHash
    },
    {
        username: 'test',
        passwordHash
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon' })
    await blog.save()
    await blog.remove()
  
    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(b => b.toJSON());
}

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(u => u.toJSON());
}

module.exports = {
    initialBlogs, initalUsers, nonExistingId, blogsInDb, usersInDb
}