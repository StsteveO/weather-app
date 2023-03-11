import "./style.css";
import { fromUnixTime } from "date-fns";


const img = document.querySelector("img");
const input = document.querySelector("input");
const button = document.querySelector("button");

// const searchTerm = prompt("What Gif do you want to look up next?");
let searchTerm = "cats";

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    button.click();
  }
});

button.addEventListener("click", () => {
  if (input.value === "" || input.value === undefined) {
    return;
  } else {
    searchTerm = input.value;

    fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=SNx0tORQLx6LOnuvvFOR1GR6g5GIa6gc&s=${searchTerm}`,
      { mode: "cors" }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        img.src = response.data.images.original.url;
      })
      .catch(function (error) {
        console.log("Unable to find, please try again.");
        return;
      });
  }
});

fetch(
  `https://api.openweathermap.org/data/2.5/weather?zip=08505,us&appid=f3337944daf97f3814e94aa737748161&units=imperial`,
  { mode: "cors" }
)
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    console.log(response);

    const locationName= response.name;
    const temp= (`Current temperature: ${Math.round(response.main.temp)}\u00B0 F`); //degree symbol= \u00B0
    const feelsLike= (`Feels like: ${Math.round(response.main.feels_like)}\u00B0 F`);
    const rawSunriseData = fromUnixTime(response.sys.sunrise);
    const rawSunsetData = fromUnixTime(response.sys.sunset);

    console.log(locationName);
    console.log(temp);
    console.log(feelsLike);
    console.log(rawSunriseData);
    console.log(rawSunsetData);

    // console.log(typeof(rawSunriseData)); //object
    console.log((JSON.stringify(rawSunriseData))); //object to string
    const rawSunriseString=(JSON.stringify(rawSunriseData));
    const rawSunriseQuotesRm= rawSunriseString.replace(/"/g, "");
    console.log(rawSunriseQuotesRm);
    // console.log((JSON.stringify(rawSunriseData)).split("T"));
    // const rawSunriseDataArr=rawSunriseData.split(" ");
    // console.log(rawSunriseDataArr);
  });