const router = require("express").Router();
const User = require("../models/users");
const generateToken = require("../token/generateToken.js");
const bcrypt = require('bcryptjs');

router.post('/', async function (req, res, next) {
	//console.log(req.body);
    try {
        const { email, password } = req.body;

    if (!(email && password)) {
        return res.status(200).send({Message:"email and password input is required",status:false});
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = generateToken(user._id);
      let data=await User.updateOne({email},{ $set:{ _token: token ,loggedIn:1}});

      return res.status(200).json({Message:"Login Successfully",status:true,_token:token});
    }
    return res.status(200).send({Message:"Invalid Credentials",status:false});
  } catch (err) {
    res.status(500).send({Message:err,status:false});
  }
});

module.exports = router;
