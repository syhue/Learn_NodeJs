// const add = require('./utils.js');
// const sum = add(4,2);
// console.log(sum);

const chalk = require("chalk");
const { argv, title } = require("process");
const yargs = require("yargs");
const notesUtility = require("./notes.js");


//Customize yargs version
yargs.version("1.1.0");

// Create add commend
yargs.command({
	command: "add",
	describe: "Add a new note",
	builder: {
		title: {
			describe: "Note title",
			demandOption: true,
			type: "string",
		},
        body: {
            describe: "Note body",
            demandOption: true,
            type: 'string'
        }
	},
	handler: function (argv) {
		notesUtility.addNote(argv.title, argv.body)
	},
});

// Create remove commend
yargs.command({
	command: "remove",
	describe: "Remove a note",
    builder: {
		title: {
			describe: "Note title",
			demandOption: true,
			type: "string",
		},
        body: {
            describe: "Note body",
            demandOption: false,
            type: 'string'
        }
	},
	handler: function (argv) {
		notesUtility.removeNote(argv.title);
	},
});

// Create list command

let msg;

yargs.command({
	command: "list",
	describe: "List out the note",
	handler: () => {
		notesUtility.getNotes();
	},
});

yargs.command({
	command: "read",
	describe: "Read out the note",
	handler: function (argv) {
		notesUtility.readNote(argv.title)
	},
});

// console.log(yargs.argv);
yargs.parse();
