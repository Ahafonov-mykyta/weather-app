const weatherForm = document.querySelector('form');
const input = document.querySelector('.input');
const forecastEl = document.querySelector('.forecast');
const locationEl = document.querySelector('.location');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = input.value;
  forecastEl.innerHTML = `<img class="icon" src="/img/loading.svg" alt="loading"/><span>Loading...</span>`;
  locationEl.innerHTML = '';

  fetch('/weather?address=' + query)
    .then((response) => {
      return response.json();
    })
    .then(({ forecast, location, error } = {}) => {
      if (error) {
        return (forecastEl.innerHTML = `<img class="icon " src="/img/error.svg" alt="error"/><span>${error}</span>`);
      }

      forecastEl.innerHTML = `<img class="icon" src="/img/weather.svg" alt="weather"/><span>${forecast}</span>`;
      locationEl.innerHTML = `<img class="icon" src="/img/location.svg" alt="location"/><span>${location}</span>`;
    });
});
