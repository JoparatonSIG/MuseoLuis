module.exports = function (sequelize, DataTypes) {
  var Obra = sequelize.define(
    'Obra',
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID nivel'
      },
      autor: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'autor',
        comment: 'Autor de la Obra',
        validate: {
          is: ['[a-z]','i'],
          notNull: true,
          notEmpty: true
        }
      },
      descripcion: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'descripcion',
        comment: 'Descripcion de la Obra',
        validate: {
          is: ['[a-z]','i'],
          notNull: true,
          notEmpty: true
        }
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Obra.findAll({})
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (obraId, onSuccess, onError) {
          Obra.find( { where: { id: obraId } }, { raw: true } )
          .then(onSuccess).catch(onError);
        },
        retrieveByAutor: function (obraAutor, onSuccess, onError) {
          Obra.find( { where: { autor: obraAutor } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        retrieveByDescripcion: function (obraDescripcion, onSuccess, onError) {
          Obra.find( { where: { description: obraDescripcion } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var autor = this.autor;
          var descripcion = this.descripcion;

          Obra.build({ autor: autor, descripcion: descripcion })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (obraId, autor, descripcion, onSuccess, onError) {
          Obra.update( { autor: autor, descripcion: descripcion },{ where: { id: obraId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (obraId, onSuccess, onError) {
          Obra.destroy( { where: { id: obraId } })
          .then(onSuccess).catch(onError);
         }
      },
      timestamps: true,
      paranoid:true,
      createdAt: 'fechaCrea',
      updatedAt: 'fechaModifica',
      deletedAt: 'fechaBorra',
      underscore: false,
      freezeTableName:true,
      tableName: 'Obras',
      comment: 'Obras del museo',
      indexes: [
        {
          name: 'idxCategoria',
          method: 'BTREE',
          unique: true,
          fields: ['descripcion']
        }
      ]
    }
  );
  return Obra;
};
