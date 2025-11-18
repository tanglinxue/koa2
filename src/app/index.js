const Koa = require('koa');
const koaBody = require('koa-body');
const errHandler = require('./errHandler');

const router = require('../router');

const app = new Koa();

app.use(koaBody());
app.use(router.routes()).use(router.allowedMethods());

app.on('error', errHandler);

module.exports = app;
