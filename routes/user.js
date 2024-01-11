const express=require("express");

const router=express.Router();

router.get("/user", (req, res) => {
    res.json({
      data: "hey you hit user api",
    });
  });

  module.exports=router;
  