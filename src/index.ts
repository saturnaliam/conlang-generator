// Importing prompt-sync for user input.
const Prompt = require('prompt-sync')({sigint: true});

class Family {
    _name: string;
    _subfamilies: string[];
    
    constructor(name: string, subfamilies = ['none']) {
        this._name = name;
        this._subfamilies = subfamilies;
    }

    get name() {
        return this._name;
    }

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
const NIGER_CONGO = new Family('Niger-Congo');
const AUSTRONESIAN = new Family('Austronesian', ['Rukai', 'Tsouic', 'Atayalic', 'East Formosan', 'Bunun', 'Paiwan', 'Malayo-Polynesian']);
const TRANS_NEW_GUINEA = new Family('Trans-New Guinea', ['Berau Gulf', 'Sumeri', 'Irian Highlands', 'Asmat-Mombum', 'Central West New Guinea', 'Oksapmin', 'Bosavi', 'Duna-Pogaya', 'Anim', 'Abom', 'Southeast Papuan']);
const SINO_TIBETAN = new Family('Sino-Tibetan', ['Sinitic', 'Lolo-Burmese', 'Tibetic', 'Karenic', 'Bodo-Garo', 'Kuki-Chin', 'Meitei', 'Tamangic', 'Bai', 'Jingpho-Luish']);
const INDO_EUROPEAN = new Family('Indo-European');
const AUSTRALIAN = new Family('Australian');
const AFRO_ASIATIC = new Family('Afro-Asiatic');
const NILO_SAHARAN = new Family('Nilo-Saharan');
const OTO_MANGUEAN = new Family('Oto-Manguean');
const TAI_KADAI = new Family('Tai-Kadai');
const DRAVIDIAN = new Family('Dravidian');
const TUPIAN = new Family('Tupian');

const INFLECTION_TYPES = ['Oligosynthetic', 'Polysynthetic', 'Fusional', 'Agglutinative', 'Analytical'];
const ORTHOGRAPHY_TYPES = ['Abugida', 'Abjad', 'Alphabet', 'Logosyllabary', 'Syllabary', 'Featural System'];
const FAMILY_TYPES = [NIGER_CONGO, AUSTRONESIAN, TRANS_NEW_GUINEA, SINO_TIBETAN, INDO_EUROPEAN, AUSTRALIAN, AFRO_ASIATIC, NILO_SAHARAN, OTO_MANGUEAN, TAI_KADAI, DRAVIDIAN, TUPIAN];

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
    let iType, wType, fType, sfType = 'none';

    if (inflect) { iType = INFLECTION_TYPES[Math.floor(Math.random() * INFLECTION_TYPES.length)]; }

    if (writing) { wType = ORTHOGRAPHY_TYPES[Math.floor(Math.random() * ORTHOGRAPHY_TYPES.length)]; }

    if (family >= 1) { 
        lFamily = FAMILY_TYPES[Math.floor(Math.random() * FAMILY_TYPES.length)]; 
        fType = lFamily.name;
    }

    if (family === 2) { sfType = lFamily.randomSubfamily(); }

    return new Language(iType, wType, fType, sfType);
}

const INPUT_INFLECTION = Prompt('Do you want to generate an inflection type? [Y/N] ')[0].toLowerCase();
const INPUT_WRITING = Prompt('Do you want to generate an orthography type? [Y/N] ')[0].toLowerCase();
const INPUT_FAMILY = Prompt('Do you want to generate a language family? [Y/N] ')[0].toLowerCase();
let familyNumber = 0;

if (INPUT_FAMILY === 'y') {
    familyNumber++;
    const INPUT_SUBFAMILY = Prompt('Do you want to generate a language subfamily? [Y/N] ')[0].toLowerCase();
    if (INPUT_SUBFAMILY === 'y') { familyNumber++; }
}