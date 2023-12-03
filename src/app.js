const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const hbs = require('hbs');

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Nick Ahafonov',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Nick Ahafonov',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'You can find help here, just text me on',
    title: 'Help',
    name: 'Nick Ahafonov',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address !!!',
    });
  }

  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error)
        return res.send({
          error,
        });

      forecast(longitude, latitude, (error, forecastData) => {
        if (error)
          return res.send({
            error,
          });

        res.send({
          location: location,
          forecast: forecastData,
        });
      });
    },
  );
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Help article not found',
    name: 'Nick Ahafonov',
  });
});

app.get('/about/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'About article not found',
    name: 'Nick Ahafonov',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Page not found',
    name: 'Nick Ahafonov',
  });
});

app.listen('3001', () => {
  console.log('Serer is up on port 3001');
});
