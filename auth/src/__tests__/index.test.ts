import request from 'supertest';
import app from '../app';

it('Responds with status 200', async () => {
  await request(app).get('/').expect(200);
});
