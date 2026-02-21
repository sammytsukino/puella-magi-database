const request = require('supertest');
const sinon = require('sinon');
const mongoose = require('mongoose');
const { expect } = require('chai');

const app = require('../app');
const MagicalGirl = require('../models/MagicalGirl');

describe('MagicalGirls API unit tests', () => {

  afterEach(() => {
    sinon.restore();
  });

  it('GET all magicalgirls', async () => {
    sinon.stub(MagicalGirl, 'find').resolves([
      { _id: '1', name: 'Madoka', soulGemColor: 'Pink', weapon: 'Bow', powerLevel: 50, __v: 0 },
      { _id: '2', name: 'Homura', soulGemColor: 'Purple', weapon: 'Shield', powerLevel: 80, __v: 0 }
    ]);

    const res = await request(app).get('/magicalgirls');

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(2);
    expect(res.body[0].name).to.equal('Madoka');
  });

  it('POST correct magicalgirl', async () => {
    sinon.stub(MagicalGirl, 'findOne').resolves(undefined);
    sinon.stub(MagicalGirl, 'create').resolves({
      _id: 'abc123',
      name: 'Sayaka',
      soulGemColor: 'Blue',
      weapon: 'Sword',
      powerLevel: 40,
      __v: 0
    });

    const res = await request(app)
      .post('/magicalgirls')
      .send({
        name: 'Sayaka',
        soulGemColor: 'Blue',
        weapon: 'Sword',
        powerLevel: 40
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('_id');
    expect(res.body.name).to.equal('Sayaka');
  });

  it('GET magicalgirl by id', async () => {
    const mockGirl = { _id: '1', name: 'Mami', soulGemColor: 'Yellow', weapon: 'Gun', powerLevel: 60 };
    sinon.stub(MagicalGirl, 'findById').resolves(mockGirl);

    const res = await request(app).get('/magicalgirls/1');

    expect(res.status).to.equal(200);
    expect(res.body.name).to.equal('Mami');
  });

  it('GET magicalgirl by id that does not exist', async () => {
    sinon.stub(MagicalGirl, 'findById').resolves(null);

    const res = await request(app).get('/magicalgirls/507f1f77bcf86cd799439011');

    expect(res.status).to.equal(404);
  });

  it('PUT correct magicalgirl', async () => {
    sinon.stub(MagicalGirl, 'findOne').resolves(undefined);
    sinon.stub(MagicalGirl, 'findByIdAndUpdate').resolves({ _id: '1' });

    const res = await request(app)
      .put('/magicalgirls/1')
      .send({
        name: 'Madoka',
        soulGemColor: 'Pink',
        weapon: 'Bow',
        powerLevel: 55
      });

    expect(res.status).to.equal(204);
  });

  it('DELETE magicalgirl', async () => {
    sinon.stub(MagicalGirl, 'findByIdAndDelete').resolves({ _id: '1' });

    const res = await request(app).delete('/magicalgirls/1');

    expect(res.status).to.equal(204);
  });

  it('POST with incorrect weapon (Mongoose ValidationError)', async () => {
    sinon.stub(MagicalGirl, 'findOne').resolves(undefined);
    const err = new mongoose.Error.ValidationError();
    err.addError('weapon', new mongoose.Error.ValidatorError({ message: 'Weapon must be one of: Bow, Spear, Sword, Gun, Shield or Other' }));
    sinon.stub(MagicalGirl, 'create').rejects(err);

    const res = await request(app)
      .post('/magicalgirls')
      .send({
        name: 'Test',
        soulGemColor: 'Red',
        weapon: 'InvalidWeapon',
        powerLevel: 10
      });

    expect(res.status).to.equal(400);
    expect(res.text).to.include('Weapon must be one of: Bow, Spear, Sword, Gun, Shield or Other');
  });

  it('POST with name too short (Mongoose ValidationError)', async () => {
    sinon.stub(MagicalGirl, 'findOne').resolves(undefined);
    const err = new mongoose.Error.ValidationError();
    err.addError('name', new mongoose.Error.ValidatorError({ message: 'Name must be at least 2 characters long' }));
    sinon.stub(MagicalGirl, 'create').rejects(err);

    const res = await request(app)
      .post('/magicalgirls')
      .send({
        name: 'A',
        soulGemColor: 'Red',
        weapon: 'Sword',
        powerLevel: 10
      });

    expect(res.status).to.equal(400);
    expect(res.text).to.include('Name must be at least 2 characters long');
  });

  it('POST with powerLevel out of range (Mongoose ValidationError)', async () => {
    sinon.stub(MagicalGirl, 'findOne').resolves(undefined);
    const err = new mongoose.Error.ValidationError();
    err.addError('powerLevel', new mongoose.Error.ValidatorError({ message: 'Maximum power level is 100' }));
    sinon.stub(MagicalGirl, 'create').rejects(err);

    const res = await request(app)
      .post('/magicalgirls')
      .send({
        name: 'Test',
        soulGemColor: 'Red',
        weapon: 'Sword',
        powerLevel: 150
      });

    expect(res.status).to.equal(400);
    expect(res.text).to.include('Maximum power level is 100');
  });

  it('POST with missing soulGemColor (Mongoose ValidationError)', async () => {
    sinon.stub(MagicalGirl, 'findOne').resolves(undefined);
    const err = new mongoose.Error.ValidationError();
    err.addError('soulGemColor', new mongoose.Error.ValidatorError({ message: 'Soul gem color is required' }));
    sinon.stub(MagicalGirl, 'create').rejects(err);

    const res = await request(app)
      .post('/magicalgirls')
      .send({
        name: 'Test',
        weapon: 'Sword',
        powerLevel: 10
      });

    expect(res.status).to.equal(400);
    expect(res.text).to.include('Soul gem color is required');
  });

});
