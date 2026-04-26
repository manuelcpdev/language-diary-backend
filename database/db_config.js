import * as mariadb from 'mariadb';

export const pool = mariadb.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    connectionLimit: 10
});

async function asyncFunction() {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM simple_translation LIMIT 10');
        console.log(rows);
    } catch (err) {
        throw err;
    }
}