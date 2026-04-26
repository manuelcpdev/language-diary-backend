import { wordsService } from "../services/words_service.js";
class WordsController {
    constructor () {

    }

    get = async (req, res, next) => {
        const { like, match } = req.query;
        if(like && match) {
            return res.status(400).json({
                message: "You can't use query parameters 'like' and 'match' at the same time"
            })
        }
        if (like) {
            const words = await wordsService.getPublicWordLike(like)
            //return res.json(await wordsService.getWordLike(like), {test: this.test});
            return res.json(words)
        }
        if (match) {
            return res.json(await wordsService.getPublicWordTranslation(match));
        }
        res.json(await wordsService.getPublicWords());
    }
}

export const wordsController = new WordsController();