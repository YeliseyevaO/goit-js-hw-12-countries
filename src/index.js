/*import './sass/main.scss';*/

/* require('lodash.debounce');*/
const refs = {
    input: document.querySelector('#countryField'),
    countryList: document.querySelector('.container'),
};
console.dir(refs.input);
refs.input.addEventListener('input', foundCountry);/*_.debounce(foundCountry, 500));*/

function foundCountry(e) {
  const countryName = e.target.value;
  fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
    .then(response => {
      return response.json();
    })
    .then((countries) => {
      if (countries.length !== 1) {
          const countriesMarkUp = countries.map(country => `<li>${country.name}</li>`)
          .join('');
       return refs.countryList.innerHTML = countriesMarkUp;
      } else {
        const countryMarkUp = `<h1>${country.name}<h1>`;
 return refs.countryList.innerHTML = countryMarkUp;
      
      }
    })
    .catch(error => {
      // error handling
    })
};
  
