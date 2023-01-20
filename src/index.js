import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function handleInput(event) {
  fetchCountries(`${event.currentTarget.value}`).then(json => {
    if (json.length > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    } else if (json.length <= 10) {
      json.forEach(country => {
        countryList.insertAdjacentHTML(
          'afterbegin',
          `<li class="country-item"><img class="flag" src="${country.flags.svg}"/><p class="listed-country">${country.name.official}</p></li>`
        );
      });
    }
    if (json.length == 1) {
      countryList.innerHTML = ' ';
      countryInfo.insertAdjacentHTML(
        'afterbegin',
        `<p><img class="flag" src="${json[0].flags.svg}"/>${
          json[0].name.official
        }</p>
        <p>Capital: ${json[0].capital}</p>
        <p>Population: ${json[0].population}</p>
        <p>Languages: ${JSON.stringify(Object.values(json[0].languages))}</p>`
      );
      searchBox.removeEventListener('input', handleInput);
    }
  });
}

searchBox.addEventListener('input', handleInput);

fetchCountries('japan').then(json => {
  console.log(json);
});
