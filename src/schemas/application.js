const applicationSchema = {
  id: '/Application',
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    url: { type: 'string' },
    company: {
      anyOf: [
        { type: 'string' },
        { $ref: '/Company' },
      ],
    },
    tags: {
      type: 'array',
      items: { type: 'string' },
    },
    status: { type: 'string' },
    dateSent: {
      type: 'string',
      format: 'customDate',
    },
    dateReplied: {
      type: 'string',
      format: 'customDate',
    },
    dateRejected: {
      type: 'string',
      format: 'customDate',
    },
  },
  additionalProperties: false,
};

module.exports = applicationSchema;
