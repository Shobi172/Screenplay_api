const supertest = require('supertest');
const express = require('express');
const relationController = require('../controllers/relationController');
const Relation = require('../models/Relation');

const app = express();
app.use(express.json());

// Mock Relation model methods
jest.mock('../models/Relation');

app.post('/api/relations', relationController.createRelation);
app.get('/api/relations', relationController.getAllRelations);
app.get('/api/relations/:id', relationController.getRelationById);
app.put('/api/relations/:id', relationController.updateRelation);
app.delete('/api/relations/:id', relationController.deleteRelation);

const request = supertest(app);

describe('Relation Controller', () => {
  it('should create a new relation', async () => {
    // Mock data and expected response
    const reqBody = {
      name: 'Friend',
      description: 'Friendship relation',
    };
    const expectedResponse = { _id: 'mockRelationId', ...reqBody };

    // Mock the Relation.create method
    Relation.create.mockResolvedValue(expectedResponse);

    const response = await request.post('/api/relations').send(reqBody);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expectedResponse);
  });

  it('should get all relations', async () => {
    // Mock data and expected response
    const mockRelations = [
      { _id: 'relationId1', name: 'Sibling', description: 'Sibling relation' },
      { _id: 'relationId2', name: 'Colleague', description: 'Colleague relation' },
    ];

    // Mock the Relation.find method
    Relation.find.mockResolvedValue(mockRelations);

    const response = await request.get('/api/relations');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockRelations);
  });

  it('should get a relation by ID', async () => {
    // Mock data and expected response
    const relationId = 'relationId1';
    const mockRelation = { _id: relationId, name: 'Sibling', description: 'Sibling relation' };

    // Mock the Relation.findById method
    Relation.findById.mockResolvedValue(mockRelation);

    const response = await request.get(`/api/relations/${relationId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockRelation);
  });

  it('should update a relation by ID', async () => {
    // Mock data and expected response
    const relationId = 'relationId1';
    const updatedRelationData = { name: 'Cousin', description: 'Cousin relation' };
    const updatedRelation = { _id: relationId, ...updatedRelationData };

    // Mock the Relation.findByIdAndUpdate method
    Relation.findByIdAndUpdate.mockResolvedValue(updatedRelation);

    const response = await request.put(`/api/relations/${relationId}`).send(updatedRelationData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedRelation);
  });

  it('should delete a relation by ID', async () => {
    // Mock data
    const relationId = 'relationId1';

    // Mock the Relation.findByIdAndDelete method
    Relation.findByIdAndDelete.mockResolvedValue({ _id: relationId });

    const response = await request.delete(`/api/relations/${relationId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Relation deleted successfully' });
  });
});
