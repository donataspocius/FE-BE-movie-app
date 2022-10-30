import { api } from "./api.js";
import { renderPagination, itemsPerPage, pageIndex } from "./utils.js";

// Variables
// -- DOM elements
const moviesFilterByCategoryElement = document.querySelector(
  "#movies-filter-by-category"
);
const moviesFilterByPriceElement = document.querySelector(
  "#movies-filter-by-price"
);
const moviesContainerElement = document.querySelector("#movies-container");

// -- logic
let movies = [];
let category;

// let pageIndex = 0;
// let itemsPerPage = 3;

// Functions
// -- get all movies
const getMovies = async () => {
  const data = await api.getData();

  movies.push(...data.movies);
  generateOptionTags(data.movies);
  showMovies(data.movies);
  renderPagination(data.movies, showMovies);
};

// -- generate <option> tags for filtering <select>
const generateOptionTags = (moviesArray, filterType = null) => {
  // for category filter
  if (!filterType) {
    const categoriesArray = new Set(moviesArray.map((movie) => movie.category));

    // -- creating "All movies" option
    const allMoviesOption = document.createElement("option");
    allMoviesOption.setAttribute("value", "all-movies");
    allMoviesOption.innerText = "All movies";

    moviesFilterByCategoryElement.appendChild(allMoviesOption);

    // -- creating other category options based on categoriesArray
    categoriesArray.forEach((category) => {
      const option = document.createElement("option");
      option.setAttribute("value", category);
      option.innerText = category;

      moviesFilterByCategoryElement.appendChild(option);
    });
  }

  // for price filter
  if (!filterType || filterType === "category") {
    if (filterType === "category") {
      while (moviesFilterByPriceElement.firstChild) {
        moviesFilterByPriceElement.removeChild(
          moviesFilterByPriceElement.firstChild
        );
      }
    }

    const rentPricesArray = new Set(
      moviesArray.map((movie) => movie.rentPrice).sort((a, b) => a - b)
    );

    // -- creating "All prices" option
    const allPrices = document.createElement("option");
    allPrices.setAttribute("value", "all-prices");
    allPrices.innerText = "All prices";

    moviesFilterByPriceElement.appendChild(allPrices);

    // -- creating other options based on rentPricesArray
    rentPricesArray.forEach((price) => {
      const option = document.createElement("option");
      option.setAttribute("value", price);
      option.innerText = price.toFixed(2) + "€";

      moviesFilterByPriceElement.appendChild(option);
    });
  }
};
// -- show movies
const showMovies = (moviesArray) => {
  while (moviesContainerElement.firstChild) {
    moviesContainerElement.removeChild(moviesContainerElement.firstChild);
  }
  // renderPagination(moviesArray);
  for (
    let i = pageIndex * itemsPerPage;
    i < pageIndex * itemsPerPage + itemsPerPage;
    i++
  ) {
    if (!moviesArray[i]) return;

    const div = document.createElement("div");
    const h4 = document.createElement("h4");
    const pForCategory = document.createElement("p");
    const pForPrice = document.createElement("p");

    h4.innerText = moviesArray[i].name;
    pForCategory.innerText = moviesArray[i].category;
    pForPrice.innerText = moviesArray[i].rentPrice.toFixed(2) + "€";

    div.append(h4, pForCategory, pForPrice);
    moviesContainerElement.appendChild(div);
  }

  // >>> ORIGINAL CODE
  // moviesArray.forEach((movie) => {
  //   const div = document.createElement('div');
  //   const h4 = document.createElement('h4');
  //   const pForCategory = document.createElement('p');
  //   const pForPrice = document.createElement('p');

  //   h4.innerText = movie.name;
  //   pForCategory.innerText = movie.category;
  //   pForPrice.innerText = movie.rentPrice.toFixed(2) + '€';

  //   div.append(h4, pForCategory, pForPrice);
  //   moviesContainerElement.appendChild(div);
  // });
};

// -- filtering movies
// -- -- filtering by category
const filterMoviesByCategory = (e) => {
  category = e.target.value;

  if (category === "all-movies") {
    // showMovies(movies);
    renderPagination(movies, showMovies);

    generateOptionTags(movies, "category");
  } else {
    const filteredMovies = movies.filter(
      (movie) => movie.category === category
    );

    // showMovies(filteredMovies);
    renderPagination(filteredMovies, showMovies);
    generateOptionTags(filteredMovies, "category");
  }
};

// -- -- filtering by price
const filterMoviesByPrice = (e) => {
  const currentPrice = e.target.value;

  if (category === "all-movies" && currentPrice === "all-prices") {
    // showMovies(movies);
    renderPagination(movies, showMovies);
  } else if (currentPrice === "all-prices") {
    const filteredMovies = movies.filter(
      (movie) => movie.category === category
    );

    // showMovies(filteredMovies);
    renderPagination(filteredMovies, showMovies);
  } else {
    let filteredMovies;
    if (category && category !== "all-movies") {
      filteredMovies = movies.filter(
        (movie) =>
          movie.rentPrice === +currentPrice && movie.category === category
      );
    } else {
      filteredMovies = movies.filter(
        (movie) => movie.rentPrice === +currentPrice
      );
    }

    // showMovies(filteredMovies);
    renderPagination(filteredMovies, showMovies);
  }
};

// Events
document.addEventListener("DOMContentLoaded", getMovies);
moviesFilterByCategoryElement.addEventListener(
  "change",
  filterMoviesByCategory
);
moviesFilterByPriceElement.addEventListener("change", filterMoviesByPrice);
