const path = require('path');
const { fileUploadError, unSupportedFileType, publishGoodsError, invalidGoodsID, updateGoodsError } = require('../constant/err.type');
const { createGoods, updateGoods, removeGoods, restoreGoods, findAllGoods } = require('../service/goods.service');
class GoodsController {
  async upload(ctx, next) {
    console.log(ctx.request.files.file);
    const { file } = ctx.request.files;
    const fileTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (file) {
      if (!fileTypes.includes(file.type)) {
        return ctx.app.emit('error', unSupportedFileType, ctx);
      }
      ctx.body = {
        code: 0,
        message: '商品图片上传成功',
        result: {
          goods_img: path.basename(file.path),
          file: file.path,
          path: file,
        },
      };
    } else {
      return ctx.app.emit('error', fileUploadError, ctx);
    }
    await next();
  }
  async create(ctx, next) {
    // 1.获取数据
    try {
      // 2.将数据保存到数据库中
      const { updatedAt, createdAt, ...res } = await createGoods(ctx.request.body);
      // 3.返回结果
      ctx.body = {
        code: 0,
        message: '发布商品成功',
        result: res,
      };
    } catch (err) {
      console.error(err);
      return ctx.app.emit('error', publishGoodsError, ctx);
    }

    await next();
  }
  async update(ctx, next) {
    // 1.获取数据
    try {
      const id = ctx.params.id;
      const goods = ctx.request.body;
      // 2.将数据保存到数据库中
      const res = await updateGoods(id, goods);
      if (res) {
        // 3.返回结果
        ctx.body = {
          code: 0,
          message: '更新商品成功',
          result: '',
        };
      } else {
        return ctx.app.emit('error', invalidGoodsID, ctx);
      }
    } catch (err) {
      console.error(err);
      return ctx.app.emit('error', updateGoodsError, ctx);
    }
    await next();
  }
  async remove(ctx, next) {
    const id = ctx.params.id;
    const res = await removeGoods(id);
    if (res) {
      ctx.body = {
        code: 0,
        message: '下架商品成功',
        result: '',
      };
    } else {
      return ctx.app.emit('error', invalidGoodsID, ctx);
    }

    await next();
  }
  async restore(ctx, next) {
    const id = ctx.params.id;
    const res = await restoreGoods(id);
    if (res) {
      ctx.body = {
        code: 0,
        message: '上架商品成功',
        result: '',
      };
    } else {
      return ctx.app.emit('error', invalidGoodsID, ctx);
    }
    await next();
  }
  async findAll(ctx, next) {
    // 1.获取数据
    const { pageNum = 1, pageSize = 10 } = ctx.request.query;
    // 2.将数据保存到数据库中
    const res = await findAllGoods({ pageNum, pageSize });
    // 3.返回结果
    ctx.body = {
      code: 0,
      message: '获取商品列表成功',
      result: res,
    };
    await next();
  }
}
module.exports = new GoodsController();
