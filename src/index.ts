// Importing prompt-sync for user input.
const Prompt = require('prompt-sync')({sigint: true});


// Base Wikipedia link used in 
const INFORMATION_LINK = 'https://en.wikipedia.org/wiki/';


// Marks whether or not to show the title so it only shows when first opened.
let opened = false;


// Class for direct commands.
class DirectCommand {
    flagName: string;
    alias: string;
    description: string;

    constructor(Command: string, Alias: string, Description: string) {
        this.flagName = Command;
        this.alias = Alias;
        this.description = Description;
    }
}


class Family {
    name: string;
    _info: string;
    _subfamilies: string[];
    

    constructor(Name: string, Info: string, Subfamilies = ['none']) {
        this.name = Name;
        this._info = Info;
        this._subfamilies = Subfamilies;
    }


    get info() {
        return INFORMATION_LINK + this._info;
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


    constructor(Inflection: string, Writing: string, Family: string, Subfamily: string) {
        this._inflection = Inflection;
        this._writing = Writing
        this._family = Family
        this._subfamily = Subfamily 
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
    name: string;
    description: string;
    _flags: Command[];


    constructor(Name: string, Description: string, Flags?: Command[]) {
        this.name = Name;
        this.description = Description;
        this._flags = Flags;
    }


    get flags() {
        return (!this._flags ? false : this._flags)
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
const KRA_DAI = new Family('Kra-Dai', 'Kra–Dai_languages', ['Kra', 'Kam-Sui', 'Lakkia', 'Biao', 'Be', 'Tai', 'Hiai']);
const DRAVIDIAN = new Family('Dravidian', 'Dravidian_languages', ['Northern', 'Central', 'South-Central', 'Central']);
const TUPIAN = new Family('Tupian', 'Tupian_languages', ['Tupi-Guarani', 'Arikem', 'Aweti', 'Mawé', 'Monde', 'Mundurukú', 'Puruborá-Ramarama', 'Tuparí', 'Yuruna']);


// Creating arrays for each of the options.
const INFLECTION_TYPES = ['Oligosynthetic', 'Polysynthetic', 'Fusional', 'Agglutinative', 'Analytical'];
const ORTHOGRAPHY_TYPES = ['Abugida', 'Abjad', 'Alphabet', 'Logosyllabary', 'Syllabary', 'Featural System'];
const FAMILY_TYPES = [NIGER_CONGO, AUSTRONESIAN, TRANS_NEW_GUINEA, SINO_TIBETAN, INDO_EUROPEAN, AUSTRALIAN, AFRO_ASIATIC, NILO_SAHARAN, OTO_MANGUEAN, KRA_DAI, DRAVIDIAN, TUPIAN];


// Commands for the REPL
const REPL_COMMANDS = [new Command('gen [flags]', 'Generates a new language.', [new Command('-i', 'Generates inflection.'), new Command('-w', 'Generates orthography.'), new Command('-f', 'Generates a family.'), new Command('-s', 'Generates a subfamily.')]), new Command('help', 'Gives list of each command.'), new Command('info <language>', 'Gives a Wikipedia link for the language given.\n  - Sino-Tibetan, Indo-European, Australian, Afro-Asiatic, Nilo-Saharan, Kra-Dai, Dravidian, Tupian'), new Command('exit', 'Exits the application.')];


// Error handling
// TODO Add colors to error handling.
const handleErrors = (error = "Error! Please try again.") => {
    console.error(error);
}


// Code for generating the language.
const generateLanguage = (inflect: boolean, writing: boolean, family: number) => {
    try {
        // Gives an error if the family value is invalid, or if no language would be generated.
        if (family < 0 || family > 2) {
            throw Error('Error: Invalid language family!');
        }

        if (family === 0 && !inflect && !writing) {
            throw Error('Error: All options are false, no language generated!');
        }   


        // Variable to be used for the language family, used to determine subfamilies from the family.
        let languageFamily: Family;

        // Initializing each variable with 'none' to work with getters in the Family class.
        let inflectionType = 'none';
        let writingType = 'none';
        let familyType = 'none';
        let subfamilyType = 'none';

        // Setting variables for the Family class based off user input.
        if (inflect) inflectionType = INFLECTION_TYPES[Math.floor(Math.random() * INFLECTION_TYPES.length)];

        if (writing) writingType = ORTHOGRAPHY_TYPES[Math.floor(Math.random() * ORTHOGRAPHY_TYPES.length)];

        if (family >= 1) { 
            languageFamily = FAMILY_TYPES[Math.floor(Math.random() * FAMILY_TYPES.length)]; 
            familyType = languageFamily.name;
        }

        if (family == 2) subfamilyType = languageFamily.randomSubfamily();

        printLang(new Language(inflectionType, writingType, familyType, subfamilyType))
    } catch (err) {
        handleErrors(err.message);
    }
}


// Returns true if input starts with "y", false if anything else.
const userInput = (message: string): boolean => (Prompt(message)[0].toLowerCase() === 'y')


// Prints out the info of the language.
const printLang = (language: Language) => {
    let languageMessage = 'Language generated!';

    if (language.inflection) languageMessage += `\n  Inflection style: ${language.inflection}`;
    if (language.writing) languageMessage += `\n  Writing style: ${language.writing}`;
    if (language.family) languageMessage += `\n  Language family: ${language.family}`;
    if (language.subfamily) languageMessage += `\n    Subfamily: ${language.subfamily}`;
    
    console.log(languageMessage);
}


const standardGen = () => {
    try {
        // Gets user input.
        let inputSubfamily = 0;
        const INPUT_INFLECTION = userInput('Do you want to generate an inflection type? [Y/N] ');
        const INPUT_WRITING = userInput('Do you want to generate an orthography type? [Y/N] ');
        const INPUT_FAMILY = Number(userInput('Do you want to generate a language family? [Y/N] '));

        if (INPUT_FAMILY) inputSubfamily = Number(userInput('Do you want to generate a language subfamily? [Y/N] '));

        generateLanguage(INPUT_INFLECTION, INPUT_WRITING, INPUT_FAMILY + inputSubfamily);
    } catch (err) {
        return;
    }
}


const fastGen = (input: string[]) => {
    let inflect = false;
    let write = false;
    let family = 0;

    for (const flag of input) {
        // If the array item is "gen", skip over it.
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

    generateLanguage(inflect, write, family);
}


const giveHelp = () => {
    // Prints out each command and any flags it can have.
    for(const command of REPL_COMMANDS) {
        console.log(`\n${command.name}\n  - ${command.description}`);
        
        if (!command.flags) continue;
        console.log('  Flags:');
        for(const flag of command.flags) {
            console.log('    ' + flag.name);
        }
    }
}


const menuStart = () => {
   if (!opened) {
        console.log('=== Welcome to Lucia\'s Conlang Generator! ===');
        opened = true;
    } else {
        console.log();
    }
    

    try {
        // Gets user input and splits it on every space.
        const INPUT = Prompt('> ').toLowerCase().trim().split(/\s+/);


        // Checking if the input is gen, and performing either the standard or fast generation.
        if (INPUT[0] == 'gen') {
            INPUT[1] === undefined ? standardGen() : fastGen(INPUT);
            menuStart();
        } else if (INPUT[0] == 'info') {
            // Throws an error if the user gives no language.
            if (INPUT[1] === undefined) throw Error('Error: Please give a language!');


            // Creates a language variable set to the language family given.
            const LANG = FAMILY_TYPES.find((element) => { return element.name.toLowerCase() == INPUT[1]});

            if (LANG == undefined) throw Error('Error: Please enter a valid language!');
            console.log(`Wikipedia Link: ${LANG.info}`); 
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
        handleErrors(err.message);
        menuStart();
    }
}


// Everything past this point is used for direct commands.


// CLI commands
const DIRECT_COMMANDS = [new DirectCommand('i', 'inflection', 'Generates a type of inflectional morphology.'), new DirectCommand('w', 'writing', 'Generates a type of writing system.'), new DirectCommand('f', 'family', 'Generates a major family.'), new DirectCommand('s', 'subfamily', 'Generates a subfamily.')];


// Direct commands
const argv = require('yargs')
    // Gives the format for commands.
    .usage('$0 <command> [options]')

    // Adds the generate command.
    .command('gen [flags]', 'Generates a language.', function (yargs) {
        // Adds all the flags you can use to the help command.
        for(const direct of DIRECT_COMMANDS) {
            yargs.options(direct.flagName, { 'alias': direct.alias, 'description': direct.description });
        }
    }, function (argv) {
        // If no flags are set, go through the prompts.
        if (!argv.f && !argv.s && !argv.w && !argv.i) {
            standardGen();
        } else {
            // Generates the language from user input.
            let famNum: number;
            
            if (argv.f) famNum = 1;
            if (argv.s) famNum = 2;
            generateLanguage(argv.i, argv.w, famNum);
        }

        process.exit();
    })
    .help()
    .argv


// Starting the program.
menuStart();