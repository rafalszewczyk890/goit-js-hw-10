import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function handleInput() {
  fetchCountries(`${searchBox.value}`).then(json => {
    if (json.length > 10) {
      countryInfo.innerHTML = ' ';
      countryList.innerHTML = ' ';
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    } else if (json.length <= 10) {
      countryInfo.innerHTML = ' ';
      countryList.innerHTML = ' ';
      json.forEach(country => {
        countryList.insertAdjacentHTML(
          'afterbegin',
          `<li class="country-item"><img class="flag" src="${country.flags.svg}"/><p class="listed-country">${country.name.official}</p></li>`
        );
      });
    }
    if (json.length == 1) {
      countryList.innerHTML = ' ';
      countryInfo.innerHTML = ' ';
      countryInfo.insertAdjacentHTML(
        'afterbegin',
        `<img class="country-info-flag" src="${json[0].flags.svg}"/>
        <p class="country-name"><b>${json[0].name.official}</b></p>
        <p><b>Capital:</b> ${json[0].capital}</p>
        <p><b>Population:</b> ${json[0].population}</p>
        <p><b>Languages:</b> ${JSON.stringify(
          Object.values(json[0].languages)
        )}</p>`
      );
    }
  });
}

searchBox.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));
