import { existsSync, writeFile, readFile } from 'node:fs';
import { Buffer } from 'node:buffer';

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
    let fileNum = 0;
    let fileName = inputFileName;
    const languageJSON = new Uint8Array(Buffer.from(objToJSON(input)));

    while (existsSync(fileName)) {
        fileName = inputFileName + fileNum;
        fileNum++;
    }

    writeFile(SAVE_PATH + fileName + FILE_EXTENSION, languageJSON, () => {});
}

const read = (inputFileName: string) => {
    readFile(SAVE_PATH + inputFileName + FILE_EXTENSION, (err, data) => {
        console.log(JSON.parse(data.toString()));
    })
}

export { read, save }