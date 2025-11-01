import express from "express";
import cors from "cors";
import locationRoutes from "./src/routes/locationRoutes.js"


const app = express();


app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const PORT = process.env.PORT || 5000;


// Routes
app.use("/api/locations", locationRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
