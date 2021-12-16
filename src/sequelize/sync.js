const seq = require('./seq')

require('./model')

// 执行同步
seq.sync({ force: true })
	.then(() => {
		console.log('sync ok')
		process.exit()
	})
	.catch((error) => {
		console.log('sync', error)
	})