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

  // Get All Entries (tested before, the POST of the entry successfully created )
  it('should return:"Your entries  are not found!"', (done) => {
    chai.request(server)
      .get('/api/v1/entries')
      .set('authorization', userToken)
      .set('Accept', 'application/json')
      // no .send(entries[2])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.message).to.equal('No story created yet');
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

// Modify Entry
describe(' 4. PATCH entries ,/api/v1/entries/:entryId', () => {
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
  it('should return id is not number ', (done) => {
    chai.request(server)
      .patch('/api/v1/entries/wrt')
      .set('authorization', userToken)
      .set('Accept', 'application/json')
      .send(entries[4])
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
  it('should return id is not found ', (done) => {
    chai.request(server)
      .patch('/api/v1/entries/10')
      .set('authorization', userToken)
      .set('Accept', 'application/json')
      .send(entries[4])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  beforeEach((done) => {
    chai.request(server).post('/api/v1/auth/signin').send({
      email: 'emmanuel1@gmail.com',
      password: 'nkurunziza12345',
    }).then((res) => {
      wrongToken = res.body.data.token;
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return this entry does not belongs to you ', (done) => {
    chai.request(server)
      .patch('/api/v1/entries/1')
      .set('authorization', wrongToken)
      .set('Accept', 'application/json')
      .send(entries[4])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal(403);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return entry successfully edited', (done) => {
    chai.request(server)
      .patch('/api/v1/entries/1')
      .set('authorization', userToken)
      .set('Accept', 'application/json')
      .send(entries[4])
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

// Get all entries
describe('GET entries ,/api/v1/entries', () => {
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
  it('should return:"All your available entries are:"', (done) => {
    chai.request(server)
      .get('/api/v1/entries')
      .set('authorization', userToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

// Get specific entry
describe('GET entries ,/api/v1/entries/:entryId', () => {
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
  it('should return: "id is not number"', (done) => {
    chai.request(server)
      .get('/api/v1/entries/wrt')
      .set('authorization', userToken)
      .set('Accept', 'application/json')
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
  it('should return: "not found id" ', (done) => {
    chai.request(server)
      .get('/api/v1/entries/10')
      .set('authorization', userToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return:"this entry belongs to someone else"', (done) => {
    chai.request(server)
      .get('/api/v1/entries/1')
      .set('authorization', wrongToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal(403);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return: "Story is displayed successfully"', (done) => {
    chai.request(server)
      .get('/api/v1/entries/1')
      .set('authorization', userToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('Story is displayed successfully');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

// Delete Entry
describe('DELETE entries ,/api/v1/entries/:entryId', () => {
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
  it('should return: The entry id should be a number ', (done) => {
    chai.request(server)
      .delete('/api/v1/entries/id')
      .set('authorization', userToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('The entry id should be a number');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return: "Non existing text entry" ', (done) => {
    chai.request(server)
      .delete('/api/v1/entries/10')
      .set('authorization', userToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.message).to.equal('Non existing text entry');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  beforeEach((done) => {
    chai.request(server).post('/api/v1/auth/signin').send({
      email: 'emmanuel1@gmail.com',
      password: 'nkurunziza12345',
    }).then((res) => {
      wrongToken = res.body.data.token;
      done();
    })
      .catch((err) => console.log(err));
  });
  it('should return: "You are not authorized to take this action!" ', (done) => {
    chai.request(server)
      .delete('/api/v1/entries/1')
      .set('authorization', wrongToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal(403);
        expect(res.body.error).to.equal('You are not authorized to take this action!');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('should return: "Story has been deleted successfully!"', (done) => {
    chai.request(server)
      .delete('/api/v1/entries/1')
      .set('authorization', userToken)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('Story has been deleted successfully!');
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});