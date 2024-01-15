const express = require("express");

const router = express.Router();


//middleware
const {authCheck,authCheckLogin,adminCheck} =require('../middlewares/auth')

//controllers


  
const { createOrUpdateUser ,loginController,currentUser} = require("../controllers/auth");


router.post("/create-or-update-user",authCheck, createOrUpdateUser);
router.post("/login",authCheckLogin, loginController);
router.post("/current-user",authCheck, currentUser);
router.post("/current-admin",authCheck,adminCheck, currentUser);

module.exports = router;
