const supertest = require('supertest');
const express = require('express');
const userController = require('../controllers/userController');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Mock User model methods
jest.mock('../models/User');

// Mock bcrypt.hash and bcrypt.compare methods
jest.mock('bcrypt');
bcrypt.hash.mockResolvedValue('mockHashedPassword');
bcrypt.compare.mockResolvedValue(true);

// Mock jwt.sign method
jest.mock('jsonwebtoken');
jwt.sign.mockReturnValue('mockToken');

app.post('/api/register', userController.register);
app.post('/api/login', userController.login);

const request = supertest(app);

describe('User Controller', () => {
  it('should register a new user', async () => {
    // Mock data and expected response
    const reqBody = { email: 'test@example.com', password: 'password' };
    const expectedResponse = { _id: 'mockUserId', email: reqBody.email, password: 'mockHashedPassword' };

    // Mock the User.findOne and User.create methods
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue(expectedResponse);

    const response = await request.post('/api/register').send(reqBody);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expectedResponse);
  });

  it('should login a user', async () => {
    // Mock data and expected response
    const reqBody = { email: 'test@example.com', password: 'password' };
    const mockUser = { _id: 'mockUserId', email: reqBody.email, password: 'mockHashedPassword' };

    // Mock the User.findOne method
    User.findOne.mockResolvedValue(mockUser);

    const response = await request.post('/api/login').send(reqBody);

    expect(response.status).toBe(200);
    expect(response.body.token).toEqual('mockToken');
  });

  // Add more test cases for edge cases and error scenarios
});
