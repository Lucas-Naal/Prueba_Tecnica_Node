import { Router } from "express";
import {
    getUsers,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/users.controller.js";

const router = Router();

router.get('/users/get', getUsers);
router.post('/users/add', createUser);
router.put('/users/edit/:id', updateUser);
router.delete('/users/delete/:id', deleteUser);

export default router;
