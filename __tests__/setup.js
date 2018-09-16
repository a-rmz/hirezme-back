const mongoose = require('mongoose');
const ApplicationModel = require('../src/models/application');
const CompanyModel = require('../src/models/company');

require('dotenv').config();

process.env.MONGO_DBNAME = 'hirezme-test';
process.env.NODE_ENV = 'testing';

require('../src/db/connection');

beforeEach(async () => {
  await ApplicationModel.findByIdAndUpdate(
    'ed2ce7bf-bcb6-47be-84a4-9d8ec16ea363',
    {
      name: 'Intergalactic DevOps',
      url: 'https://thehub.fi/jobs/intergalactic-software-developer',
      owner: 'admin',
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
      name: 'Jr Site Reliability Engineer',
      url: 'https://www.shazam.com/careers?gh_jid=1282205',
      owner: 'admin',
      company: 'fe423080-b636-11e8-9d89-8f47832682f08',
      tags: ['devops', 'sre', 'linux'],
      status: 'IN_PROGRESS',
      dateSent: '1536427457645',
    },
    { upsert: true },
  );

  await CompanyModel.findByIdAndUpdate(
    '3eee1c16-caf9-4f8d-b2cf-be6b56837a38',
    {
      name: 'Montel Intergalactic',
      url: 'https://montel.fi',
      owner: 'admin',
      location: {
        address: 'Mikonkatu 17 A, 00100',
        city: 'Helsinki',
        country: 'Finland',
      },
    },
    { upsert: true },
  );

  await CompanyModel.findByIdAndUpdate(
    'fe423080-b636-11e8-9d89-8f47832682f08',
    {
      name: 'Shazam',
      url: 'http://shazam.com/',
      owner: 'admin',
      location: {
        address: '26-28 Hammersmith Grove',
        city: 'London',
        country: 'England',
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
