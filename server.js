process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Promise Rejection:", err);
});

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const globalLimiter = require("./utils/globalLimeter");

const formRoutes = require("./routes/formRoutes");
const authRoutes = require("./routes/auth");
const donationRoutes = require("./routes/donationRoutes");

const trafficRoutes = require("./routes/trafficRoutes");
const exportRoutes = require("./routes/deleteRoutes");



const app = express();
app.set("trust proxy", 1);
const allowed = ["https://crimecontrol.in", "https://www.crimecontrol.in"];

app.use((req, res, next) => {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
  console.log(
    `[${new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    })}] Request from IP: ${ip}, Origin: ${req.headers.origin || "undefined"}`
  );
  next();
});
// Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman or server-to-server)
      //  if (!origin) return callback(null, true);

      if (allowed.indexOf(origin) !== -1) {
        //  Origin is allowed
        return callback(null, true);
      } else {
        const now = new Date();
        const formatted = now.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        });
        console.warn(`[${formatted}]  CORS blocked: ${origin}`);
        //  Origin not allowed
        return callback(null,false);
      }
    },
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

// app.use(cors())

// Middleware
// app.use(cors());
app.use(bodyParser.json());
app.use(globalLimiter);
app.use((req, res, next) => {
  const ua = req.headers["user-agent"] || "";
  if (ua.includes("autocannon")) {
    return res.status(403).send("Forbidden");
  }
  next();
});

// Routes
app.use("/api/forms", formRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/donation", donationRoutes);
app.use("/api/export", exportRoutes);
app.use("/api/traffic", trafficRoutes);
// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));

app.use((err, req, res, next) => {
  console.error("API Error:", err);
  res.status(500).json({ success: false, message: "Server Error" });
});
