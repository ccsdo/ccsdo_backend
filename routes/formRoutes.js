const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require('dotenv').config();


const ContactForm = require("../models/ContactForm");
const DonationForm = require("../models/DonationForm");
const ApplicationForm = require("../models/ApplicationForm");
const VolunteerForm = require("../models/VolunteerForm");
const InternshipForm = require("../models/InternshipForm");
const CareerForm = require("../models/CareerForm");
const DonationOrder = require("../models/DonationOrders");


const validate = require("../middlewares/validate");
const auth = require("../middlewares/auth");



const contactSchema = require("../validators/contactValidator");
const donationSchema = require("../validators/donationValidator");
const applicationSchema = require("../validators/applicationValidator");
const volunteerSchema = require("../validators/volunteerValidator");
const internshipSchema = require("../validators/internshipValidator");
const careerSchema = require("../validators/careerValidator");
const { emailTextforcareer,emailTextforapplication,emailTextforcontact,emailTextfordonation,emailTextforinternship,emailTextforvolunteer, emailTextThankyouClient } = require("../emailtext");
const mailtoClient = require("../utils/sendMailClient");
// const adminSchema = require("../validators/adminValidator");

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  // port:587,
  port: 465,
  // secure:false,        // SSL port
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

async function mail(subject, text) {
try {
  // console.log("mail sending")
   const res= await transporter.sendMail({
      from: process.env.EMAIL_USER,
      // from:"kapilsharma09311@gmail.com",
      to: process.env.OWNER_EMAIL, // where emails go
      subject: subject,
      html: text,

    });

    // console.log("mail sent",res)

  } catch (error) {
    console.error(error);
    return false;
 
  }

}

// Career Form
router.post("/career", validate(careerSchema), async (req, res) => {
  try {
    const newCareer = new CareerForm(req.body);
    await newCareer.save();
    let emailText = emailTextforcareer(newCareer,"career");
    mail(`New career form`,emailText);

      let emailTextThankYou = emailTextThankyouClient(newCareer);
      
      mailtoClient(`Thank you for applying to us`,emailTextThankYou,newCareer.email);
    
  } catch (err) {
    res.status(500).json({ success: false, error: "error in career form saving" });
  } 
});

// Internship Form
router.post("/internship", validate(internshipSchema), async (req, res) => {
  try {
    const newInternship = new InternshipForm(req.body); 
    await newInternship.save();
      const emailText = emailTextforinternship(newInternship,"internship");
    mail(`New internship form`,emailText);
          let emailTextThankYou = emailTextThankyouClient(newInternship);
           mailtoClient(`Thank you for applying to us`,emailTextThankYou,newInternship.email);
    res.status(201).json({ success: true, message: "Internship form saved!" });
  } catch (err) {
    console.log("internship form error: "+err);
    res.status(500).json({ success: false, error: "error in internship form saving" });
  }
});

// Volunteer Form
router.post("/volunteer", validate(volunteerSchema),async (req, res) => {
  try {
    const newVolunteer = new VolunteerForm(req.body);
    await newVolunteer.save();
        const emailText = emailTextforvolunteer(newVolunteer,"volunteer");
    mail(`New volunteer form`,emailText);
          let emailTextThankYou = emailTextThankyouClient(newVolunteer);
            mailtoClient(`Thank you for applying to us`,emailTextThankYou,newVolunteer.email);
    res.status(201).json({ success: true, message: "Volunteer form saved!" });
  } catch (err) {
    res.status(500).json({ success: false, error: "error in volunteer form saving" });
  }
});
// Contact Form
router.post("/contact", validate(contactSchema),async (req, res) => {
  try {
    const newContact = new ContactForm(req.body);
    await newContact.save();
    // console.log("new contact saved");
        const emailText = emailTextforcontact(newContact,"contact");
        // console.log("contact email text: " + emailText);
    mail(`New contact form`,emailText);
          let emailTextThankYou = emailTextThankyouClient(newContact);
          // console.log("contact thank you email text: " + emailTextThankYou);
            mailtoClient(`Thank you for applying to us`,emailTextThankYou,newContact.email);
      // console.log("Thank you email sent");
    res.status(201).json({ success: true, message: "Contact form saved!" });
  } catch (err) {
    res.status(500).json({ success: false, error: "error in contact form saving" });
  }
});

// Donation Form
router.post("/donation", validate(donationSchema), async (req, res) => {
  try {
    const newDonation = new DonationForm(req.body);
    await newDonation.save();
        const emailText = emailTextfordonation(newDonation,"donation");
    mail(`New donation form`,emailText);
    res.status(201).json({ success: true, message: "Donation form saved!" });
  } catch (err) {
    console.log("form route error: "+err);
    res.status(500).json({ success: false, error: "error in donation form saving" });
  }
});

// Application Form
router.post("/application", validate(applicationSchema), async (req, res) => {
  try {
    const newApp = new ApplicationForm(req.body);
    await newApp.save();
        const emailText = emailTextforapplication(newApp,"application");
    mail(`New application form`,emailText); 
          let emailTextThankYou = emailTextThankyouClient(newApp);
           mailtoClient(`Thank you for applying to us`,emailTextThankYou,newCareer.email);
    res.status(201).json({ success: true, message: "Application form saved!" });
  } catch (err) {
    res.status(500).json({ success: false, error: "error in application form saving" });
  }
});


//fetches all data from mongodb
router.get("/all-forms",auth, async (req, res) => {
  try {
    // Fetch data in parallel for better performance
    const [
      contacts,
      donations,
      applications,
      volunteers,
      internships,
      careers,
      payments
    ] = await Promise.all([
      ContactForm.find(),
      DonationForm.find(),
      ApplicationForm.find(),
      VolunteerForm.find(),
      InternshipForm.find(),
      CareerForm.find(),
      DonationOrder.find()
    ]);

    res.status(200).json({
      success: true,
      data: {
        contacts,
        donations,
        applications,
        volunteers,
        internships,
        careers,
        payments
      },
    });
  } catch (err) {
    console.error("Error fetching forms:", err.message);
    res.status(500).json({
      success: false,
      error: "Server error while fetching forms",
    });
  }
});
module.exports = router;
