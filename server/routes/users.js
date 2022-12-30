import express from 'express';
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from '../controllers/users.js';
import verifyToken from '../middleware/verifyToken.js';


const router = express.Router();  

/* READ */
router.get('/:id', verifyToken, getUser); // get user by id 
router.get('/:id/friends', verifyToken, getUserFriends); // get friends of user 

/* UPDATE */
router.patch('/:id/friendId', verifyToken, addRemoveFriend); // add or remove friend 

export default router;


