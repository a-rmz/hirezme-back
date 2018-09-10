const mongoose = require('mongoose');
const ApplicationModel = require('../src/models/application');
const CompanyModel = require('../src/models/company');

require('dotenv').config();

process.env.MONGO_DBNAME = 'hirezme-test';

beforeEach(async () => {
  await ApplicationModel.findByIdAndUpdate(
    'ed2ce7bf-bcb6-47be-84a4-9d8ec16ea363',
    {
      name: 'Intergalactic DevOps',
      url: 'https://thehub.fi/jobs/intergalactic-software-developer',
      company: '3eee1c16-caf9-4f8d-b2cf-be6b56837a38',
      tags: ['devops', 'backend'],
      status: 'IN_PROGRESS',
      dateSent: '1536427457615',
      dateReplied: '1536427457615',
    },
    { upsert: true },
  );
  await ApplicationModel.findByIdAndUpdate(
    '448e9c60-b3a6-11e8-825e-f1f43d9e926e',
    {
      name: 'Intergalactic DevOps',
      url: 'https://thehub.fi/jobs/intergalactic-software-developer',
      company: '3eee1c16-caf9-4f8d-b2cf-be6b56837a38',
      tags: ['devops', 'backend'],
      status: 'IN_PROGRESS',
      dateSent: '1536427457615',
      dateReplied: '1536427457615',
    },
    { upsert: true },
  );

  await CompanyModel.findByIdAndUpdate(
    '3eee1c16-caf9-4f8d-b2cf-be6b56837a38',
    {
      name: 'Montel Intergalactic',
      url: 'https://montel.fi',
      location: {
        address: 'Mikonkatu 17 A, 00100',
        city: 'Helsinki',
        country: 'Finland',
      },
    },
    { upsert: true },
  );
});

afterEach(async () => {
  await ApplicationModel.deleteMany({});
  await CompanyModel.deleteMany({});
});

afterAll(async (done) => {
  try {
    await mongoose.connection.close();
    await mongoose.connection.collections.applications.drop();
    await mongoose.connection.collections.companies.drop();
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  } finally {
    done();
  }
});
