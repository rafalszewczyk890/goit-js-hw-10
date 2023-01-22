export const fetchCountries = name => {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    console.log(response.status);
    if (response.status === 404) {
      reject();
    } else {
      return response.json();
    }
  });
};
