// Importing prompt-sync for user input.
const Prompt = require('prompt-sync')({sigint: true});

// Wikipedia link
const INFORMATION_LINK = 'https://en.wikipedia.org/wiki/';


// Marks whether or not to show the title.
let firstStart = true;


class CLI {
    _command: string;
    _alias: string;
    _description: string;

    constructor(command: string, alias: string, description: string) {
        this._command = command;
        this._alias = alias;
        this._description = description;
    }
    
    get command() {
        return this._command;
    }
    
    get alias() {
        return this._alias;
    }
    
    get description() {
        return this._description;
    }
}


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


class Command {
    _name: string;
    _description: string;
    _flags: Command[];

    constructor(name: string, description: string, flags?: Command[]) {
        this._name = name;
        this._description = description;
        this._flags = flags;
    }


    get flags() {
        return (!this._flags ? false : this._flags)
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
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


// Commands for the REPL
const COMMANDS = [new Command('gen [flags]', 'Generates a new language.', [new Command('-i', 'Generates inflection.'), new Command('-w', 'Generates orthography.'), new Command('-f', 'Generates a family.'), new Command('-s', 'Generates a subfamily.')]), new Command('help', 'Gives list of each command.'), new Command('info <language>', 'Gives a Wikipedia link for the language given.\n  - Sino-Tibetan, Indo-European, Australian, Afro-Asiatic, Nilo-Saharan, Tai-Kadai, Dravidian, Tupian'), new Command('exit', 'Exits the application.')];

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
    if (inflect) iType = INFLECTION_TYPES[Math.floor(Math.random() * INFLECTION_TYPES.length)];

    if (writing) wType = ORTHOGRAPHY_TYPES[Math.floor(Math.random() * ORTHOGRAPHY_TYPES.length)];

    if (family >= 1) { 
        lFamily = FAMILY_TYPES[Math.floor(Math.random() * FAMILY_TYPES.length)]; 
        fType = lFamily.name;
    }

    if (family == 2) sfType = lFamily.randomSubfamily();

    return new Language(iType, wType, fType, sfType);
}


// Returns true if input starts with "y", false if anything else.
const userInput = (message: string): boolean => (Prompt(message)[0].toLowerCase() === 'y')


// Prints out the info of the language.
const printLang = lang => {
    // Ensuring a valid response prior to showing the language.
    if (typeof lang != 'object') return;

    console.log('Language generated!');

    if (lang.inflection) console.log(`  Inflection style: ${lang.inflection}`);
    if (lang.writing) console.log(`  Orthography: ${lang.writing}`);
    if (lang.family) console.log(`  Language family: ${lang.family}`);
    if (lang.subfamily) console.log(`    Language subfamily: ${lang.subfamily}`);
}


const promptUser = () => {
    try {
        // Gets user input.
        let inputSubfamily = 0;
        const INPUT_INFLECTION = userInput('Do you want to generate an inflection type? [Y/N] ');
        const INPUT_WRITING = userInput('Do you want to generate an orthography type? [Y/N] ');
        const INPUT_FAMILY = Number(userInput('Do you want to generate a language family? [Y/N] '));

        if (INPUT_FAMILY) inputSubfamily = Number(userInput('Do you want to generate a language subfamily? [Y/N] '));

        printLang(generateLanguage(INPUT_INFLECTION, INPUT_WRITING, INPUT_FAMILY + inputSubfamily));
    } catch (err) {
        return;
    }
}


const fastGen = input => {
    let inflect = false;
    let write = false;
    let family = 0;

    for (const flag of input) {
        if (flag == 'gen') continue;

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
            case '-s':
                family = 2;
                break;
            default:
                throw Error(`Error: Unknown flag '${flag}'.`);
        }                
    }

    printLang(generateLanguage(inflect, write, family));
}


const giveHelp = () => {
    for(const command of COMMANDS) {
        console.log(`\n${command.name}\n  - ${command.description}`);
        
        if (!command.flags) continue;
        console.log('  Flags:');
        for(const flag of command.flags) {
            console.log('    ' + flag.name);
        }
    }
}


const menuStart = () => {
   if (firstStart) {
        console.log('=== Welcome to Lucia\'s Conlang Generator! ===');
        firstStart = false;
    } else {
        console.log();
    }
    

    try {
        const INPUT = Prompt('> ').toLowerCase().trim().split(/\s+/);

        // Splits the input on each space, and passes it into the fast generation.
        if (INPUT[0] == 'gen') {
            INPUT[1] === undefined ? promptUser() : fastGen(INPUT);
            menuStart();
        } else if (INPUT[0] == 'info') {
            if (INPUT[1] === undefined) throw Error('Error: Please give a language!');

            const lang = FAMILY_TYPES.find((element) => { return element.name.toLowerCase() == INPUT[1]});

            if (lang == undefined) throw Error('Error: Please enter a valid language!');
            console.log(`Wikipedia Link: ${lang.info}`); 
            menuStart();
        }

        switch (INPUT[0]) {
            case 'help':
                giveHelp();
                break;

            case 'exit':
                process.exit();

            default:
                throw Error('Error: Unknown command!');
        }

        menuStart();
    } catch (err) {
        console.error(err.message);
        menuStart();
    }
}


// CLI commands
const CLI_COMMANDS = [new CLI('i', 'inflection', 'Generates a type of inflectional morphology.'), new CLI('w', 'writing', 'Generates a type of writing system.'), new CLI('f', 'family', 'Generates a major family.'), new CLI('s', 'subfamily', 'Generates a subfamily.')];


// Direct commands
const argv = require('yargs')
    .usage('$0 <command> [options]')
    .command('gen [flags]', 'Generates a language.', function (yargs) {
        // All the flags you can use for fast generation.
        for(const cli of CLI_COMMANDS) {
            yargs.options(cli.command, { 'alias': cli.alias, 'description': cli.description });
        }
    }, function (argv) {
        // If no flags are set, go through the prompts.
        if (!argv.f && !argv.s && !argv.w && !argv.i) {
            promptUser();
        } else {
            // Generates the language from user input.
            let famNum: number;
            
            if (argv.f) famNum = 1;
            if (argv.s) famNum = 2;
            printLang(generateLanguage(argv.i, argv.w, famNum));
        }

        process.exit();
    })
    .help()
    .argv


// Starting the program.
menuStart();
