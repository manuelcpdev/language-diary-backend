import { pool } from "../database/db_config.js";
import { usersRepository } from "../database/repositories/users_repository.js";
import bcrypt from 'bcryptjs';
import { jwtService } from "./jwt_service.js";

class AuthService {
    login = async (input: LoginUser) => {
        const { name, password } = input;
        try {
            const result = await usersRepository.getUser(name);
            const user = result[0];
            if(user === undefined) {
                throw new Error('The user doesn\'t exist');
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password) ? true : false;
    
            if (!isPasswordValid) {
                throw new Error('Password is invalid')
            }
    
            const accessToken = await jwtService.generateToken({
                sub: user.id, 
                name: user.name, 
                role: user.role
            }, '15m', 'access');
            const refreshToken = await jwtService.generateToken({ 
                sub: user.id 
            }, '7d', 'refresh');
            return {
                accessToken: accessToken,
                refreshToken: refreshToken
            };
        } catch (error) {
            return {
                error: error instanceof Error ? error.message : error
            }
        }
    }

    regenerateToken = async (refreshToken: string) => {
        try {            
            const decryptedRefreshToken = await jwtService.validate(refreshToken, 'refresh');
            const user = await usersRepository.getUserById(decryptedRefreshToken.payload?.sub);
            const { id, name, role} = user[0];
            const newAccessToken = await jwtService.generateToken({sub: id, name: name, role: role}, '15m');
            return newAccessToken;
        } catch (error) {
            console.log(error)
            return {
                error: error instanceof Error ? error.message : error 
            }
        }
    }
}

export const authService = new AuthService();