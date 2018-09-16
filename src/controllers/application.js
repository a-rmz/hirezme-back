const applicationModel = require('../models/application');

class ApplicationController {
  static async getApplications(userId) {
    const applications = await ApplicationModel
      .find({ owner: userId })
      .populate('company');

    return { data: applications };
  }

  static async getApplicationById(id) {
    return applicationModel.findById(id);
  }

  static async createApplication(body) {
    try {
      const application = await ApplicationModel.create(body);
      return await ApplicationModel
        .findById(application.id)
        .populate('company');
    } catch (err) {
      throw err;
    }
  }

  static async updateApplication(id, body) {
    const options = {
      // new: bool - true to return the modified document rather than the original.
      new: true,
    };
    return applicationModel.findByIdAndUpdate(id, body, options);
  }

  static async removeApplication(id) {
    return applicationModel.findByIdAndRemove(id);
  }
}

module.exports = ApplicationController;
