// sequelize演示
const Sequelize = require('sequelize')

const conf = {
	host: 'localhost',
	dialect: 'mysql'
}

// 线上环境使用连接池
// conf.pool = {
// 	max: 5,	// 连接池中最大的连接数量
// 	min: 0,	// 最小数量
// 	idle: 10000, // 如果一个连接池 10s 之内没有被使用，则释放
// }

const seq = new Sequelize('case2-microblog', 'root', '123456', conf)

// 测试连接
// seq.authenticate()
// 	.then(() => {
// 		console.log('Connection has been established successfully.');
// 	})
// 	.catch((error) => {
// 		console.error('Unable to connect to the database:', error);
// 	})

module.exports = seq
