const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Lesson', {
    ID: {
      type: DataTypes.UUID,   
      defaultValue: DataTypes.UUIDV4, 
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    CategoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'category',
        key: 'ID'
      }
    },
    Image1: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Rating: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    freezeTableName: true,
    tableName: 'lesson',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      }
    ]
  });
};
