const jwt = require('jsonwebtoken');
const { createUser, getUserInfo, updateById } = require('../service/user.service');
const { userRegisterError } = require('../constant/err.type');
const { JWT_SECRET } = require('../config/config.default');

class UserController {
  async register(ctx, next) {
    console.log(ctx.request.body);
    const { user_name, password } = ctx.request.body;
    try {
      //操作数据库
      const res = await createUser(user_name, password);
      //返回数据
      ctx.body = {
        code: 0,
        message: '用户注册成功',
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      };
    } catch (err) {
      console.log('用户注册失败', err);
      ctx.app.emit('error', userRegisterError, ctx);
      return;
    }
  }
  async login(ctx, next) {
    const { user_name } = ctx.request.body;
    ctx.body = `欢迎回来，${user_name} !`;
    //1.获取用户信息（在token的playload中，记录id,user_name,is_admin）
    try {
      // 从返回结果中剔除密码字段，将其他字段放入res对象中
      const { password, ...res } = await getUserInfo({ user_name });
      //2.生成token
      const token = jwt.sign({ ...res }, JWT_SECRET, { expiresIn: '1d' });
      //3.返回token
      ctx.body = {
        code: 0,
        message: '用户登录成功',
        result: {
          token,
        },
      };
    } catch (err) {
      console.error('用户登录失败', err);
    }
    await next();
  }

  async changePassword(ctx, next) {
    const id = ctx.state.user.id;
    const { password } = ctx.request.body;
    if (await updateById({ id, password })) {
      ctx.body = {
        code: 0,
        message: '修改密码成功',
        result: '',
      };
    } else {
      ctx.body = {
        code: '10007',
        message: '修改密码失败',
        result: '',
      };
    }
  }
}

module.exports = new UserController();
