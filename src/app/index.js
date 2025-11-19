const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const KoaStatic = require('koa-static');
const parameter = require('koa-parameter');
const errHandler = require('./errHandler');

const router = require('../router');

const app = new Koa();

app.use(
  koaBody({
    multipart: true,
    formidable: {
      // 在配置选项option里，不推荐适用相对路径
      //在options里设置上传文件的目录,不是相对的当前文件，相对process.cwd()
      uploadDir: path.join(__dirname, '../upload'),
      keepExtensions: true,
    },
  })
);
app.use(parameter(app));
app.use(router.routes()).use(router.allowedMethods());
app.use(KoaStatic(path.join(__dirname, '../upload')));
app.on('error', errHandler);

module.exports = app;
