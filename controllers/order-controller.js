import { Order } from "../models/order-model.js";

export const postOrder = async (req, res) => {
  try {
    const {
      orderitems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (!orderitems && orderitems.length === 0) {
      res.status(400).json({ message: "No order items" });
    } else {
      const newOrder = new Order({
        user: req.user._id,
        orderitems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createOrder = await newOrder.save();

      res.status(201).json(createOrder);
    }
  } catch (error) {
    console.log('This error is from /controllers/order-controller.js     ', error);
  }
};

export const getOrder = async (req, res) => {
    try {
        const orderData = await Order.findById(req.params.id).populate('user', 'name', 'email')

        if (orderData) {
            return res.status(200).json({message: orderData})
        } else {
            return res.status(404).json({message: "Order not found"})
        }
    } catch (error) {
        console.log('This error is from /controllers/order-controller.js     ', error);
    }
}
