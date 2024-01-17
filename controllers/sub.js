const Sub = require("../models/subcategory");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {console.log("req body for sub category->",req.body);

    const { name, parent } = req.body;
    const sub = await new Sub({ name, parent, slug: slugify(name) }).save();
    res.json(sub);
  } catch (err) {
    console.log(err)
    res.status(400).send("create sub failed");
  }
};
exports.list = async (req, res) => {
  try {
    const subs = await Sub.find({}).sort({ createdAt: -1 });
    res.json(subs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch subs" });
  }
};

exports.read = async (req, res) => {
  try {
    const sub = await Sub.findOne({ slug: req.params.slug });
    res.json(sub);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch subs" });
  }
};
exports.update = async (req, res) => {
  try {
    console.log("update request body---------------", req.body);
    const { name,parent } = req.body;
    console.log(name);
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name,parent, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.log("error in update->",err.message);
    res.status(500).json({ error: "Update Failed" });
  }
};
exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: "Delete Failed" });
  }
};
