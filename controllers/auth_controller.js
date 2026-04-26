import { authService } from "../services/auth_service.js";
import { jwtService } from "../services/jwt_service.js";

class AuthController {

    login = async (req, res, next) => {
        try {
            const { name, password } = req.body;
            const user = await authService.login(name, password);

            if (user.error) {
                return res.status(400).json(user.error);
            }

            return res.status(200).json(user);
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
}

export const authController = new AuthController();