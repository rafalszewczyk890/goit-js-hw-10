import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', event => {
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
        `<p>${json[0].name.official}</p>`
      );
      searchBox.removeEventListener('input');
    }
  });
});

fetchCountries('japan').then(json => {
  console.log(json);
});
