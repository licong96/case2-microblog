const Sequelize = require('sequelize')
const seq = require('./seq')

// 创建 User 模型，创建后的表名是users
const User = seq.define('user', {
	// id 会自动创建，并设为主键、自增
	userName: {
		type: Sequelize.STRING,	// varchar(255)
		allowNull: false,	// 不为空
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	nickName: {
		type: Sequelize.STRING,
		comment: '昵称',	// 注释
	}
	// 会自动创建`createdAt`和`updatedAt`
})

// 创建 Blog 模型，创建后的表名是blogs
const Blog = seq.define('blog', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	content: {
		type: Sequelize.STRING,
		allowNull: false
	},
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
})

// 外键关联
Blog.belongsTo(User, {
	// 创建外键 Blog.userId -> User.id
	foreignKey: 'userId'
})
// 另一种
User.hasMany(Blog, {
	// 创建外键 Blog.userId -> User.id
	foreignKey: 'userId'
})

module.exports = {
	User,
	Blog,
}