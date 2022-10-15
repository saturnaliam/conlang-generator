# Conlang Generator

A console based constructed language generator, to give you a basic skeleton to build off of!

## Setup

```
git clone https://github.com/saturnaliam/conlang-generator.git
npm run init
```

## Using the program

### Using REPL
```
npm start
```

### Using Direct Commands
```
node build/index <command>
```

### Commands
* ``gen [flags]``: Generates a new language. If no flags are given, the program will prompt the user with questions for generation.
* ``info <language>``: Gives a Wikipedia link with information on a language family.
* ``help``: Gives a list of commands.
* ``exit``: Exits the program.

### Flags
* ``-i``: Generates type of inflectional morphology.
* ``-w``: Generates type of writing system.
* ``-f``: Generates language family.
* ``-s``: Generates language subfamily.

## Examples
* Generates a language with inflectional morphology and a writing system.
```
gen -i -w
```
* Gives the Wikipedia link for the Afro-Asiatic language family.
```
info afro-asiatic
```
