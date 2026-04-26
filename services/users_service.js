import bcrypt from 'bcryptjs';
import { usersRepository } from '../database/repositories/users_repository.js';
import { SignJWT, jwtVerify } from 'jose';
import { jwtService } from './jwt_service.js';
class UsersService {

    async createUser(name, password, role = 'user') {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const data = [name, hash, role];
        try {
            const user = await usersRepository.createUser(...data);

            if (user.error) {
                return {
                    error: user.error
                }
            }
        } catch (err) {
            return {
                error: `Unexpected error: ${err}`
            }
        }

        return user;
    }

    login = async (name, password) => {
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
    
            const token = await jwtService.generateToken({sub: user.id, name: user.name, role: user.role}, '15m');
            const refreshToken = await jwtService.generateToken({ sub: user.id }, '7d');
            return {
                token: token,
                refreshToken: refreshToken
            };
        } catch (error) {
            return {
                error: error.message
            }
        }
    }
}

export const usersService = new UsersService();