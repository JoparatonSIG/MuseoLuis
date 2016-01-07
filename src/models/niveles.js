module.export = function (sequelize, DataTypes) {
  var Nivel = sequelize.define(
    'Nivel',
    {
     id: {
       type: DataTypes.BIGINT(11),
       primaryKey: true,
       autoIncrement: true,
       comment: 'nid, Primary Key, Nivel ID'
     },
     categoria: {
       type: DataTypes.STRING(255),
       allowNull: false,
       defaultValue: 'none',
       comment: 'none, categoria'
     }
   }
  );
  return Nivel;
};
