import { Router } from "express";
import { usersController } from "../controllers/users_controller.js";
import { body, validationResult } from "express-validator";
export const router = Router();
const creationRules = [body('name').notEmpty(), body('password').notEmpty()];

router.post('/', usersController.login)
router.put('/', ...creationRules, (req, res, next) => {
    const result = validationResult(req);
    if(result.isEmpty()) {
        next();
    } else {
        res.status(400).json({
            error: 'You must write a name and a password'
        });
    }
}, usersController.create)