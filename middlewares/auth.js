const admin = require("../firebase");

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
