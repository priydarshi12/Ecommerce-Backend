const User = require("../models/user");
exports.createOrUpdateUser = async (req, res) => {
  try {
    console.log("controller start");
    const { name, picture, email } = req.user;
    const user = await User.findOneAndUpdate(
      { email },
      { name, picture },
      { new: true }
    );
    if (user) {
      console.log("user updated", user);
      res.json(user);
    } else {
      const newUser = await new User({
        email,
        name,
        picture,
      }).save();
      console.log("user created", newUser);
      res.json(newUser);
    }
    console.log("controller end");
  } catch (error) {
    console.error("Error in createOrUpdateUser:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.loginController = async (req, res) => {
  try {
    console.log("controller start login");
    const { name, picture, email } = req.user;
    const user = await User.findOne({ email });
    if (user) {
      console.log("user updated", user);
      res.status(201).json(user);
    } else {
      res.status(401).json({ error: "Usernot found" });
    }
    console.log("controller end login");
  } catch (error) {
    console.error("Error in createOrUpdateUser:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.currentUser=async(req,res)=>{
  try {
    console.log("controller start login");
    const { name, picture, email } = req.user;
    const user = await User.findOne({ email });
    if (user) {
      console.log("user updated", user);
      res.status(201).json(user);
    } else {
      res.status(401).json({ error: "Usernot found" });
    }
    console.log("controller end login");
  } catch (error) {
    console.error("Error in createOrUpdateUser:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}