const { DataTypes } = require('sequelize');
const seq = require('../db/seq');

// 创建模型
const User = seq.define(
  'zd_user',
  {
    // id会被sequelize自动创建并设置为主键，自增
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: '用户名，唯一',
    },
    password: {
      type: DataTypes.CHAR(64),
      allowNull: false,
      comment: '用户密码',
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: '是否为管理员，0不是，1是',
    },
  },
  {
    timestamps: true,
  }
);

// User.sync({force:true}); // 自动创建表(如果表不存在)或更新表结构(如果表存在)

module.exports = User;
