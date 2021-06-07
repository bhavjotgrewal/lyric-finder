const fetch = require("node-fetch");

fetch('https://api.lyrics.ovh/v1/Drake/Energy')
    .then(res => res.json())
    .then(data => console.log(data.lyrics))