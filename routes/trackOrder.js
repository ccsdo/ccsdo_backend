const express = require("express");
const auth = require("../middlewares/auth");

const DonationOrders = require("../models/DonationOrders");
const router = express.Router();
// auth,
router.get("/data",async (req,res)=>{
    try{
      console.log(req.body)
    const data= await DonationOrders.find({email:req.body.email});
    console.log(data)
    res.status(200).json({
        success:true,
        data:data
    })
    }catch(err){
            res.status(500).json({
                success:false,
                error:`Server Error While Fetching The Form.${err}`
            })
    }

});


module.exports = router;