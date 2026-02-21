const request = require('supertest');
const sinon = require('sinon');
const mongoose = require('mongoose');
const { expect } = require('chai');

const app = require('../app');
const Witch = require('../models/Witch');

describe('Witches API unit tests', () => {

  afterEach(() => {
    sinon.restore();
  });

  it('GET all witches', async () => {
    sinon.stub(Witch, 'find').returns({
      populate: sinon.stub().resolves([
        { _id: '1', name: 'Gertrud', barrierType: 'Labyrinth', dangerLevel: 5, __v: 0 },
        { _id: '2', name: 'Charlotte', barrierType: 'Labyrinth', dangerLevel: 7, __v: 0 }
      ])
    });

    const res = await request(app).get('/witches');

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(2);
    expect(res.body[0].name).to.equal('Gertrud');
  });

  it('POST correct witch', async () => {
    sinon.stub(Witch, 'findOne').resolves(undefined);
    sinon.stub(Witch, 'create').resolves({
      _id: 'abc123',
      name: 'Ophelia',
      barrierType: 'Pocket',
      dangerLevel: 8,
      __v: 0
    });

    const res = await request(app)
      .post('/witches')
      .send({
        name: 'Ophelia',
        barrierType: 'Pocket',
        dangerLevel: 8
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('_id');
    expect(res.body.name).to.equal('Ophelia');
  });

  it('GET witch by id', async () => {
    const mockWitch = { _id: '1', name: 'Walpurgis', barrierType: 'Reality', dangerLevel: 10 };
    sinon.stub(Witch, 'findById').returns({
      populate: sinon.stub().resolves(mockWitch)
    });

    const res = await request(app).get('/witches/1');

    expect(res.status).to.equal(200);
    expect(res.body.name).to.equal('Walpurgis');
  });

  it('GET witch by id that does not exist', async () => {
    sinon.stub(Witch, 'findById').returns({
      populate: sinon.stub().resolves(null)
    });

    const res = await request(app).get('/witches/507f1f77bcf86cd799439011');

    expect(res.status).to.equal(404);
  });

  it('POST with incorrect barrierType (Mongoose ValidationError)', async () => {
    sinon.stub(Witch, 'findOne').resolves(undefined);
    const err = new mongoose.Error.ValidationError();
    err.addError('barrierType', new mongoose.Error.ValidatorError({ message: 'Barrier type must be: Labyrinth, Pocket, Reality or Other' }));
    sinon.stub(Witch, 'create').rejects(err);

    const res = await request(app)
      .post('/witches')
      .send({
        name: 'TestWitch',
        barrierType: 'InvalidType',
        dangerLevel: 5
      });

    expect(res.status).to.equal(400);
    expect(res.text).to.include('Barrier type must be: Labyrinth, Pocket, Reality or Other');
  });

  it('POST with dangerLevel out of range (Mongoose ValidationError)', async () => {
    sinon.stub(Witch, 'findOne').resolves(undefined);
    const err = new mongoose.Error.ValidationError();
    err.addError('dangerLevel', new mongoose.Error.ValidatorError({ message: 'Maximum danger level is 10' }));
    sinon.stub(Witch, 'create').rejects(err);

    const res = await request(app)
      .post('/witches')
      .send({
        name: 'TestWitch',
        barrierType: 'Labyrinth',
        dangerLevel: 15
      });

    expect(res.status).to.equal(400);
    expect(res.text).to.include('Maximum danger level is 10');
  });

});
