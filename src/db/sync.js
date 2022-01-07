/**
 * sequelize 同步数据库
 * 用node手动执行快速创建数据表，且会清空表里所有数据
 */

const seq = require('./seq');

require('./model/index');

// 测试连接
seq
  .authenticate()
  .then(() => {
    console.log('auth ok');
  })
  .catch(() => {
    console.log('auth err');
  });

// 执行同步
seq.sync({ force: true }).then(() => {
  console.log('sync ok');
  process.exit();
});
