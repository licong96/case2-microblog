/**
 * user view路由
 */
const router = require('koa-router')();
const { getLoginInfo } = require('../../controller/user');
const { loginRedirect } = require('../../middlewares/loginChecks');

router.get('/login', async (ctx, next) => {
  await ctx.render('login', getLoginInfo(ctx));
});

router.get('/register', async (ctx, next) => {
  await ctx.render('register', getLoginInfo(ctx));
});

router.get('/setting', loginRedirect, async (ctx, next) => {
  await ctx.render('setting', ctx.session.userInfo);
});

module.exports = router;
