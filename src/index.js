import "./style.css";
import { fromUnixTime, format } from "date-fns";

const img = document.querySelector("img");
const input = document.querySelector("input");
const enter = document.querySelector(".enter");

//on user interaction
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    enter.click();
  }
});

enter.addEventListener("click", () => {
  if (input.value === "" || input.value === undefined) {
    return;
  } else {
    const searchTerm = input.value;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=f3337944daf97f3814e94aa737748161&units=imperial`,
      { mode: "cors" }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        const locationName = response.name;
        const temp = `${Math.round(response.main.temp)}\u00B0 F`; //degree symbol= \u00B0
        const feelsLike = `${Math.round(response.main.feels_like)}\u00B0 F`;
        const rawSunriseData = fromUnixTime(response.sys.sunrise);
        const rawSunsetData = fromUnixTime(response.sys.sunset);

        console.log(rawSunriseData);
        console.log(rawSunsetData);

        const sunrise = (() => {
          const rawString = JSON.stringify(rawSunriseData); //object to string
          const rawStringFiltered = rawString.replace(/"|.000Z/g, ""); //remove junk
          const rawInfoArray = rawStringFiltered.split("T");
          const dateArr = rawInfoArray[0].split("-");
          const timeArr = rawInfoArray[1].split(":");

          const month = dateArr[1] - 1;
          const day = dateArr[2];
          const year = dateArr[0];

          const dayHour = timeArr[0] - 4;
          const dayMin = timeArr[1];

          const date = format(new Date(year, month, day), "eeee MMM do, yyyy");

          function time() {
            if (dayHour < 12) {
              return `${dayHour}:${dayMin} am`;
            } else if (dayHour > 12) {
              return `${dayHour - 12}:${dayMin} pm`;
            }
          }

          return { date, time };
        })();

        const sunset = (() => {
          const rawString = JSON.stringify(rawSunsetData); //object to string
          const rawStringFiltered = rawString.replace(/"|.000Z/g, ""); //remove junk
          const rawInfoArray = rawStringFiltered.split("T");
          const dateArr = rawInfoArray[0].split("-");
          const timeArr = rawInfoArray[1].split(":");

          const month = dateArr[1] - 1;
          const day = dateArr[2];
          const year = dateArr[0];

          const dayHour = timeArr[0] - 4;
          const dayMin = timeArr[1];

          const date = format(new Date(year, month, day), "eeee MMM do, yyyy");

          function time() {
            if (dayHour < 12) {
              return `${dayHour}:${dayMin} am`;
            } else if (dayHour > 12) {
              return `${dayHour - 12}:${dayMin} pm`;
            }
          }

          return { date, time };
        })();

        const description = response.weather[0].description;
        const icon = response.weather[0].icon;

        const img = document.querySelector("img");
        img.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;

        const main = document.querySelector("main");
        const cardContainer = document.querySelector(".card-container");

        const town = document.querySelector(".town");
        town.textContent = locationName;

        const date = document.querySelector(".date");
        date.textContent = sunrise.date;

        const weather = document.querySelector(".weather");
        weather.textContent = description;

        const temperature = document.querySelector(".temperature");
        temperature.textContent = temp;

        const tempFeelsLike = document.querySelector(".temp-feels-like");
        tempFeelsLike.textContent = `Feels like: ${feelsLike}`;

        const fahrenheit = document.querySelector(".fahrenheit");
        const celsius = document.querySelector(".celsius");

        fahrenheit.addEventListener("click", () => {
          temperature.textContent = temp;
          tempFeelsLike.textContent = `Feels like: ${feelsLike}`;
        });

        celsius.addEventListener("click", () => {
          temperature.textContent = `${Math.round(
            (response.main.temp - 32) * (5 / 9)
          )}\u00B0 C`;
          tempFeelsLike.textContent = `Feels like: ${Math.round(
            (response.main.feels_like - 32) * (5 / 9)
          )}\u00B0 C`;
        });

        localStorage.clear();

        const userInputData = {
          town: locationName,
          date: sunrise.date,
          icon: img.src,
          discription: description,
          temp: temp,
          feelsLike: feelsLike,
        };

        console.log(userInputData);
        console.log(searchTerm);
        console.log(localStorage.key(3));

        const saveData = (() => {
          if (typeof Storage !== "undefined") {
            // Store
            localStorage.setItem("recent town searched", searchTerm);
            // Retrieve
          } else {
            return;
          }
        })();

        // conversion is (32°F − 32) × 5/9 = 0°C

        // const sunriseTime= document.querySelector(".sunrise-time");
        // sunriseTime.textContent = `Sunrise: ${sunrise.time()}`;

        // const sunsetTime= document.querySelector(".sunset-time");
        // sunsetTime.textContent = `Sunset: ${sunset.time()}`;
      })
      .catch(function (error) {
        alert(
          `Unable to locate ${searchTerm} in our systems. Please check that that spelling is correct, or try a nearby town name. Thank you.`
        );
        return;
      });
  }
});

//on first load
if (localStorage.key(0) === null || localStorage.key(0) === undefined) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=08505,us&appid=f3337944daf97f3814e94aa737748161&units=imperial`,
    { mode: "cors" }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      const locationName = response.name;
      const temp = `${Math.round(response.main.temp)}\u00B0 F`; //degree symbol= \u00B0
      const feelsLike = `${Math.round(response.main.feels_like)}\u00B0 F`;
      const rawSunriseData = fromUnixTime(response.sys.sunrise);
      const rawSunsetData = fromUnixTime(response.sys.sunset);

      const sunrise = (() => {
        const rawString = JSON.stringify(rawSunriseData); //object to string
        const rawStringFiltered = rawString.replace(/"|.000Z/g, ""); //remove junk
        const rawInfoArray = rawStringFiltered.split("T");
        const dateArr = rawInfoArray[0].split("-");
        const timeArr = rawInfoArray[1].split(":");

        const month = dateArr[1] - 1;
        const day = dateArr[2];
        const year = dateArr[0];

        const dayHour = timeArr[0] - 4;
        const dayMin = timeArr[1];

        const date = format(new Date(year, month, day), "eeee MMM do, yyyy");

        function time() {
          if (dayHour < 12) {
            return `${dayHour}:${dayMin} am`;
          } else if (dayHour > 12) {
            return `${dayHour - 12}:${dayMin} pm`;
          }
        }

        return { date, time };
      })();

      const sunset = (() => {
        const rawString = JSON.stringify(rawSunsetData); //object to string
        const rawStringFiltered = rawString.replace(/"|.000Z/g, ""); //remove junk
        const rawInfoArray = rawStringFiltered.split("T");
        const dateArr = rawInfoArray[0].split("-");
        const timeArr = rawInfoArray[1].split(":");

        const month = dateArr[1] - 1;
        const day = dateArr[2];
        const year = dateArr[0];

        const dayHour = timeArr[0] - 4;
        const dayMin = timeArr[1];

        const date = format(new Date(year, month, day), "eeee MMM do, yyyy");

        function time() {
          if (dayHour < 12) {
            return `${dayHour}:${dayMin} am`;
          } else if (dayHour > 12) {
            return `${dayHour - 12}:${dayMin} pm`;
          }
        }

        return { date, time };
      })();

      // console.log(`Date: ${sunrise.date}`);
      // console.log(`Sunrise: ${sunrise.time()}`);
      // console.log(`Sunset: ${sunset.time()}`);

      const description = response.weather[0].description;
      console.log(description);
      const icon = response.weather[0].icon;
      console.log(icon);

      const img = document.querySelector("img");
      img.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;

      const main = document.querySelector("main");
      const cardContainer = document.querySelector(".card-container");

      const town = document.createElement("div");
      town.classList.add("town");
      town.textContent = locationName;
      main.insertBefore(town, cardContainer);

      const date = document.createElement("div");
      date.classList.add("date");
      date.textContent = sunrise.date;
      main.insertBefore(date, cardContainer);

      const weather = document.createElement("div");
      weather.classList.add("weather");
      weather.textContent = description;
      cardContainer.appendChild(weather);

      const temperature = document.createElement("div");
      temperature.classList.add("temperature");
      temperature.textContent = temp;
      cardContainer.appendChild(temperature);

      const tempFeelsLike = document.createElement("div");
      tempFeelsLike.classList.add("temp-feels-like");
      tempFeelsLike.textContent = `Feels like: ${feelsLike}`;
      cardContainer.appendChild(tempFeelsLike);

      const fahrenheit = document.querySelector(".fahrenheit");
      const celsius = document.querySelector(".celsius");

      fahrenheit.addEventListener("click", () => {
        temperature.textContent = temp;
        tempFeelsLike.textContent = `Feels like: ${feelsLike}`;
      });

      celsius.addEventListener("click", () => {
        temperature.textContent = `${Math.round(
          (response.main.temp - 32) * (5 / 9)
        )}\u00B0 C`;
        tempFeelsLike.textContent = `Feels like: ${Math.round(
          (response.main.feels_like - 32) * (5 / 9)
        )}\u00B0 C`;
      });

      // const sunriseTime = document.createElement("div");
      // sunriseTime.classList.add("sunrise-time");
      // sunriseTime.textContent = `Sunrise: ${sunrise.time()}`;
      // cardContainer.appendChild(sunriseTime);

      // const sunsetTime = document.createElement("div");
      // sunsetTime.classList.add("sunset-time");
      // sunsetTime.textContent = `Sunset: ${sunset.time()}`;
      // cardContainer.appendChild(sunsetTime);
    })
    .catch(function (error) {
      console.log("Unable to find, please try again.");
      return;
    });
} else if (localStorage.key(0) !== null || localStorage.key(0) !== undefined) {
  const saveData = (() => {
    if (typeof Storage !== "undefined") {
      // Store
      // Retrieve
      const savedTown = localStorage.getItem("recent town searched"); //string

      console.log(savedTown);

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${savedTown}&appid=f3337944daf97f3814e94aa737748161&units=imperial`,
        { mode: "cors" }
      )
        .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      const locationName = response.name;
      const temp = `${Math.round(response.main.temp)}\u00B0 F`; //degree symbol= \u00B0
      const feelsLike = `${Math.round(response.main.feels_like)}\u00B0 F`;
      const rawSunriseData = fromUnixTime(response.sys.sunrise);
      const rawSunsetData = fromUnixTime(response.sys.sunset);

      const sunrise = (() => {
        const rawString = JSON.stringify(rawSunriseData); //object to string
        const rawStringFiltered = rawString.replace(/"|.000Z/g, ""); //remove junk
        const rawInfoArray = rawStringFiltered.split("T");
        const dateArr = rawInfoArray[0].split("-");
        const timeArr = rawInfoArray[1].split(":");

        const month = dateArr[1] - 1;
        const day = dateArr[2];
        const year = dateArr[0];

        const dayHour = timeArr[0] - 4;
        const dayMin = timeArr[1];

        const date = format(new Date(year, month, day), "eeee MMM do, yyyy");

        function time() {
          if (dayHour < 12) {
            return `${dayHour}:${dayMin} am`;
          } else if (dayHour > 12) {
            return `${dayHour - 12}:${dayMin} pm`;
          }
        }

        return { date, time };
      })();

      const sunset = (() => {
        const rawString = JSON.stringify(rawSunsetData); //object to string
        const rawStringFiltered = rawString.replace(/"|.000Z/g, ""); //remove junk
        const rawInfoArray = rawStringFiltered.split("T");
        const dateArr = rawInfoArray[0].split("-");
        const timeArr = rawInfoArray[1].split(":");

        const month = dateArr[1] - 1;
        const day = dateArr[2];
        const year = dateArr[0];

        const dayHour = timeArr[0] - 4;
        const dayMin = timeArr[1];

        const date = format(new Date(year, month, day), "eeee MMM do, yyyy");

        function time() {
          if (dayHour < 12) {
            return `${dayHour}:${dayMin} am`;
          } else if (dayHour > 12) {
            return `${dayHour - 12}:${dayMin} pm`;
          }
        }

        return { date, time };
      })();

      // console.log(`Date: ${sunrise.date}`);
      // console.log(`Sunrise: ${sunrise.time()}`);
      // console.log(`Sunset: ${sunset.time()}`);

      const description = response.weather[0].description;
      console.log(description);
      const icon = response.weather[0].icon;
      console.log(icon);

      const img = document.querySelector("img");
      img.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;

      const main = document.querySelector("main");
      const cardContainer = document.querySelector(".card-container");

      const town = document.createElement("div");
      town.classList.add("town");
      town.textContent = locationName;
      main.insertBefore(town, cardContainer);

      const date = document.createElement("div");
      date.classList.add("date");
      date.textContent = sunrise.date;
      main.insertBefore(date, cardContainer);

      const weather = document.createElement("div");
      weather.classList.add("weather");
      weather.textContent = description;
      cardContainer.appendChild(weather);

      const temperature = document.createElement("div");
      temperature.classList.add("temperature");
      temperature.textContent = temp;
      cardContainer.appendChild(temperature);

      const tempFeelsLike = document.createElement("div");
      tempFeelsLike.classList.add("temp-feels-like");
      tempFeelsLike.textContent = `Feels like: ${feelsLike}`;
      cardContainer.appendChild(tempFeelsLike);

      const fahrenheit = document.querySelector(".fahrenheit");
      const celsius = document.querySelector(".celsius");

      fahrenheit.addEventListener("click", () => {
        temperature.textContent = temp;
        tempFeelsLike.textContent = `Feels like: ${feelsLike}`;
      });

      celsius.addEventListener("click", () => {
        temperature.textContent = `${Math.round(
          (response.main.temp - 32) * (5 / 9)
        )}\u00B0 C`;
        tempFeelsLike.textContent = `Feels like: ${Math.round(
          (response.main.feels_like - 32) * (5 / 9)
        )}\u00B0 C`;
      });

      // const sunriseTime = document.createElement("div");
      // sunriseTime.classList.add("sunrise-time");
      // sunriseTime.textContent = `Sunrise: ${sunrise.time()}`;
      // cardContainer.appendChild(sunriseTime);

      // const sunsetTime = document.createElement("div");
      // sunsetTime.classList.add("sunset-time");
      // sunsetTime.textContent = `Sunset: ${sunset.time()}`;
      // cardContainer.appendChild(sunsetTime);
    })
    .catch(function (error) {
      console.log("Unable to find, please try again.");
      return;
    });
      
    } else {
      return;
    }
  })();
}
