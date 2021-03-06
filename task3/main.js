const config = require('./config/config');
const {User, Product} = require('./models');
const {DirWatcher} = require('./dirwatcher');
const {Importer} = require('./importer');
 console.log(config.name);
const user = new User();
const model = new Product(); 
const dir = '/Users/sergei/study/node/ex/data';
const dirwatcher = new DirWatcher();
dirwatcher.watch(dir, 1000);
const importer = new Importer(dirwatcher, dir);