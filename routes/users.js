const router = require("express").Router();
const User = require("../models/users");
const authenticateToken = require("../token/authenticateToken");

router.post("/", authenticateToken,async (req, res) => {

    try {
      const result = await User.find({loggedIn:1},['name','email','loggedIn','mobile_number','createdAt']);
      
      return res.status(200).send({ Message: result, status: true });
    } catch (err) {
      return res.status(500).send({ Message: err, status: false });
    }
});

module.exports = router;
