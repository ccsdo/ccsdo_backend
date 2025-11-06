export const emailTextfordonationcreation = (body,order) => {

let emailText = `
<!DOCTYPE html>
<html>
<head>
<style>
  body {
    font-family: Arial, sans-serif;
    background: #f5f7fa;
    padding: 20px;
    color: #333;
  }
  .container {
    max-width: 600px;
    margin: auto;
    background: #ffffff;
    border-radius: 8px;
    padding: 20px;
    border: 1px solid #e2e8f0;
  }
  h2 {
    background: #16a34a;
    color: #fff;
    padding: 12px;
    border-radius: 6px;
    text-align: center;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
  }
  table td {
    padding: 8px;
    border: 1px solid #d1d5db;
  }
  .label {
    font-weight: bold;
    width: 35%;
    background: #f1f5f9;
  }
  .footer {
    font-size: 12px;
    text-align: center;
    margin-top: 15px;
    color: #6b7280;
  }
</style>
</head>
<body>

<div class="container">
  <h2>New Donation Form Created</h2>

  <table>
    <tr><td class="label">Full Name</td><td>${body.donor.first_name} ${body.donor.last_name}</td></tr>
    <tr><td class="label">Email ID</td><td>${body.donor.email}</td></tr>
    <tr><td class="label">Mobile No</td><td>${body.donor.phone}</td></tr>
    <tr><td class="label">Razorpay Order ID</td><td>${order.id}</td></tr>
    <tr><td class="label">Receipt No</td><td>${order.receipt}</td></tr>
    <tr><td class="label">Amount</td><td>₹${order.amount / 100}</td></tr>
    <tr><td class="label">Status</td><td>${order.status}</td></tr>
  </table>

  <p class="footer">
    This is an automated notification for a new donation form submission.
  </p>
</div>

</body>
</html>
`;

    return emailText;
}

export const emailTextfordonationverification = (body,order) => {
  console.log("body is",body)
let emailText = `
<!DOCTYPE html>
<html>
<head>
<style>
  body {
    font-family: Arial, Helvetica, sans-serif;
    background: #f4f6f9;
    padding: 20px;
    margin: 0;
  }
  .container {
    max-width: 620px;
    margin: auto;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #dcdfe3;
    padding: 20px;
  }
  h2 {
    background: #0d9488;
    color: #fff;
    padding: 12px;
    border-radius: 6px;
    text-align: center;
    font-size: 20px;
    margin-top: 0;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 18px;
  }
  table td {
    padding: 10px;
    border: 1px solid #e5e7eb;
    font-size: 14px;
  }
  .label {
    background: #f1f5f9;
    font-weight: 600;
    width: 35%;
  }
  .footer {
    margin-top: 18px;
    font-size: 12px;
    text-align: center;
    color: #6b7280;
    line-height: 1.5;
  }
</style>
</head>
<body>

<div class="container">
  <h2>Donation Payment Verified ✅</h2>

  <table>
    <tr><td class="label">Full Name</td><td>${body.donation_payload?.donor.first_name ? body.donation_payload.donor.first_name : body.payload?.donor.first_name} ${body.payload?.donor.last_name ? body.payload?.donor.last_name : body.donation_payload?.donor.last_name}</td></tr>
    <tr><td class="label">Email ID</td><td>${body.donation_payload?.donor.email ? body.donation_payload.donor.email : body.donation?.donor.email}</td></tr>
    <tr><td class="label">Mobile No</td><td>${body.donation_payload?.donor.phone ? body.donation_payload.donor.phone : body.donation?.donor.phone}</td></tr>

    <tr><td class="label">Razorpay Order ID</td><td>${order.order_id}</td></tr>
    <tr><td class="label">Payment ID</td><td>${order.payment_id}</td></tr>
    <tr><td class="label">Signature</td><td>${order.signature}</td></tr>

    <tr><td class="label">Donation Payload</td><td><pre style="white-space:pre-wrap;font-size:13px;">${JSON.stringify(body)}</pre></td></tr>

    <tr><td class="label">Payment Status</td><td>✅ Paid</td></tr>
    <tr><td class="label">Verified At</td><td>${order.verified_at}</td></tr>
  </table>

  <p class="footer">
    This email is an auto-notification that a donation has been successfully verified.<br>
    Thank you for your support and contribution to our cause.
  </p>
</div>

</body>
</html>
`;

    return emailText;
}   


