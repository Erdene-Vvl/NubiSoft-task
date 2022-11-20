const path= require('path');
const MyError = require ("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler");

// GET 1 Category by id
exports.getCategory = asyncHandler(async (req,res,next)=>{
    
    const Category = await req.db.category.findByPk(req.params.id);

    if(!Category){
        throw new MyError(`Алдаа!!`,400);
    };

    res.status(200).json({
        success: true,
        Category
    });
});



// buh category harah
exports.getAllCategories = asyncHandler(async (req,res,next)=>{

    let Categories =await req.db.category.findAll();

    res.status(200).json({
        Success: true,
        Categories
    });
});


// Create Category
exports.createCategory = asyncHandler(async (req,res,next)=>{

await req.db.category.create(req.body);

res.status(200).json({
    success: true,
    message: "Амжилттай"
});
});

// Update Category
exports.updateCategory = asyncHandler(async (req,res,next)=>{

const category = await req.db.category.findByPk(req.params.id);

if(!category){
    throw new myError(`Алдаа!!`,400);
};

await category.update(req.body);

res.status(200).json({
    success: true,
    message: "Амжилттай"
});
});


// Delete Category
exports.deleteCategory = asyncHandler(async (req,res,next)=>{

const category = await req.db.category.findByPk(req.params.id);

if(!category){
    throw new myError(`Алдаа!!`,400);
};

await category.destroy();

res.status(200).json({
    success: true,
    message: "Амжилттай устгалаа"
});
});
