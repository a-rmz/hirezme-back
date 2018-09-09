const Router = require('koa-router');
const ApplicationController = require('../controllers/application');
const { isUUID } = require('../utils');
const { validateApplication } = require('../schemas');

const router = new Router();

const validateApplicationBody = (ctx, next) => {
  const result = validateApplication(ctx.request.body);
  if (result.valid) {
    return next();
  }
  ctx.throw(400, JSON.stringify({ errors: result.errors }));
};


router.get('/', async (ctx) => {
  ctx.status = 200;
  ctx.body = await ApplicationController.getApplications();
});

router.post('/', validateApplicationBody);
router.post('/', async (ctx) => {
  try {
    const application = await ApplicationController.createApplication(ctx.request.body);
    ctx.status = 201;
    ctx.body = application;
  } catch (err) {
    if (err.name === 'ValidationError') {
      return ctx.throw(400, JSON.stringify({ errors: Object.values(err.errors) }));
    }
    ctx.throw(500, err);
  }
});

router.all('/:id', async (ctx, next) => {
  const { id } = ctx.params;
  if (isUUID(id)) {
    return next();
  }
  ctx.throw(400, 'The provided id is not a uuid-v1');
});

router.get('/:id', async (ctx) => {
  try {
    const { id } = ctx.params;
    const result = await ApplicationController.getApplicationById(id);
    if (Object.keys(result).length === 0) {
      throw new Error('Result not found');
    } else {
      ctx.status = 200;
      ctx.body = result;
    }
  } catch (err) {
    ctx.throw(404, 'The selected application does not exist');
  }
});

router.put('/:id', validateApplicationBody);
router.put('/:id', async (ctx) => {
  try {
    const { body } = ctx.request;
    const { id } = ctx.params;

    const result = await ApplicationController.updateApplication(id, body);

    if (result) {
      ctx.status = 200;
      ctx.body = result;
    } else {
      throw new Error('Result not found');
    }
  } catch (err) {
    ctx.throw(404, 'The selected application does not exist');
  }
});

router.delete('/', (ctx) => {
  ctx.status = 200;
});

module.exports = router;
