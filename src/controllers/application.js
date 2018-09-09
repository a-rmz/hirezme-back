const applicationModel = require('../models/application');
const companyModel = require('../models/company');

class ApplicationController {
  static async getApplications() {
    const applications = await applicationModel
      .find({}, { __v: 0 })
      .populate('company');

    return { data: applications };
  }

  static async createApplication(body) {
    return applicationModel.create(body);
  }
}

module.exports = ApplicationController;
