const mongoose = require('mongoose');
const User = require('../models/workoutmodel');
const workoutRoutes = require("../routes/workouts");
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt')
const saltRounds = 10;

// Get all workouts
const getWorkouts = async (req, res) => {
    try {
        const workouts = await User.find({}).sort({ createdAt: -1 });
        console.log(workouts);
        return res.status(200).json({ workouts });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// Get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' });
    }

    try {
        const workout = await User.findById(id);
        if (!workout) {
            return res.status(404).json({ error: 'No such workout' });
        }
        return res.status(200).json(workout);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// Create a new workout
const createWorkout = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        console.log("user Created", user);
        const token = jwt.sign({ email }, 'abcdef', { expiresIn: '1h' });
        console.log(token);
        return res.status(200).json({ user:user, token:token, message: 'POST a new User' });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("hello");

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a token (if using JWT)
        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

// Delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' });
    }

    try {
        const workout = await User.findOneAndDelete({ _id: id });
        if (!workout) {
            return res.status(404).json({ error: 'No such workout' });
        }
        return res.status(200).json(workout);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// Update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' });
    }

    try {
        const workout = await User.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
        if (!workout) {
            return res.status(404).json({ error: 'No such workout' });
        }
        return res.status(200).json(workout);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout,
    login
};
