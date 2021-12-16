const { Blog, User } = require('./model');

!(async () => {
  // 创建用户
  // const licong = await User.create({
  // 	userName: 'licong',
  // 	password: '123456',
  // 	nickName: '阿聪'
  // })
  // console.log(licong.dataValues)

  // 创建博客
  const blosInfo = await Blog.create({
    title: '标题3',
    content: '内容3',
    userId: 1,
  });
  console.log(blosInfo.dataValues);
})();
