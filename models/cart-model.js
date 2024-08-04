import mongoose from "mongoose";

const cartModel = new mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },
    // cartItems: [
      // {
        userid: {
          type: String,
          required: true,
        },
        name: { 
            type: String,
            required: true
        },
        qty: { 
            type: Number,
            required: true,
            default: 1
        },
        // price: {
        //     type: Number,
        //     required: true
        // },
        image: {
            type: String,
            required: true
        },
      },
  //   ],
  // },
  {
    timestamps: true,
  }
);

export const Cart = mongoose.model("cart", cartModel);
