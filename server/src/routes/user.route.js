const express = require('express');
const UserController = require('../controllers/user.controller');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

const UserRouter = require("express").Router();

UserRouter.patch('/', verifyAccessToken, UserController.updateUserInfo)
  .get('/', verifyAccessToken, UserController.getAll)
  .get('/:id', verifyAccessToken, UserController.getOne);

UserRouter.delete('/:id', verifyAccessToken, UserController.delete);

module.exports = UserRouter;
