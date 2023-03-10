import "./style.css";


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
  `https://api.giphy.com/v1/gifs/translate?api_key=SNx0tORQLx6LOnuvvFOR1GR6g5GIa6gc&s=${searchTerm}`,
  { mode: "cors" }
)
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    img.src = response.data.images.original.url;
  });