import { Cart } from "../models/cart-model.js";

export const postCart = async (req, res) => {
  try {
    const { cartItems } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = Cart.create({
        user: req.user._id,
        cartItems: [],
      });
    }

    cart.cartItems = cartItems;

    const updateCart = await cart.save();

    return res.status(201).json({ message: updateCart });
  } catch (error) {
    console.log(
      "This error is from /controllers/cart-controller.js     ",
      error
    );
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      return res.status(200).json({ message: cart });
    } else {
      return res.status(404).json({ message: "No item in the cart" });
    }
  } catch (error) {
    console.log(
      "This error is from /controllers/cart-controller.js     ",
      error
    );
  }
};

export const delCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.cartItems = cart.cartItems.filter(
        (item) => item._id.toString !== req.params.id
      );
      await cart.save();
      return res.status(201).json({ message: "Item removed from cart" });
    } else {
      return res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.log(
      "This error is from /controllers/cart-controller.js     ",
      error
    );
  }
};
