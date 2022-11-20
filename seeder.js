require('dotenv').config();
const Sequelize = require('sequelize');
const fs = require("fs");
const colors = require('colors');

var db = {};

const sequelize = new Sequelize( 
        process.env.SEQUELIZE_DATABASE , 
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

const models = [
    require('./models/subcategory'),
    require('./models/category'),
    require('./models/product')
];

models.forEach(model => {
    const seqModel = model(sequelize , Sequelize );
    db[seqModel.name] = seqModel ;
});

db.sequelize = sequelize;


const categories = JSON.parse(
    fs.readFileSync(__dirname+"/data/Category.json","utf-8")
);
const subCategories = JSON.parse(
    fs.readFileSync(__dirname+"/data/SubCategory.json","utf-8")
);
const product = JSON.parse(
    fs.readFileSync(__dirname+"/data/Product.json","utf-8")
);

const importCategory =async()=>{
    try{
       await db.category.bulkCreate(categories);
       console.log("category importolloo".yellow.inverse);
    }catch(err){
        console.log(err.red);
    }
};

const importSubCategory =async()=>{
    try{
       await db.subcategory.bulkCreate(subCategories);
       console.log("subCategories importolloo".yellow.inverse);
    }catch(err){
        console.log(err.red);
    }
};

const importProduct =async()=>{
    try{
       await db.product.bulkCreate(product);
       console.log("product importolloo".yellow.inverse);
    }catch(err){
        console.log(err.red);
    }
};

// const deleteData = async()=>{
//     try{
//        await Category.deleteMany();
//        await Book.deleteMany();
//        await User.deleteMany();
//        console.log("ogogdliig ustgalaa".yellow.inverse);

//     }catch(err){
//         console.log(err.red);
//     }
// };



if(process.argv[2]=='-i' && process.argv[3]=='-c'){
    importCategory();
}
else if(process.argv[2]=='-i' && process.argv[3]=='-s'){
    importSubCategory();
}
else if(process.argv[2]=='-i' && process.argv[3]=='-p'){
    importProduct();
}


// else if(process.argv[2]=='-d'){
//     deleteData();
// }