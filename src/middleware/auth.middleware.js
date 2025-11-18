const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config.default');
const { tokenExpiredError, invalidTokenError, hasNotAdminPermission } = require('../constant/err.type');

const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header;
  const token = authorization.replace('Bearer ', '');
  console.log('token', token);
  try {
    // user 保存解密后的用户信息
    const user = jwt.verify(token, JWT_SECRET);
    ctx.state.user = user;
  } catch (err) {
    switch (err.name) {
      case 'TokenExpiredError':
        console.error('token已过期', err);
        return ctx.app.emit('error', tokenExpiredError, ctx);
      case 'JsonWebTokenError':
        // ctx.throw(401, '无效的token', { code: 40103 });
        console.error('无效的token');
        return ctx.app.emit('error', invalidTokenError, ctx);
    }
  }
  await next();
};

const hadAdminPermission = async (ctx, next) => {
  const { is_admin } = ctx.state.user;
  if (!is_admin) {
    console.log('该用户没有管理员权限', ctx.state.user);
    return ctx.app.emit('error', hasNotAdminPermission, ctx);
  }
  await next();
};
module.exports = {
  auth,
  hadAdminPermission,
};
