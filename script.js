const convertTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const hours = ("0" + date.getHours()).substr(-2);
  const minutes = ("0" + date.getMinutes()).substr(-2);

  return hours + ":" + minutes;
};

// const url =
//   "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Lucknow";
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "X-RapidAPI-Key": "763c810bdfmshb9f4669b80c3925p18d818jsn3db5be365864",
    "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
  },
};
const getWeather = (city) => {
  cityName.innerHTML = city;
  fetch(
    "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=" + city,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      cloud_pct.innerHTML = response.cloud_pct;
      temp.innerHTML = response.temp;
      temp2.innerHTML = response.temp;
      feels_like.innerHTML = response.feels_like;
      humidity.innerHTML = response.humidity;
      humidity2.innerHTML = response.humidity;
      min_temp.innerHTML = response.min_temp;
      max_temp.innerHTML = response.max_temp;
      wind_speed.innerHTML = response.wind_speed;
      wind_speed2.innerHTML = response.wind_speed;
      // wind_degrees.innerHTML = response.wind_degrees;
      sunrise.innerHTML = convertTimestamp(response.sunrise);
      sunset.innerHTML = convertTimestamp(response.sunset);
    })

    .catch((error) => console.error(error));
};

const getCommonPlaces = async () => {
  const tableBody = document.querySelector("#common-places-table-body");

  const cities = ["Shanghai", "Boston", "Lucknow", "Srinagar"];

  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    const response = await fetch(
      "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=" + city,
      options
    );
    const data = await response.json();

    const row = document.createElement("tr");
    row.innerHTML = `
        <td class="fw-bold">${city}</td>
        <td>${data.feels_like}</td>
        <td>${data.humidity}</td>
        <td>${data.max_temp}</td>
        <td>${data.min_temp}</td>
        <td>${convertTimestamp(data.sunrise)}</td>
        <td>${convertTimestamp(data.sunset)}</td>
        <td>${data.temp}</td>
        <td>${data.wind_degrees}</td>
        <td>${data.wind_speed}</td>
        `;

    tableBody.appendChild(row);
  }
};

getCommonPlaces();

submit.addEventListener("click", (e) => {
  e.preventDefault();
  const cityInput = document.getElementById("city");
  const city = cityInput.value;
  getWeather(city);
});

getWeather("Delhi");
