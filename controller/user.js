const myError = require ("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler");
const paginate = require("../utils/paginate");


// buh users-iig harah
exports.getUsers = asyncHandler(async (req,res,next)=>{
    const page =parseInt(req.query.page) || 1;
    const limit =parseInt(req.query.limit) || 10;
    const select =req.query.select; 
    const sort =req.query.sort;

    ['page','limit','select','sort'].forEach(el=> delete req.query[el]);

    // pagination
    const pagination = await paginate (page, limit, User);
    
    const users = await User.find(req.query,select)
        .sort(sort)
        .limit(limit)
        .skip(pagination.start-1);

    res.status(200).json({
        success: true,
        data: users,
        pagination
    });
});


// neg hereglegch ID-aar shuuj harah
exports.getUser = asyncHandler(async (req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        throw new myError(req.params.id + `: хэрэглэгч олдсонгүй!!`,400);
    }; 

    res.status(200).json({
        success: true,
        data: user
    });
});

// shine hereglegch uusgeh
exports.createUser =asyncHandler(async (req,res,next)=> {
    const user = await req.db.user.create(req.body);

    res.status(200).json({
        success: true,
        data: user
    });
});

// hereglegch oorchloh
exports.updateUser = asyncHandler(async (req,res,next)=>{
    const user = await User.findByIdAndUpdate(req.params.id , req.body, {
        new:true,
        runValidators:true,
    });
    if(!user){
        throw new myError(req.params.id + `: хэрэглэгч олдсонгүй!!`,400);
    };
    res.status(200).json({
        success: true,
        data:user
    });
});

// hereglegch ustgah
exports.deleteUser = asyncHandler(async (req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        throw new myError(req.params.id + `: хэрэглэгч олдсонгүй!!`,400);
    };

    user.remove();

    res.status(200).json({
        success: true,
        data:user
    });
});