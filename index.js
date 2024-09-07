const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors =require("cors")
const userRoutes = require('./routes/userRoute');
const adminRoutes = require("./routes/adminRoute");
const doctorRoutes = require("./routes/doctorRoute")
const connectDb = require("./config/connectDb");
const path = require("path");

// dotenv config
dotenv.config();
connectDb();

// rest object
const app = express();

// CORS middleware should be the first thing applied
app.use(cors({
  origin: "https://doctor-appointment-system-ochre.vercel.app",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true
}));

app.options("*", cors()); // Handle preflight requests for all routes

// middlewares
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doctor", doctorRoutes);

// static files and fallback route (if applicable)
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// port
const PORT = process.env.PORT || 4000;

// listen port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
