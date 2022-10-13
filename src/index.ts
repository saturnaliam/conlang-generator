class Family {
    _name: string;
    _subfamilies: string[];
    
    constructor(name: string, subfamilies = ['NONE']) {
        this._name = name;
        this._subfamilies = subfamilies;
    }

    get name() {
        return this._name;
    }

    randomSubfamily(): string {
        return (this._subfamilies[0] === 'NONE' ? 'No subfamily.' : this._subfamilies[Math.floor(Math.random() * this._subfamilies.length)]);
    }
}

// Creating objects for each major language family.
const NIGER_CONGO = new Family('Niger-Congo');
const AUSTRONESIAN = new Family('Austronesian', ['Rukai', 'Tsouic', 'Northwest Formosan', 'Western Plains', 'Atayalic', 'East Formosan', 'Bunun', 'Paiwan', 'Malayo-Polynesian']);
const TRANS_NEW_GUINEA = new Family('Trans-New Guinea');
const SINO_TIBETAN = new Family('Sino-Tibetan');
const INDO_EUROPEAN = new Family('Indo-European');
const AUSTRALIAN = new Family('Australian');
const AFRO_ASIATIC = new Family('Afro-Asiatic');
const NILO_SAHARAN = new Family('Nilo-Saharan');
const OTO_MANGUEAN = new Family('Oto-Manguean');
const TAI_KADAI = new Family('Tai-Kadai');
const DRAVIDIAN = new Family('Dravidian');
const TUPIAN = new Family('Tupian');

const INFLECTION_TYPES = ['Oligosynthetic', 'Polysynthetic', 'Fusional', 'Agglutinative', 'Analytical'];
const ORTHOGRAPHY_TYPES = [];

const generateLanguage = (inflect: boolean, writing: boolean, family: number) => {
    // Gives an error if the family value is invalid, or if no language would be generated.
    if (family < 0 || family > 2) {
        console.error('Error: The language family must be a number between 0 and 2. Please refer to the README for more information.');
        return;
    }

    if (family === 0 && !inflect && !writing) {
        console.error('Error: All options are false, no langugae generated.');
        return;
    }   
}