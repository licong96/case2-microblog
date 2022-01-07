/**
 * @description 微博数据模型
 * @author licong
 */

const seq = require('../seq');
const { INTEGER, STRING, TEXT } = require('../types');

const Blog = seq.define('blog', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户ID',
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: '博客内容',
  },
  image: {
    type: STRING,
    comment: '博客封面图片地址',
  },
});

module.exports = Blog;
