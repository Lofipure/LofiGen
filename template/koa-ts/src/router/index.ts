import Router from 'koa-router';

const router: Router = new Router();

router.get('/get', async (ctx) => {
  ctx.body = 'Koa Router Init';
});

export default router;
