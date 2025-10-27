// models/DonationOrder.js
const mongoose = require("mongoose");

const donationOrderSchema = new mongoose.Schema(
  {
    razorpay_order_id: { type: String, required: true },
    payment_id: { type: String },
    receipt: { type: String, required: true },
    amount: { type: Number, required: true }, // paise
    currency: { type: String, default: "INR" },
    // payment_capture: { type: Number, default: 1 },
      // type: String,
      name: String,
      email: String,
      verified_at: Date,
      createdAt: { type: Date, default: Date.now },
    status: { type: String, default: "created" }, // created | paid | failed
  },
  { timestamps: true }
);

module.exports = mongoose.model("DonationOrder", donationOrderSchema);
