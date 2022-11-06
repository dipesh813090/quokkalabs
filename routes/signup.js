const router = require("express").Router();
const User = require("../models/users");
const generateToken = require("../token/generateToken.js");

router.post("/", async (req, res) => {
  try {
    // Get user input
    const { name, mobile_number, email, password } = req.body;

    // Validate user input
    if (!(email && password && name)) {
      return res.status(400).send("email , password and name  input is required");
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(200).send({Message:"User Already Exist. Please Login",status:false});
    }

    //Encrypt user password
    //encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const data = await new User({
      name,
      mobile_number,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password,
      status:1,
      _token:generateToken(this._id)
    });
    let user = await data.save();

    const token = user._token;

    return res.status(200).json({Message:"Successfully Account Created.",status:true,_token:token});
  } catch (err) {
    return res.status(500).json({Message:err,status:false});
  }
});

module.exports = router;