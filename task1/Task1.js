/* eslint-disable */
const yargs = require("yargs");
const fs = require("fs");
let json_file = require("./Notes.json");
/* eslint-enable */
const titleOptions = {
  describe: "Title of note",
  demandOption: true,
};
const bodyOptions = {
  describe: 'Body of note',
  demandOption: true,
};

yargs.command("add", "Add a new note",
  function (yargs) {
    return yargs.options({
      "title": titleOptions,
      "body": bodyOptions
    });
  },

  function (argv) {
    addNote(argv);
  }
)
  .help()
  .argv;

yargs.command("list", "List all notes",

  function (argv) {
    hasFileExist(argv);
    listAllNotes(argv);
  }
)
  .help()
  .argv;

yargs.command("read", "Read a note",
  function (yargs) {
    return yargs.options({
      "title": titleOptions
    });
  },

  function (argv) {
    hasFileExist(argv);
    readNote(argv);
  }
)
  .help()
  .argv;

yargs.command("remove", "Remove a note",
  function (yargs) {
    return yargs.options({
      "title": titleOptions
    });
  },

  function (argv) {
    hasFileExist();
    removeNote(argv);
  }
)
  .help()
  .argv;

function addNote(argv) {
  if (fs.existsSync("Notes.json")) {
    const note = { title: argv.title, body: argv.body };
    const json_file = fs.readFileSync("Notes.json", "utf8");
    let obj = JSON.parse(json_file);
    obj.push(note);
    obj = JSON.stringify(obj, null, "\t");
    fs.writeFileSync("Notes.json", obj, "utf8", () => {
    });
    console.log("The note added.");
    checkToEqualTitle(argv);
  } else {
    const notes = [{ title: argv.title, body: argv.body }];
    const jsonStr = JSON.stringify(notes, null, "\t");
    fs.writeFileSync("Notes.json", jsonStr, "utf8", () => {
    });
    console.log("Notes.json was created.");
  }
}

function listAllNotes() {
  // eslint-disable-next-line
  json_file.forEach(function (arr) {
    console.log(arr);
  });
}

function readNote(argv) {
  // eslint-disable-next-line
  const result = json_file.filter(function (arr) {
    return arr.title === argv.title;
  });
  console.log(result);
}

function removeNote(argv) {
  // eslint-disable-next-line
  const result = json_file.forEach(function (arr) {
    if (arr.title === argv.title) delete json_file[arr];
  });
    fs.writeFile("Notes.json", JSON.stringify(result), "utf8", () => {
   
    console.log("The note was removed.");
  });
}

function hasFileExist() {
  if (fs.existsSync("Notes.json")) {
    
    console.log("Notes.json file exists");
  } else {
    throw new Error("Notes.json file not found.");
  }
}

function checkToEqualTitle(argv) {
  // eslint-disable-next-line
const result = json_file.filter(function (arr) {
 return arr.title === argv.title;
});
/* eslint-disable */
  console.info("But note with title <" + argv.title + "> exists.");
  console.info("Matches found: " + result.length);
}
