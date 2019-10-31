import chai from 'chai';
import chaiHttp from 'chai-http';
import { users } from '../models/users4test';
import server from '../server';


const { expect } = chai;
chai.use(chaiHttp);


// test users routes

// random route
describe('incorrect route', () => {
  it('should return incorrect route ', (done) => {
    chai.request(server)
      .get('/')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(200);
        expect(res.status).to.equal(200);
        done();
      });
  });
});

// user sign up
describe('POST signup,api/v1/auth/signup', () => {
  it('should return firstName is required', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
  it('should return lastName is required', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
  it('should return Email is required', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[1])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
  it('should return Email is short', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[2])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
  it('User sign up successfully', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[3])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body.message).to.equal('User created successfully');
        done();
      });
  });
  // a different user signup successfully
  it('User sign up successfully', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[5])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body.message).to.equal('User created successfully');
        done();
      });
  });
  it('User email is alrady in use', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[3])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(409);
        expect(res.body.status).to.equal(409);
        done();
      });
  });
});

// User sign in
describe('POST signin  api/v1/auth/signin', () => {
  it('should return email must be inserted', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(users[4])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('incorect email or password');
        done();
      });
  });
});
