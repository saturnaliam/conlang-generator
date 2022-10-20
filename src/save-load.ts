import { existsSync, writeFileSync, readFileSync } from 'node:fs';
const SAVE_PATH = 'save/';

const objToJSON = (obj: object): string => {
    const keys = Object.keys(obj);
    let JSONOut = '{';
    for (let i = 0; i < keys.length; i++) {
        JSONOut += `"${keys[i]}":"${obj[keys[i]]}",`;
    }

    JSONOut += '}';
    return JSONOut;
}

const save = (input: object, inputFileName = 'language') => {
    let fileNum = 0;
    let fileName = inputFileName;
    const languageJSON = objToJSON(input);

    while (existsSync(SAVE_PATH + fileName)) {
        fileName = inputFileName + fileNum;
        fileNum++
    }

    writeFileSync(SAVE_PATH + fileName, languageJSON);
}

const read = (inputFileName: string): object => {
    let lang = readFileSync(SAVE_PATH + inputFileName);
    return JSON.parse(lang);
}

export { read, save }
