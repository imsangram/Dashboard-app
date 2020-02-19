const router = require("express").Router();

router.post("/register", (req, res) => {
  try {
    res.json("register");
  } catch (err) {
    res.json("error occured");
  }
});

module.exports = router;
