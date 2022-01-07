/**
 * @description 首页 controller
 */

const xss = require('xss');
const { createBlog } = require('../services/blog');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { createBlogFailInfo } = require('../model/ErrorInfo');
// const { PAGE_SIZE, REG_FOR_AT_WHO } = require('../conf/constant');
// const { getUserInfo } = require('../services/user');
// const { createAtRelation } = require('../services/at-relation');

/**
 * 创建微博
 * @param {Object} param0 创建微博所需的数据 { userId, content, image }
 */
async function create({ userId, content, image }) {
  try {
    // 创建微博
    const blog = await createBlog({
      userId,
      content: xss(content),
      image,
    });
    // 返回
    return new SuccessModel({
      id: blog.id
    });
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(createBlogFailInfo);
  }
}

module.exports = {
  create,
};