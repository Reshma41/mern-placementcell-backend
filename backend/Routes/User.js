const express=require('express')
const routes=express.Router()
const bcrypt = require('bcrypt');
const userSchema=require('../User/userSchema')
const questionSchema=require('../User/questionSchema')
const multer = require('multer');
 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Upload'); // Set the path to your upload directory
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  
  routes.post('/Adduser', upload.single('image'), async (req, res) => {
    try {
      const {
        name,
        contact,
        email,
        password,
        stream,
      } = req.body;
  
      if (!req.file) {
        return res.status(400).json({ message: 'Image required.' });
      }
  
      const newuser = new userSchema({
        name: req.body.name,
        contact: req.body.contact,
        email: req.body.email,
        password: req.body.password,
        stream: req.body.stream,
        image: req.file.path
      });
  
      await newuser.save()
        .then(data => {
          console.log(data);
          res.json({
            status: 200,
            msg: 'Data added',
            data: data,
          });
        })
        .catch(err => {
          console.log(err);
          res.send(err);
        });
  
      console.log('Added new User');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })
  routes.get('/userDetails/:userId', async (req, res) => {
    try {

        const userId = req.params.userId;
        const user = await userSchema.findById(userId);
        console.log("user id : ",userId)
        if (!user) {
            return res.status(501).json({ message: 'User not found' });
        }

        // Extract relevant user details
        const userDetails = {
            username: user.name,
            email: user.email,
            image: user.image,
            stream: user.stream,
        };

        res.status(200).json(userDetails);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
routes.post('/login', async (req, res) => {
    try {
    
      const { email,password } = req.body;
      const user = await userSchema.findOne({ email });
      if (!user) return res.status(500).json({error: "Email/Password mismatch!"});
    
      const matched = await user.comparePassword(password);
      if (!matched) return res.status(404).json({error: "Email/Password mismatch!"});
      if (matched) return res.json( user);
    }
    catch (error) {
        console.error('Server Error', error);
        return res.status(500).json({error: " server error "});

      }

    });
    routes.post("/Form",(req,res)=>
    {
        console.log("Success")

        const newuser=new questionSchema({

            hyrd:req.body.hyrd,
            Pid:req.body.Pid,
            Atin:req.body.Atin,
            Aofint:req.body.Aofint,
            offer:req.body.offer,
            offeri:req.body.offeri
        })
        newuser.save() 
.then(data=>{
    console.log(data)
    res.json({
        status:200,
        msg:"data added",
        data:data
    })
})
.catch(err=>{
    console.log(err)
    res.send(err)
})
console.log("Submitted")

})

    module.exports = routes;
