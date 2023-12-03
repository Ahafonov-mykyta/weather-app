const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=dc979dcf8a2368a769877318df57317f&query=' +
    longitude +
    ',' +
    latitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) return callback('Unable to connect ', undefined);
    if (body.error) return callback(body.error.info, undefined);

    callback(
      undefined,
      `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress out. It feels like ${body.current.feelslike} degress out. Humidity is ${body.current.humidity}%.`,
    );
  });
};

module.exports = forecast;
