// Importing prompt-sync for user input.
const Prompt = require('prompt-sync')({sigint: true});


// Wikipedia link
const INFORMATION_LINK = 'https://en.wikipedia.org/wiki/';


// Whenever the program is first opened.
let firstStart = true;


class Family {
    _name: string;
    _info: string;
    _subfamilies: string[];
    

    constructor(name: string, info: string, subfamilies = ['none']) {
        this._name = name;
        this._info = info;
        this._subfamilies = subfamilies;
    }


    get info() {
        return INFORMATION_LINK + this._info;
    }

    get name() {
        return this._name;
    }


    // Returns a random subfamily, if there are none then returns 'No subfamily.'.
    randomSubfamily(): string {
        return (this._subfamilies[0] === 'none' ? 'No subfamily.' : this._subfamilies[Math.floor(Math.random() * this._subfamilies.length)]);
    }
}


class Language {
    _inflection: string;
    _writing: string;
    _family: string;
    _subfamily: string;


    constructor(inflection: string, writing: string, family: string, subfamily: string) {
        this._inflection = inflection;
        this._writing = writing
        this._family = family
        this._subfamily = subfamily 
    } 


    // Getters for variables, returning false if there is none.
    get inflection() {
        return (this._inflection === 'none' ? false : this._inflection);
    }

    get writing() {
        return (this._writing === 'none' ? false : this._writing);
    }

    get family() {
        return (this._family === 'none' ? false : this._family);
    }

    get subfamily() {
        return (this._subfamily === 'none' ? false : this._subfamily);
    }
}


// Creating objects for each major language family.
const NIGER_CONGO = new Family('Niger-Congo', 'Niger–Congo_languages');
const AUSTRONESIAN = new Family('Austronesian', 'Austronesian_languages', ['Rukai', 'Tsouic', 'Atayalic', 'East Formosan', 'Bunun', 'Paiwan', 'Malayo-Polynesian']);
const TRANS_NEW_GUINEA = new Family('Trans-New Guinea', 'Trans–New_Guinea_languages', ['Berau Gulf', 'Sumeri', 'Irian Highlands', 'Asmat-Mombum', 'Central West New Guinea', 'Oksapmin', 'Bosavi', 'Duna-Pogaya', 'Anim', 'Abom', 'Southeast Papuan']);
const SINO_TIBETAN = new Family('Sino-Tibetan', 'Sino-Tibetan_languages', ['Sinitic', 'Lolo-Burmese', 'Tibetic', 'Karenic', 'Bodo-Garo', 'Kuki-Chin', 'Meitei', 'Tamangic', 'Bai', 'Jingpho-Luish']);
const INDO_EUROPEAN = new Family('Indo-European', 'Indo-European_languages', ['Albanian', 'Anatolian', 'Armenian', 'Balto-Slavic', 'Celtic', 'Dacian', 'Germanic', 'Greek', 'Illyrian', 'Indo-Iranian', 'Italic', 'Luburnian', 'Lusitanian', 'Messapic', 'Phrygian', 'Thracian', 'Tocharian']);
const AUSTRALIAN = new Family('Australian', 'Australian_Aboriginal_languages');
const AFRO_ASIATIC = new Family('Afro-Asiatic', 'Afroasiatic_languages', ['Berber', 'Chadic', 'Cushitic', 'Egyptian', 'Semitic', 'Omotic']);
const NILO_SAHARAN = new Family('Nilo-Saharan', 'Nilo-Saharan_languages', ['Berta', 'B\'aga', 'Fur', 'Kadu', 'Koman', 'Kuliak', 'Kunama', 'Maban', 'Saharan', 'Songhay', 'Central Sudanic', 'Eastern Sudanic', 'Mimi-D']);
const OTO_MANGUEAN = new Family('Oto-Manguean', 'Oto-Manguean_languages', ['Oto-Pamean', 'Chinantecan', 'Tlapanecan', 'Manguean', 'Popolocan', 'Zapotecan', 'Amuzgo', 'Mixtecan']);
const TAI_KADAI = new Family('Tai-Kadai', 'Kra–Dai_languages', ['Kra', 'Kam-Sui', 'Lakkia', 'Biao', 'Be', 'Tai', 'Hiai']);
const DRAVIDIAN = new Family('Dravidian', 'Dravidian_languages', ['Northern', 'Central', 'South-Central', 'Central']);
const TUPIAN = new Family('Tupian', 'Tupian_languages', ['Tupi-Guarani', 'Arikem', 'Aweti', 'Mawé', 'Monde', 'Mundurukú', 'Puruborá-Ramarama', 'Tuparí', 'Yuruna']);


