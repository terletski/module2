/* eslint-disable */
const request = require('request-promise');
const fs = require("fs");
/* eslint-enable */

const options = {
    uri: 'https://restcountries.eu/rest/v2/all',
    json: true // Automatically parses the JSON string in the response
};

request(options)
    .then(function (repos) {
        let name = 'Angola'
        for (let prop in repos) {
            if (repos[prop].name === name) {
                let data = repos[prop];
                data = JSON.stringify(data, null, "\t");
                // eslint-disable-next-line
                return data;
            }
        }
    })
    .then(function (data) {
        // write to file
        // eslint-disable-next-line
        let buf = Buffer.from(data);
        buf.write('');
        fs.writeFile("country.json", buf.toString(), "utf8", () => {
        });
        // eslint-disable-next-line
        console.log("country.json was created");
    })

    .catch(function (err) {
        throw new Error(err)
    });    