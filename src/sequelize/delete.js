const { Blog } = require('./model');

!(async () => {
  // 删除
  const destroyRes = await Blog.destroy({
    where: {
      id: 1,
    },
  });
  console.log(destroyRes > 0);
})();
