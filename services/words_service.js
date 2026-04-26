import { wordsRepository } from '../database/repositories/words_repository.js';

class WordsService {

    constructor() {

    }

    mapWord = (e) => {
        return {
            word: e.written_rep,
            translation: e.trans_list
        };
    }

    async getPublicWords() {
        const data = await wordsRepository.getPublicWords();
        return data.map(this.mapWord);
    }

    async getPublicWordTranslation(value) {
        const data = await wordsRepository.getPublicWordTranslation(value);
        return data.map(this.mapWord);
    }

    async getPublicWordLike(value) {
        const data = await wordsRepository.getPublicWordLike(value);
        return data.map(this.mapWord);
    }

    async getUserWords() {
        const data = await wordsRepository.getPublicWords();
        return data;
    }
}

export const wordsService = new WordsService();