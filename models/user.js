const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: String,
    
  },
  // { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports=mongoose.model('User',userSchema);