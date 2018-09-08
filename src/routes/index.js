const Router = require('koa-router');

const router = new Router();
const applicationsRouter = require('./applications');

router.use('/applications',
  applicationsRouter.routes(),
  applicationsRouter.allowedMethods());

module.exports = router;
