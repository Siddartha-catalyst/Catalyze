const mongoose =require('mongoose');
const FounderDet =require('../models/FounderDetModel')
const FounderDetRoutes =require('../routes/FounderDet')
const jwt = require('jsonwebtoken');

const getFounderDets=async(req,res)=>{
    try {
        const founders = await FounderDet.find({}).sort({ createdAt: -1 });
        console.log(founders);
        res.status(200).json(founders);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }
}

const getFounderDet=async(req,res)=>{
    const { id } = req.params;
  try {
    const founder = await FounderDet.findById(id);
    if (!founder) {
      return res.status(404).json({ message: 'Founder not found' });
    }
    res.status(200).json(founder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

const createFounderDet = async (req, res) => {
    const { Name, Email, Address, Qualifications, Experience, Achievements } = req.body;
  
    try {
      const newFounder = new FounderDet({
        Name,
        Email,
        Address,
        Qualifications,
        Experience,
        Achievements
      });
  
      await newFounder.save();
      console.log("Founder Created", newFounder);
  
      // Generate a JWT token for the newly created founder
      const token = jwt.sign({ founderId: newFounder._id }, 'abcdef', { expiresIn: '1h' });
  
      return res.status(201).json({ founder: newFounder, token, message: 'Founder created successfully' });
    } catch (error) {
      console.error('Error creating founder:', error);
      return res.status(400).json({ error: error.message });
    }
  };

  const updateFounderDet = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Assuming the token is passed as a Bearer token
    const updateData = req.body;
  
    try {
      const decoded = jwt.verify(token, 'abcdef'); // Replace 'your_jwt_secret' with your actual secret key
      const founderId = decoded.founderId;
  
      const updatedFounder = await FounderDet.updateOne(
        { _id: founderId },
        { $set: updateData }
      );
  
      if (updatedFounder.nModified === 0) {
        return res.status(404).json({ message: 'Founder not found or no changes made' });
      }
  
      return res.status(200).json({ message: 'Founder details updated successfully' });
    } catch (error) {
      console.error('Error updating founder details:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };


  const deleteFounderDet = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Assuming the token is passed as a Bearer token
  
    try {
      const decoded = jwt.verify(token, 'your_jwt_secret'); // Replace 'your_jwt_secret' with your actual secret key
      const founderId = decoded.founderId;
  
      const deletedFounder = await FounderDet.deleteOne({ _id: founderId });
  
      if (deletedFounder.deletedCount === 0) {
        return res.status(404).json({ message: 'Founder not found' });
      }
  
      return res.status(200).json({ message: 'Founder deleted successfully' });
    } catch (error) {
      console.error('Error deleting founder:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };


  module.exports={
    getFounderDet,
    getFounderDets,
    createFounderDet,
    updateFounderDet,
    deleteFounderDet,
  }
  