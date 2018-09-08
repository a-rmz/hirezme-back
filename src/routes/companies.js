const Router = require('koa-router');

const router = new Router();

router.get('/', (ctx) => {
  ctx.status = 200;
});

router.post('/', (ctx) => {
  ctx.status = 200;
});

router.get('/:id', (ctx) => {
  ctx.status = 200;
});

router.put('/:id', (ctx) => {
  ctx.status = 200;
});

router.delete('/', (ctx) => {
  ctx.status = 200;
});

module.exports = router;
