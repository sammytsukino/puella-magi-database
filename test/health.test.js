const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

const app = require('../app');
const MagicalGirl = require('../models/MagicalGirl');

describe('Health check', () => {

  afterEach(() => {
    sinon.restore();
  });

  it('GET /health returns 200 when DB responds', async () => {
    sinon.stub(MagicalGirl, 'find').returns({
      limit: sinon.stub().resolves([])
    });

    const res = await request(app).get('/health');

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal('ok');
    expect(res.body).to.have.property('uptime');
    expect(res.body).to.have.property('timestamp');
  });

  it('GET /health returns 503 when DB query fails', async () => {
    sinon.stub(MagicalGirl, 'find').returns({
      limit: sinon.stub().rejects(new Error('DB error'))
    });

    const res = await request(app).get('/health');

    expect(res.status).to.equal(503);
  });
});
