/**
 * user controller
 */
const {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser,
} = require('../services/user');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo,
  changeInfoFailInfo,
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

/**
 * 登录
 * @param {*} ctx
 * @param {*} userName
 * @param {*} password
 */
async function login(ctx, userName, password) {
  const userInfo = await getUserInfo(userName, doCrypto(password));
  if (!userInfo) {
    // 登录失败
    return new ErrorModel(loginFailInfo);
  }

  // 登录成功，写入session
  ctx.session.userInfo = userInfo;
  return new SuccessModel();
}

/**
 * 获取用户已登录的信息
 * @param {Object} ctx
 * @returns {Object} data
 */
function getLoginInfo(ctx) {
  let data = {
    isLogin: false,
  };
  const userInfo = ctx.session.userInfo;
  if (userInfo) {
    data = {
      isLogin: true,
      userName: userInfo.userName,
    };
  }
  return data;
}

/**
 * 删除当前用户
 * @param {string} userName 用户名
 */
async function deleteCurUser(userName) {
  const result = await deleteUser(userName);
  if (result) {
    // 成功
    return new SuccessModel();
  }
  // 失败
  return new ErrorModel(deleteUserFailInfo);
}

/**
 * 修改个人信息
 * @param {Object} ctx ctx
 * @param {string} nickName 昵称
 * @param {string} city 城市
 * @param {string} picture 头像
 */
async function changeInfo(ctx, { nickName, city, picture }) {
  const { userName } = ctx.session.userInfo;
  if (!nickName) {
    nickName = userName;
  }

  const result = await updateUser(
    {
      newNickName: nickName,
      newCity: city,
      newPicture: picture,
    },
    { userName }
  );
  if (result) {
    // 执行成功
    Object.assign(ctx.session.userInfo, {
      nickName,
      city,
      picture,
    });
    // 返回
    return new SuccessModel();
  }
  // 失败
  return new ErrorModel(changeInfoFailInfo);
}

/**
 * 修改密码
 * @param {string} userName 用户名
 * @param {string} password 当前密码
 * @param {string} newPassword 新密码
 */
async function changePassword(userName, password, newPassword) {
  const result = await updateUser(
    {
      newPassword: doCrypto(newPassword),
    },
    {
      userName,
      password: doCrypto(password),
    }
  );
  if (result) {
    // 成功
    return new SuccessModel();
  }
  // 失败
  return new ErrorModel(changePasswordFailInfo);
}

/**
 * 退出登录
 * @param {Object} ctx ctx
 */
async function logout(ctx) {
  delete ctx.session.userInfo;
  return new SuccessModel();
}

module.exports = {
  isExist,
  register,
  login,
  getLoginInfo,
  deleteCurUser,
  changeInfo,
  changePassword,
  logout,
};
