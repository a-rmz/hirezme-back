const CompanyModel = require('../models/company');

class CompanyController {
  static async getCompanies(userId) {
    const companies = await CompanyModel
      .find({ owner: userId });
    return { data: companies };
  }

  static async getCompanyById(id, userId) {
    return CompanyModel.findOne({ _id: id, owner: userId });
  }

  static async createCompany(body) {
    return CompanyModel.create(body);
  }

  static async updateCompany(id, body) {
    const options = {
      // new: bool - true to return the modified document rather than the original.
      new: true,
    };
    return CompanyModel.findByIdAndUpdate(id, body, options);
  }

  static async removeCompany(id) {
    return CompanyModel.findByIdAndRemove(id);
  }
}

module.exports = CompanyController;
