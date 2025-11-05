const fs = require("fs");
const process = require("process");

process.on("uncaughtException", (err) => {
  const log = `[${new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  })}] Uncaught Exception: ${err.stack}\n`;

  fs.appendFile("errorfile.log", log, () => {
    // Optional: give time to flush logs
    setTimeout(() => {
      process.exit(1); // exit after logging
    }, 300);
  });
});

process.on("unhandledRejection", (err) => {
  const log = `[${new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  })}] Unhandled Promise Rejection: ${err.stack}\n`;
  fs.appendFile("errorfile.log", log, () => {
    // Optional: give time to flush logs
    setTimeout(() => {
      process.exit(1); // exit after logging
    }, 300);
  });
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
const track = require("./routes/track");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);
const allowed = ["http://127.0.0.1:5501", "https://www.crimecontrol.in"];

app.use((req, res, next) => {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
  // console.log(
  //   `[${new Date().toLocaleString("en-IN", {
  //     timeZone: "Asia/Kolkata",
  //   })}] Request from IP: ${ip}, Origin: ${req.headers.origin || "undefined"}`
  // );
  fs.appendFile(
    "access.log",
    `[${new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    })}] Request from IP: ${ip}, Origin: ${req.headers.origin || "undefined"
    }\n`,
    () => { }
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
        // console.warn(`[${formatted}]  CORS blocked: ${origin}`);
        fs.appendFile(
          "corsaccess.log",
          `[${formatted}] CORS blocked: ${origin}\n`,
          () => { }
        );
        //  Origin not allowed
        return callback(null, false);
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
app.use("/api/track", track);
app.use((err, req, res, next) => {
  // console.error("API Error:", err);
  fs.appendFile(
    "errorfile.log",
    `[${new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    })}] API Error: ${err}\n`,
    () => { }
  );
  res.status(500).json({ success: false, message: "Server Error" });
});
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


