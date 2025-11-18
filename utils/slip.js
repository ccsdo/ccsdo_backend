const sliptest=(data)=>{
 function numberToWords(num) {
  if (num === 0) return "Zero";

  const below20 = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen"
  ];

  const tens = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty",
    "Sixty", "Seventy", "Eighty", "Ninety"
  ];

  function twoDigits(n) {
    if (n < 20) return below20[n];
    return tens[Math.floor(n / 10)] + (n % 10 ? " " + below20[n % 10] : "");
  }

  function threeDigits(n) {
    let str = "";
    if (n > 99) {
      str += below20[Math.floor(n / 100)] + " Hundred";
      if (n % 100) str += " and ";
    }
    return str + twoDigits(n % 100);
  }

  let output = "";

  if (num >= 10000000) {
    output += twoDigits(Math.floor(num / 10000000)) + " Crore ";
    num %= 10000000;
  }
  if (num >= 100000) {
    output += twoDigits(Math.floor(num / 100000)) + " Lakh ";
    num %= 100000;
  }
  if (num >= 1000) {
    output += twoDigits(Math.floor(num / 1000)) + " Thousand ";
    num %= 1000;
  }
  if (num > 0) {
    output += threeDigits(num);
  }

  return output.trim() + " Only";
}

  const txt=`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Donation Receipt — Crime Control & Social Development Organisation</title>
<style>
  :root{
    --page-width: 900px;
    --accent: #222;
    --muted: #666;
    --paper-bg: #fff;
    --border: #222;
    /* --rupee-box-size: 50px; */
  }
  body{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    background:#efefef;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:24px;
  }
  .receipt {
    width:100%;
    max-width:var(--page-width);
    background:var(--paper-bg);
    border:3px solid var(--border);
    border-radius:12px;
    padding:18px 22px;
    box-shadow:0 6px 18px rgba(0,0,0,0.06);
    box-sizing:border-box;
  }
  .header {
    display:flex;
    gap:16px;
    align-items:center;
  }
  .logo {
    width:86px;
    height:86px;
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight:bold;
    font-size:12px;
    color:var(--muted);
    background:#fafafa;
    border-radius:6px;
  }
  .org {
    flex:1;
  }
  .org h1{
    margin:0;
    font-size:18px;
    letter-spacing:0.2px;
  }
  .org .meta {
    font-size:12px;
    color:var(--muted);
    margin-top:6px;
    line-height:1.3;
  }

  .receipt-number {
    text-align:right;
    min-width:140px;
  }
  .receipt-number .no {
    font-weight:700;
    font-size:20px;
    color:var(--accent);
  }

  .title-strip {
    margin:12px 0;
    display:flex;
    align-items:center;
    justify-content:center;
    gap:12px;
  }
  .donation-title {
    display:inline-block;
    background:#111;
    color:#fff;
    padding:8px 14px;
    border-radius:8px;
    font-weight:700;
    font-size:14px;
  }
  .receipt-date {
    font-size:12px;
    color:var(--muted);
  }

  .form-grid {
    display:grid;
    /* grid-template-columns: 250px 1fr 260px; */
    gap:12px;
    align-items:start;
    margin-top:6px;
  }

  .rupee-box{
    width:100%;
    border:2px solid #222;
    height:var(--rupee-box-size);
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight:800;
    font-size:32px;
    border-radius:6px;
  }

  .fields {
    padding:4px 2px;
  }

  label{
    display:block;
    font-size:15px;
    color:var(--muted);
    margin-bottom:6px;
  }
  input[type="text"], input[type="date"], textarea, .inline-select {
    width:100%;
    box-sizing:border-box;
    padding:8px 10px;
    border:1px solid #ddd;
    border-radius:6px;
    font-size:14px;
    background:#fff;
  }
  textarea { min-height:56px; resize:vertical; }

  .two-cols { display:grid; grid-template-columns:1fr 1fr; gap:12px; }

  .footer-row{
    margin-top:18px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:12px;
  }
  .sig {
    width:45%;
    min-height:54px;
    border-top:1px dashed #999;
    text-align:center;
    padding-top:8px;
    color:var(--muted);
    font-size:13px;
  }
  .received-by {
    width:45%;
    min-height:54px;
    border-top:1px dashed #999;
    text-align:center;
    padding-top:8px;
    color:var(--muted);
    font-size:13px;
  }
  /* WATERMARK */
  .watermark {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 68px;
    color: rgba(0,0,0,0.06);
    transform: translate(-50%, -50%) rotate(-25deg);
    font-weight: 900;
    letter-spacing: 4px;
    pointer-events: none;
    user-select: none;
    z-index: 0;
  }
  .small-note {
    font-size:11px;
    color:var(--muted);
    margin-top:10px;
  }

  /* print-friendly */
  @media print{
    body{ background: white; }
    .receipt { box-shadow:none; border:1px solid black; }
    .donation-title { background:#000; color:#fff; }
    .watermark{ opacity:0.4; }

  }
</style>
</head>
<body>
  <div class="receipt" role="document" aria-label="Donation Receipt">

  <!-- Watermark -->
  <div class="watermark">CCSDO: Crime Control & Social Development Organisation</div>

  <!-- Header -->
  <div class="header">
    <div class="logo" aria-hidden="true">
      <img src="https://crimecontrol.in/images/log.png" alt="CCSDO Logo" class="logo">
    </div>

    <div class="org">
      <h1>Crime Control &amp; Social Development Organisation</h1>
      <div class="meta">
        B-108 Sector 6 Noida Uttar Pradesh 201301 <br>
        PAN: AACTC7828E &nbsp; | &nbsp; 80G REGISTRATION: AACTC7828EFF2022
      </div>
    </div>

    <div class="receipt-number">
      <label style="font-size:12px;color:var(--muted)">Receipt Date:</label>
      <div class="static-field receipt-date">${data.date}</div>
    </div>
  </div>

  <!-- Title -->
  <div class="title-strip">
    <div class="donation-title">Donation Receipt</div>
  </div>

  <!-- Form Grid -->
  <div class="form-grid" style="margin-top:8px;">

    <!-- Amount -->
    <div>
      <div class="rupee-box">₹${data.amount}</div>
    </div>

    <!-- Left Section -->
    <div class="fields">
      <label>Received with thanks from:</label>
      <div class="static-field">${data.name}</div>

      <label style="margin-top:10px">Address:</label>
      <div class="static-field">${data.address}</div>

      <label style="margin-top:10px">Amount (in words):</label>
      <div class="static-field">${numberToWords(data.amount)}</div>

    </div>

    <!-- Right Section -->
    <div class="fields">
      <label>On account of:</label>
      <div class="static-field">Donation</div>

      <label style="margin-top:10px">NGO Bank:</label>
      <div class="static-field">ICICI</div>

      <div style="margin-top:10px" class="two-cols">
        <div>
          <label>Date:</label>
          <div class="static-field" >${data.date}</div>
        </div>
        <div>
          <label>Contact No.:</label>
          <div class="static-field">${data.contact}</div>
        </div>
      </div>

      <label style="margin-top:8px">PAN / Reg. details:</label>
      <div class="static-field">PAN: AACTC7828E • 80G REGISTRATION: AACTC7828EFF2022</div>
    </div>
  </div>

  <!-- Footer -->
  <div class="footer-row">
    <div class="sig" title="Authorized Signature">Authorised Signature: CCSDO</div>
    <div class="received-by" title="Received By">Received By: ${data.name}</div>
  </div>

  <div class="small-note">
    Note: This receipt is issued subject to realisation of the cheque / electronic transfer. Please keep this receipt safely for tax purposes.
  </div>
</div>
</body>
</html>`

  return txt;
}
module.exports = sliptest
