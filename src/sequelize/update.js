const { Blog } = require('./model')

!(async () => {
	// 修改
	const updateRes = await Blog.update({
		title: '修改标题'
	}, {
		where: {
			id: 1
		}
	})
	console.log(updateRes[0] > 0)
})()