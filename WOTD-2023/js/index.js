const wotdEl = document.querySelector('.wotd');
const btn = document.querySelector('#generateWordBtn');

// fetch the random word on initialization of app
async function getWOTD() {
    let response = await fetch('https://random-word-api.herokuapp.com/word');
    let data = await response.json();
    return await data;
};

async function renderRandomWordToUI(word) {
    let w = await word;
    w = w[0].toUpperCase();
    wotdEl.innerHTML = w;

    // call the api that returns a definition of a word
    let response = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + await word);
    let data = await response.json();
    console.log(data);
    if (data.title != 'No Definitions Found') {
        let definition = data[0].meanings[0].definitions[0].definition;
        document.querySelector('.wotd-definition').innerHTML = `<p>${definition}</p>`
    } else {
        document.querySelector('.wotd-definition').innerHTML = `<p>Sorry, not in our book</p>`
    }
};

btn.addEventListener('click', function () {
    let word = getWOTD()
    renderRandomWordToUI(word);
});