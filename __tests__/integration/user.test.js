import request from 'supertest';
import app from '../../src/app';


describe('User', () => {
  it('register valid user', async () => {
    const response = await request(app)
    .post('/user/register')
    .send({
      first_name: "Amanda",
      last_name: "Bezerra",
      password: "123456",
      phone: "61999998889"
    });

    expect(response.body).toHaveProperty('id');
  });
});