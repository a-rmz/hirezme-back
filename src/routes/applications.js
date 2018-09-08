const Router = require('koa-router');
const ApplicationController = require('../controllers/application');
const { validateApplication } = require('../schemas');

const router = new Router();

router.get('/', async (ctx) => {
  ctx.status = 200;
  ctx.body = await ApplicationController.getApplications();
});

router.post('/', (ctx, next) => {
  const result = validateApplication(ctx.request.body);
  if (result.valid) {
    return next();
  }
  ctx.throw(400, JSON.stringify({ errors: result.errors }));
});
router.post('/', async (ctx) => {
  ctx.status = 201;
  try {
    const application = await ApplicationController.createApplication(ctx.request.body);
    ctx.status = 201;
    return ctx.body = application;
  } catch (err) {
    ctx.throw(500, err);
  }
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
