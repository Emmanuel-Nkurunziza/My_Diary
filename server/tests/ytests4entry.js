import jwt from 'jsonwebtoken';
import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import { entries } from '../models/entries4test';
import server from '../server';

dotenv.config();
const { expect } = chai;
chai.use(chaiHttp);


// test entries


let userToken;
const token = '';
let wrongToken;
let nonExistToken = jwt.sign({
  userEmail: 'emmanuelNkurunziza@gmail.com',
}, process.env.secretOrPrivateKey);
const invalidToken = 'this is not the structure of a token';
// Add Entry
describe('POST entries ,/api/v1/entries', () => {
  beforeEach((done) => {
    chai.request(server).post('/api/v1/auth/signin').send({
      email: 'emmanuel@gmail.com',
      password: 'nkurunziza123',
    }).then((res) => {
      userToken = res.body.data.token;
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return "title" is required ', (done) => {
    chai.request(server)
      .post('/api/v1/entries')
      .set('authorization', userToken)
      .set('Accept', 'application/json')
      .send(entries[0])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"title" is not allowed to be empty');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return: description is not allowed to be empty', (done) => {
    chai.request(server)
      .post('/api/v1/entries')
      .set('authorization', userToken)
      .set('Accept', 'application/json')
      .send(entries[1])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"description" is not allowed to be empty');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return: "You haven\'t provide your token"', (done) => {
    chai.request(server)
      .post('/api/v1/entries')
      .set('authorization', token)
      .set('Accept', 'application/json')
      .send(entries[2])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('there is no token provided!');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return You are not authorized to perform this action', (done) => {
    chai.request(server)
      .post('/api/v1/entries')
      .set('authorization', nonExistToken)
      .set('Accept', 'application/json')
      .send(entries[2])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('You are not registered in my Diary!');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return jwt malformed', (done) => {
    chai.request(server)
      .post('/api/v1/entries')
      .set('authorization', invalidToken)
      .set('Accept', 'application/json')
      .send(entries[2])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it('should return entry successfully created', (done) => {
    chai.request(server)
      .post('/api/v1/entries')
      .set('authorization', userToken)
      .set('Accept', 'application/json')
      .send(entries[2])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('Entry created successfully');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
