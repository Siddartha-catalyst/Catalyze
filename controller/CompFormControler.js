const mongoose =require('mongoose');
const Company =require('../models/CompFormModel')
const CompFormRoutes =require('../routes/CompForm')
const jwt = require('jsonwebtoken');

const getCompForms=async(req,res)=>{
    try {
        const CompanyDetails = await Company.find({}).sort({ createdAt: -1 });
        console.log(CompanyDetails);
        return res.status(200).json({CompanyDetails });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

const getCompForm=async(req,res)=>{

};

// const createCompForm=async(req,res)=>{
//     const Company = require('../models/Company');




const createCompForm = async (req, res) => {
    const {
        Name,
        Domain,
        Description,
        Address,
        Logo,
        Skillset,
        TeamMembers
    } = req.body;

    try {
        const newCompany = new Company({
            Name,
            Domain,
            Description,
            Address,
            Logo,
            Skillset,
            TeamMembers
        });

        await newCompany.save();
        console.log("Company Created", newCompany);
        const token = jwt.sign({ companyId: newCompany._id }, 'abcdef', { expiresIn: '1h' });

        return res.status(201).json({ company: newCompany, token, message: 'Company created successfully' });
    } catch (error) {
        console.error('Error creating company:', error);
        return res.status(400).json({ error: error.message });
    }
};



const updateCompForm = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Assuming the token is passed as a Bearer token
    const updateData = req.body;

    try {
        const decoded = jwt.verify(token, 'abcdef');
        const companyId = decoded.companyId;

        const updatedCompany = await Company.updateOne(
            { _id: companyId },
            { $set: updateData }
        );

        if (updatedCompany.nModified === 0) {
            return res.status(404).json({ message: 'Company not found or no changes made' });
        }

        return res.status(200).json({ message: 'Company details updated successfully' });
    } catch (error) {
        console.error('Error updating company details:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};







const deleteCompForm=async(req,res)=>{

};

// const updateCompForm=async(req,res)=>{

// };


module.exports={
    getCompForm,
    getCompForms,
    createCompForm,
    deleteCompForm,
    updateCompForm,

};
