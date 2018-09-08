const applicationModel = require('../models/application');
const companyModel = require('../models/company');

class ApplicationController {
  static async getApplications() {
    const result = await applicationModel
      .find()
      .populate('company');
    const applications = result.map(application => ({
      status: application.status,
      id: application.id,
      name: application.name,
      url: application.url,
      dateSent: application.dateSent,
      dateReplied: application.dateReplied,
      dateRejected: application.dateRejected,
      company: application.company,
      tags: application.tags,
    }));

    return { data: applications };
  }

  static async createApplication(body) {
    return applicationModel.create(body);
  }
}

module.exports = ApplicationController;
