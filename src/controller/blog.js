/**
 * @description blog controller
 */
const { getUserInfo } = require('../services/user');
const { create } = require('../services/blog');
const { SuccessModel, ErrorModel } = require('../model/ResModel');

async function createBlog({ userName, content, image }) {

  // 获取userId
  const { id } = await getUserInfo(userName);

  // servers
  const data = await create({ userId: id, content, image });

  if (data) {
    return new SuccessModel({
      id: data.id,
    });
  }
  return new ErrorModel('创建失败');
}

module.exports = {
  createBlog,
};
