const fs=require("fs");

const track=(req,res)=>{
  try {
    // Your tracking logic here  
     const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress;
console.log(req)
  const log = {
    page: req.body.page,
    referrer: req.body.referrer,
    userAgent: req.body.userAgent,
    time: req.body.time,
    ip: ip
  };
  

  fs.appendFile("visitors.log", JSON.stringify(log) + "\n", (err) => {
    if (err) console.error("Write error:", err);
  });

  res.json({ status: "logged" });   
  } catch (error) {
    console.error("Tracking error:", error);
    res.status(500).json({ success: false, message: "Tracking error" });
  }
};
module.exports=track;