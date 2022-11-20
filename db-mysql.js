const Sequelize = require('sequelize');

var db = {};

const mySequelize = new Sequelize(    
        process.env.SEQUELIZE_SCHEMA_SHOP , 
        process.env.SEQUELIZE_USER ,
        process.env.SEQUELIZE_USER_PASSWORD ,
        {
        host : process.env.SEQUELIZE_HOST ,
        port : process.env.SEQUELIZE_PORT ,
        dialect : process.env.SEQUELIZE_DIALECT ,
        define :{
            freezeTableName : true
        },
        pool : {
            max : 10,
            min : 0,
            acquire : 60000,
            idle : 15000,
        }, 
        operatorAliases : false,
        }
);
mySequelize.dialect.supports.schemas = true;

const OnlineSurgalt = [
    require('./models/category'),
    require('./models/lesson'),
    require('./models/user'),

];

OnlineSurgalt.forEach(model => {
    const seqModel = model(mySequelize , Sequelize );
    db[seqModel.name] = seqModel ;
});

db.SurgaltSequelize = mySequelize;



module.exports = db;