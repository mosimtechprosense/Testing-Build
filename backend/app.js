import express from "express";
import cors from "cors";
import apiRoutes from "./src/routes/index.js";
import errorHandler from "./src/middlewares/errorHandler.js"


const app = express();


app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const PORT = process.env.PORT || 5000;


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