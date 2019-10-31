import chai from 'chai';
import chaiHttp from 'chai-http';
import { users } from '../models/users4test';
import server from '../server';


const { expect } = chai;
chai.use(chaiHttp);


// test users routes

// random route
describe('incorrect route', () => {
  it('should Welcome you to My_Dairy ', (done) => {
    chai.request(server)
      .get('/')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(200);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Welcome to my Diary');
        done();
      });
  });
});

// user sign up
describe('POST signup,api/v1/auth/signup', () => {
  it('should return: "firstName should not be empty"', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"firstName" is not allowed to be empty');
        done();
      });
  });
  it('should return: "lastName should not be empty"', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[1])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"lastName" is not allowed to be empty');
        done();
      });
  });
  it('should return Email is required', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[2])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"email" is not allowed to be empty');
        done();
      });
  });
  it('should return Email is short', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[9])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"email" length must be at least 3 characters long');
        done();
      });
  });
  it('Should return: User (mention user firstName) sign up successfully', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[3])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body.message).to.equal('Emmanuel created successfully');
        done();
      });
  });
  // a different user signup successfully
  it('should return: a different User (mention user firstName) sign up successfully', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[5])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body.message).to.equal('Emmanuel1 created successfully');
        done();
      });
  });
  it('should return: User email (mention that email) has arleady been used', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[3])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(409);
        expect(res.body.status).to.equal(409);
        expect(res.body.error).to.equal('emmanuel@gmail.com has arleady been used');
        done();
      });
  });
});

// User sign in
describe('POST signin  api/v1/auth/signin', () => {
  it('should return incorect email or password', (done) => {
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
