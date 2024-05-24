const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // username: {
    //     type: String,
    //     required: true,
    //     unique: true // Ensures usernames are unique
    // },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures emails are unique
        lowercase: true, // Converts email to lowercase
        // You can add more validation for email format using regex or libraries
    },
    password: {
        type: String,
        required: true,
    },
    // You can add more fields as needed, such as name, age, etc.
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps automatically

module.exports = mongoose.model('User', userSchema);

