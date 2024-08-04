import { Product } from "../models/product-model.js";

export const product = async (req, res) => {
  try {
    const prodData = await Product.find();

    if (!prodData || prodData.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json({ message: prodData });
  } catch (error) {
    console.log(
      "This error is from /controllers/product-controller.js     ",
      error
    );
    return res.status(500).json({ error: "Internal server error" });
  }
};
