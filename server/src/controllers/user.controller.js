const cookieConfig = require('../configs/cookie.config');
const UserService = require('../services/user.service');
const { formatResponse } = require('../utils/formatResponse');
const generateTokens = require('../utils/generateTokens');

class UserController {
    // * контроллер на получение всех пользователей
  static async getAll(req, res) {
    try {
      const result = await UserService.getAllUsers();
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: 'Все пользователи',
          data: result,
        }),
      );
    } catch (error) {
      console.log(error);
      res.status(401).json(
        formatResponse({
          statusCode: 401,
          message: 'У тебя нет прав',
          error: error.message,
        }),
      );
    }
  }

    // * контроллер на получение одного
  static async getOne(req, res) {
    try {
      const { id } = req.params;
      const user = await UserService.getOneUser(id);
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: 'Один пользователь',
          data: user,
        }),
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: 'Не удалось получить пользователя',
          error: error.message,
        }),
      );
    }
  }

    // * контроллер на обновление данных пользователя
  static async updateUserInfo(req, res) {
    try {
      const { user } = res.locals;
      const { name } = req.body;

      if (!req.body) return res.status(400).send('Заполни данные');
      const updateUser = await UserService.updateUser(user.id, { name });
      const { accessToken, refreshToken } = generateTokens({ user: updateUser });

      return res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .status(200)
        .json({
          message: 'Успешнo/Success',
          user: updateUser,
          accessToken,
        });
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

// *  контроллер на удаление
  static async delete(req, res) {
    try {
      const { id } = req.params;
      console.log(' id:', id);
      const result = await UserService.deleteUser(id);
      console.log(' result:', result);
      res.status(200).clearCookie('refreshToken').json( 
        formatResponse({
          statusCode: 200,
          message: 'Пользователь успешно удалён',
          data: result,
        }),
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: 'Не удалось удалить пользователя',
          error: error.message,
        }),
      );
    }
  }

}

module.exports = UserController;
