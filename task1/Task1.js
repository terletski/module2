/* eslint-disable */
const yargs = require("yargs");
const fs = require("fs");
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
    // eslint-disable-next-line
    console.log("The note added");
  } else {
    const notes = [{ title: argv.title, body: argv.body }];
    const jsonStr = JSON.stringify(notes, null, "\t");
    fs.writeFileSync("Notes.json", jsonStr, "utf8", () => {
    });
    // eslint-disable-next-line
    console.log("Notes.json was created");
  }
}

function listAllNotes() {
  // eslint-disable-next-line
  const json_file = require("./Notes.json");
  json_file.forEach(function (arr) {
    // eslint-disable-next-line
    console.log(arr);
  });
}

function readNote(argv) {
  // eslint-disable-next-line
  const json_file = require("./Notes.json");
  const result = json_file.filter(function (arr) {
    return arr.title === argv.title;
  });
  // eslint-disable-next-line
  console.log(result);
}

function removeNote(argv) {
  // eslint-disable-next-line
  const json_file = require("./Notes.json");
  const result = json_file.forEach(function (arr) {
    if (arr.title === argv.title) delete json_file[arr];
  });
    fs.writeFile("Notes.json", JSON.stringify(result), "utf8", () => {
    // eslint-disable-next-line
    console.log("The note was removed");
  });
}

function hasFileExist() {
  if (fs.existsSync("Notes.json")) {
    // eslint-disable-next-line
    console.log("Notes.json file exists");
  } else {
    throw new Error("Notes.json file not found");
  }
}
  
//   function checkToEqualTitle() {
//     const json_file = require("./Notes.json");


//   const result = json_file.forEach(function (arr) {
//     if (arr.title !== 'undefined') { 
//       let popped = json_file.pop();
//       delete popped;
//     }
//       fs.writeFile("Notes.json", JSON.stringify(result), "utf8", () => {
//         throw new Error("This title exists, сhange one.");
//     });
//   })
// }

