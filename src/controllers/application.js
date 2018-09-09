const applicationModel = require('../models/application');
const companyModel = require('../models/company');

class ApplicationController {
  static async getApplications() {
    const applications = await applicationModel
      .find({}, { __v: 0 })
      .populate('company');

    return { data: applications };
  }

  static async getApplicationById(id) {
    return applicationModel.findById(id, { __v: 0 });
  }

  static async createApplication(body) {
    return applicationModel.create(body);
  }
}

module.exports = ApplicationController;
