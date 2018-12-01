const express = require("express");
const router = express.Router();

// Do work here
router.get("/api/hello", (req, res) => {
  console.log(req.body)
  res.send("Hello");
});

router.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

router.post;

module.exports = router;
