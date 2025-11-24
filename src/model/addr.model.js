const { DataTypes } = require('sequelize');
const seq = require('../db/seq');

//定义模型
const Address = seq.define('zd_address', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  consignee: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '收货人姓名'
  },
  phone: {
    type: DataTypes.CHAR(11),
    allowNull: false,
    comment: '收货人手机号'
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '收货人地址'
  },
  is_default: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否为默认地址，0：不是，1是'
  }
})
// Address.sync({ force: true });

//导出Cart模型
module.exports = Address;
