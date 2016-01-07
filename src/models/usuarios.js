module.export = function (sequelize, DataTypes) {
  var User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'nid, Primary Key, User ID'
      },
      email: {
        type: DataTypes.STRING(255),
        autoNull: false,
        defaultValue: 'none',
        comment: 'none, Username must be unique',
      },
      nombre: {
        type: DataTypes.STRING(521),
        allowNull: false,
        defaultValue: 'Sin Nombre Alguno',
        comment: 'nombre, User\'s name'
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'none',
        comment: 'pwd, User\'s hashed password'
      },
    }
  );
  return User;
};
