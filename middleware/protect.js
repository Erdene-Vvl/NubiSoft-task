const jwt = require('jsonwebtoken');
const asyncHandler= require('./asyncHandler');
const MyError = require('../utils/myError');

exports.protect =asyncHandler(async (req,res,next)=> {
    
   if(!req.headers.authorization){
    throw new MyError('Таны эрх хүрэхгүй байна', 401);
   };

   const token = req.headers.authorization.split(' ')[1];
   
   if(!token){
    throw new MyError('Таны эрх хүрэхгүй байна', 401);
   };

   const tokenObj = jwt.verify(token, process.env.JWT_SECRET);

   req.userId = tokenObj.id;
   req.userRole = tokenObj.role;
   next();
});

exports.authorize = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.userRole)){
            throw new MyError("Таны эрх хүрэхгүй байна", 403)
        };

        next();
    };
};
