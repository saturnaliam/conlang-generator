// Importing required file modules.
import { existsSync, writeFile, readFile } from 'node:fs';
import { Buffer } from 'node:buffer';


// The path and extension to be used.
const SAVE_PATH = 'save/';
const FILE_EXTENSION = '.lng';


// Converts an object to a string that works with JSON.
const objToJSON = (obj: object): string => {
    // Creates an array of the object's keys
    const keys = Object.keys(obj);

    let JSONString = '{';

    // For each key, add to the string in the JSON format.
    for (let i = 0; i < keys.length; i++) {
        JSONString += `"${keys[i]}":"${obj[keys[i]]}"`;
        if (!(i === keys.length - 1)) JSONString += ',';
    }
    
    // Ends the JSON string and returns it.
    JSONString += '}';
    return JSONString;
}


const save = (input: object, inputFileName = 'language') => {
    // Initializes the data object. (not sure why but just defining it as an object doesn't work?)
    const data = {};

    // Writes each of the keys and values of the input object to data. 
    // Without this, treats it as the Language class, and fucks stuff up.
    for (const [key, value] of Object.entries(input)) {
        Object.defineProperty(data, key.replace(/_/g, ''), { 
            value: value,
            enumerable: true
        });
    }

    // Checks to make sure the file doesn't exist, and if so, changes the file name by adding a number.
    let fileNum = 0;
    let fileName = inputFileName;
    while (existsSync(fileName + FILE_EXTENSION)) {
        fileName = inputFileName + fileNum;
        fileNum++;
    }

    // Converts the object to a buffer of the JSON string.
    const languageJSON = new Uint8Array(Buffer.from(objToJSON(data)));

    // Writes to a file.
    writeFile(SAVE_PATH + fileName + FILE_EXTENSION, languageJSON, () => {});
}


const read = (inputFileName: string): object => {
    readFile(SAVE_PATH + inputFileName + FILE_EXTENSION, (err, data) => {
        return JSON.parse(data.toString());
    })
    return {};
}

export { read, save }