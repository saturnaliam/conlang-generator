import { existsSync, writeFile, readFile } from 'node:fs';
import { Buffer } from 'node:buffer';
import { FILE } from 'node:dns';

const SAVE_PATH = 'save/';
const FILE_EXTENSION = '.lng';

const objToJSON = (obj: object): string => {
    const keys = Object.keys(obj);
    let JSONOut = '{';
    for (let i = 0; i < keys.length; i++) {
        JSONOut += `"${keys[i]}":"${obj[keys[i]]}"`;
        if (!(i === keys.length - 1)) JSONOut += ',';
    }
    
    JSONOut += '}';
    return JSONOut;
}

const save = (input: object, inputFileName = 'language') => {
    const data = {};
    for (const [key, value] of Object.entries(input)) {
        Object.defineProperty(data, key.replace(/_/g, ''), { 
            value: value,
            enumerable: true
        });
    }

    let fileNum = 0;
    let fileName = inputFileName;
    const languageJSON = new Uint8Array(Buffer.from(objToJSON(data)));
    console.log(objToJSON(data));
    while (existsSync(fileName + FILE_EXTENSION)) {
        fileName = inputFileName + fileNum;
        fileNum++;
    }
    writeFile(fileName + FILE_EXTENSION, languageJSON, () => {});
    console.log(languageJSON);
}

const read = (inputFileName: string): object => {
    console.log(SAVE_PATH + inputFileName + FILE_EXTENSION);
    console.log(existsSync(SAVE_PATH + inputFileName + FILE_EXTENSION));
    readFile(SAVE_PATH + inputFileName + FILE_EXTENSION, (err, data) => {
        return JSON.parse(data.toString());
    })
    return {};
}

export { read, save }