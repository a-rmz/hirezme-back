const companySchema = {
  id: '/Company',
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    url: { type: 'string' },
    tags: {
      type: 'array',
      items: { type: 'string' },
    },
    location: {
      address: { type: 'string' },
      city: { type: 'string' },
      country: { type: 'string' },
    },
  },
  additionalProperties: false,
};

module.exports = companySchema;
