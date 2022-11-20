const errorHandler = (err,req,res,next)=>{

console.log(err.stack.red.underline);

const error= {...err};
error.message = err.message;

    if (err.name==="CastError"){
        err.message = "ID buruu butetstei bn",
        err.statusCode = 400
    }
    if (err.code === 11000){
        err.message = "Burtgegdsen category baina";
        err.statusCode=400;
    }

    res.status(err.statusCode || 500).json({
        success: false,
        error : err,
        // message: err.message
    });
};

module.exports = errorHandler;