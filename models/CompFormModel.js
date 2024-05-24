const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamMemberSchema = new Schema({
    Name: {
        type: String,
        // required: true
    },
    Designation: {
        type: String,
        // required: true
    },
    SocialProfile: {
        type: String,
        // required: true
    }
});

const CompanySchema = new Schema({
    Name: {
        type: String,
        // required: true,
        unique: true
    },
    Domain: {
        type: String,
        // required: true
    },
    Description: {
        type: String,
        // required: true,
        minlength: 50
    },
    Address: {
        Street: {
            type: String,
            // required: true
        },
        Landmark: {
            type: String,
            // required: true
        },
        PinCode: {
            type: String,
            // required: true
        },
    },
    Logo: {
        type: String, // Assuming the logo will be stored as a URL
        // required: true
    },
    Skillset: {
        type: [String], // An array of strings to store multiple skills
        // required: true
    },
    TeamMembers: {
        type: [TeamMemberSchema], // An array of TeamMember subdocuments
        default: [] // Default to an empty array
    }
});

module.exports = mongoose.model('Company', CompanySchema);
