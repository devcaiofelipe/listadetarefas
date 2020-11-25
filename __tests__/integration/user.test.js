import request from 'supertest';
import app from '../../src/app';
import truncate from '../../src/app/utils/truncate';


describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('validating input data', async () => {
    const response = await request(app)
    .post('/user/register')
    .send({
      first_name: "Caio",
      password: "123456"
    })

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });


  it('register valid user', async () => {
    const response = await request(app)
    .post('/user/register')
    .send({
      first_name: "Amanda",
      last_name: "Bezerra",
      password: "123456",
      phone: "61999998888"
    });

    expect(response.body).toHaveProperty('id');
  });

  it('duplicate phone not allowed', async () => {
    await request(app)
    .post('/user/register')
    .send({
      first_name: 123456,
      last_name: "Bezerra",
      password: "123456",
      phone: "61999998888"
    });

    const response = await request(app)
    .post('/user/register')
    .send({
      first_name: "Amanda",
      last_name: "Bezerra",
      password: "123456",
      phone: "61999998888"
    });

    expect(response.status).toBe(400);
  });

  it('testing confirm user', async () => {
    const user = await request(app)
    .post('/user/register')
    .send({
      first_name: "fake",
      last_name: "fakao",
      password: "1234567",
      phone: "61999998888"
    });

    console.log(' AAAAAAAAAQUIIIIIIIIIIIIIIII ',user.body.id);

    const response = await request(app)
    .post('/user/active')
    .send({
      userId: `${user.body.id}`,
      phoneCode: "QQQQQQ"
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error')
  });



});