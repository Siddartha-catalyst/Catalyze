const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const FounderDetSchema = new Schema({
    Name: {
        type: String,
        // required: true
    },
    Email: { 
        type: String,
        //  required: true 
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
    Qualifications: { 
        type: String,
        // required: true 
    },
    Experience: { 
        type: String,
        // required: true
    },
    Achievements: { 
        type: [String], 
        // required: true 
        default: []
    }


});

module.exports = mongoose.model('FounderDet',FounderDetSchema);