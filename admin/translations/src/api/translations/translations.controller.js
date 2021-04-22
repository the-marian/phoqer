import { errorWrapper } from '../../services/helpers';
import Translations from './translations.model';
import validate from './translations.validations';

export const getContent = errorWrapper(async (req, res) => {
    const { lang } = req.params;
    res.send(await Translations.getContent(lang));
});

export const updateContent = errorWrapper(async (req, res) => {
    const { lang } = req.params;
    validate(req.body);

    const { id, content } = req.body;
    await Translations.updateContent(lang, { id, content });
    res.status(204).send();
});

export const addContent = errorWrapper(async (req, res) => {
    const { lang } = req.params;
    validate(req.body);

    const { id, content } = req.body;
    const languages = await Translations.allLanguages();
    console.log(languages);
    for await (let language of languages) {
        await Translations.addContent(language, { id, content: language === lang ? content : '' });
    }
    res.status(204).send();
});

export const deleteContent = errorWrapper(async (req, res) => {
    const { id } = req.params;
    if (!id) throw new Error('Provide the id');

    const languages = await Translations.allLanguages();

    for await (let language of languages) {
        await Translations.deleteContent(language, id);
    }
    res.status(204).send();
});
