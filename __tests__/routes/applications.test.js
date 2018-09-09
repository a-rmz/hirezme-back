const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../../src/app');
const { validateApplication } = require('../../src/schemas');

// close the server after each test
afterEach(() => {
  server.close();
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});

describe('routes: applications', () => {
  describe('GET /applications', () => {
    test('should respond with a list of Applications', async () => {
      const response = await request(server)
        .get('/api/v1/applications');

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body.data)).toBeTruthy();
      expect(response.body.data).not.toHaveLength(0);
      expect(
        validateApplication(response.body.data[0]).valid,
      ).toBeTruthy();
    });
  });

  describe('GET /application/:id', () => {
    test('should return the application with the given id', async () => {
      const response = await request(server)
        .get('/api/v1/applications/448e9c60-b3a6-11e8-825e-f1f43d9e926e');

      expect(response.statusCode).toBe(200);
      expect(validateApplication(response.body).valid).toBeTruthy();
    });

    test('should say that the application does not exist', async () => {
      const response = await request(server)
        .get('/api/v1/applications/548e9c60-b3a6-11e8-825e-f1f43d9e926e');

      expect(response.statusCode).toBe(404);
      expect(response.error.text).toEqual('The selected application does not exist');
    });

    test('should say that the id is not valid', async () => {
      const response = await request(server)
        .get('/api/v1/applications/fake-id');

      expect(response.statusCode).toBe(400);
      expect(response.error.text).toEqual('The provided id is not a uuid-v1');
    });
  });

  describe('POST /applications', () => {
    test('should create a new Application', async () => {
      const response = await request(server)
        .post('/api/v1/applications')
        .send({
          name: 'Intergalactic DevOps',
          url: 'https://thehub.fi/jobs/intergalactic-software-developer',
          tags: ['devops', 'backend'],
          status: 'IN_PROGRESS',
          dateSent: 'Sat Sep 08 2018 14:41:21 GMT-0500',
          dateReplied: 'Sat Sep 08 2018 14:41:21 GMT-0500',
          company: '3eee1c16-caf9-4f8d-b2cf-be6b56837a38',
        });

      expect(response.statusCode).toBe(201);
      expect(validateApplication(response.body).valid).toBeTruthy();
    });

    test('should return a list of format errors', async () => {
      const response = await request(server)
        .post('/api/v1/applications')
        .send({
          tags: ['devops', 'backend'],
          status: 'IN_PROGRESS',
          dateSent: 'Sat Sep 08 2018 14:41:21 GMT-0500',
          dateReplied: 'Sat Sep 08 2018 14:41:21 GMT-0500',
        });

      const error = JSON.parse(response.error.text);
      expect(response.statusCode).toBe(400);
      expect(Array.isArray(error.errors)).toBeTruthy();
    });
  });

  describe('PUT /applications/:id', () => {
    test('should update an existing Application', async () => {
      const response = await request(server)
        .put('/api/v1/applications/448e9c60-b3a6-11e8-825e-f1f43d9e926e')
        .send({
          name: 'Intergalactic DevOps',
          tags: ['devops', 'back-end', 'node'],
          status: 'IN_PROGRESS',
          dateReplied: 'Sat Sep 10 2018 14:41:21 GMT-0500',
        });

      expect(response.statusCode).toBe(200);
      expect(validateApplication(response.body).valid).toBeTruthy();
    });

    test('should return a list of format errors', async () => {
      const response = await request(server)
        .put('/api/v1/applications/448e9c60-b3a6-11e8-825e-f1f43d9e926e')
        .send({
          status: 'REJECTED',
          newField: 'should not exist',
        });

      const error = JSON.parse(response.error.text);
      expect(response.statusCode).toBe(400);
      expect(Array.isArray(error.errors)).toBeTruthy();
    });

    test('should say that the application does not exist', async () => {
      const response = await request(server)
        .put('/api/v1/applications/548e9c60-b3a6-11e8-825e-f1f43d9e926e');

      expect(response.statusCode).toBe(404);
      expect(response.error.text).toEqual('The selected application does not exist');
    });

    test('should say that the id is not valid', async () => {
      const response = await request(server)
        .get('/api/v1/applications/fake-id');

      expect(response.statusCode).toBe(400);
      expect(response.error.text).toEqual('The provided id is not a uuid-v1');
    });
  });
});