export const emailTextforcareer = (body, text) => {
  let emailText = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Career Form Submission</title>
  <style>
    body {
      font-family: Arial, sans-serif; 
      background: #f6f6f6; 
      margin: 0;
      padding: 0;
    }
    .email-wrapper {
      max-width: 600px;
      background: #fff;
      margin: 20px auto;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
      border-top: 4px solid #0a8f08;
    }
    .header {
      background: #0a8f08;
      color: #fff;
      text-align: center;
      padding: 15px;
    }
    .content {
      padding: 20px;
      color: #333;
    }
    .content h2 {
      margin-top: 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }
    td, th {
      padding: 10px;
      border: 1px solid #eee;
      font-size: 14px;
    }
    th {
      background: #f8f8f8;
      width: 35%;
      text-align: left;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #777;
      padding: 15px;
      background: #fafafa;
      border-top: 1px solid #eee;
    }
  </style>
</head>
<body>

<div class="email-wrapper">
  <div class="header">
    <h2>New Career Form Submission</h2>
  </div>

  <div class="content">
    <p>Hello Admin,</p>
    <p>A new career application has been submitted. Below are the details:</p>

    <table>
      <tr><th>First Name</th><td>${body.fname}</td></tr>
      <tr><th>Last Name</th><td>${body.lname}</td></tr>
      <tr><th>Email</th><td><a href="mailto:${body.email}">${body.email}</a></td></tr>
      <tr><th>Phone</th><td><a href="tel:${body.phone}">${body.phone}</a></td></tr>
      <tr><th>Position Applied</th><td>${body.position}</td></tr>
      <tr><th>Experience</th><td>${body.experience}</td></tr>
      <tr><th>Employment Type</th><td>${body.employment_type}</td></tr>
      <tr>
        <th>Message</th>
        <td style="white-space:pre-wrap;">${body.message || "-"}</td>
      </tr>
      <tr><th>Form ID</th><td>${body._id}</td></tr>
      <tr><th>Submitted At</th><td>${new Date(body.createdAt).toUTCString()}</td></tr>
    </table>

    <p style="margin-top:15px;">Please check the admin panel for further details.</p>
  </div>

  <div class="footer">
    This is an automated email notification — do not reply.
  </div>
</div>

</body>
</html>
`;


  return emailText;
};
  


export const emailTextforinternship = (body, text) => {
  return `
<!DOCTYPE html>
<html>
<head>
<style>
  body {
    font-family: Arial, Helvetica, sans-serif;
    background: #f4f6f9;
    padding: 20px;
    margin: 0;
  }
  .container {
    max-width: 620px;
    margin: auto;
    background: #ffffff;
    border-radius: 8px;
    border: 1px solid #d7dce1;
    padding: 25px;
  }
  h2 {
    background: #2563eb;
    color: #ffffff;
    padding: 14px;
    border-radius: 6px;
    text-align: center;
    font-size: 20px;
    margin-top: 0;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 18px;
  }
  table td {
    padding: 10px;
    border: 1px solid #e3e7ed;
    font-size: 14px;
    vertical-align: top;
  }
  .label {
    background: #f1f5f9;
    font-weight: bold;
    width: 35%;
  }
  .footer {
    margin-top: 16px;
    font-size: 12px;
    text-align: center;
    color: #6b7280;
  }
</style>
</head>
<body>

<div class="container">
  <h2>New Internship Application Received</h2>

  <table>
    <tr><td class="label">Full Name</td><td>${body.fname} ${body.lname}</td></tr>
    <tr><td class="label">Email</td><td>${body.email}</td></tr>
    <tr><td class="label">Phone</td><td>${body.phone}</td></tr>
    <tr><td class="label">College</td><td>${body.college}</td></tr>
    <tr><td class="label">Course</td><td>${body.course}</td></tr>
    <tr><td class="label">Internship Duration</td><td>${body.duration}</td></tr>
    <tr><td class="label">Area of Interest</td><td>${body.area}</td></tr>
    <tr><td class="label">Message</td><td>${body.message || "N/A"}</td></tr>
    <tr><td class="label">Submission ID</td><td>${body._id}</td></tr>
    <tr><td class="label">Submitted At</td><td>${body.createdAt}</td></tr>
  </table>

  <div class="footer">
    This is an automated email — please do not reply.
  </div>
</div>

</body>
</html>
  `;
};


export const emailTextforvolunteer = (body, text) => {
    const emailText = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Volunteer Form Submission</title>
  <style>
    body {
      font-family: Arial, sans-serif; 
      background: #f6f6f6; 
      margin: 0;
      padding: 0;
    }
    .email-wrapper {
      max-width: 600px;
      background: #fff;
      margin: 20px auto;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
      border-top: 4px solid #0a8f08;
    }
    .header {
      background: #0a8f08;
      color: #fff;
      text-align: center;
      padding: 15px;
    }
    .content {
      padding: 20px;
      color: #333;
    }
    .content h2 {
      margin-top: 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }
    td, th {
      padding: 10px;
      border: 1px solid #eee;
      font-size: 14px;
    }
    th {
      background: #f8f8f8;
      width: 35%;
      text-align: left;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #777;
      padding: 15px;
      background: #fafafa;
      border-top: 1px solid #eee;
    }
  </style>
</head>
<body>

<div class="email-wrapper">
  <div class="header">
    <h2>New Volunteer Form Submission</h2>
  </div>

  <div class="content">
    <p>Hello Admin,</p>
    <p>A new volunteer request has been submitted. Below are the details:</p>

    <table>
      <tr><th>First Name</th><td>${body.fname}</td></tr>
      <tr><th>Last Name</th><td>${body.lname}</td></tr>
      <tr><th>Email</th><td><a href="mailto:${body.email}">${body.email}</a></td></tr>
      <tr><th>Phone</th><td><a href="tel:${body.phone}">${body.phone}</a></td></tr>
      <tr><th>Age</th><td>${body.age || "-"}</td></tr>
      <tr><th>Availability</th><td>${body.availability || "-"}</td></tr>
      <tr><th>Interest Area</th><td>${body.interest_area || "-"}</td></tr>
      <tr><th>Mode</th><td>${body.mode || "-"}</td></tr>
      <tr><th>Message</th><td style="white-space:pre-wrap;">${body.message || "-"}</td></tr>
      <tr><th>Form ID</th><td>${body._id}</td></tr>
      <tr><th>Submitted At</th><td>${new Date(body.createdAt).toUTCString()}</td></tr>
    </table>

    <p style="margin-top:15px;">Please check the admin panel for further details.</p>
  </div>

  <div class="footer">
    This is an automated email notification — do not reply.
  </div>
</div>

</body>
</html>`;
    return emailText;
}

