import request from 'supertest';
import app from '../../src/app';
import truncate from '../../src/app/utils/truncate';


describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });



  it('testing invalid users registration', async () => {
    const response = await request(app)
    .post('/user/register')
    .send({
      first_name: "Caio",
      password: "123456"
    })

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });



  it('testing valid user registration', async () => {
    const response = await request(app)
    .post('/user/register')
    .send({
      first_name: "Amanda",
      last_name: "Bezerra",
      password: "123456",
      phone: "61999998888"
    });

    expect(response.body).toHaveProperty('id');
    expect(response.status).toBe(201);
  });



  it('testing unique:true to phone', async () => {
    await request(app)
    .post('/user/register')
    .send({
      first_name: "eoqloco",
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



  it('testing wrong code phone to confirm user', async () => {
    const user = await request(app)
    .post('/user/register')
    .send({
      first_name: "fcaio",
      last_name: "felipe",
      password: "123456",
      phone: "61999998888"
    });

    const response = await request(app)
    .post('/user/active')
    .send({
      userId: `${user.body.id}`,
      phoneCode: "QAWERA"
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error')
  });



  it('testing invalid user id to active user', async () => {
    const response = await request(app)
    .post('/user/active')
    .send({
      userId: `${500}`,
      phoneCode: "QQQQQQ"
    });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error')
  });



  it('should return a message and status 200 if user was activated', async () => {
    const userCreated = await request(app)
    .post('/user/register')
    .send({
      first_name: "caio",
      last_name: "fxlipe",
      password: "123456",
      phone: "61999998888",
    })

    // Request to fake route to get a user's phone code and test the application
    const userCode = await request(app)
    .post(`/fake/to/get/one/user/${userCreated.body.id}`)
    .send({ id: userCreated.body.id })

    const response = await request(app)
    .post('/user/active')
    .send({
      userId: userCreated.body.id,
      phoneCode: userCode.body.code
    })

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(200);
  });



  it('should return a token if users exists and password and phone is correctly', async() => {
    const userCreated = await request(app)
    .post('/user/register')
    .send({
      first_name: "caio",
      last_name: "fxlipe",
      password: "123456",
      phone: "61999998888",
    })

    // Request to fake route to get a user's phone code and test the application
    const userCode = await request(app)
    .post(`/fake/to/get/one/user/${userCreated.body.id}`)
    .send({ id: userCreated.body.id });

    await request(app)
    .post('/user/active')
    .send({
      userId: userCreated.body.id,
      phoneCode: userCode.body.code
    })

    const token = await request(app)
    .post('/user/login')
    .send({
      phone: "61999998888",
      password: "123456"
    })

    expect(token.body).toHaveProperty('token')
  })



  it('need to return 400 to phone that does not exist or user not activated', async () => {
    const response = await request(app)
    .post('/user/login')
    .send({
      phone: "61999998888",
      password: "123456"
    })

    expect(response.body).toHaveProperty('error')
    expect(response.status).toBe(400)
  })



  it('need to return 401 to invalid password', async () => {
    const userCreated = await request(app)
    .post('/user/register')
    .send({
      first_name: "caio",
      last_name: "fxlipe",
      password: "123456",
      phone: "61999998888",
    })

    // Request to fake route to get a user's phone code and test the application
    const userCode = await request(app)
    .post(`/fake/to/get/one/user/${userCreated.body.id}`)
    .send({ id: userCreated.body.id });

    await request(app)
    .post('/user/active')
    .send({
      userId: userCreated.body.id,
      phoneCode: userCode.body.code
    })

    const response = await request(app)
    .post('/user/login')
    .send({
      phone: "61999998888",
      password: "1234567"
    })

    expect(response.body).toHaveProperty('info')
    expect(response.status).toBe(401)
  })




  it('should return 400 and error message if token not provided', async() => {
    const response = await request(app)
    .put('/user/delete')
    
    expect(response.body).toHaveProperty('error')
    expect(response.status).toBe(400)
  })



  it('should update user status active to false if valid token is provided', async() => {
    const userCreated = await request(app)
    .post('/user/register')
    .send({
      first_name: "caio",
      last_name: "fxlipe",
      password: "123456",
      phone: "61999998888",
    })

    // Request to fake route to get a user's phone code and test the application
    const userCode = await request(app)
    .post(`/fake/to/get/one/user/${userCreated.body.id}`)
    .send({ id: userCreated.body.id });

    await request(app)
    .post('/user/active')
    .send({
      userId: userCreated.body.id,
      phoneCode: userCode.body.code
    })

    const token = await request(app)
    .post('/user/login')
    .send({
      password: "123456",
      phone: "61999998888",
    })

    const userUpdated = await request(app)
    .put('/user/delete')
    .set('Authorization', `Bearer ${token.body.token}`)

    expect(userUpdated.body).toHaveProperty('info')
    expect(userUpdated.status).toBe(200)
  })



  it('should return status 401 to update phone or password in this route', async() => {
    const userCreated = await request(app)
    .post('/user/register')
    .send({
      first_name: "caio",
      last_name: "fxlipe",
      password: "123456",
      phone: "61999998888",
    })

    // Request to fake route to get a user's phone code and test the application
    const userCode = await request(app)
    .post(`/fake/to/get/one/user/${userCreated.body.id}`)
    .send({ id: userCreated.body.id });

    await request(app)
    .post('/user/active')
    .send({
      userId: userCreated.body.id,
      phoneCode: userCode.body.code
    })

    const token = await request(app)
    .post('/user/login')
    .send({
      password: "123456",
      phone: "61999998888",
    })

    const response = await request(app)
    .put('/user/update')
    .set('Authorization', `Bearer ${token.body.token}`)
    .send({
      phone: "611234566666",
      first_name: "Caio"
    })

    expect(response.body).toHaveProperty('info')
    expect(response.status).toBe(401)
  })



  it('checking if the user before updating', async () => {
    const userCreated = await request(app)
    .post('/user/register')
    .send({
      first_name: "caio",
      last_name: "fxlipe",
      password: "123456",
      phone: "61999998888",
    })

    // Request to fake route to get a user's phone code and test the application
    const userCode = await request(app)
    .post(`/fake/to/get/one/user/${userCreated.body.id}`)
    .send({ id: userCreated.body.id });

    await request(app)
    .post('/user/active')
    .send({
      userId: userCreated.body.id,
      phoneCode: userCode.body.code
    })

    const token = await request(app)
    .post('/user/login')
    .send({
      password: "123456",
      phone: "61999998888",
    })

    const userUpdated = await request(app)
    .put('/user/delete')
    .set('Authorization', `Bearer ${token.body.token}`)


    const response = await request(app)
    .put('/user/update')
    .set('Authorization', `Bearer ${token.body.token}`)
    .send({
      first_name: "Caio",
      last_name: "fElipe"
    })

    expect(response.body).toHaveProperty('error')
    expect(response.status).toBe(400)
  })

  it('precisa escrever agr o teste de atualizar senha')
});