const { Skelet } = require('../../db/models');

class SkeletService {
  static async getSkelets(userId) {
    return Skelet.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });
  }

  static async getSkeletById(id, userId) {
    return Skelet.findOne({ where: { id, userId } });
  }

  static async createSkelet({ name, description, status, userId }) {
    return Skelet.create({ name, description, status, userId });
  }

  static async updateSkelet(id, userId, { name, description, status }) {
    await Skelet.update(
      { name, description, status },
      { where: { id, userId } }
    );

    return Skelet.findOne({ where: { id, userId } });
  }

  static async deleteSkelet(id, userId) {
    await Skelet.destroy({ where: { id, userId } });
    return true;
  }
}

module.exports = SkeletService;
