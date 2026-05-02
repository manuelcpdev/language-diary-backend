import bcrypt from 'bcryptjs';
import { usersRepository } from '../database/repositories/users_repository.js';
import { SignJWT, jwtVerify } from 'jose';
import { jwtService } from './jwt_service.js';
class UsersService {

    async createUser(input: CreateUser) {
        const { name, password, role = 'user' } = input;
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
            return user;
        } catch (err) {
            return {
                error: `Unexpected error: ${err}`
            }
        }

    }
}

export const usersService = new UsersService();