export const emailTextforcontact = (body, text) => {
  const emailText = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Contact Form Submission</title>
  <style>
    body {
      font-family: Arial, sans-serif; 
      background: #f6f6f6; 
      margin: 0;
      padding: 0;
    }
    .email-wrapper {
      max-width: 600px;
      background: #fff;
      margin: 20px auto;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
      border-top: 4px solid #0a8f08;
    }
    .header {
      background: #0a8f08;
      color: #fff;
      text-align: center;
      padding: 15px;
    }
    .content {
      padding: 20px;
      color: #333;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }
    td, th {
      padding: 10px;
      border: 1px solid #eee;
      font-size: 14px;
    }
    th {
      background: #f8f8f8;
      width: 35%;
      text-align: left;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #777;
      padding: 15px;
      background: #fafafa;
      border-top: 1px solid #eee;
    }
  </style>
</head>
<body>

<div class="email-wrapper">
  <div class="header">
    <h2>New Contact Form Submission</h2>
  </div>

  <div class="content">
    <p>Hello Admin,</p>
    <p>A new contact inquiry has been submitted. Below are the details:</p>

    <table>
      <tr><th>First Name</th><td>${body.fname}</td></tr>
      <tr><th>Last Name</th><td>${body.lname}</td></tr>
      <tr><th>Email</th><td><a href="mailto:${body.email}">${body.email}</a></td></tr>
      <tr><th>Phone</th><td><a href="tel:${body.phone}">${body.phone}</a></td></tr>
      <tr><th>Message</th><td style="white-space:pre-wrap;">${body.message || "-"}</td></tr>
      <tr><th>Form ID</th><td>${body._id}</td></tr>
      <tr><th>Submitted At</th><td>${new Date(body.createdAt).toUTCString()}</td></tr>
    </table>

    <p style="margin-top:15px;">Please check the admin panel for further follow-up.</p>
  </div>

  <div class="footer">
    This is an automated email notification — do not reply.
  </div>
</div>

</body>
</html>
`;

  return emailText;
};


export const emailTextfordonation = (body, text) => {
  const {
    name,
    email,
    mobile,
    dob,
    pan,
    country,
    state,
    city,
    address,
    pincode,
    donationAmount,
    customAmount
  } = body;

  const finalAmount = (Number(donationAmount) ? Number(donationAmount) : 0) + (Number(customAmount) ? Number(customAmount) : 0);

  const emailText = `
  <!DOCTYPE html>
  <html>
  <head>
  <style>
    body {
        font-family: Arial, sans-serif;
        background: #f7f7f7;
        margin: 0;
        padding: 0;
    }
    .container {
        background: #ffffff;
        padding: 20px;
        max-width: 600px;
        margin: auto;
        border-radius: 8px;
        border: 1px solid #ddd;
    }
    .header {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
        color: #0b6fc2;
    }
    table {
        width: 100%;
        margin-top: 15px;
        border-collapse: collapse;
    }
    td {
        padding: 6px 0;
        font-size: 14px;
        border-bottom: 1px solid #eee;
    }
    .label {
        font-weight: bold;
        color: #444;
        width: 140px;
    }
    .footer {
        margin-top: 12px;
        font-size: 12px;
        text-align: center;
        color: #555;
        padding-top: 10px;
        border-top: 1px solid #ddd;
    }
  </style>
  </head>
  <body>
  <div class="container">

    <div class="header">New Donation Received</div>

    <table>
      <tr><td class="label">Name:</td><td>${name}</td></tr>
      <tr><td class="label">Email:</td><td>${email}</td></tr>
      <tr><td class="label">Phone:</td><td>${mobile}</td></tr>
      <tr><td class="label">PAN:</td><td>${pan}</td></tr>
      <tr><td class="label">State:</td><td>${state}</td></tr>
      <tr><td class="label">City:</td><td>${city}</td></tr>
      <tr><td class="label">Address:</td><td>${address}, ${pincode}</td></tr>
      <tr><td class="label">Amount:</td><td><b>₹${finalAmount}</b></td></tr>
    </table>

    <div class="footer">
      Thank you for supporting our mission.  
      <br>Your contribution helps us serve better.
    </div>
  </div>
  </body>
  </html>
  `;

  return emailText;
}


export const emailTextforapplication = (body, text) => {
  const { name, phone, email, statement } = body;

  const emailText = `
  <!DOCTYPE html>
  <html>
  <head>
  <style>
    body {
        font-family: Arial, sans-serif;
        background: #f7f7f7;
        margin: 0;
        padding: 0;
    }
    .container {
        background: #ffffff;
        padding: 20px;
        max-width: 600px;
        margin: auto;
        border-radius: 8px;
        border: 1px solid #ddd;
    }
    .header {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
        color: #0b6fc2;
    }
    table {
        width: 100%;
        margin-top: 15px;
        border-collapse: collapse;
    }
    td {
        padding: 6px 0;
        font-size: 14px;
        border-bottom: 1px solid #eee;
    }
    .label {
        font-weight: bold;
        color: #444;
        width: 140px;
    }
    .footer {
        margin-top: 12px;
        font-size: 12px;
        text-align: center;
        color: #555;
        padding-top: 10px;
        border-top: 1px solid #ddd;
    }
  </style>
  </head>
  <body>
  <div class="container">

    <div class="header">New Application Received</div>

    <table>
      <tr><td class="label">Name:</td><td>${name}</td></tr>
      <tr><td class="label">Email:</td><td>${email}</td></tr>
      <tr><td class="label">Phone:</td><td>${phone}</td></tr>
      <tr><td class="label">Statement:</td><td>${statement}</td></tr>
    </table>

    <div class="footer">
      This person wants to join / apply.  
      <br>Please review and contact them accordingly.
    </div>

  </div>
  </body>
  </html>`;

  return emailText;
};


export const emailTextClient=(data)=>{
let emailText = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Donation Receipt - CCSDO</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, Helvetica, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
            -webkit-font-smoothing: antialiased;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .header {
            background-color: #EC1165;
            padding: 30px 20px;
            text-align: center;
            color: white;
        }
        
        .logo {
            width: 100px;
            height: 100px;
            background-color: white;
            border-radius: 50%;
            margin: 0 auto 15px;
            display: block;
            padding: 5px;
        }
        
        .header h1 {
            font-size: 24px;
            margin-bottom: 5px;
            line-height: 1.3;
        }
        
        .header p {
            font-size: 14px;
            opacity: 0.9;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 18px;
            margin-bottom: 20px;
            color: #333;
        }
        
        .section {
            margin-bottom: 30px;
        }
        
        .section-title {
            font-size: 16px;
            font-weight: 600;
            color: #EC1165;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 2px solid #EC1165;
        }
        
        .section-content {
            font-size: 14px;
            line-height: 1.6;
            color: #555;
        }
        
        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
            background-color: #f9f9f9;
        }
        
        .data-table td {
            padding: 12px;
            border-bottom: 1px solid #eee;
        }
        
        .data-table td:first-child {
            font-weight: 600;
            color: #333;
            width: 40%;
        }
        
        .cta-button {
            display: inline-block;
            background-color: #EC1165;
            color: white !important;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
            font-weight: 600;
        }
        
        .footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #777;
            border-top: 1px solid #eee;
        }
        
        .footer a {
            color: #EC1165;
            text-decoration: none;
        }
        
        .unsubscribe {
            margin-top: 15px;
            font-size: 11px;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header with Logo -->
        <div class="header">
            <img src="https://crimecontrol.in/images/log.png" alt="CCSDO Logo" class="logo">
            <h1>Crime Control & Social Development Organisation</h1>
            <p>Thank You for Your Support</p>
        </div>
        
        <!-- Main Content -->
        <div class="content">
            <div class="greeting">
                Dear ${data.donation_payload.donor.first_name},
            </div>
            
            <!-- Section 1 -->
            <div class="section">
                <div class="section-title">Donation Confirmation</div>
                <div class="section-content">
                    Thank you for your generous donation of <strong>₹${data.donation_payload.amount}</strong> to CCSDO. Your contribution helps us continue our mission of crime prevention and social development in communities across India.
                </div>
            </div>
            
            <!-- Section 2 with Data Table -->
            <div class="section">
                <div class="section-title">Transaction Details</div>
                <table class="data-table">
                    <tr>
                        <td>Order ID:</td>
                        <td>${data.order_id}</td>
                    </tr>
                    <tr>
                        <td>Amount:</td>
                        <td>₹${data.donation_payload.amount}</td>
                    </tr>
                    <tr>
                        <td>Date:</td>
                        <td>${new Date().toLocaleDateString('en-IN')}</td>
                    </tr>
                </table>
            </div>
            
            <!-- Section 3 -->
            <div class="section">
                <div class="section-title">What Happens Next</div>
                <div class="section-content">
                    Your donation receipt will be sent to your registered email address. This receipt can be used for tax deduction purposes under Section 80G of the Income Tax Act. If you have any questions, please feel free to reach out to us.
                </div>
            </div>
            
            <!-- Call to Action Button -->
            <div style="text-align: center;">
                <a href="https://crimecontrol.in/contact.html" class="cta-button">Contact Us</a>
            </div>
            
            <!-- Closing -->
            <div style="margin-top: 30px; font-size: 14px; color: #555;">
                <p>Warm regards,</p>
                <p style="margin-top: 10px; font-weight: 600;">
                    Kavita Rawat<br>
                    Chairperson<br>
                    Crime Control & Social Development Organisation (CCSDO)
                </p>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p>&copy; 2025 Crime Control & Social Development Organisation (CCSDO). All rights reserved.</p>
            <p style="margin-top: 10px;">
                <a href="https://crimecontrol.in/Policies.html">Privacy Policy</a> | 
                <a href="https://crimecontrol.in/contact.html">Contact Us</a>
            </p>
            <p style="margin-top: 10px;">B-108 Sector 6, Noida, Uttar Pradesh 201301, India</p>
            <div class="unsubscribe">
                <a href="https://crimecontrol.in/unsubscribe.html" style="color: #999;">Unsubscribe from future emails</a>
            </div>
        </div>
    </div>
</body>
</html>`;

// Plain text alternative (important for spam filtering)
let plainTextVersion = `
Dear ${data.donation_payload.donor.first_name},

DONATION CONFIRMATION

Thank you for your generous donation of ₹${data.donation_payload.amount} to Crime Control & Social Development Organisation (CCSDO). Your contribution helps us continue our mission of crime prevention and social development in communities across India.

TRANSACTION DETAILS
Order ID: ${data.order_id}
Amount: ₹${data.donation_payload.amount}
Date: ${new Date().toLocaleDateString('en-IN')}

WHAT HAPPENS NEXT
Your donation receipt will be sent to your registered email address. This receipt can be used for tax deduction purposes under Section 80G of the Income Tax Act. If you have any questions, please feel free to reach out to us.

Contact us: https://crimecontrol.in/contact.html

Warm regards,
Kavita Rawat
Chairperson
Crime Control & Social Development Organisation (CCSDO)

B-108 Sector 6, Noida, Uttar Pradesh 201301, India
Privacy Policy: https://crimecontrol.in/Policies.html
Unsubscribe: https://crimecontrol.in/unsubscribe.html

© 2025 CCSDO. All rights reserved.
`;

  return emailText;
}

