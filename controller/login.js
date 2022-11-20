const myError = require ("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler");


exports.login =asyncHandler(async (req,res,next)=> {
    
    const {email,password} = req.body;
    
    // email & pass null esehiig shalgana
    if(!email || !password){
        throw new myError('Имэйл болон нууц үг оруулна уу!!', 400);
    };

    // find User
    const user= await req.db.user.findOne({where:{eMail: email}});

    if(!user){
        throw new myError('Имэйл эсвэл нууц үг буруу байна!!', 401);
    };

    const success = await user.checkPassword(password);

    if(!success){
        throw new myError('Имэйл эсвэл нууц үг буруу байна!!', 401);
    };

    res.status(200).json({
        success: true,
        token:  user.getJsonWebToken(),
    });
});
