const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const mongoose = require('mongoose');
const Question = require('../User/questionSchema');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Upload');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/Form', upload.single('offerDocument'), async (req, res) => {
  try {
    console.log('Received data:', req.body);

    const { studentid, register, placementId, attendedInterviews, areaOfInterest, receivedJobOffers } = req.body;

    if (register === 'Yes' && (!placementId || !attendedInterviews || !areaOfInterest || !receivedJobOffers)) {
      return res.status(400).json({ message: 'Required fields are missing.' });
    }

    const newQuestion = new Question({
      studentid,
      hyrd: 'default value', // Provide default or change this as per your application logic
      Pid: placementId,
      Atin: attendedInterviews,
      Aofin: 'default value', // Provide default or change this as per your application logic
      offer: 'default value', // Provide default or change this as per your application logic
      offeri: req.file ? req.file.filename : null,
    });

    const savedQuestion = await newQuestion.save();

    res.json({
      status: 200,
      msg: 'Data added',
      data: savedQuestion,
    });
  } catch (error) {
    console.error('Error saving question:', error.message);
    res.status(500).send('Internal Server Error');
  }
});
/*router.get('/responses', async (req, res) => {
    try {
      const responses = await Question.find().populate('studentid', 'username email'); // Assuming you want to populate the user details
      res.json(responses);
    } catch (error) {
      console.error('Error fetching student responses:', error.message);
      res.status(500).send('Internal Server Error');
    }
  });*/
  router.get('/Responses', async (req, res) => {
    try {
      // Fetch all documents from the questions collection
      const allResponses = await  Question.find();
  
      res.status(201).json(allResponses);
      
    } catch (error) {
      console.error('Error fetching all responses:', error.message);
      res.status(500).json({
        status: 500,
        error: 'Internal Server Error',
      });
    }
  })



module.exports = router;