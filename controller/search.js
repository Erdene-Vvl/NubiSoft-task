const path= require('path');
const MyError = require ("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler");
const paginate = require("../utils/paginateSequelize");
const Sequelize = require('sequelize');
const Op = Sequelize. Op;


// Search
exports.searchProducts = asyncHandler(async (req,res,next)=>{

    const page =parseInt(req.query.page) || 1;
    const limit =parseInt(req.query.limit) || 5 ;
    let sort = req.query.sort || "Name";
    let CatId = req.body.CategoryId || "" ;
    let SubCatId = req.body.SubCategoryId || "" ;


    if(sort){
        sort = sort.split(' ').map((el)=>[
            el.charAt(0)=== "-" ? el.substring(1) : el ,
            el.charAt(0)=== "-" ? "DESC" : "ASC"
        ]);
    }

    const {count , rows} = await req.db.product.findAndCountAll({order: [sort] , offset : (page-1)*limit , limit: limit ,where:{
        Name: { [Op.like]: `%${req.query.name}%`},
        CategoryId:{ [Op.like]: `%${CatId}%`},
        SubCategoryId:{ [Op.like]: `%${SubCatId}%`}
    }});
    
    // pagination
    const total = count;
    const pageCount = Math.ceil(total / limit);
    const start = (page-1) * limit + 1 ;
    let end =start + limit - 1 ;
    if(end>total) end=total;    

    const Pagination = {total, pageCount, start, end, limit};
    if(page<pageCount) Pagination.nextPage = page+1;
    if(page>1) Pagination.prevPage = page-1;


    res.status(200).json({
        Success: true,
        Data: rows,
        Pagination
    });
});
