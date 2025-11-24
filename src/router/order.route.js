// 导入koa-router
const Router = require('koa-router');
// 中间件
const { auth } = require('../middleware/auth.middleware');
const router = new Router({ prefix: '/orders' })
const { validator } = require('../middleware/order.middleware')
const { create, findAll, update } = require('../controller/order.controller')

router.post('/', auth, validator(
  {
    address_id: 'int',
    goods_info: 'string',
    total: 'string'
  }
), create)

router.get('/', auth, findAll)

router.patch('/:id', auth, validator(
  {
    status: 'number'
  }
), update)

module.exports = router
