const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
  const user= sequelize.define('user', {
    ID: {
      type: DataTypes.UUID,   
      defaultValue: DataTypes.UUIDV4, 
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Phone: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      unique: "Phone_UNIQUE"
    },
    eMail: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "eMail_UNIQUE",
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ , 'Email буруу байна']
    },
    Password: {
      type: DataTypes.STRING(100),
      allowNull: true,
      // select: false
    },
    resetPasswordToken: DataTypes.STRING(100),
    resetTokenExpire: DataTypes.DATE,
  }, 
  {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "Phone_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Phone" },
        ]
      },
      {
        name: "eMail_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "eMail" },
        ]
      },
    ]
  });

  user.prototype.generatePasswordChangePin = function(){

    const resetPin = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000).toString() ;

    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetPin)
        .digest('hex');
    
    this.resetTokenExpire = Date.now() + 1800000;

    return resetPin;
};

  user.prototype.getJsonWebToken = function() {
  const token = jwt.sign(
    {id: this.ID}, 
    process.env.JWT_SECRET, 
    {expiresIn: process.env.JWT_EXPIRESIN}
    );
return token;    
};
  

user.prototype.checkPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.Password);
};
 
  return user;
};
