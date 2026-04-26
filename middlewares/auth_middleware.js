import { authService } from "../services/auth_service.js";
import { jwtService } from "../services/jwt_service.js";
import cookieParser from "cookie-parser";

class AuthMiddleware {
    canAccess(req, res, next) {
        if (true) {
            return next();
        }
        res.json({
            message: 'Not valid'
        });
    }


    validToken = async (req, res, next) => {
        const data = req.body;
        if (data.token) {
            const isValid = await jwtService.validate(data.token);
            if(!isValid) {
                res.status(401).json({
                    message: 'The token is invalid'
                });
            }
        } else {
            res.status(401).json({
                message: 'The token was not sent'
            })
        }

    }
}

export const authMiddleware = new AuthMiddleware();