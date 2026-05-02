import { authService } from "../services/auth_service.js";
import { jwtService } from "../services/jwt_service.js";
import cookieParser from "cookie-parser";

class AuthController {

    login = async (req, res, next) => {
        try {
            const { name, password } = req.body;
            const tokens = await authService.login({ name, password });

            if (tokens.error) {
                return res.status(400).json(tokens.error);
            }
            if (req.cookies.refreshToken) {
                console.log(req.cookies.refreshToken)
            }
            res.cookie('refreshToken', tokens.refreshToken, {
                domain: 'localhost',
                path: '/auth/refresh',
                expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 7)),
                secure: false,
                httpOnly: true
            });

            return res.status(200).json({
                accessToken: tokens.accessToken
            });
        } catch (error) {
            return res.status(400).json({
                error: error.message
            })
        }
    }
    regenerateToken = async (req, res) => {
        try {
            const refreshToken =
                req.cookies.refreshToken || req.headers['x-refresh-token'];

            if (!refreshToken) {
                return res.status(401).json({
                    error: 'Refresh token not provided'
                });
            }

            const accessToken = await authService.regenerateToken(refreshToken);

            if (accessToken.error) {
                return res.status(401).json({
                    error: accessToken.error
                });
            }

            return res.status(200).json({
                accessToken: accessToken
            });

        } catch (err) {
            return res.status(500).json({
                error: err.message
            });
        }
    };

    logout = async (req, res, next) => {
        try {
            res.clearCookie('refreshToken', {
                domain: 'localhost',
                path: '/auth/refresh',
            });
            console.log(req.cookies.refreshToken)
            res.status(200).json({
                message: 'Logged out successfully'
            });
        } catch (error) {
            res.status(400).json({
                error: "There was an unexpected error while trying to log out"
            })
        }
    }
}

export const authController = new AuthController();