import './sass/main.scss';
import debounce from 'lodash.debounce';
import { alert } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '../node_modules/@pnotify/core/dist/PNotify.css';
import '../node_modules/@pnotify/core/dist/BrightTheme.css';
import countryCardTml from './card.hbs';
import fetchCountries from './fetchCountries';

const refs = {
  input: document.querySelector('#countryField'),
  countryList: document.querySelector('.container'),
};

refs.input.addEventListener('input', debounce(foundCountry, 500));

function foundCountry(e) {
  const countryName = e.target.value;
  if (countryName.length > 1) {
    fetchCountries(countryName)
      .then(countries => {
        if (countries.length > 10) {
          alert({
            text: 'Too many matches found. Please enter a  more specific query!',
            type: 'error',
            delay: 3000,
            hide: true,
          });
        }
        if (countries.length >= 2 && countries.length <= 10) {
          const countriesMarkUp = countries
            .map(country => `<li class='item'>${country.name}</li>`)
            .join('');
          refs.countryList.innerHTML = countriesMarkUp;
        }
        if (countries.length === 1) {
          const countryMarkUp = countryCardTml(countries[0]);
          console.log(countryMarkUp);
          refs.countryList.innerHTML = countryMarkUp;
        }
      })
      .catch(error => {
        // error handling
      });
  } else refs.countryList.innerHTML = '';
}
