const express = require("express");
// const bodyParser = require('body-parser');
const Razorpay = require("razorpay");
const crypto = require("crypto");
const DonationOrder = require("../models/DonationOrders"); // adjust path
const User = require("../models/User");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const {
  emailTextfordonationcreation,
  emailTextfordonationverification,
  emailTextClient,
} = require("../emailtext");
const mail = require("../utils/sendMailClient");
const sliptest = require("../utils/slip");
// const sliptest = require("../utils/slip");
const generateReciptPDF = require("../utils/htmltopdf");
const path = require("path");
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465, // SSL port
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

let emailText = "";
router.post("/create-order", async (req, res) => {
  try {
    const { donation_type, amount, donor, meta } = req.body;
    // console.log(donation_type)
    if (!amount || amount <= 0)
      return res.status(400).json({ error: "Invalid amount" });
    const amountPaise = Math.round(Number(amount) * 100); // convert INR to paise
    const receiptId = "donation_" + Date.now();

    const orderOptions = {
      amount: amountPaise,
      currency: "INR",
      receipt: receiptId,
      payment_capture: 1, // auto-capture
      notes: {
        donation_type: donation_type || "one-time",
        donor_name: donor?.first_name + " " + donor?.last_name || "",
        donor_email: donor?.email || "",
      },
    };

    const order = await razorpay.orders.create(orderOptions);
    // console.log("Razorpay order created:", order);
    const donationOrder = new DonationOrder({
      razorpay_order_id: order.id,
      receipt: order.receipt,
      amount: order.amount / 100,
      currency: order.currency,
      payment_capture: order.payment_capture,
      // type: order.notes.donation_type,
      name: order.notes.donor_name,
      email: order.notes.donor_email,
      status: order.status, // usually "created"
    });
    await donationOrder.save();

    emailText = emailTextfordonationcreation(req.body, order);
    try {
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.OWNER_EMAIL, // where emails go
        subject: `New donation created: ${donor?.first_name || ""} ${
          donor?.last_name || ""
        }`,
        html: emailText,
      });

      // Save order metadata in DB here (optional)
      res.json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        key_id: process.env.RAZORPAY_KEY_ID,
        receiptId,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error sending mail");
    }
  } catch (err) {
    console.error("create-order error", err);
    return res.status(500).send("Server error creating order");
  }
});

router.post("/verify-payment", async (req, res) => {
  console.log(req.body)
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      donation_payload,
    } = req.body;
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      // Payment verified: store transaction details + donation_payload in DB
      const record = {
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
        signature: razorpay_signature,
        donation_payload,
        verified_at: new Date(),
      };
      // TODO: save `record` into your DB
      const data_of_user = await DonationOrder.findOneAndUpdate(
        { razorpay_order_id },
        {
          $set: {
            payment_id: razorpay_payment_id,
            signature: razorpay_signature,
            verified_at: new Date(),
            status: "paid",
          },
        },

        { new: true }
      );
      // let user;
      // let pass;
      // try {
      //   user =
      //     req.body.donation_payload?.donor.email ||
      //     req.body.payload?.donor.email;

      //   pass =
      //     req.body.donation_payload?.donor.phone ||
      //     req.body.payload?.donor.phone;

      //   let hashedPassword;

      //   if (pass) {
      //     hashedPassword = await bcrypt.hash(pass, 10);
      //   }

      //   // Check existing user
      //   let existingUser = null;
      //   if (user) {
      //     existingUser = await User.findOne({  username:User });
      //   }

      //   if (!existingUser) {
      //     // Only create new user if email exists
      //     await new User({
      //       username: user || "please contact our organisation",
      //       password:
      //         hashedPassword || (await bcrypt.hash("defaultPassword123", 10)),
      //     }).save();
      //   } else {
      //     // Do nothing — user already exists
      //     pass = "Use your previously created password";
      //   }
      // } catch (err) {
      //   console.error(err);
      // }
  
      try {
         emailText = emailTextfordonationverification(req.body, record);
        transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.OWNER_EMAIL, // where emails go
          subject: `Congratulation donation verified : ${
            req.body.donation_payload?.donor.first_name
              ? req.body.donation_payload.donor.first_name
              : req.body.payload?.donor.first_name
          } ${
            req.body.payload?.donor.last_name
              ? req.body.payload?.donor.last_name
              : req.body.donation_payload?.donor.last_name
          }`,
          html: emailText,
        });
      } catch (error) {
        console.error(error);
        res.status(500).send("Error sending mail");
      }
      try{
        
         const sliptestv = sliptest({amount:data_of_user.amount,
          name:data_of_user.name,
          date:data_of_user.verified_at ,
          contact:req.body.payload?.donor.phone || req.body.donation_payload?.donor.phone,
          address:req.body.payload?.donor.address || req.body.donation_payload?.donor.address})
    
       const name = await generateReciptPDF(sliptestv,`${data_of_user.payment_id}`)

        emailText = emailTextClient({
        donation_payload: req.body.donation_payload
          ? req.body.donation_payload
          : req.body.payload,
        order_id: razorpay_order_id,
        // user,
        // pass,
      });
      mail(
        `Congratulation donation verified : ${
          req.body.donation_payload?.donor.first_name
            ? req.body.donation_payload.donor.first_name
            : req.body.payload?.donor.first_name
        }`,
        emailText,
        req.body.donation_payload?.donor.email
          ? req.body.donation_payload.donor.email
          : req.body.payload?.donor.email,
          data_of_user.payment_id
      );
    }catch(err){
        console.error(err)
    }

      return res.json({ success: true, record });
    } else {
      return res
        .status(400)
        .json({ success: false, error: "Invalid signature" });
    }
  } catch (err) {
    console.error("verify-payment error", err);
    return res
      .status(500)
      .json({ success: false, error: "Server error verifying payment" });
  }
});

module.exports = router;
