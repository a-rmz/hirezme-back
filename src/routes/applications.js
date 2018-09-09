const Router = require('koa-router');
const ApplicationController = require('../controllers/application');
const { isUUID } = require('../utils');
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

router.get('/:id', async (ctx, next) => {
  const { id } = ctx.params;
  if (isUUID(id)) {
    return next();
  }
  ctx.throw(400, 'The provided id is not a uuid-v1');
});
router.get('/:id', async (ctx) => {
  try {
    ctx.status = 200;
    const result = await ApplicationController.getApplicationById(ctx.params.id);
    if (Object.keys(result).length === 0) {
      throw new Error('Result not found');
    } else {
      ctx.body = result;
    }
  } catch (err) {
    ctx.throw(404, 'The selected application does not exist');
  }
});

router.put('/:id', (ctx) => {
  ctx.status = 200;
});

router.delete('/', (ctx) => {
  ctx.status = 200;
});

module.exports = router;
