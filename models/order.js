const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orederschema = Schema({
  user: {
    userid: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true }
    }
  ]
});

module.exports = mongoose.model("order", orederschema);
