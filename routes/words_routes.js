import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware.js";
import { wordsController } from "../controllers/words_controller.js";

export const router = Router();
router.param('user', (req, res, next, id) => {
    req.user = 'hola'
    next()
});
router.route('/')
.get(authMiddleware.canAccess, wordsController.get);

router.get('/test/:user', (req, res, next) => {
    return res.json(req.user);
});