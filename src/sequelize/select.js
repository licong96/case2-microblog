const { Blog, User } = require('./model');

!(async () => {
  // 查询一条
  // const licong = await User.findOne({
  // 	where: {
  // 		userName: 'licong'
  // 	}
  // })
  // console.log(licong.dataValues)

  // 查询特定的列
  // const licong = await User.findOne({
  // 	attributes: ['userName', 'nickName'],
  // 	where: {
  // 		userName: 'licong'
  // 	}
  // })
  // console.log(licong.dataValues)

  // 查询多条记录使用
  // const blogs = await Blog.findAll({
  // 	where: {
  // 		userId: 1
  // 	},
  // 	limit: 2,
  // 	offset: 1,
  // 	order: [
  // 		['id', 'desc']	// 排序
  // 	]
  // })
  // console.log(blogs.map(blog => blog.dataValues))

  // 查询总数
  // const blogListAndCount = await Blog.findAndCountAll({
  // 	where: {
  // 		userId: 1
  // 	},
  // 	limit: 2,
  // 	offset: 2,
  // 	order: [
  // 		['id', 'desc']	// 排序
  // 	]
  // })
  // console.log(blogListAndCount, blogListAndCount.count, blogListAndCount.rows.map(blog => blog.dataValues))

  // 查Blog表包含上User表
  // const blogListWithUser = await Blog.findAndCountAll({
  // 	order: [
  // 		['id', 'desc']
  // 	],
  // 	include: [
  // 		{
  // 			model: User,
  // 			attributes: ['userName'],
  // 			where: {
  // 				userName: 'licong'
  // 			}
  // 		}
  // 	]
  // })
  // console.log(blogListWithUser)
  // console.log(blogListWithUser.count)
  // console.log(blogListWithUser.rows.map(blog => {
  // 	const blogVal = blog.dataValues
  // 	blogVal.user = blogVal.user.dataValues
  // 	return blogVal
  // }))

  // 查User表包含上Blog表
  const userListWithBlog = await User.findAndCountAll({
    attributes: ['userName', 'nickName'],
    include: [
      {
        model: Blog,
      },
    ],
  });
  console.log(
    userListWithBlog.rows.map((user) => {
      const userVal = user.dataValues;
      userVal.blogs = JSON.stringify(
        userVal.blogs.map((blog) => blog.dataValues)
      );
      return userVal;
    })
  );
})();
