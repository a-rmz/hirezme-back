
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const jwt = require('koa-jwt');
const { koaJwtSecret } = require('jwks-rsa');

const app = new Koa();
const Router = require('koa-router');

const routes = require('./routes');
const db = require('./db/connection');

const v1Router = new Router();
app.use(cors());
app.use(bodyParser());
app.context.db = db;

v1Router.use('/api/v1', routes.routes(), v1Router.allowedMethods());

app.use(jwt({
  secret: koaJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.AUTH0_JWKS_URI,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER,
  algorithms: ['RS256'],
}));

app.use((ctx, next) => {
  const id = ctx.state.user.sub.split('|').slice(-1).join('');
  ctx.state.user.id = id;
  return next();
});

app.use(v1Router.routes());

module.exports = app;
