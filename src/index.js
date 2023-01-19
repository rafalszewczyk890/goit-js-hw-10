import './css/styles.css';

const DEBOUNCE_DELAY = 300;

function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(result => result.json())
    .then(json =>
      console.log(
        json.capital,
        json.flags.svg,
        json.languages,
        json.name.official
      )
    );
}

fetchCountries('japan');
