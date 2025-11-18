const Router = require('koa-router');

const { userVailidator, verifyUser, cryptPassword, verifyLogin } = require('../middleware/user.middleware');
const { auth } = require('../middleware/auth.middleware');
const { register, login, changePassword } = require('../controller/user.controller');

const router = new Router({ prefix: '/users' });

// 注册接口
router.post('/register', userVailidator, verifyUser, cryptPassword, register);

// 登录接口
router.post('/login', userVailidator, verifyLogin, login);

// 修改密码接口
router.patch('/changePassword', auth, cryptPassword, changePassword);
module.exports = router;
