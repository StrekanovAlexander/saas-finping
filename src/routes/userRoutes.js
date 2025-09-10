import express from 'express';
import { 
    createUser, 
    getUsers, 
    getUser, 
    updateUser, 
    deleteUser,
    changePasswordHash,
    activateUser,
    loginUser 
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

router.put('/:id/password', changePasswordHash);
router.get('/activate/:token', activateUser); 
router.post("/login", loginUser);

export default router;