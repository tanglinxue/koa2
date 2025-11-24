const { Op } = require('sequelize');
const Cart = require('../model/cart.model');
const Goods = require('../model/goods.model');
class CartService {
  async createOrUpdate(user_id, goods_id) {
    //根据user_id和goods_id同时查找有没有记录
    const res = await Cart.findOne({
      where: {
        [Op.and]: {
          user_id,
          goods_id,
        },
      },
    });
    if (res) {
      // 说明已经存在一条记录
      await res.increment('number');
      return await res.reload();
    } else {
      return await Cart.create({
        user_id,
        goods_id,
      });
    }
  }
  async findCarts(pageNum, pageSize) {
    const { count, rows } = await Cart.findAndCountAll({
      attributes: ['id', 'number', 'selected'],
      offset: (pageNum - 1) * pageSize,
      limit: pageSize * 1,
      include: {
        model: Goods,
        as: 'goods_info',
        attributes: ['id', 'goods_name', 'goods_img', 'goods_num'],
      },
    });
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    };
  }
  async updateCarts(params) {
    const { id, number, selected } = params;
    const res = await Cart.findByPk(id);
    if (!res) return '';

    number !== undefined ? (res.number = number) : '';
    selected !== undefined ? (res.selected = selected) : '';
    return await res.save();
  }
  async removeCarts(ids) {
    return await Cart.destroy({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
  }
  async selectedAllCarts(user_id, selected) {
    const res = await Cart.update(
      {
        selected,
      },
      {
        where: {
          user_id,
        },
      }
    );
    return res;
  }
}

module.exports = new CartService();
