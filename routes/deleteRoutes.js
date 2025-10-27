// routes/export.js
const express = require("express");
const router = express.Router();
const contactForm = require("../models/ContactForm");
const applicationForm = require("../models/ApplicationForm");
const donationForm = require("../models/DonationForm");
const volunteerForm = require("../models/VolunteerForm");
const internshipForm = require("../models/InternshipForm");
const careerForm = require("../models/CareerForm");
const donationOrder = require("../models/DonationOrders");

const models = {
  Contacts:contactForm,
  Applications:applicationForm,
  Donations:donationForm,
  Volunteers:volunteerForm,
  Internships:internshipForm,
  Career:careerForm,
  Payments:donationOrder
};

// DELETE all data
router.delete("/delete-all/:formName", async (req, res) => {

    const { formName } = req.params;    
    const formModel = models[formName];
  try {
    await formModel.deleteMany({});
    res.status(200).json({ message: `All records of ${formName} deleted successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting records" });
  }
});


module.exports = router;
