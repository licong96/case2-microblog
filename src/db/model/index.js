/**
 * 数据模型入口文件
 */

const User = require('./User');
const Blog = require('./Blog');
const UserRelation = require('./UserRelation');

// 可以通过Blog表查到User信息
Blog.belongsTo(User, {
  foreignKey: 'userId',
});

UserRelation.belongsTo(User, {
  foreignKey: 'followerId',
});
User.hasMany(UserRelation, {
  foreignKey: 'userId',
});

Blog.belongsTo(UserRelation, {
  foreignKey: 'userId',
  targetKey: 'followerId',
});

module.exports = {
  User,
  Blog,
  UserRelation,
};
