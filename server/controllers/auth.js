import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';


/* REGISTER USER */

export const register = async (req, res) => {        //request and response to MongoDB

  try { 
    const { 
        firstName, 
        lastName,
        email, 
        password,
        picturePath,
        friends,
        location,
        ocupation,
    } = req.body;

    const salt = await bcrypt.genSalt(10);        //generate salt encryption
    const passwordHash = await bcrypt.hash(password, salt);    //hash password
     
    const newUser = new User({        //create new user
        firstName, 
        lastName,
        email, 
        passwordHash,
        picturePath,
        friends,
        location,
        ocupation,
        viewedProfiles: Math.floor(Math.random() * 1000), //random number of viewed profiles
        impressions: Math.floor(Math.random() * 1000), //random number of impressions
    });

    const savedUser = await newUser.save();        //save user to MongoDB
    res.status(201).json(savedUser);        //return response
  } catch (error) {

      res.status(500).json({ error: err.message });        //return error
  }
};


/* LOGIN USER */  /* BASIC AUTHENTICATION */

export const login = async (req, res) => {                                            //request and response to MongoDB
    try {
        const { email, password } = req.body;                                         //get email and password from request

        const user = await User.findOne({ email: email  });                           //find user in MongoDB   
        if (!user) return res.status(400).json({ msg: "User not found." }); .         //if user not found return error

        const isMatch = await bcrypt.compare(password, user.password);               //compare password with passwordHash
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });   //if password not match return error

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);             //create token 
        delete.user.password;
        res.status(200).json({ token, user });                                       //return response



    } catch (error) {

      res.status(500).json({ error: err.message });        //return error
}
};









