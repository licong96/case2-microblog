/**
 * user view路由
 */
const router = require('koa-router')();
const { getLoginInfo } = require('../../controller/user');

router.get('/login', async (ctx, next) => {
  await ctx.render('login', getLoginInfo(ctx));
});

router.get('/register', async (ctx, next) => {
  await ctx.render('register', getLoginInfo(ctx));
});

module.exports = router;
