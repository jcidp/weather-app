async function getForecastWeatherData(location) {
  try {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=e990e820b2c64eef80a155450232508&q=${location}&days=3`;
    const options = {
      mode: "cors",
    };
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Failed to connect to API");
    const data = await response.json();
    console.log(getDataFromAPIResponse(data));
    return data;
  } catch (error) {
    console.log(error);
  }
}

function getDataFromAPIResponse(data) {
  const forecast = [];
  data.forecast.forecastday.forEach((day) => {
    const obj = {};
    obj.temp_c = day.day.avgtemp_c;
    obj.temp_f = day.day.avgtemp_f;
    obj.mintemp_c = day.day.mintemp_c;
    obj.mintemp_f = day.day.mintemp_f;
    obj.maxtemp_c = day.day.maxtemp_c;
    obj.maxtemp_f = day.day.maxtemp_f;
    obj.rain_chance = day.day.daily_chance_of_rain;
    obj.snow_chance = day.day.daily_chance_of_snow;
    obj.condition = day.day.condition.icon;
    forecast.push(obj);
  });
  return {
    now: {
      temp_c: data.current.temp_c,
      temp_f: data.current.temp_f,
      condition: data.current.condition.icon,
    },
    today: forecast[0],
    tomorrow: forecast[1],
    day_after_tomorrow: forecast[2],
    location: data.location.name,
  };
}

export default getForecastWeatherData;
