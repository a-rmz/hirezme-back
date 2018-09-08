const applicationSchema = {
  id: '/Application',
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    url: { type: 'string' },
    company: { type: 'string' },
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
  required: ['name', 'url', 'status', 'dateSent'],
};

module.exports = applicationSchema;
