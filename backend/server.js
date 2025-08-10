const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ✅ Enable CORS for all origins (you can restrict later)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/vote", require("./routes/voteRoutes"));
app.use("/api/results", require("./routes/resultRoutes"));
app.use("/api/candidates", require("./routes/candidateRoutes"));
app.use("/api/form-sync", require("./routes/formSyncRoutes"));

// ✅ Health check route (optional but useful for Render)
app.get("/", (req, res) => {
  res.send("Voting API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
