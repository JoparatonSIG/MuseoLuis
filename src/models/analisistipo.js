module.exports = function (sequelize, DataTypes) {
  var AnalisisTipo = sequelize.define(
    'AnalisisTipo',
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID AnalisisTipo'
      },
      tipo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'tipo',
        comment: 'Tipo de Analisis',
        validate: {
          is: ['[a-z]','i'],
          notNull: true,
          notEmpty: true
        }
      },
      subtipo: {
        type: DataTypes.STRING(75),
        allowNull: false,
        defaultValue: 'Subtipo del tipo de analisis',
        comment: 'sub tipo ',
        validate: {
          is: ['[a-z]','i'],
          notNull: true,
          notEmpty: true
        }
      },
      predeterminado: {
        type: DataTypes.STRING(75),
        allowNull: false,
        defaultValue: 'predeterminado',
        comment: 'valor por determinado',
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
          AnalisisTipo.findAll({})
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (analisistipoId, onSuccess, onError) {
          AnalisisTipo.find( { where: { id: analisistipoId } }, { raw: true } )
          .then(onSuccess).catch(onError);
        },
        retrieveByAutor: function (analisistipoTipo, onSuccess, onError) {
          AnalisisTipo.find( { where: { tipo: analisistipoTipo } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        retrieveByDescripcion: function (analisistipoSubtipo, onSuccess, onError) {
          AnalisisTipo.find( { where: { subtipo: analisistipoSubtipo } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        retrieveByDescripcion: function (analisistipoPredeterminado, onSuccess, onError) {
          AnalisisTipo.find( { where: { predeterminado: analisistipoPredeterminado } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var tipo = this.tipo;
          var subtipo = this.subtipo;
          var predeterminado = this.predeterminado;

          AnalisisTipo.build({ tipo: tipo, subtipo: subtipo, predeterminado: predeterminado })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (analisistipoId, tipo, subtipo ,predeterminado, onSuccess, onError) {
          AnalisisTipo.update( { tipo: tipo, subtipo: subtipo ,predeterminado: predeterminado },{ where: { id: analisistipoId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (analisistipoId, onSuccess, onError) {
          AnalisisTipo.destroy( { where: { id: analisistipoId } })
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
      tableName: 'AnalisisTipo',
      comment: 'Tipo de analisis',
      indexes: [
        {
          name: 'idxAnalisisTipo',
          method: 'BTREE',
          unique: true,
          fields: ['tipo']
        }
      ]
    }
  );
  return AnalisisTipo;
};
