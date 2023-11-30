const { Product } = require("../models/productModel");

exports.newproduct = async (req, res) => {
  try {
    const productDetails = await req.body;
    const newProduct = new Product(productDetails);
    const savedUser = await newProduct.save();

    res
      .status(201)
      .json({ savedUser, message: "Successfully upload new Product" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.fetchProducts = async (req, res) => {
  try {
    let query = await Product.find({});
      if (req.query.category) {
        query = await Product.find({category: { $in: req.query.category.split(",") }});
      }
      if (req.query.brand) {
        query = await Product.find({ 'brand.value': { $in: req.query.brand.split(",") } });
      }

      res.status(200).json(query);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.fetchProductsbyId = async (req, res) => {
  try {
    const { id } = await req.params;
    const product = await Product.findById(id);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = await req.params;
    const update = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(201).json({ update, message: "Product Update Sucessfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = await req.params;
    const response = await Product.findByIdAndDelete(id);
    res.status(201).json({ message: "Deleted Sucessfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// {
//     "title":"ASYMMETRIC DRESS WITH METAL",
//     "description":"Midi dress with an asymmetric neckline. One long sleeve and one sleeveless arm with metal piece detail. Draped fabric. Side slit at the hem. Invisible back zip fastening.",
//     "price": 3990,
//     "stock": 12,
//     "brand":"Zara",
//     "category":"tshirt",
//     "images":[
//         "https://static.zara.net/photos///2023/I/0/1/p/9878/254/518/2/w/750/9878254518_2_1_1.jpg?ts=1692779345732",
//         "https://static.zara.net/photos///2023/I/0/1/p/9878/254/518/2/w/750/9878254518_2_2_1.jpg?ts=1692779345397",
//         "https://static.zara.net/photos///2023/I/0/1/p/9878/254/518/2/w/750/9878254518_2_5_1.jpg?ts=1692779344635",
//         "https://static.zara.net/photos///2023/I/0/1/p/9878/254/518/2/w/750/9878254518_6_1_1.jpg?ts=1692951047648"
//     ],
//     "colors":["green","blue"],
//     "type":"New",
//     "gender":"women"
// }
