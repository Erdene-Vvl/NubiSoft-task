const path= require('path');
const MyError = require ("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler");
const paginate = require("../utils/paginateSequelize");


// GET 1 Lesson by id
exports.getLesson = asyncHandler(async (req,res,next)=>{
    
    const lesson = await req.db.lesson.findByPk(req.params.id);

    if(!lesson){
        throw new MyError(` Хичээл олдсонгүй`,400);
    };

    res.status(200).json({
        success: true,
        data: lesson
    });
});


exports.getCategoryLessons = asyncHandler(async (req,res,next)=>{

    const page =parseInt(req.query.page) || 1;
    const limit =parseInt(req.query.limit) || 5 ;
    const select =req.query.select; 
    const sort =req.query.sort;

    ['page','limit','select','sort'].forEach(el=> delete req.query[el]);

    // pagination
    const Pagination = await paginate (page, limit, req.db.lesson);

    let query = {offset: Pagination.start - 1 , limit };

    if(select){
        query.attributes = select.split(' ')
    };

    if(req.query){
        query.where = req.query
    };

    if(sort){
        query.order = sort.split(' ').map((el)=>[
            el.charAt(0)=== "-" ? el.substring(1) : el , 
            el.charAt(0)=== "-" ? "DESC" : "ASC"
        ]);
    };
    
    query.where.SubCategoryId = req.params.categoryId;
    let lessons = await req.db.lesson.findAll(query);


    res.status(200).json({
        success: true,
        data: lessons,
        Pagination
    });
});


// Create lesson
exports.createLesson = asyncHandler(async (req,res,next)=>{
    
    await req.db.lesson.create(req.body);

    res.status(200).json({
        success: true,
        message: "Амжилттай"
    });
});



// Хичээл Update
exports.updateLesson = asyncHandler(async (req,res,next)=>{
    
    const lesson = await req.db.lesson.findByPk(req.params.id);

    if(!lesson){
        throw new MyError(` Хичээл олдсонгүй`,400);
    };

    await lesson.update(req.body);

    res.status(200).json({
        success: true,
        message: "Амжилттай"
    });
});


// Хичээл Устгах
exports.deleteLesson = asyncHandler(async (req,res,next)=>{
    
    const lesson = await req.db.lesson.findByPk(req.params.id);

    if(!lesson){
        throw new MyError(` Хичээл олдсонгүй`,400);
    };
    
    await lesson.destroy();

    res.status(200).json({
        success: true,
        message: "Амжилттай устгалаа"
    });
});
