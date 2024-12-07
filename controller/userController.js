const users = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

// register
exports.RegisterController = async (req, res) => {
    console.log("Inside registerController");
    const { username, email, password } = req.body;
    console.log(username, email, password);

    try {
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(406).json("User already exists. Please login");
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new users({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(200).json({ message: "User registered successfully", user: newUser });
    } catch (err) {
        console.error("Error in registerController:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// login
exports.LoginController = async (req, res) => {
    console.log("Inside loginController");
    const { email, password } = req.body;
    console.log(email, password);

    try {
        const existingUser = await users.findOne({ email });
        if (!existingUser) {
            return res.status(404).json("Invalid E-mail or Password");
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(404).json("Invalid E-mail or Password");
        }
        const token = jwt.sign({ userId: existingUser._id }, process.env.JWTPASSWORD);
        res.status(200).json({ user: existingUser, token });
    } catch (err) {
        console.error("Error in loginController:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// list all users - get
exports.allUsers = async (req, res) => {
    console.log("Inside allUsersController");
    try {
        const allUsers = await users.find();
        if (allUsers && allUsers.length > 0) {
            res.status(200).json(allUsers);
        } else {
            res.status(404).json("No users found");
        }
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};