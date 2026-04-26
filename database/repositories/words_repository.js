import { pool } from "../db_config.js";

class WordsRepository {
    constructor() {

    }

    async getPublicWords() {
        return await pool.query('SELECT written_rep, trans_list FROM simple_translation LIMIT 10');
    }

    async getPublicWordTranslation(value) {
        return await pool.query('SELECT written_rep, trans_list FROM simple_translation WHERE written_rep=? LIMIT 1', [value]);
    }

    async getPublicWordLike(value) {
        return await pool.query(`SELECT written_rep, trans_list FROM simple_translation WHERE written_rep LIKE ? ORDER BY (written_rep = ?) DESC, (written_rep LIKE ?) DESC, LENGTH(written_rep) LIMIT 100`, [`%${value}%`, value, `%${value}%`]);
    }

    async getUserWords() {
        
    }
}

export const wordsRepository = new WordsRepository();