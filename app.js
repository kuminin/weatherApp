var weather = require('./weather.js');
var weathers = process.argv.slice(2);

weathers.forEach((args) => {
  args = args.split(',');
  weatherInfo = weather.getWeather(args[0], args[1]);
});