// Creating arrays for each of the options.
const INFLECTION_TYPES = ['Oligosynthetic', 'Polysynthetic', 'Fusional', 'Agglutinative', 'Analytical'];
const ORTHOGRAPHY_TYPES = ['Abugida', 'Abjad', 'Alphabet', 'Logosyllabary', 'Syllabary', 'Featural System'];
const FAMILY_TYPES = [NIGER_CONGO, AUSTRONESIAN, TRANS_NEW_GUINEA, SINO_TIBETAN, INDO_EUROPEAN, AUSTRALIAN, AFRO_ASIATIC, NILO_SAHARAN, OTO_MANGUEAN, TAI_KADAI, DRAVIDIAN, TUPIAN];


// Generating the language.
const generateLanguage = (inflect: boolean, writing: boolean, family: number) => {
    // Gives an error if the family value is invalid, or if no language would be generated.
    if (family < 0 || family > 2) {
        console.error('Error: The language family must be a number between 0 and 2. Please refer to the README for more information.');
        return 0;
    }

    if (family === 0 && !inflect && !writing) {
        console.error('Error: All options are false, no language generated.');
        return 0;
    }   

    let lFamily: Family;

    // Initializing each variable with 'none' to work with getters in the Family class.
    let iType = 'none';
    let wType = 'none';
    let fType = 'none';
    let sfType = 'none';

    // Setting variables for the Family class based off user input.
    if (inflect) { iType = INFLECTION_TYPES[Math.floor(Math.random() * INFLECTION_TYPES.length)]; }

    if (writing) { wType = ORTHOGRAPHY_TYPES[Math.floor(Math.random() * ORTHOGRAPHY_TYPES.length)]; }

    if (family >= 1) { 
        lFamily = FAMILY_TYPES[Math.floor(Math.random() * FAMILY_TYPES.length)]; 
        fType = lFamily.name;
    }

    if (family === 2) { sfType = lFamily.randomSubfamily(); }

    return new Language(iType, wType, fType, sfType);
}


const userInput = (message: string): boolean => {
    return (Prompt(message)[0].toLowerCase() === 'y');
}


const printLang = lang => {
    // Ensuring a valid response prior to showing the language.
    if (typeof lang === 'object') {
        console.log('Language generated!');

        if (lang.inflection) { console.log(`  Inflection style: ${lang.inflection}`); }
        if (lang.writing) { console.log(`  Orthography: ${lang.writing}`); }
        if (lang.family) { console.log(`  Language family: ${lang.family}`); }
        if (lang.subfamily) { console.log(`    Language subfamily: ${lang.subfamily}`); }
    }
}


const promptUser = () => {
    try {
        // Gets user input.
        let inputSubfamily = 0;
        const INPUT_INFLECTION = userInput('Do you want to generate an inflection type? [Y/N] ');
        const INPUT_WRITING = userInput('Do you want to generate an orthography type? [Y/N] ');
        const INPUT_FAMILY = Number(userInput('Do you want to generate a language family? [Y/N] '));

        if (INPUT_FAMILY) { inputSubfamily = Number(userInput('Do you want to generate a language subfamily? [Y/N] ')); }

        printLang(generateLanguage(INPUT_INFLECTION, INPUT_WRITING, INPUT_FAMILY + inputSubfamily));

        menuStart();
    } catch (err) {
        console.error('Please input a value.\n');
        menuStart();
    }
}


const menuStart = () => {
    /* Commands:
        - gen {flags} (Generates a language according to the given flags. Without flags, goes into the prompts for languages.)
        - exit (Exits program.)
        - help (Shows list of commands.)
    */

    firstStart ? console.log('=== Welcome to Lucia\'s Conlang Generator! ===') : console.log();
    firstStart = false;

    try {
        const INPUT = Prompt('> ').toLowerCase();

        if ((INPUT.trim().split(/\s+/)[0]) === 'gen' && INPUT.length > 3) {
            const splitGen = INPUT.trim().split(/\s+/);
            
            let inflect = false;
            let write = false;
            let family = 0;

            for (const flag of splitGen) {
                if (flag === 'gen') { continue; }

                switch (flag) {
                    case '-i':
                        inflect = true;
                        break;
                    case '-w':
                        write = true;
                        break;
                    case '-f':
                        family = 1;
                        break;
                    case '-sf':
                        family = 2;
                        break;
                    default:
                        throw Error(`Error: Unknown flag '${flag}'.`);
                        break;
                }                
            }

            printLang(generateLanguage(inflect, write, family));
            menuStart();
        }

        switch (INPUT) {
            case 'gen':
                promptUser();
                break;

            default:
                throw Error('Error: Unknown command!');
                break;
        }

        menuStart();
    } catch (err) {
        console.error(err.message);
        menuStart();
    }
}


menuStart();

// TODO Direct commands