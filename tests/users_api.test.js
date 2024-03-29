const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const User = require('../models/user');

describe('when there is initially one user in db', () => {

    beforeEach(async () => {
        await User.deleteMany({});
        
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'joshua',
            name: 'joshua lindsay',
            password: 'binbo'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
        
        const usernames = usersAtEnd.map(u => u.username);
        expect(usernames).toContain(newUser.username);
    })
})

afterAll(() => {
    mongoose.connection.close();
})


