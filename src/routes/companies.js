const Router = require('koa-router');
const CompanyController = require('../controllers/company');
const { isUUID } = require('../utils');
const { validateCompany } = require('../schemas');

const router = new Router();

const validateCompanyBody = (ctx, next) => {
  const result = validateCompany(ctx.request.body);
  if (result.valid) {
    return next();
  }
  return ctx.throw(400, JSON.stringify({ errors: result.errors }));
};


router.get('/', async (ctx) => {
  const userId = ctx.state.user.id;
  ctx.status = 200;
  ctx.body = await CompanyController.getCompanies(userId);
});

router.post('/', validateCompanyBody);
router.post('/', async (ctx) => {
  try {
    const Company = await CompanyController.createCompany(ctx.request.body);
    ctx.status = 201;
    ctx.body = Company;
  } catch (err) {
    if (err.name === 'ValidationError') {
      ctx.throw(400, JSON.stringify({ errors: Object.values(err.errors) }));
      return;
    }
    ctx.throw(500, err);
  }
});

router.all('/:id', async (ctx, next) => {
  const { id } = ctx.params;
  if (isUUID(id)) {
    return next();
  }
  return ctx.throw(400, 'The provided id is not a uuid-v1');
});

router.get('/:id', async (ctx) => {
  try {
    const userId = ctx.state.user.id;
    const { id } = ctx.params;

    const result = await CompanyController.getCompanyById(id, userId);

    if (Object.keys(result).length === 0) {
      throw new Error('Result not found');
    } else {
      ctx.status = 200;
      ctx.body = result;
    }
  } catch (err) {
    ctx.throw(404, 'The selected company does not exist');
  }
});

router.put('/:id', validateCompanyBody);
router.put('/:id', async (ctx) => {
  try {
    const { body } = ctx.request;
    const { id } = ctx.params;

    const result = await CompanyController.updateCompany(id, body);

    if (result) {
      ctx.status = 200;
      ctx.body = result;
    } else {
      throw new Error('Result not found');
    }
  } catch (err) {
    ctx.throw(404, 'The selected company does not exist');
  }
});

router.delete('/:id', async (ctx) => {
  try {
    const { id } = ctx.params;
    const result = await CompanyController.removeCompany(id);

    if (result) {
      ctx.status = 204;
    } else {
      throw new Error('Result not found');
    }
  } catch (err) {
    ctx.throw(404, 'The selected company does not exist');
  }
});

module.exports = router;
