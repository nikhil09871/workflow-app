const express = require("express");
const router = express.Router();

/**
 * GET /api/workflows
 * Returns mock workflow data
 */
router.get("/workflows", (req, res) => {
  const workflows = [
    {
      id: "wf001",
      name: "Daily ETL Pipeline",
      status: "Running",
      startTime: "2025-07-03T08:00:00Z",
      owner: "India"
    },
    {
      id: "wf002",
      name: "Weekly Sync",
      status: "Completed",
      startTime: "2025-07-02T06:00:00Z",
      owner: "India"
    }
  ];

  // simulate delay
  setTimeout(() => {
    res.json(workflows);
  }, 1000);
});

module.exports = router;
