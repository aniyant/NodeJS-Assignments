const request = require('supertest');
const app = require('../app'); 

describe('Auth Routes', () => {
    let token;

    test('should register a new user', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                username: 'testuser',
                password: 'testpassword',
                role: 'customer'
            });
        
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
    });

    test('should login an existing user', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                username: 'testuser',
                password: 'testpassword'
            });
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token; // Store token for further tests
    });

    test('should return profile of logged in user', async () => {
        const res = await request(app)
            .get('/auth/profile')
            .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('username', 'testuser');
    });
});
