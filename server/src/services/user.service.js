const { User } = require('../../db/models');

class UserService {
  // * получение всех пользователей
  static async getAllUsers() {
    const users = await User.findAll();
    const result = users.map((el) => el.get({ plain: true }));
    return result;
  }

  // * Получение одного пользователя
  static async getOneUser(id) {
    const user = await User.findByPk(id);
    const result = user.get({ plain: true });
    return result;
  }

  // * обновление данных пользователя

  static async updateUser(id, { name }) {
    await User.update({ name }, { where: { id } });

    return User.findByPk(id);
  }

  // * удаление
  static async deleteUser(id) {
    const user = await User.findByPk(id);
    user.destroy();
    return id;
  }

  // * Получение юзера по почте
  static async getByEmail(email) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    const result = user.get({ plain: true });
    return result;
  }
}

module.exports = UserService;
