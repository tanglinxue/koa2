const bcrypt = require('bcryptjs');
const { getUserInfo } = require('../service/user.service');
const { userFormateError, userAlreadyExited, userRegisterError, userDoesNotExist, userLoginError, invalidePassword } = require('../constant/err.type');
const userVailidator = async (ctx, next) => {
  //获取数据
  const { user_name, password } = ctx.request.body;
  //合法性
  if (!user_name || !password) {
    console.error('用户名或密码为空', ctx.request.body);
    ctx.app.emit('error', userFormateError, ctx);
    return;
  }
  await next();
};

const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  // hash保存的是密文
  const hash = bcrypt.hashSync(password, salt);
  ctx.request.body.password = hash;
  await next();
};

const verifyUser = async (ctx, next) => {
  //获取数据
  const { user_name } = ctx.request.body;
  //合理性
  try {
    const res = await getUserInfo({ user_name });
    if (res) {
      console.error('用户名已存在', ctx.request.body);
      ctx.app.emit('error', userAlreadyExited, ctx);
      return;
    }
  } catch (err) {
    console.error('获取用户信息错误', err);
    ctx.app.emit('error', userRegisterError, ctx);
    return;
  }
  await next();
};

const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  try {
    const res = await getUserInfo({ user_name });
    if (!res) {
      console.error('用户名不存在', ctx.request.body);
      ctx.app.emit('error', userDoesNotExist, ctx);
      return;
    }
    const isPasswordValid = bcrypt.compareSync(password, res.password);
    if (!isPasswordValid) {
      console.error('密码错误', ctx.request.body);
      ctx.app.emit('error', invalidePassword, ctx);
      return;
    }
  } catch (err) {
    console.error('获取用户信息错误', err);
    ctx.app.emit('error', userLoginError, ctx);
    return;
  }

  await next();
};

module.exports = {
  userVailidator,
  verifyUser,
  cryptPassword,
  verifyLogin,
};
