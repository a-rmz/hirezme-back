
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const Router = require('koa-router');

const routes = require('./routes');
const db = require('./db/connection');

const v1Router = new Router();
app.use(bodyParser());
app.context.db = db;

v1Router.use('/api/v1', routes.routes(), v1Router.allowedMethods());
app.use(v1Router.routes());

module.exports = app;
