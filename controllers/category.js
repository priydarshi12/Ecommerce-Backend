const Category = require("../models/category");
const slugify = require("slugify");
const Sub = require("../models/subcategory");
exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
  } catch (err) {
    res.status(400).send("create category failed");
  }
};
exports.list = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

exports.read = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};
exports.update = async (req, res) => {
  try {
    console.log("update request body", req.body);
    const { name } = req.body;
    console.log(name);
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Delete Failed" });
  }
};
exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: "Delete Failed" });
  }
};

exports.getSubs = async(req, res) => {
  try{
    console.log(req.params._id)
    const subs=await Sub.find({ parent: req.params._id });
    console.log("subcategory----",subs)
    res.status(201).json(subs);
  }catch(err){
    console.log("error in fetching subcategory->",err)
    res.status(400).json({error:"not being able to fetch the sub categories"})
  }
  
};
