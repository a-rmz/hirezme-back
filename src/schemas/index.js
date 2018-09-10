const { Validator } = require('jsonschema');

const applicationSchema = require('./application');
const companySchema = require('./company');

Validator.prototype.customFormats.customDate = input => !Number.isNaN(Date.parse(input));

const validator = new Validator();

validator.addSchema(applicationSchema, '/Application');
validator.addSchema(companySchema, '/Company');

const validateApplication = instance => validator.validate(instance, applicationSchema);
const validateCompany = instance => validator.validate(instance, companySchema);

module.exports = {
  validateApplication,
  validateCompany,
};
