import './css/styles.css';

const DEBOUNCE_DELAY = 300;

function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags.svg,languages`
  )
    .then(result => result.json())
    .then(json => console.log(json));
}

fetchCountries('japan');
