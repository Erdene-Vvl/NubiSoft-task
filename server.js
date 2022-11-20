require('dotenv').config();
const express = require('express');
var fs=require('fs');
var path=require('path');
const colors = require('colors');
const errorHandler= require("./middleware/error");
const morgan =require('morgan');
const logger = require('./middleware/logger');
const categoriesRoutes = require("./routes/categories");
const lessonRoutes = require("./routes/lesson");
const searchRoutes = require("./routes/search");
const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const passwordRoutes = require('./routes/changePassword');
const fileupload= require('express-fileupload');
const cors = require('cors');
const injectDb = require('./middleware/injectDb');

const db = require('./db-mysql');

const app = express();


var accessLogStream = fs.createWriteStream(path.join(__dirname,"access.log"),{
    flags:"a",
});


app.use(express.json());
app.use(cors());
app.use(fileupload());
app.use(logger);
app.use(injectDb(db));
app.use(morgan("combined",{stream:accessLogStream}));
app.use("/categories",categoriesRoutes); 
app.use("/search",searchRoutes); 
app.use("/lesson",lessonRoutes); 
app.use("/user",userRoutes); 
app.use("/login",loginRoutes); 
app.use("/register",registerRoutes);
app.use("/password",passwordRoutes);
app.use(errorHandler);


// db.lesson.belongsTo(db.category,{foreignKey:'CategoryId', as: 'Category'});
// db.category.hasMany(db.lesson,{as: 'Lessons',foreignKey:'CategoryId'});


db.SurgaltSequelize.sync().then(result => {
    console.log('MYSQL SCHEMA SYNC SUCCESSFUL...'.blue);
}).catch(err => console.log(err) );

const server = app.listen(
    process.env.PORT ,
    console.log(`SERVER ${process.env.PORT} PORT ДЭЭР АСЛАА`.blue)
);

process.on("unhandledRejection",(err,promise)=>{
    console.log(`Алдаа: ${err.message}`.red.bold);
    server.close(()=>{
        process.exit(1);
    });
});
