import { SqlError } from 'mariadb';
import { wordsRepository } from '../database/repositories/words_repository.js';
import { getError } from '../helpers/genericerror.js';

class WordsService {

    constructor() {

    }

    mapWordPublic = (e:{id: string, written_rep: string, trans_list: string}): WordPublic => {
        return {
            id: e.id,
            word: e.written_rep,
            translation: e.trans_list
        };
    }

    async getPublicWords() {
        try {            
            const data = await wordsRepository.getPublicWords();
            return data.map(this.mapWordPublic);
        } catch (error: unknown) {
            const parsed = getError(error);
            if(parsed.messageDev) {
                console.log(parsed.messageDev);
            }
            throw new Error (parsed.message);
        }
    }

    async getPublicWordTranslation(value: string) {
        try {
            const data = await wordsRepository.getPublicWordTranslation(value);
            return data.map(this.mapWordPublic);
        } catch (error) {
            const parsed = getError(error);
            if(parsed.messageDev) {
                console.log(parsed.messageDev);
            }
            throw new Error (parsed.message);
        }
    }

    async getPublicWordLike(value: string) {
        const data = await wordsRepository.getPublicWordLike(value);
        return data.map(this.mapWordPublic);
    }

    async getUserWords() {
        const data = await wordsRepository.getPublicWords();
        return data;
    }
}

export const wordsService = new WordsService();