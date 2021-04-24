import fs from 'fs';
import path from 'path';

import { CustomError } from '../../services/helpers';

const fsPromises = fs.promises;

export default class Translations {
    static dirPath = path.join(process.cwd(), '..', '..', 'frontend', 'translations', 'locales');
    constructor(id, content) {
        this.id = id;
        this.content = content;
    }

    static getFilePath(lang) {
        return path.join(this.dirPath, `${lang}.json`);
    }
    static async allLanguages() {
        const languages = [];
        const files = await fsPromises.readdir(this.dirPath);
        for (const file of files) languages.push(file.replace('.json', ''));
        return languages;
    }

    static async getContent(lang) {
        return JSON.parse(await fsPromises.readFile(this.getFilePath(lang), 'utf8'));
    }

    static async updateContent(lang, data) {
        const trans = await this.getContent(lang);
        trans[data.id] = data.content;
        await fsPromises.writeFile(this.getFilePath(lang), JSON.stringify(trans, null, 4), 'utf8');
    }

    static async addContent(lang, data) {
        const trans = await this.getContent(lang);

        // check duplicate
        if (trans[data.id]) throw new CustomError('id duplicate', 409);

        // add content
        trans[data.id] = data.content;
        await fsPromises.writeFile(this.getFilePath(lang), JSON.stringify(trans, null, 4), 'utf8');
    }

    static async deleteContent(lang, id) {
        const trans = await this.getContent(lang);

        // return if field not exist
        if (trans[id] === undefined) return;

        // delete content
        delete trans[id];
        await fsPromises.writeFile(this.getFilePath(lang), JSON.stringify(trans, null, 4), 'utf8');
    }
}
