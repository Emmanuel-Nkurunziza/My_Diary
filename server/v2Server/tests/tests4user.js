import chai from 'chai';
import chaiHttp from 'chai-http';
import { users } from '../models/users4test';
import server from '../server';


const { expect } = chai;
chai.use(chaiHttp);


// test users routes
console.log(process.env.NODE_ENV);


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
        expect(res.body.message).to.equal('Welcome to My_Diary');
        done();
      });
  });
});

// user sign up
describe('POST signup,api/v2/auth/signup', () => {
  it('should return: "firstName should not be empty"', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup')
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
      .post('/api/v2/auth/signup')
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
      .post('/api/v2/auth/signup')
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
  it('should return password is required', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup')
      .set('Accept', 'application/json')
      .send(users[9])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"password" is not allowed to be empty');
        done();
      });
  });
  it('Should return: User (mention user firstName) sign up successfully', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup')
      .set('Accept', 'application/json')
      .send(users[3])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body.message).to.equal('Emmanuel created successfully');
        expect(res.body.data.firstName).to.equal('Emmanuel');
        expect(res.body.data.lastName).to.equal('Nkurunziza');
        expect(res.body.data.email).to.equal('emmanuel@gmail.com');
        done();
      });
  });
  // a different user signup successfully
  it('should return: a different User (mention user firstName) sign up successfully', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup')
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
      .post('/api/v2/auth/signup')
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
