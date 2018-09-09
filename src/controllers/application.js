const applicationModel = require('../models/application');
const companyModel = require('../models/company');

class ApplicationController {
  static async getApplications() {
    const applications = await applicationModel
      .find()
      .populate('company');

    return { data: applications };
  }

  static async getApplicationById(id) {
    return applicationModel.findById(id);
  }

  static async createApplication(body) {
    return applicationModel.create(body);
  }

  static async updateApplication(id, body) {
    const options = {
      // new: bool - true to return the modified document rather than the original.
      new: true,
    };
    return applicationModel.findByIdAndUpdate(id, body, options);
  }
}

module.exports = ApplicationController;
