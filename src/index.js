/*import './sass/main.scss';*/
import debounce from 'lodash.debounce';
import pnotify from '@pnotify/core';

const refs = {
    input: document.querySelector('#countryField'),
  countryList: document.querySelector('.container'),
    note:document.querySelector('.note'),
};
 /*pnotify.alert({
    text: 'Notice me, senpai!'
  });*/
refs.input.addEventListener('input', debounce(foundCountry, 500));

function foundCountry(e) {
  const countryName = e.target.value;
  if (countryName.length > 1) {
    fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
      .then(response => {
        return response.json();
      })
      .then((countries) => {
        if (countries.length > 10) {
          
        }
        return countries;
      })
      .then((countries) => {
        if (countries.length >= 2 && countries.length <= 10) {
          const countriesMarkUp = countries.map(country => `<li>${country.name}</li>`)
            .join('');
          return refs.countryList.innerHTML = countriesMarkUp;
        }
        return countries;
      
      })
      .then((countries) => {
       if (countries.length === 1) {

          const countryMarkUp = `<h1>${country.name}<h1>`;
          return refs.countryList.innerHTML = countryMarkUp;
        }
      })
      .catch(error => {
        // error handling
      })
  }
};
  
