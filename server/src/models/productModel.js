const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: {
    type: Number,
    min: [1, "wrong min price"],
    max: [10000, "wrong max price"],
  },
  discountPercentage: {
    type: Number,
    min: [0, "wrong min discount"],
    max: [99, "wrong max discount"],
    default: 0
  },
  rating: {
    rate: {
      type: Number,
      min: [0, "wrong min rating"],
      max: [5, "wrong max price"],
      default: 0,
    },
    count: { 
      type: Number ,
      default: 0
    },
  },
  stock: { type: Number, min: [0, "wrong min stock"], default: 0 },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  images: { type: [String], required: true },
  colors: { type: [Schema.Types.Mixed] },
  sizes: { 
    type: [Schema.Types.Mixed],
    default: ["S","M","L","XL"]
  },
  type: { type: String, required: true },
  gender: { type: String, required: true },
  deleted: { type: Boolean, default: false },
});

const Product = mongoose.model("products", productSchema);

exports.Product = Product;
