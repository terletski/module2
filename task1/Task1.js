
const yargs = require("yargs");
const fs = require("fs");

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
      let note = {title: argv.title, body: argv.body};
  //     notes = JSON.stringify(notes, null,"\t"); 
      let json_file = fs.readFileSync("Notes.json", "utf8");
      json_file.split("\r\n");
      json_file = JSON.parse(json_file);
      console.log(json_file);
      json_file.push(note);
      json_file = JSON.stringify(note,null,"\t")
      fs.writeFileSync("Notes.json", json_file, "utf8");
      json_file = JSON.parse(json_file);
      

      // json_file.push();
      console.log(json_file);
      
  //     fs.writeFileSync("Notes.json", array_file, "utf8");
      
      // let note = {title: argv.title, body: argv.body};
      // json_file = JSON.stringify(note, null,"\t");
      // fs.readFileSync("Notes.json", "utf8");
      // fs.appendFileSync("Notes.json", "\n" + json_file);
      // console.log("Note added");
    } else {
    let notes = [{title: argv.title, body: argv.body}];
    json_file = JSON.stringify(notes, null,"\t");
    fs.writeFileSync("Notes.json", json_file, "utf8"); 
    json_file = JSON.parse(json_file);
    console.log("Notes.json file was created");
    console.log(typeof json_file);
  }
}


        
    
   
    
    
  
//   let json_file = fs.readFileSync("Notes.json", "utf8");
//   let json_string = json_file.split("\r\n"); 
  
    
  
  
//     let json_string = JSON.parse(json_file);
//     console.log(json_file);
//     console.log(json_string);
//     json_string.push({ title: argv.title, body: argv.body });
//     console.log(json_string);
//     fs.writeFile("Notes.json", JSON.stringify(json_string, null, "\t"), "utf8", () => {

//       console.log("Notes.json file was written");
  
 





function listAllNotes() {
  const json_file = require("./Notes.json");
  json_file.forEach(function (arr) {
    console.log(arr);
  });
}

function readNote(argv) {
  const json_file = require("./Notes.json");
  const result = json_file.filter(function (arr) {
    return arr.title === argv.title;
  });
  console.log(result);
}

function removeNote(argv) {
  const json_file = require("./Notes.json");
  const result = json_file.forEach(function (arr) {
    if (arr.title === argv.title) delete json_file[arr];
  });
  fs.writeFile("Notes.json", JSON.stringify(result), "utf8", () => {

    console.log("The note was removed");
  });
}

function hasFileExist() {
  fs.existsSync("Notes.json") ? console.log ("Notes.json file exists" ) : console.log("Notes.json file not found");
}




    

        
    

    
  
//   } else if (command === 'list') {
//     // do something to list all notes
//   } else if (command === 'read') {
//     // do something to read a specific note
//     // argv.title = requested note title
//   } else if (command === 'remove') {
//     // do something to remove a specific note
//     // argv.title = requested note title
//   } else {
//       console.log("invalid command")
//   }

  
    

