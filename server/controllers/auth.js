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








