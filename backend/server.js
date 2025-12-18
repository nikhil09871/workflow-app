const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const workflowRoutes = require("./routes/workflow.routes");

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api", workflowRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
