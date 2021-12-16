// sequelize演示
const Sequelize = require('sequelize')

const seq = new Sequelize('case2-microblog', 'root', '123456', {
	host: 'localhost',
	dialect: 'mysql'
})

// 测试连接
// seq.authenticate()
// 	.then(() => {
// 		console.log('Connection has been established successfully.');
// 	})
// 	.catch((error) => {
// 		console.error('Unable to connect to the database:', error);
// 	})

module.exports = seq
