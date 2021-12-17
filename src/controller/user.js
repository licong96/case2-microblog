/**
 * user controller
 */
const { getUserInfo, createUser } = require('../services/user');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
} = require('../model/ErrorInfo');
const doCrypto = require('../utils/cryp');

/**
 * 判断用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    return new SuccessModel(userInfo);
  } else {
    return new ErrorModel(registerUserNameNotExistInfo);
  }
}

/**
 * 注册
 * @param {string} userName
 * @param {string} password
 * @param {number} gender 性别
 */
async function register({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    return new ErrorModel(registerUserNameExistInfo);
  }

  try {
    const result = await createUser({
      userName,
      password: doCrypto(password),
      gender,
    });
    return new SuccessModel({
      id: result.id,
    });
  } catch (error) {
    console.error(error.message, error.stack);
    return new ErrorModel(registerFailInfo);
  }
}

module.exports = {
  isExist,
  register,
};
