const Goods = require('../model/goods.model');
class GoodsService {
  async createGoods(goods) {
    // 模拟将商品信息保存到数据库
    const res = await Goods.create(goods);
    return res.dataValues;
  }
  async updateGoods(id, goods) {
    const whereOpt = { id };
    const res = await Goods.update(goods, { where: whereOpt });
    return res[0] > 0 ? true : false;
  }
  async removeGoods(id) {
    const whereOpt = { id };
    const res = await Goods.destroy({ where: whereOpt });
    console.log(res);
    return res > 0 ? true : false;
  }
  async restoreGoods(id) {
    const whereOpt = { id };
    const res = await Goods.restore({ where: whereOpt });
    return res > 0 ? true : false;
  }
  async findAllGoods({ pageNum = 1, pageSize = 10 }) {
    // // 获取总数
    // const count = await Goods.count();
    // console.log(count);
    // // 获取分页数据
    // const rows = await Goods.findAll({ offset: (pageNum - 1) * pageSize, limit: pageSize * 1 });
    // console.log(rows);
    const { count, rows } = await Goods.findAndCountAll({
      offset: (pageNum - 1) * pageSize,
      limit: pageSize * 1,
    });
    // 获取分页的具体数据
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    };
  }
}
module.exports = new GoodsService();
