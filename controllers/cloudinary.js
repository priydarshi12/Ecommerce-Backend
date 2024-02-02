const cloudinary = require("cloudinary");

// config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
  secure: true,
});

// req.files.file.path
exports.upload = async (req, res) => {
  try {
    
    let result = await cloudinary.v2.uploader.upload(req.body.image, {
      public_id: `${Date.now()}`,
      resource_type: "auto", // jpeg, png
    });
    res.json({
      public_id: result.public_id,
      url: result.secure_url,
    });
  } catch (err) {
    console.log("error in cloudinary", err);
    res.json(err);
  }
};

exports.remove = (req, res) => {
  let image_id = req.body.public_id;

  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return res.json({ success: false, err });
    res.send("ok");
  });
};
