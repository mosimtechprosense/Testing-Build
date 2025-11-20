import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import apiRoutes from "./src/routes/index.js";
import errorHandler from "./src/middlewares/errorHandler.js"


const app = express();

const PORT = process.env.PORT || 5000;

//* for security

// basic security headers
app.use(helmet());

// CORS (Allowed Origins)
app.use(cors({
  origin: ["http://localhost:5173", "https://yourdomainExample.com"],
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));


// Rate Limiting per IP addrees
app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300, // limit each IP to 300 requests
    message: {
      success: false,
      message: "Too many requests, please try again later.",
    },
  })
);

app.use(express.json());


// lets the browser access stored images.
app.use('/uploads', express.static('uploads'));


// Fix BigInt JSON problem on API
BigInt.prototype.toJSON = function () {
  return Number(this);
};


// prefix all routes with /api
app.use("/api", apiRoutes);


// global error handler
app.use(errorHandler);


// server start
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})