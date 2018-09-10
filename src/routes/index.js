const Router = require('koa-router');

const router = new Router();
const applicationsRouter = require('./applications');
const companiesRouter = require('./companies');

router.use('/applications',
  applicationsRouter.routes(),
  applicationsRouter.allowedMethods());

router.use('/companies',
  companiesRouter.routes(),
  companiesRouter.allowedMethods());

module.exports = router;
