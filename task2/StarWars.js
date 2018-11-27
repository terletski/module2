const fetch = require('node-fetch');
const yargs = require('yargs');
const fs = require('fs');

yargs
  .command('choose <number>', 'Choose character', (yargs) => {
    yargs.positional('number', {
      type: 'number',
      default: '1',
      description: 'To choose a character number must be from 1 to 87'
    })
  }, function (argv) {
    chooseCharacter(argv.number);
  })
  .help()
  .argv;

function chooseCharacter(number) {
  // console.log("ok");
  fetch('http://swapi.co/api/people/' + number + '/')
    .then(response => response.json())
    .then(function (response) {
      // console.log(response); all scope from swapi
      let name = response.name;
      // console.log(name);
      let species = response.species;
      let films = response.films;
      // console.log(species);
      let getSpecies = species.map(specie => fetch(specie).then(result => result.json()));
      // console.log(getSpecias);
      return Promise.all(getSpecies).then(response => ({ name, films, species: response }));
    })

    .then(function (response) {
      let name = response.name;
      let species = response.species;
      let films = response.films;
      let getFilms = films.map(film => fetch(film).then(result => result.json()));
      return Promise.all(getFilms).then(response => ({ name, species, films: response }));
    })

    .then(function (response) {
      let name = response.name;
      let species = response.species;
      let films = response.films;
      let people = response.species[0].people;
      // console.log(people);
      let getPeople = people.map(person => fetch(person).then(result => result.json()));
      return Promise.all(getPeople).then(response => ({ name, species, films, people: response }));
    })

    .then(function (response) {
      let name = response.name;
      let species = response.species;
      let films = response.films;
      let people = response.people;

      let print = `${name}
                   ${films.map(film => 'film: ' + film.title).join('\n')}
                   ${species.map(specie => 'species: ' + specie.name).join('\n')}
                   ${people.map(person => 'people: ' + person.name).join('\n')}`;
                  return print;
    })

    .then(function (print) {
      // write to file
      let buf = Buffer.from(print);
      buf.write('');
      fs.writeFile('./star_wars.json', print, 'utf8', (err) => {
        if (err) throw err;
      });
        console.log("country.json was created");
    })

    .catch(function (err) {
      throw new Error(err);
    });
}




