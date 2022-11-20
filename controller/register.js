const asyncHandler = require("../middleware/asyncHandler");
const sendEmail = require ("../utils/email");
const crypto = require("crypto");
const bcrypt = require('bcrypt');
const myError = require ("../utils/myError");



// register
exports.register = asyncHandler(async (req,res,next)=>{

    if(!req.body.email || !req.body.name || !req.body.phone){
        throw new myError(`Мэдээлэлээ бүрэн оруулна уу`,400);
    };

    const user1 = await req.db.user.findOne({where:{eMail: req.body.email}});
    console.log(user1);
    if(user1!=null){
        throw new myError(`Уучлаарай. Бүртгэлтэй хэрэглэгч байна`,400);
    }; 
    const user2 = await req.db.user.findOne({where:{Phone: req.body.phone}});
    if(user2!=null){
        throw new myError(`Уучлаарай. Бүртгэлтэй хэрэглэгч байна`,400);
    }; 

    const user = await req.db.user.create({eMail : req.body.email , Name : req.body.name , Phone : req.body.phone});

    const resetPin = user.generatePasswordChangePin();
    user.save();
    const message = `Та бүртгүүлэх хүсэлт илгээлээ. <br><br> Баталгаажуулах код
                  <br> <h1>${resetPin}</h1>`;

    // Send mail
    const info =await sendEmail({
        email: user.eMail,
        subject: 'Бүртгэл баталгаажуулах',
        message
    });
    console.log("email sent");

    res.status(200).json({
        success: true,
        message: "Та Имэйл хаягаа шалгана уу, Баталгаажуулах код илгээлээ"
    });
});



// confirm code
exports.confirmCode = asyncHandler(async (req,res,next)=>{

    if(!req.body.confirmCode){
        throw new myError(`Амжилтгүй`,400);
    };

    const encrypted =crypto.createHash('sha256').update(req.body.confirmCode.toString()).digest('hex');
   
    const user = await req.db.user.findOne({
        resetPasswordToken: encrypted , 
        resetTokenExpire: { $gt : Date.now() }, 
    });

    if(!user){
        throw new myError(`Амжилтгүй`,400);
    }; 

    res.status(200).json({
        success: true,
        token: user.getJsonWebToken(),
    });

});



// set password
exports.setPassword = asyncHandler(async (req,res,next)=>{

    if(!req.body.password){
        throw new myError(`Амжилтгүй pass`,400);
    };
    const user = await req.db.user.findByPk(req.userId);

    if(!user){
        throw new myError(`Амжилтгүй token`,400);
    }; 

    const salt = await bcrypt.genSalt(10);
    const Pass = await bcrypt.hash(req.body.password, salt);

    await req.db.user.update({
        Password: Pass,
        resetPasswordToken: null,
        resetTokenExpire: null
        },
        {
        where: {ID : user.ID}    
        }   
    );

    res.status(200).json({
        success: true,
        message: "Амжилттай"
    });
});