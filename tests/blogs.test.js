const listHelper = require('../utils/list_helper');
const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const api = supertest(app);

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
]

const listWithManyBlogs = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422a56561b54a676234d17f8',
        title: 'Go To Statement Considered Useful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10,
        __v: 0
      },
      {
        _id: '5a422a56561b54a676234d17f8',
        title: 'Go To Statement Considered painfull',
        author: 'Eds W. Dij',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 2,
        __v: 0
      },
      {
        _id: '5a422a56561b54a676234d17f8',
        title: 'Go To Statement Considered painfull',
        author: 'Eds W. Dij',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 2,
        __v: 0
      },
      {
        _id: '5a422a56561b54a676234d17f8',
        title: 'Go To Statement Considered painfull',
        author: 'Eds W. Dij',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 2,
        __v: 0
      }
]

test('dummy returns ones', () => {
    const blogs = [1];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
})

test('blogs are returned as json', async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([]);
        expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithManyBlogs);
        expect(result).toBe(21)
    })
})

describe('most blogs', () => {
    test('by same author', () => {
        const result = listHelper.mostBlogs(listWithManyBlogs);
        console.log(result)
        // expect(result).toBe(0)
    })
})

afterAll(() => {
    mongoose.connection.close();
})