const request = require('request');

const geocode = (adress, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(adress) +
    '.json?access_token=pk.eyJ1IjoiZ2FmYSIsImEiOiJjbG9rOHBvYWsyMTk5MnFxcGs0bjJ1N3JyIn0.AqNWI50IdQst-2FfUox1cA&limit=1';

  request({ url, json: true }, (error, { body }) => {
    if (error) return callback('Unable to connect to location services');
    if (!body.features.length) return callback('Unable to find this geo');

    return callback(undefined, {
      latitude: body.features[0].center[1],
      longitude: body.features[0].center[0],
      location: body.features[0].place_name,
    });
  });
};

module.exports = geocode;
