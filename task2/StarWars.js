
const fetch = require('fetch').fetchUrl;
console.log('Write number from 1 to 87 to choose a character');
let ask = 2;

// console.log("ok");
fetch('http://swapi.co/api/people/' + ask + '/')
  .then(res => res.json())
  .then(function (res) {
    // console.log(res); all scope from swapi
    let name = res.name;

    // console.log(name);
    let species = res.species;
    let films = res.films;
    // console.log(species);

    let getSpecies = species.map(specie => fetch(specie).then(result => result.json()));
    // console.log(getSpecias);
    return Promise.all(getSpecies).then(res => ({ name, films, species: res }));
  })

  .then(function (res) {
    let name = res.name;
    let species = res.species;
    let films = res.films;
    let getFilms = films.map(film => fetch(film).then(result => result.json()));
    return Promise.all(getFilms).then(res => ({ name, species, films: res }));
  })

  .then(function (res) {
    let name = res.name;
    let species = res.species;
    let films = res.films;
    let people = res.species[0].people;
    // console.log(people);
    let getPeople = people.map(person => fetch(person).then(result => result.json()));
    return Promise.all(getPeople).then(res => ({ name, species, films, people: res }));
  })

  .then(function (res) {
    let name = res.name;
    let species = res.species;
    let films = res.films;
    let people = res.people;

    console.log(`
                ${name}
                ${films.map(film => 'film: ' + film.title).join('\n')}
                ${species.map(specie => 'species: ' + specie.name).join('\n')}
                ${people.map(person => 'people: ' + person.name).join('\n')}
                `);
  })

  .catch(function (err) {
    throw new Error(err);
  });
