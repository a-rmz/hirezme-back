const request = require('supertest');
const http = require('http');
const app = require('../../src/app');
const { validateCompany } = require('../../src/schemas');

let server;

beforeEach(() => {
  server = http.createServer(app.callback());
});

afterEach(() => {
  server.close();
});

describe('routes: companies', () => {
  describe('GET /companies', () => {
    test('should respond with a list of Companies', async () => {
      const response = await request(server)
        .get('/api/v1/companies');

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body.data)).toBeTruthy();
      expect(response.body.data).not.toHaveLength(0);
      expect(
        validateCompany(response.body.data[0]).valid,
      ).toBeTruthy();
    });
  });

  describe('GET /company/:id', () => {
    test('should return the company with the given id', async () => {
      const response = await request(server)
        .get('/api/v1/companies/3eee1c16-caf9-4f8d-b2cf-be6b56837a38');

      expect(response.statusCode).toBe(200);
      expect(validateCompany(response.body).valid).toBeTruthy();
    });

    test('should say that the company does not exist', async () => {
      const response = await request(server)
        .get('/api/v1/companies/548e9c60-b3a6-11e8-825e-f1f43d9e926e');

      expect(response.statusCode).toBe(404);
      expect(response.error.text).toEqual('The selected company does not exist');
    });

    test('should say that the id is not valid', async () => {
      const response = await request(server)
        .get('/api/v1/companies/fake-id');

      expect(response.statusCode).toBe(400);
      expect(response.error.text).toEqual('The provided id is not a uuid-v1');
    });
  });

  describe('POST /companies', () => {
    test('should create a new Company', async () => {
      const response = await request(server)
        .post('/api/v1/companies')
        .send({
          name: 'Montel Intergalactic',
          url: 'https://montel.fi',
          location: {
            address: 'Mikonkatu 17 A, 00100',
            city: 'Helsinki',
            country: 'Finland',
          },
        });

      expect(response.statusCode).toBe(201);
      expect(validateCompany(response.body).valid).toBeTruthy();
    });

    test('should return a list of format errors', async () => {
      const response = await request(server)
        .post('/api/v1/companies')
        .send({
          location: {
            address: 'Mikonkatu 17 A, 00100',
            city: 'Helsinki',
            country: 'Finland',
          },
        });

      const error = JSON.parse(response.error.text);
      expect(response.statusCode).toBe(400);
      expect(Array.isArray(error.errors)).toBeTruthy();
    });
  });

  describe('PUT /companies/:id', () => {
    test('should update an existing Company', async () => {
      const response = await request(server)
        .put('/api/v1/companies/3eee1c16-caf9-4f8d-b2cf-be6b56837a38')
        .send({
          name: 'Montel Intergalactic [UPDATED]',
          tags: ['startup'],
        });

      expect(response.statusCode).toBe(200);
      expect(validateCompany(response.body).valid).toBeTruthy();
    });

    test('should return a list of format errors', async () => {
      const response = await request(server)
        .put('/api/v1/companies/3eee1c16-caf9-4f8d-b2cf-be6b56837a38')
        .send({
          name: 'Montel Intergalactic [UPDATED]',
          newField: 'should not exist',
        });

      const error = JSON.parse(response.error.text);
      expect(response.statusCode).toBe(400);
      expect(Array.isArray(error.errors)).toBeTruthy();
    });

    test('should say that the company does not exist', async () => {
      const response = await request(server)
        .put('/api/v1/companies/548e9c60-b3a6-11e8-825e-f1f43d9e926e');

      expect(response.statusCode).toBe(404);
      expect(response.error.text).toEqual('The selected company does not exist');
    });

    test('should say that the id is not valid', async () => {
      const response = await request(server)
        .get('/api/v1/companies/fake-id');

      expect(response.statusCode).toBe(400);
      expect(response.error.text).toEqual('The provided id is not a uuid-v1');
    });
  });

  describe('DELETE /company/:id', () => {
    test('should delete the object', async () => {
      const response = await request(server)
        .delete('/api/v1/companies/3eee1c16-caf9-4f8d-b2cf-be6b56837a38');

      expect(response.statusCode).toBe(204);
    });

    test('should say that the company does not exist', async () => {
      const response = await request(server)
        .get('/api/v1/companies/548e9c60-b3a6-11e8-825e-f1f43d9e926e');

      expect(response.statusCode).toBe(404);
      expect(response.error.text).toEqual('The selected company does not exist');
    });

    test('should say that the id is not valid', async () => {
      const response = await request(server)
        .get('/api/v1/companies/fake-id');

      expect(response.statusCode).toBe(400);
      expect(response.error.text).toEqual('The provided id is not a uuid-v1');
    });
  });
});
