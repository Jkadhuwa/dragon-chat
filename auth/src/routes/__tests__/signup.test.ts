import request from 'supertest';

import app, { SIGNUP_ROUTE } from '../../app';
import signupData from '../../__mocks__/signupData.json';

beforeAll(() => {
  // start the database
});
beforeEach(() => {
  // clean up the database
});
afterAll(() => {
  // close the database connection
});

/**
 * Tests allowed methos to signup route
 *  - Allowed Method: POST
 */

describe('Tests for signup route method', () => {
  it('Should return 405 for GET, PUT, PATCH, DELETE requests', async () => {
    await request(app).get(SIGNUP_ROUTE).expect(405);
    await request(app).patch(SIGNUP_ROUTE).expect(405);
    await request(app).put(SIGNUP_ROUTE).expect(405);
    await request(app).delete(SIGNUP_ROUTE).expect(405);
  });

  it('Should return POST as the only allowed HTTP method for SIGNUP_ROUTE', async () => {
    const response = await request(app).options(SIGNUP_ROUTE).expect(200);
    expect(response.get('access-control-allow-methods')).toContain('POST');
    expect(response.get('access-control-allow-methods')).toContain('OPTIONS');
  });
});

/**
 * Tests for firstname field
 * - format: -- Should be alpha
 *           -- Min of 2
 */

describe('Test for firstname validity', () => {
  it('Should return 400, if firstname is invalid', async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send(signupData.invalidFirstName)
      .expect(400);
  });

  it('Should return Non Empty message, if firstname is empty', async () => {
    const response = await request(app)
      .post(SIGNUP_ROUTE)
      .send(signupData.emptyFirstName);
    expect(response.body.errors[0].msg).toBe('first name cannot be empty');
    expect(response.body.success).toBe(false);
  });

  it('Should return number of characters if firstname is les than 2 characters', async () => {
    const response = await request(app)
      .post(SIGNUP_ROUTE)
      .send(signupData.lessThanTwoCharFName);
    expect(response.body.errors[0].msg).toBe(
      'first name should be atleast 2 characters long'
    );
    expect(response.body.success).toBe(false);
  });

  it('Should return alphabets only error, if numerals are input', async () => {
    const response = await request(app)
      .post(SIGNUP_ROUTE)
      .send(signupData.invalidFirstName);
    expect(response.body.errors[0].msg).toBe(
      'first name should contain alphabets only'
    );
    expect(response.body.success).toBe(false);
  });
});

/**
 * Tests for lastname field
 */

describe('Test for lastname validity', () => {
  it('Should return 400, if lastname is invalid', async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send(signupData.invalidLastName)
      .expect(400);
  });

  it('Should return Non Empty message, if lastname is empty', async () => {
    const response = await request(app)
      .post(SIGNUP_ROUTE)
      .send(signupData.emptylastName);
    expect(response.body.errors[0].msg).toBe('last name cannot be empty');
    expect(response.body.success).toBe(false);
  });

  it('Should return number of characters error, if lastname is less than 2', async () => {
    const response = await request(app)
      .post(SIGNUP_ROUTE)
      .send(signupData.lessThanTwoCharLName);
    expect(response.body.errors[0].msg).toBe(
      'last name should be atleast 2 characters long'
    );
    expect(response.body.success).toBe(false);
  });

  it('Should return alphabets only error, if numerals are input', async () => {
    const response = await request(app)
      .post(SIGNUP_ROUTE)
      .send(signupData.invalidLastName);
    expect(response.body.errors[0].msg).toBe(
      'last name should contain alphabets only'
    );
    expect(response.body.success).toBe(false);
  });
});

/**
 * Tests for email field
 */

describe('Test for email validity', () => {
  it('Should return 400, if email is invalid', async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send(signupData.invalidEmail)
      .expect(400);
  });

  it('Should return Non Empty Error, if email is empty', async () => {
    const response = await request(app)
      .post(SIGNUP_ROUTE)
      .send(signupData.emptyEmail);
    expect(response.body.errors[0].msg).toBe('email cannot be empty');
    expect(response.body.success).toBe(false);
  });
});

describe('Test for username validity', () => {
  it('Should return 400, if username is invalid', async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send(signupData.invalidUsername)
      .expect(400);
  });

  it('Should return Non Empty message, if username is empty', async () => {
    const response = await request(app)
      .post(SIGNUP_ROUTE)
      .send(signupData.emptyUsername);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.success).toBe(false);
  });

  it('Should return number of characters error, if username is less than 2', async () => {
    const response = await request(app)
      .post(SIGNUP_ROUTE)
      .send(signupData.lessThanTwoUname);
    expect(response.body.errors[0].msg).toBe(
      'username should be atleast 2 characters long'
    );
    expect(response.body.success).toBe(false);
  });
});

describe('Test for password validity', () => {
  it('Should return 400, if password is invalid', async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send(signupData.invalidPassword)
      .expect(400);
  });

  it('Should return Non Empty message, if password is empty', async () => {
    const response = await request(app)
      .post(SIGNUP_ROUTE)
      .send(signupData.emptyPassword);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.success).toBe(false);
  });

  it('Should return number of characters error, if password is less than 6 characters', async () => {
    const response = await request(app)
      .post(SIGNUP_ROUTE)
      .send(signupData.lessThanSixPassword);
    expect(response.body.errors[0].msg).toBe(
      'password should be atleast 6 characters long'
    );
    expect(response.body.success).toBe(false);
  });
});

describe('Test for DOB validity', () => {
  it('Should return invalid dob error with status code 400, if dob is invalid', async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send(signupData.invalidDOB)
      .expect(400);
    const response = await request(app)
      .post(SIGNUP_ROUTE)
      .send(signupData.invalidDOB);
    expect(response.body.errors[0].msg).toBe('Enter valid date 01-01-2002');
  });

  it('Should create user and return status code 201, if dob is invalid', async () => {
    await request(app).post(SIGNUP_ROUTE).send(signupData.emptyDOB).expect(201);

    const response = await request(app)
      .post(SIGNUP_ROUTE)
      .send(signupData.emptyDOB);
    expect(response.body.message).toBe('User created successfully');
  });
});

describe('Test sanitization of user inputs', () => {
  const normalizedEmail = 'justinemsinda@gmail.com';

  it('Should not contain uppercase letters in the email domain section', async () => {
    const response = await request(app)
      .post(SIGNUP_ROUTE)
      .send(signupData.sanitizeEmail)
      .expect(201);
    expect(response.body.data.email).toEqual(normalizedEmail);
  });

  it('Should not contain unescaped characters', async () => {
    const response = await request(app)
      .post(SIGNUP_ROUTE)
      .send(signupData.escapeCharacters)
      .expect(201);
    expect(response.body.data.password).not.toEqual(
      signupData.escapeCharacters
    );
  });
});
