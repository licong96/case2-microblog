/**
 * @description 博客 api 路由
 */

const router = require('koa-router')();
const { loginCheck } = require('../../middlewares/loginChecks');
const { createBlog } = require('../../controller/blog');

router.prefix('/api/blog');

router.post('/create', loginCheck, async (ctx, next) => {
  const { content, image } = ctx.request.body;
  const { userName } = ctx.session.userInfo;
  // controller

  ctx.body = await createBlog({ userName, content, image });
});

module.exports = router;
