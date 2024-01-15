const admin = require("../firebase");
const User=require('../models/user')
exports.authCheck = async (req, res, next) => {
  console.log(req.headers);//token
  
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
      console.log("firebase user ",firebaseUser);
      req.user=firebaseUser;
      next();
  } catch (eror) {
    res.status(401).json({ err: "invalid or expired token" });
  }
  
};
exports.authCheckLogin = async (req, res, next) => {
  console.log(req.headers);//token
  
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
      console.log("firebase user ",firebaseUser);
      req.user=firebaseUser;
      next();
  } catch (eror) {
    res.status(401).json({ err: "invalid or expired token" });
  }
  
};

exports.adminCheck=async(req,res,next)=>{
const {email}=req.user;
const adminUser=await User.findOne({email});
if(adminUser.role!=="admin"){
  res.status(403).json({
    err:"Admin resources.Access denied",
  })
}else{
  next();
}
}