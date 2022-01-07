/**
 * 数据模型入口文件
 */

const User = require('./User');
const Blog = require('./Blog');

// 可以通过Blog表查到User信息
Blog.belongsTo(User, {
  foreignKey: 'userId',
});

module.exports = {
  User,
  Blog,
};
