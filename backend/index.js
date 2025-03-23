import express from "express";
import cors from "cors";
import apiRoutes from "./routes/index.js"

const PORT = process.env.BACKEND_PORT || 3000;
const app = express();

app.use(cors({
  origin: "*", // Allows requests from any origin
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allows cookies (if needed)
}))
app.use(express.json());
app.use("/api", apiRoutes);

app.listen(PORT, ()=>{
  console.log(`Server is listening on port: ${PORT}`);
});
