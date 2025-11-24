// 导入koa-router
const Router = require('koa-router');
// 中间件
const { auth } = require('../middleware/auth.middleware');
const { validator } = require('../middleware/cart.middleware');

const { add, findAll, update, remove, selectedAll, unselectedAll } = require('../controller/cart.controller');

// 实例化router对象
const router = new Router({ prefix: '/carts' });
//添加到购物车
router.post('/', auth, validator({ goods_id: 'number' }), add);

// 获取购物车
router.get('/', auth, findAll);

router.patch('/:id', auth, validator({ number: { type: 'number', required: false }, selected: { type: 'bool', required: false } }), update);

router.delete('/', auth, validator({ ids: 'array' }), remove);

router.post('/selectAll', auth, selectedAll);

router.post('/unselectAll', auth, unselectedAll);

//导出router对象
module.exports = router;
