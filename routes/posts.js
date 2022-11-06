const router = require("express").Router();
const Posts = require("../models/posts");
const Likes = require("../models/likes");

const authenticateToken = require("../token/authenticateToken");

router.post("/create", authenticateToken,async (req, res) => {
  const { title, description, image_path } = req.body;

  try {
    const data = new Posts({
      title,
      description,
      image_path,
      slug:title,
      user_id: req.user.id,
    });
    const result = await data.save();
    
    return res.status(200).send({ Message: "Post Created Successfully", status: true });
  } catch (err) {
    return res.status(500).send({ Message: err, status: false });
  }
});


router.post("/list", authenticateToken,async (req, res) => {

    try {
    //console.log(req.user.id);
      const result = await Posts.find({user_id:req.user.id});
      
      return res.status(200).send({ Message: result, status: true });
    } catch (err) {
      return res.status(500).send({ Message: err, status: false });
    }
});


router.post("/like_post/:id", authenticateToken, async (req, res) => {

    try {
        const results=await Likes.count({post_id:req.params.id,user_id:req.user.id});

        if(results==0)
        {
        let watingData=new Promise((resolve,reject)=>{
            let data = new Likes({
                post_id:req.params.id,
                user_id:req.user.id,
                likes:1
            });
            const result=data.save();
            resolve(result);
        });
        
        watingData.then((data)=>{
            return res.status(200).send({ Message: "You Liked This Post", status: false });
        })
        }else
        {
            return res.status(200).send({ Message: "Already Liked This Post By You", status: false });
        }
    } catch (err) {
      return res.status(500).send({ Message: err, status: false });
    }
});



module.exports = router;
