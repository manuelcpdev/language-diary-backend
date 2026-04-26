import { pool } from "../db_config.js";

class UsersRepository {
    constructor() {

    }

    async createUser(name, password, role = 'user') {
        return pool.query('INSERT INTO users (name, password, role) VALUES (?, ?, ?)', [name, password, role])
        .then((rows) => {
            console.log(`User ${name} was created`)
            return rows.insertId;
        })
        .catch((err) => {
            //console.log(`Error creating user: ${err}`)
            const error = {
                error: `SQL Error: ${err.sqlMessage}`
            }
            console.log(error)
            return error;
        });
    }

    async getUser(name) {
        return await pool.query('SELECT * from users WHERE name=?', name);
    }

    async getUserById(id) {
        return await pool.query('SELECT * from users WHERE id=?', id);
    }
}

export const usersRepository = new UsersRepository();