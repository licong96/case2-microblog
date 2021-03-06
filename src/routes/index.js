const router = require('koa-router')();
const { loginRedirect } = require('../middlewares/loginChecks');

router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
  });
});

router.get('/string', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 string',
  };
});

router.get('/json', async (ctx, next) => {
  const session = ctx.session;
  console.log('session', session);
  if (session.viewNum === null) {
    session.viewNum = 0;
  }
  session.viewNum++;
  ctx.body = {
    title: 'koa2 json',
    viewNum: session.viewNum,
  };
});

router.get('/profile/:userName/:pageIndex', async (ctx, next) => {
  const { userName, pageIndex } = ctx.params;
  ctx.body = {
    userName,
    pageIndex,
  };
});

module.exports = router;
