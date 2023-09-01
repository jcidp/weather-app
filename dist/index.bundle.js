/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/DOM.js":
/*!****************************!*\
  !*** ./src/modules/DOM.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./src/modules/api.js");

const domController = (() => {
  let units = "c";
  let city = "nyc";
  let weatherData;
  let validCity = true;
  const renderHeader = () => {
    const header = document.createElement("header");
    const title = document.createElement("h1");
    title.textContent = "Weather Watch";
    header.appendChild(title);
    document.querySelector("body").appendChild(header);
  };
  const renderFooter = () => {
    const footer = document.createElement("footer");
    const anchor = document.createElement("a");
    anchor.setAttribute("href", "https://github.com/jcidp");
    anchor.setAttribute("target", "_blank");
    const p = document.createElement("p");
    p.textContent = "Made by jcidp";
    p.setAttribute("id", "author");
    anchor.appendChild(p);
    const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const title = document.createElement("title");
    title.textContent = "GitHub";
    iconSvg.appendChild(title);
    iconSvg.setAttribute("viewBox", "0 0 24 24");
    iconPath.setAttribute("d", "M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z");
    iconSvg.appendChild(iconPath);
    anchor.appendChild(iconSvg);
    footer.appendChild(anchor);
    const body = document.querySelector("body");
    body.appendChild(footer);
  };
  const renderPage = () => {
    renderHeader();
    const main = document.createElement("main");
    const location = document.createElement("form");
    const label = document.createElement("label");
    label.setAttribute("for", "location");
    label.textContent = "City: ";
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", "location");
    input.setAttribute("id", "location");
    input.setAttribute("autocomplete", "off");
    input.setAttribute("placeholder", "New York");
    label.appendChild(input);
    location.appendChild(label);
    const btn = document.createElement("button");
    btn.textContent = "Search";
    btn.setAttribute("id", "search");
    btn.addEventListener("click", handleSearch);
    location.appendChild(btn);
    location.classList.add("location-input");
    main.appendChild(location);
    const toggleContainer = document.createElement("div");
    toggleContainer.classList.add("toggle-container");
    const toggleLabel = document.createElement("label");
    toggleLabel.classList.add("switch");
    const toggle = document.createElement("input");
    toggle.setAttribute("type", "checkbox");
    toggle.setAttribute("id", "units");
    toggle.addEventListener("click", toggleUnits);
    toggleLabel.appendChild(toggle);
    const toggleSpan = document.createElement("span");
    toggleSpan.classList.add("slider");
    toggleLabel.appendChild(toggleSpan);
    toggleContainer.appendChild(toggleLabel);
    main.appendChild(toggleContainer);
    const container = document.createElement("section");
    container.classList.add("results-container");
    main.appendChild(container);
    document.querySelector("body").appendChild(main);
    renderFooter();
    input.focus();
    loadSearch();
  };
  const handleSearch = () => {
    const location = document.getElementById("location").value;
    if (!location) return;
    city = location;
    loadSearch();
  };
  const showError = () => {
    validCity = false;
    const container = document.querySelector(".results-container");
    const errorEle = document.createElement("p");
    errorEle.classList.add("error");
    errorEle.textContent = `Unable to get results for "${city}". Please ensure it's a valid location spelled correctly or try again later.`;
    container.appendChild(errorEle);
  };
  const loadSearch = async () => {
    const btn = document.getElementById("search");
    btn.setAttribute("disabled", true);
    renderLoader();
    weatherData = await (0,_api__WEBPACK_IMPORTED_MODULE_0__["default"])(city);
    btn.removeAttribute("disabled");
    cleanWeatherDisplay();
    if (weatherData.name === "Error") return showError(weatherData);
    document.getElementById("location").value = "";
    validCity = true;
    renderWeatherData(weatherData);
  };
  const renderLoader = () => {
    cleanWeatherDisplay();
    const container = document.querySelector(".results-container");
    const loader = document.createElement("span");
    loader.classList.add("loader");
    container.appendChild(loader);
  };
  const toggleUnits = e => {
    units = e.target.checked ? "f" : "c";
    if (!validCity) return;
    cleanWeatherDisplay();
    renderWeatherData(weatherData);
  };
  const cleanWeatherDisplay = () => {
    const parent = document.querySelector(".results-container");
    let child = parent.firstElementChild;
    while (child) {
      parent.removeChild(child);
      child = parent.firstElementChild;
    }
  };
  const renderWeatherData = data => {
    const container = document.querySelector(".results-container");
    const location = document.createElement("p");
    location.textContent = `Showing results for location: ${data.location}`;
    location.classList.add("results-location");
    container.appendChild(location);
    const nowContainer = document.createElement("div");
    nowContainer.classList.add("weather-container");
    nowContainer.classList.add("now");
    const title = document.createElement("h2");
    title.textContent = "Now";
    nowContainer.appendChild(title);
    const nowIcon = document.createElement("img");
    nowIcon.src = `https:${data.now.icon}`;
    nowContainer.appendChild(nowIcon);
    const nowTemp = document.createElement("p");
    nowTemp.textContent = `Currently: ${data.now[`temp_${units}`]}°${units.toUpperCase()}`;
    nowContainer.appendChild(nowTemp);
    container.appendChild(nowContainer);
    const dict = {
      0: "today",
      1: "tomorrow",
      2: "day_after_tomorrow"
    };
    for (let i = 0; i < 3; i++) {
      const dayContainer = document.createElement("div");
      dayContainer.classList.add("weather-container");
      dayContainer.classList.add(dict[i]);
      const title = document.createElement("h2");
      const day = dict[i] === "day_after_tomorrow" ? "day after tomorrow" : dict[i];
      title.textContent = day[0].toUpperCase() + day.slice(1);
      dayContainer.appendChild(title);
      const dayIcon = document.createElement("img");
      dayIcon.src = `https:${data[dict[i]].icon}`;
      dayContainer.appendChild(dayIcon);
      const dayAvgTemp = document.createElement("p");
      dayAvgTemp.textContent = `Avg: ${data[dict[i]][`temp_${units}`]}°${units.toUpperCase()}`;
      dayContainer.appendChild(dayAvgTemp);
      const tempRange = document.createElement("p");
      tempRange.textContent = `${data[dict[i]][`mintemp_${units}`]}°${units.toUpperCase()} - ${data[dict[i]][`maxtemp_${units}`]}°${units.toUpperCase()}`;
      dayContainer.appendChild(tempRange);
      const rainChance = document.createElement("p");
      rainChance.textContent = `Rain chance: ${data[dict[i]].rain_chance}%`;
      dayContainer.appendChild(rainChance);
      if (data[dict[i]].snow_chance) {
        const snowChance = document.createElement("p");
        snowChance.textContent = `Rain chance: ${data[dict[i]].snow_chance}%`;
        dayContainer.appendChild(snowChance);
      }
      container.appendChild(dayContainer);
    }
  };
  return {
    renderPage
  };
})();
/* harmony default export */ __webpack_exports__["default"] = (domController);

/***/ }),

/***/ "./src/modules/api.js":
/*!****************************!*\
  !*** ./src/modules/api.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
async function getForecastWeatherData(location) {
  try {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=e990e820b2c64eef80a155450232508&q=${location}&days=3`;
    const options = {
      mode: "cors"
    };
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Failed to connect to API");
    const data = await response.json();
    return getDataFromAPIResponse(data);
  } catch (error) {
    console.log(error);
    return error;
  }
}
function getDataFromAPIResponse(data) {
  const forecast = [];
  data.forecast.forecastday.forEach(day => {
    const obj = {};
    obj.temp_c = day.day.avgtemp_c;
    obj.temp_f = day.day.avgtemp_f;
    obj.mintemp_c = day.day.mintemp_c;
    obj.mintemp_f = day.day.mintemp_f;
    obj.maxtemp_c = day.day.maxtemp_c;
    obj.maxtemp_f = day.day.maxtemp_f;
    obj.rain_chance = day.day.daily_chance_of_rain;
    obj.snow_chance = day.day.daily_chance_of_snow;
    obj.icon = day.day.condition.icon;
    forecast.push(obj);
  });
  return {
    now: {
      temp_c: data.current.temp_c,
      temp_f: data.current.temp_f,
      icon: data.current.condition.icon
    },
    today: forecast[0],
    tomorrow: forecast[1],
    day_after_tomorrow: forecast[2],
    location: data.location.name
  };
}
/* harmony default export */ __webpack_exports__["default"] = (getForecastWeatherData);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n}\n\nbody {\n    font-family: system-ui;\n    line-height: 1.5;\n    display: grid;\n    grid-template-rows: max-content 1fr max-content;\n    min-height: 100svh;\n}\n\nmain {\n    width: min(70ch, 100% - 2rem);\n    margin-inline: auto;\n    margin-top: 0.5rem;\n}\n\nh1 {\n    text-align: center;\n    background-color: #2196F3;\n    color: white;\n    font-size: 1.25em;\n}\n\n.location-input {\n    display: flex;\n    justify-content: center;\n    gap: 1rem;\n}\n\ninput, button {\n    border-radius: 5px;\n}\n\ninput[type=\"text\"] {\n    border-style: solid;\n    padding: 0 0.5rem;\n}\n\n#search {\n    border: none;\n    padding: 0.25rem 1rem;\n    font-weight: bold;\n}\n\n#search:disabled {\n    background-color: transparent;\n}\n\n#search:hover {\n    cursor: pointer;\n    background-color: #ddd;\n}\n\n.toggle-container {\n    display: grid;\n    place-content: center;\n    margin-top: 0.5rem;\n}\n\ninput[type=\"checkbox\"] {\n    grid-column: 1 / -1;\n    position: relative;\n}\n\n/* Slider */\n.switch {\n    position: relative;\n    display: inline-block;\n    width: 2.5em;\n    height: 1.5em;\n    display: flex;\n    align-items: center;\n}\n\n.switch input {\n    opacity: 0;\n    width: 0;\n    height: 0;\n}\n\n.slider {\n    position: absolute;\n    cursor: pointer;\n    inset: 0;\n    background-color: #2196F3;\n    -webkit-transition: .4s;\n    transition: .4s;\n    border-radius: 34px;\n}\n\n.slider::before {\n    position: absolute;\n    content: \"\";\n    height: 1em;\n    width: 1em;\n    left: 4px;\n    bottom: 4px;\n    background-color: white;\n    -webkit-transition: .4s;\n    transition: .4s;\n    border-radius: 50%;\n}\n\ninput:checked + .slider {\n    background-color: rgb(255, 33, 33);\n}\n\ninput:focus + .slider {\n    box-shadow: 0 0 1px rgb(255, 33, 33);\n}\n\ninput:checked + .slider::before {\n    -webkit-transform: translateX(1em);\n    -ms-transform: translateX(1em);\n    transform: translateX(1em);\n}\n\n.switch::before {\n    content: \"°C\";\n    position: absolute;\n    left: -1.25rem;\n}\n\n.switch::after {\n    content: \"°F\";\n    position: absolute;\n    right: -1.125rem;\n    text-align: right;\n}\n\n.results-container {\n    text-align: center;\n    margin-top: 0.5rem;\n}\n\n.loader {\n    width: 48px;\n    height: 48px;\n    border: 5px solid #ccc;\n    border-bottom-color: transparent;\n    border-radius: 50%;\n    display: inline-block;\n    box-sizing: border-box;\n    animation: rotation 1s linear infinite;\n    margin-top: 30svh;\n}\n\n@keyframes rotation {\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n} \n\n.weather-container {\n    padding: 0.5rem 0;\n}\n\n.weather-container:not(:first-of-type) {\n    border-top: 1px solid grey;\n}\n\nh2 {\n    font-size: 1.125rem;\n}\n\nimg {\n    max-width: 48px;\n}\n\nfooter {\n    background-color: darkslategrey;\n}\n\nfooter>a {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 0.5em;\n    color: white;\n    fill: white;\n    text-decoration: none;\n}\n\nsvg {\n    max-width: 2em;\n}\n\n@media (min-width: 541px) {\n    main {\n        margin-top: 2em;\n    }\n\n    .results-container {\n        display: grid;\n        grid-template-columns: repeat(3, 1fr);\n        margin-top: 3rem;\n    }\n\n    .now, .results-location {\n        grid-column: 1 / -1;\n    }\n\n    .weather-container {\n        padding: 2rem 0;\n    }\n\n    p {\n        margin: 0.5rem 0;\n    }\n\n    img {\n        max-width: none;\n    }\n\n    .loader, .error {\n        grid-column: 1 / -1;\n        justify-self: center;\n    }\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,SAAS;IACT,UAAU;IACV,sBAAsB;AAC1B;;AAEA;IACI,sBAAsB;IACtB,gBAAgB;IAChB,aAAa;IACb,+CAA+C;IAC/C,kBAAkB;AACtB;;AAEA;IACI,6BAA6B;IAC7B,mBAAmB;IACnB,kBAAkB;AACtB;;AAEA;IACI,kBAAkB;IAClB,yBAAyB;IACzB,YAAY;IACZ,iBAAiB;AACrB;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,SAAS;AACb;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,mBAAmB;IACnB,iBAAiB;AACrB;;AAEA;IACI,YAAY;IACZ,qBAAqB;IACrB,iBAAiB;AACrB;;AAEA;IACI,6BAA6B;AACjC;;AAEA;IACI,eAAe;IACf,sBAAsB;AAC1B;;AAEA;IACI,aAAa;IACb,qBAAqB;IACrB,kBAAkB;AACtB;;AAEA;IACI,mBAAmB;IACnB,kBAAkB;AACtB;;AAEA,WAAW;AACX;IACI,kBAAkB;IAClB,qBAAqB;IACrB,YAAY;IACZ,aAAa;IACb,aAAa;IACb,mBAAmB;AACvB;;AAEA;IACI,UAAU;IACV,QAAQ;IACR,SAAS;AACb;;AAEA;IACI,kBAAkB;IAClB,eAAe;IACf,QAAQ;IACR,yBAAyB;IACzB,uBAAuB;IACvB,eAAe;IACf,mBAAmB;AACvB;;AAEA;IACI,kBAAkB;IAClB,WAAW;IACX,WAAW;IACX,UAAU;IACV,SAAS;IACT,WAAW;IACX,uBAAuB;IACvB,uBAAuB;IACvB,eAAe;IACf,kBAAkB;AACtB;;AAEA;IACI,kCAAkC;AACtC;;AAEA;IACI,oCAAoC;AACxC;;AAEA;IACI,kCAAkC;IAClC,8BAA8B;IAC9B,0BAA0B;AAC9B;;AAEA;IACI,aAAa;IACb,kBAAkB;IAClB,cAAc;AAClB;;AAEA;IACI,aAAa;IACb,kBAAkB;IAClB,gBAAgB;IAChB,iBAAiB;AACrB;;AAEA;IACI,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,sBAAsB;IACtB,gCAAgC;IAChC,kBAAkB;IAClB,qBAAqB;IACrB,sBAAsB;IACtB,sCAAsC;IACtC,iBAAiB;AACrB;;AAEA;IACI;QACI,uBAAuB;IAC3B;IACA;QACI,yBAAyB;IAC7B;AACJ;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,0BAA0B;AAC9B;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,+BAA+B;AACnC;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,UAAU;IACV,YAAY;IACZ,WAAW;IACX,qBAAqB;AACzB;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI;QACI,eAAe;IACnB;;IAEA;QACI,aAAa;QACb,qCAAqC;QACrC,gBAAgB;IACpB;;IAEA;QACI,mBAAmB;IACvB;;IAEA;QACI,eAAe;IACnB;;IAEA;QACI,gBAAgB;IACpB;;IAEA;QACI,eAAe;IACnB;;IAEA;QACI,mBAAmB;QACnB,oBAAoB;IACxB;AACJ","sourcesContent":["* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n}\n\nbody {\n    font-family: system-ui;\n    line-height: 1.5;\n    display: grid;\n    grid-template-rows: max-content 1fr max-content;\n    min-height: 100svh;\n}\n\nmain {\n    width: min(70ch, 100% - 2rem);\n    margin-inline: auto;\n    margin-top: 0.5rem;\n}\n\nh1 {\n    text-align: center;\n    background-color: #2196F3;\n    color: white;\n    font-size: 1.25em;\n}\n\n.location-input {\n    display: flex;\n    justify-content: center;\n    gap: 1rem;\n}\n\ninput, button {\n    border-radius: 5px;\n}\n\ninput[type=\"text\"] {\n    border-style: solid;\n    padding: 0 0.5rem;\n}\n\n#search {\n    border: none;\n    padding: 0.25rem 1rem;\n    font-weight: bold;\n}\n\n#search:disabled {\n    background-color: transparent;\n}\n\n#search:hover {\n    cursor: pointer;\n    background-color: #ddd;\n}\n\n.toggle-container {\n    display: grid;\n    place-content: center;\n    margin-top: 0.5rem;\n}\n\ninput[type=\"checkbox\"] {\n    grid-column: 1 / -1;\n    position: relative;\n}\n\n/* Slider */\n.switch {\n    position: relative;\n    display: inline-block;\n    width: 2.5em;\n    height: 1.5em;\n    display: flex;\n    align-items: center;\n}\n\n.switch input {\n    opacity: 0;\n    width: 0;\n    height: 0;\n}\n\n.slider {\n    position: absolute;\n    cursor: pointer;\n    inset: 0;\n    background-color: #2196F3;\n    -webkit-transition: .4s;\n    transition: .4s;\n    border-radius: 34px;\n}\n\n.slider::before {\n    position: absolute;\n    content: \"\";\n    height: 1em;\n    width: 1em;\n    left: 4px;\n    bottom: 4px;\n    background-color: white;\n    -webkit-transition: .4s;\n    transition: .4s;\n    border-radius: 50%;\n}\n\ninput:checked + .slider {\n    background-color: rgb(255, 33, 33);\n}\n\ninput:focus + .slider {\n    box-shadow: 0 0 1px rgb(255, 33, 33);\n}\n\ninput:checked + .slider::before {\n    -webkit-transform: translateX(1em);\n    -ms-transform: translateX(1em);\n    transform: translateX(1em);\n}\n\n.switch::before {\n    content: \"°C\";\n    position: absolute;\n    left: -1.25rem;\n}\n\n.switch::after {\n    content: \"°F\";\n    position: absolute;\n    right: -1.125rem;\n    text-align: right;\n}\n\n.results-container {\n    text-align: center;\n    margin-top: 0.5rem;\n}\n\n.loader {\n    width: 48px;\n    height: 48px;\n    border: 5px solid #ccc;\n    border-bottom-color: transparent;\n    border-radius: 50%;\n    display: inline-block;\n    box-sizing: border-box;\n    animation: rotation 1s linear infinite;\n    margin-top: 30svh;\n}\n\n@keyframes rotation {\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n} \n\n.weather-container {\n    padding: 0.5rem 0;\n}\n\n.weather-container:not(:first-of-type) {\n    border-top: 1px solid grey;\n}\n\nh2 {\n    font-size: 1.125rem;\n}\n\nimg {\n    max-width: 48px;\n}\n\nfooter {\n    background-color: darkslategrey;\n}\n\nfooter>a {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 0.5em;\n    color: white;\n    fill: white;\n    text-decoration: none;\n}\n\nsvg {\n    max-width: 2em;\n}\n\n@media (min-width: 541px) {\n    main {\n        margin-top: 2em;\n    }\n\n    .results-container {\n        display: grid;\n        grid-template-columns: repeat(3, 1fr);\n        margin-top: 3rem;\n    }\n\n    .now, .results-location {\n        grid-column: 1 / -1;\n    }\n\n    .weather-container {\n        padding: 2rem 0;\n    }\n\n    p {\n        margin: 0.5rem 0;\n    }\n\n    img {\n        max-width: none;\n    }\n\n    .loader, .error {\n        grid-column: 1 / -1;\n        justify-self: center;\n    }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ (function(module) {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ (function(module) {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ (function(module) {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ (function(module) {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ (function(module) {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ (function(module) {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ (function(module) {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	!function() {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _modules_DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/DOM */ "./src/modules/DOM.js");


_modules_DOM__WEBPACK_IMPORTED_MODULE_1__["default"].renderPage();
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDYkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0MsZUFBZTtXQUNmLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7OztBQ0FxQjtBQUNxQjtBQUUxQ0Msb0RBQWEsQ0FBQ3NCLFVBQVUsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9tb2R1bGVzL0RPTS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9tb2R1bGVzL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZ2V0Rm9yZWNhc3RXZWF0aGVyRGF0YSBmcm9tIFwiLi9hcGlcIjtcblxuY29uc3QgZG9tQ29udHJvbGxlciA9ICgoKSA9PiB7XG4gIGxldCB1bml0cyA9IFwiY1wiO1xuICBsZXQgY2l0eSA9IFwibnljXCI7XG4gIGxldCB3ZWF0aGVyRGF0YTtcbiAgbGV0IHZhbGlkQ2l0eSA9IHRydWU7XG5cbiAgY29uc3QgcmVuZGVySGVhZGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIik7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIldlYXRoZXIgV2F0Y2hcIjtcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIH07XG5cbiAgY29uc3QgcmVuZGVyRm9vdGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb290ZXJcIik7XG4gICAgY29uc3QgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgYW5jaG9yLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgXCJodHRwczovL2dpdGh1Yi5jb20vamNpZHBcIik7XG4gICAgYW5jaG9yLnNldEF0dHJpYnV0ZShcInRhcmdldFwiLCBcIl9ibGFua1wiKTtcbiAgICBjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgcC50ZXh0Q29udGVudCA9IFwiTWFkZSBieSBqY2lkcFwiO1xuICAgIHAuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJhdXRob3JcIik7XG4gICAgYW5jaG9yLmFwcGVuZENoaWxkKHApO1xuICAgIGNvbnN0IGljb25TdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXG4gICAgICBcInN2Z1wiLFxuICAgICk7XG4gICAgY29uc3QgaWNvblBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXG4gICAgICBcInBhdGhcIixcbiAgICApO1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRpdGxlXCIpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gXCJHaXRIdWJcIjtcbiAgICBpY29uU3ZnLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICBpY29uU3ZnLnNldEF0dHJpYnV0ZShcInZpZXdCb3hcIiwgXCIwIDAgMjQgMjRcIik7XG4gICAgaWNvblBhdGguc2V0QXR0cmlidXRlKFxuICAgICAgXCJkXCIsXG4gICAgICBcIk0xMiwyQTEwLDEwIDAgMCwwIDIsMTJDMiwxNi40MiA0Ljg3LDIwLjE3IDguODQsMjEuNUM5LjM0LDIxLjU4IDkuNSwyMS4yNyA5LjUsMjFDOS41LDIwLjc3IDkuNSwyMC4xNCA5LjUsMTkuMzFDNi43MywxOS45MSA2LjE0LDE3Ljk3IDYuMTQsMTcuOTdDNS42OCwxNi44MSA1LjAzLDE2LjUgNS4wMywxNi41QzQuMTIsMTUuODggNS4xLDE1LjkgNS4xLDE1LjlDNi4xLDE1Ljk3IDYuNjMsMTYuOTMgNi42MywxNi45M0M3LjUsMTguNDUgOC45NywxOCA5LjU0LDE3Ljc2QzkuNjMsMTcuMTEgOS44OSwxNi42NyAxMC4xNywxNi40MkM3Ljk1LDE2LjE3IDUuNjIsMTUuMzEgNS42MiwxMS41QzUuNjIsMTAuMzkgNiw5LjUgNi42NSw4Ljc5QzYuNTUsOC41NCA2LjIsNy41IDYuNzUsNi4xNUM2Ljc1LDYuMTUgNy41OSw1Ljg4IDkuNSw3LjE3QzEwLjI5LDYuOTUgMTEuMTUsNi44NCAxMiw2Ljg0QzEyLjg1LDYuODQgMTMuNzEsNi45NSAxNC41LDcuMTdDMTYuNDEsNS44OCAxNy4yNSw2LjE1IDE3LjI1LDYuMTVDMTcuOCw3LjUgMTcuNDUsOC41NCAxNy4zNSw4Ljc5QzE4LDkuNSAxOC4zOCwxMC4zOSAxOC4zOCwxMS41QzE4LjM4LDE1LjMyIDE2LjA0LDE2LjE2IDEzLjgxLDE2LjQxQzE0LjE3LDE2LjcyIDE0LjUsMTcuMzMgMTQuNSwxOC4yNkMxNC41LDE5LjYgMTQuNSwyMC42OCAxNC41LDIxQzE0LjUsMjEuMjcgMTQuNjYsMjEuNTkgMTUuMTcsMjEuNUMxOS4xNCwyMC4xNiAyMiwxNi40MiAyMiwxMkExMCwxMCAwIDAsMCAxMiwyWlwiLFxuICAgICk7XG4gICAgaWNvblN2Zy5hcHBlbmRDaGlsZChpY29uUGF0aCk7XG4gICAgYW5jaG9yLmFwcGVuZENoaWxkKGljb25TdmcpO1xuICAgIGZvb3Rlci5hcHBlbmRDaGlsZChhbmNob3IpO1xuXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcbiAgfTtcblxuICBjb25zdCByZW5kZXJQYWdlID0gKCkgPT4ge1xuICAgIHJlbmRlckhlYWRlcigpO1xuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibWFpblwiKTtcbiAgICBjb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIGxhYmVsLnNldEF0dHJpYnV0ZShcImZvclwiLCBcImxvY2F0aW9uXCIpO1xuICAgIGxhYmVsLnRleHRDb250ZW50ID0gXCJDaXR5OiBcIjtcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwibG9jYXRpb25cIik7XG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJsb2NhdGlvblwiKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJhdXRvY29tcGxldGVcIiwgXCJvZmZcIik7XG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIiwgXCJOZXcgWW9ya1wiKTtcbiAgICBsYWJlbC5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgbG9jYXRpb24uYXBwZW5kQ2hpbGQobGFiZWwpO1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnRuLnRleHRDb250ZW50ID0gXCJTZWFyY2hcIjtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJzZWFyY2hcIik7XG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVTZWFyY2gpO1xuICAgIGxvY2F0aW9uLmFwcGVuZENoaWxkKGJ0bik7XG4gICAgbG9jYXRpb24uY2xhc3NMaXN0LmFkZChcImxvY2F0aW9uLWlucHV0XCIpO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQobG9jYXRpb24pO1xuXG4gICAgY29uc3QgdG9nZ2xlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0b2dnbGVDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInRvZ2dsZS1jb250YWluZXJcIik7XG4gICAgY29uc3QgdG9nZ2xlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgdG9nZ2xlTGFiZWwuY2xhc3NMaXN0LmFkZChcInN3aXRjaFwiKTtcbiAgICBjb25zdCB0b2dnbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgdG9nZ2xlLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJjaGVja2JveFwiKTtcbiAgICB0b2dnbGUuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJ1bml0c1wiKTtcbiAgICB0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZVVuaXRzKTtcbiAgICB0b2dnbGVMYWJlbC5hcHBlbmRDaGlsZCh0b2dnbGUpO1xuICAgIGNvbnN0IHRvZ2dsZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICB0b2dnbGVTcGFuLmNsYXNzTGlzdC5hZGQoXCJzbGlkZXJcIik7XG4gICAgdG9nZ2xlTGFiZWwuYXBwZW5kQ2hpbGQodG9nZ2xlU3Bhbik7XG4gICAgdG9nZ2xlQ29udGFpbmVyLmFwcGVuZENoaWxkKHRvZ2dsZUxhYmVsKTtcbiAgICBtYWluLmFwcGVuZENoaWxkKHRvZ2dsZUNvbnRhaW5lcik7XG5cbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChcInJlc3VsdHMtY29udGFpbmVyXCIpO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFwcGVuZENoaWxkKG1haW4pO1xuICAgIHJlbmRlckZvb3RlcigpO1xuXG4gICAgaW5wdXQuZm9jdXMoKTtcbiAgICBsb2FkU2VhcmNoKCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2VhcmNoID0gKCkgPT4ge1xuICAgIGNvbnN0IGxvY2F0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2NhdGlvblwiKS52YWx1ZTtcbiAgICBpZiAoIWxvY2F0aW9uKSByZXR1cm47XG4gICAgY2l0eSA9IGxvY2F0aW9uO1xuICAgIGxvYWRTZWFyY2goKTtcbiAgfTtcblxuICBjb25zdCBzaG93RXJyb3IgPSAoKSA9PiB7XG4gICAgdmFsaWRDaXR5ID0gZmFsc2U7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXN1bHRzLWNvbnRhaW5lclwiKTtcbiAgICBjb25zdCBlcnJvckVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGVycm9yRWxlLmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICBlcnJvckVsZS50ZXh0Q29udGVudCA9IGBVbmFibGUgdG8gZ2V0IHJlc3VsdHMgZm9yIFwiJHtjaXR5fVwiLiBQbGVhc2UgZW5zdXJlIGl0J3MgYSB2YWxpZCBsb2NhdGlvbiBzcGVsbGVkIGNvcnJlY3RseSBvciB0cnkgYWdhaW4gbGF0ZXIuYDtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZXJyb3JFbGUpO1xuICB9O1xuXG4gIGNvbnN0IGxvYWRTZWFyY2ggPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hcIik7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIHRydWUpO1xuICAgIHJlbmRlckxvYWRlcigpO1xuICAgIHdlYXRoZXJEYXRhID0gYXdhaXQgZ2V0Rm9yZWNhc3RXZWF0aGVyRGF0YShjaXR5KTtcbiAgICBidG4ucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgY2xlYW5XZWF0aGVyRGlzcGxheSgpO1xuICAgIGlmICh3ZWF0aGVyRGF0YS5uYW1lID09PSBcIkVycm9yXCIpIHJldHVybiBzaG93RXJyb3Iod2VhdGhlckRhdGEpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9jYXRpb25cIikudmFsdWUgPSBcIlwiO1xuICAgIHZhbGlkQ2l0eSA9IHRydWU7XG4gICAgcmVuZGVyV2VhdGhlckRhdGEod2VhdGhlckRhdGEpO1xuICB9O1xuXG4gIGNvbnN0IHJlbmRlckxvYWRlciA9ICgpID0+IHtcbiAgICBjbGVhbldlYXRoZXJEaXNwbGF5KCk7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXN1bHRzLWNvbnRhaW5lclwiKTtcbiAgICBjb25zdCBsb2FkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBsb2FkZXIuY2xhc3NMaXN0LmFkZChcImxvYWRlclwiKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobG9hZGVyKTtcbiAgfTtcblxuICBjb25zdCB0b2dnbGVVbml0cyA9IChlKSA9PiB7XG4gICAgdW5pdHMgPSBlLnRhcmdldC5jaGVja2VkID8gXCJmXCIgOiBcImNcIjtcbiAgICBpZiAoIXZhbGlkQ2l0eSkgcmV0dXJuO1xuICAgIGNsZWFuV2VhdGhlckRpc3BsYXkoKTtcbiAgICByZW5kZXJXZWF0aGVyRGF0YSh3ZWF0aGVyRGF0YSk7XG4gIH07XG5cbiAgY29uc3QgY2xlYW5XZWF0aGVyRGlzcGxheSA9ICgpID0+IHtcbiAgICBjb25zdCBwYXJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc3VsdHMtY29udGFpbmVyXCIpO1xuICAgIGxldCBjaGlsZCA9IHBhcmVudC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChjaGlsZCk7XG4gICAgICBjaGlsZCA9IHBhcmVudC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVuZGVyV2VhdGhlckRhdGEgPSAoZGF0YSkgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzdWx0cy1jb250YWluZXJcIik7XG4gICAgY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBsb2NhdGlvbi50ZXh0Q29udGVudCA9IGBTaG93aW5nIHJlc3VsdHMgZm9yIGxvY2F0aW9uOiAke2RhdGEubG9jYXRpb259YDtcbiAgICBsb2NhdGlvbi5jbGFzc0xpc3QuYWRkKFwicmVzdWx0cy1sb2NhdGlvblwiKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobG9jYXRpb24pO1xuXG4gICAgY29uc3Qgbm93Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBub3dDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIndlYXRoZXItY29udGFpbmVyXCIpO1xuICAgIG5vd0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwibm93XCIpO1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gXCJOb3dcIjtcbiAgICBub3dDb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgIGNvbnN0IG5vd0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIG5vd0ljb24uc3JjID0gYGh0dHBzOiR7ZGF0YS5ub3cuaWNvbn1gO1xuICAgIG5vd0NvbnRhaW5lci5hcHBlbmRDaGlsZChub3dJY29uKTtcbiAgICBjb25zdCBub3dUZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgbm93VGVtcC50ZXh0Q29udGVudCA9IGBDdXJyZW50bHk6ICR7XG4gICAgICBkYXRhLm5vd1tgdGVtcF8ke3VuaXRzfWBdXG4gICAgfcKwJHt1bml0cy50b1VwcGVyQ2FzZSgpfWA7XG4gICAgbm93Q29udGFpbmVyLmFwcGVuZENoaWxkKG5vd1RlbXApO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChub3dDb250YWluZXIpO1xuXG4gICAgY29uc3QgZGljdCA9IHsgMDogXCJ0b2RheVwiLCAxOiBcInRvbW9ycm93XCIsIDI6IFwiZGF5X2FmdGVyX3RvbW9ycm93XCIgfTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICBjb25zdCBkYXlDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZGF5Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ3ZWF0aGVyLWNvbnRhaW5lclwiKTtcbiAgICAgIGRheUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGRpY3RbaV0pO1xuICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgICBjb25zdCBkYXkgPVxuICAgICAgICBkaWN0W2ldID09PSBcImRheV9hZnRlcl90b21vcnJvd1wiID8gXCJkYXkgYWZ0ZXIgdG9tb3Jyb3dcIiA6IGRpY3RbaV07XG4gICAgICB0aXRsZS50ZXh0Q29udGVudCA9IGRheVswXS50b1VwcGVyQ2FzZSgpICsgZGF5LnNsaWNlKDEpO1xuICAgICAgZGF5Q29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICAgIGNvbnN0IGRheUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgZGF5SWNvbi5zcmMgPSBgaHR0cHM6JHtkYXRhW2RpY3RbaV1dLmljb259YDtcbiAgICAgIGRheUNvbnRhaW5lci5hcHBlbmRDaGlsZChkYXlJY29uKTtcbiAgICAgIGNvbnN0IGRheUF2Z1RlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgIGRheUF2Z1RlbXAudGV4dENvbnRlbnQgPSBgQXZnOiAke1xuICAgICAgICBkYXRhW2RpY3RbaV1dW2B0ZW1wXyR7dW5pdHN9YF1cbiAgICAgIH3CsCR7dW5pdHMudG9VcHBlckNhc2UoKX1gO1xuICAgICAgZGF5Q29udGFpbmVyLmFwcGVuZENoaWxkKGRheUF2Z1RlbXApO1xuICAgICAgY29uc3QgdGVtcFJhbmdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICB0ZW1wUmFuZ2UudGV4dENvbnRlbnQgPSBgJHtcbiAgICAgICAgZGF0YVtkaWN0W2ldXVtgbWludGVtcF8ke3VuaXRzfWBdXG4gICAgICB9wrAke3VuaXRzLnRvVXBwZXJDYXNlKCl9IC0gJHtcbiAgICAgICAgZGF0YVtkaWN0W2ldXVtgbWF4dGVtcF8ke3VuaXRzfWBdXG4gICAgICB9wrAke3VuaXRzLnRvVXBwZXJDYXNlKCl9YDtcbiAgICAgIGRheUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0ZW1wUmFuZ2UpO1xuICAgICAgY29uc3QgcmFpbkNoYW5jZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgcmFpbkNoYW5jZS50ZXh0Q29udGVudCA9IGBSYWluIGNoYW5jZTogJHtkYXRhW2RpY3RbaV1dLnJhaW5fY2hhbmNlfSVgO1xuICAgICAgZGF5Q29udGFpbmVyLmFwcGVuZENoaWxkKHJhaW5DaGFuY2UpO1xuICAgICAgaWYgKGRhdGFbZGljdFtpXV0uc25vd19jaGFuY2UpIHtcbiAgICAgICAgY29uc3Qgc25vd0NoYW5jZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICBzbm93Q2hhbmNlLnRleHRDb250ZW50ID0gYFJhaW4gY2hhbmNlOiAke2RhdGFbZGljdFtpXV0uc25vd19jaGFuY2V9JWA7XG4gICAgICAgIGRheUNvbnRhaW5lci5hcHBlbmRDaGlsZChzbm93Q2hhbmNlKTtcbiAgICAgIH1cbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkYXlDb250YWluZXIpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHJlbmRlclBhZ2UsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBkb21Db250cm9sbGVyO1xuIiwiYXN5bmMgZnVuY3Rpb24gZ2V0Rm9yZWNhc3RXZWF0aGVyRGF0YShsb2NhdGlvbikge1xuICB0cnkge1xuICAgIGNvbnN0IHVybCA9IGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT1lOTkwZTgyMGIyYzY0ZWVmODBhMTU1NDUwMjMyNTA4JnE9JHtsb2NhdGlvbn0mZGF5cz0zYDtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgbW9kZTogXCJjb3JzXCIsXG4gICAgfTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG4gICAgaWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGNvbm5lY3QgdG8gQVBJXCIpO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgcmV0dXJuIGdldERhdGFGcm9tQVBJUmVzcG9uc2UoZGF0YSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIHJldHVybiBlcnJvcjtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREYXRhRnJvbUFQSVJlc3BvbnNlKGRhdGEpIHtcbiAgY29uc3QgZm9yZWNhc3QgPSBbXTtcbiAgZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheS5mb3JFYWNoKChkYXkpID0+IHtcbiAgICBjb25zdCBvYmogPSB7fTtcbiAgICBvYmoudGVtcF9jID0gZGF5LmRheS5hdmd0ZW1wX2M7XG4gICAgb2JqLnRlbXBfZiA9IGRheS5kYXkuYXZndGVtcF9mO1xuICAgIG9iai5taW50ZW1wX2MgPSBkYXkuZGF5Lm1pbnRlbXBfYztcbiAgICBvYmoubWludGVtcF9mID0gZGF5LmRheS5taW50ZW1wX2Y7XG4gICAgb2JqLm1heHRlbXBfYyA9IGRheS5kYXkubWF4dGVtcF9jO1xuICAgIG9iai5tYXh0ZW1wX2YgPSBkYXkuZGF5Lm1heHRlbXBfZjtcbiAgICBvYmoucmFpbl9jaGFuY2UgPSBkYXkuZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWluO1xuICAgIG9iai5zbm93X2NoYW5jZSA9IGRheS5kYXkuZGFpbHlfY2hhbmNlX29mX3Nub3c7XG4gICAgb2JqLmljb24gPSBkYXkuZGF5LmNvbmRpdGlvbi5pY29uO1xuICAgIGZvcmVjYXN0LnB1c2gob2JqKTtcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgbm93OiB7XG4gICAgICB0ZW1wX2M6IGRhdGEuY3VycmVudC50ZW1wX2MsXG4gICAgICB0ZW1wX2Y6IGRhdGEuY3VycmVudC50ZW1wX2YsXG4gICAgICBpY29uOiBkYXRhLmN1cnJlbnQuY29uZGl0aW9uLmljb24sXG4gICAgfSxcbiAgICB0b2RheTogZm9yZWNhc3RbMF0sXG4gICAgdG9tb3Jyb3c6IGZvcmVjYXN0WzFdLFxuICAgIGRheV9hZnRlcl90b21vcnJvdzogZm9yZWNhc3RbMl0sXG4gICAgbG9jYXRpb246IGRhdGEubG9jYXRpb24ubmFtZSxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0Rm9yZWNhc3RXZWF0aGVyRGF0YTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKiB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICAgIGZvbnQtZmFtaWx5OiBzeXN0ZW0tdWk7XFxuICAgIGxpbmUtaGVpZ2h0OiAxLjU7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogbWF4LWNvbnRlbnQgMWZyIG1heC1jb250ZW50O1xcbiAgICBtaW4taGVpZ2h0OiAxMDBzdmg7XFxufVxcblxcbm1haW4ge1xcbiAgICB3aWR0aDogbWluKDcwY2gsIDEwMCUgLSAycmVtKTtcXG4gICAgbWFyZ2luLWlubGluZTogYXV0bztcXG4gICAgbWFyZ2luLXRvcDogMC41cmVtO1xcbn1cXG5cXG5oMSB7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzIxOTZGMztcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBmb250LXNpemU6IDEuMjVlbTtcXG59XFxuXFxuLmxvY2F0aW9uLWlucHV0IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGdhcDogMXJlbTtcXG59XFxuXFxuaW5wdXQsIGJ1dHRvbiB7XFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXG59XFxuXFxuaW5wdXRbdHlwZT1cXFwidGV4dFxcXCJdIHtcXG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXG4gICAgcGFkZGluZzogMCAwLjVyZW07XFxufVxcblxcbiNzZWFyY2gge1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIHBhZGRpbmc6IDAuMjVyZW0gMXJlbTtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbiNzZWFyY2g6ZGlzYWJsZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuXFxuI3NlYXJjaDpob3ZlciB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2RkZDtcXG59XFxuXFxuLnRvZ2dsZS1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBwbGFjZS1jb250ZW50OiBjZW50ZXI7XFxuICAgIG1hcmdpbi10b3A6IDAuNXJlbTtcXG59XFxuXFxuaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXSB7XFxuICAgIGdyaWQtY29sdW1uOiAxIC8gLTE7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLyogU2xpZGVyICovXFxuLnN3aXRjaCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB3aWR0aDogMi41ZW07XFxuICAgIGhlaWdodDogMS41ZW07XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zd2l0Y2ggaW5wdXQge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB3aWR0aDogMDtcXG4gICAgaGVpZ2h0OiAwO1xcbn1cXG5cXG4uc2xpZGVyIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGluc2V0OiAwO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjE5NkYzO1xcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IC40cztcXG4gICAgdHJhbnNpdGlvbjogLjRzO1xcbiAgICBib3JkZXItcmFkaXVzOiAzNHB4O1xcbn1cXG5cXG4uc2xpZGVyOjpiZWZvcmUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICBoZWlnaHQ6IDFlbTtcXG4gICAgd2lkdGg6IDFlbTtcXG4gICAgbGVmdDogNHB4O1xcbiAgICBib3R0b206IDRweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogLjRzO1xcbiAgICB0cmFuc2l0aW9uOiAuNHM7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuXFxuaW5wdXQ6Y2hlY2tlZCArIC5zbGlkZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCAzMywgMzMpO1xcbn1cXG5cXG5pbnB1dDpmb2N1cyArIC5zbGlkZXIge1xcbiAgICBib3gtc2hhZG93OiAwIDAgMXB4IHJnYigyNTUsIDMzLCAzMyk7XFxufVxcblxcbmlucHV0OmNoZWNrZWQgKyAuc2xpZGVyOjpiZWZvcmUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgxZW0pO1xcbiAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDFlbSk7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxZW0pO1xcbn1cXG5cXG4uc3dpdGNoOjpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiwrBDXFxcIjtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiAtMS4yNXJlbTtcXG59XFxuXFxuLnN3aXRjaDo6YWZ0ZXIge1xcbiAgICBjb250ZW50OiBcXFwiwrBGXFxcIjtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICByaWdodDogLTEuMTI1cmVtO1xcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcXG59XFxuXFxuLnJlc3VsdHMtY29udGFpbmVyIHtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBtYXJnaW4tdG9wOiAwLjVyZW07XFxufVxcblxcbi5sb2FkZXIge1xcbiAgICB3aWR0aDogNDhweDtcXG4gICAgaGVpZ2h0OiA0OHB4O1xcbiAgICBib3JkZXI6IDVweCBzb2xpZCAjY2NjO1xcbiAgICBib3JkZXItYm90dG9tLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIGFuaW1hdGlvbjogcm90YXRpb24gMXMgbGluZWFyIGluZmluaXRlO1xcbiAgICBtYXJnaW4tdG9wOiAzMHN2aDtcXG59XFxuXFxuQGtleWZyYW1lcyByb3RhdGlvbiB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcXG4gICAgfVxcbn0gXFxuXFxuLndlYXRoZXItY29udGFpbmVyIHtcXG4gICAgcGFkZGluZzogMC41cmVtIDA7XFxufVxcblxcbi53ZWF0aGVyLWNvbnRhaW5lcjpub3QoOmZpcnN0LW9mLXR5cGUpIHtcXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIGdyZXk7XFxufVxcblxcbmgyIHtcXG4gICAgZm9udC1zaXplOiAxLjEyNXJlbTtcXG59XFxuXFxuaW1nIHtcXG4gICAgbWF4LXdpZHRoOiA0OHB4O1xcbn1cXG5cXG5mb290ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBkYXJrc2xhdGVncmV5O1xcbn1cXG5cXG5mb290ZXI+YSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDAuNWVtO1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIGZpbGw6IHdoaXRlO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxufVxcblxcbnN2ZyB7XFxuICAgIG1heC13aWR0aDogMmVtO1xcbn1cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogNTQxcHgpIHtcXG4gICAgbWFpbiB7XFxuICAgICAgICBtYXJnaW4tdG9wOiAyZW07XFxuICAgIH1cXG5cXG4gICAgLnJlc3VsdHMtY29udGFpbmVyIHtcXG4gICAgICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcbiAgICAgICAgbWFyZ2luLXRvcDogM3JlbTtcXG4gICAgfVxcblxcbiAgICAubm93LCAucmVzdWx0cy1sb2NhdGlvbiB7XFxuICAgICAgICBncmlkLWNvbHVtbjogMSAvIC0xO1xcbiAgICB9XFxuXFxuICAgIC53ZWF0aGVyLWNvbnRhaW5lciB7XFxuICAgICAgICBwYWRkaW5nOiAycmVtIDA7XFxuICAgIH1cXG5cXG4gICAgcCB7XFxuICAgICAgICBtYXJnaW46IDAuNXJlbSAwO1xcbiAgICB9XFxuXFxuICAgIGltZyB7XFxuICAgICAgICBtYXgtd2lkdGg6IG5vbmU7XFxuICAgIH1cXG5cXG4gICAgLmxvYWRlciwgLmVycm9yIHtcXG4gICAgICAgIGdyaWQtY29sdW1uOiAxIC8gLTE7XFxuICAgICAgICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXG4gICAgfVxcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksU0FBUztJQUNULFVBQVU7SUFDVixzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxzQkFBc0I7SUFDdEIsZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYiwrQ0FBK0M7SUFDL0Msa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksNkJBQTZCO0lBQzdCLG1CQUFtQjtJQUNuQixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIseUJBQXlCO0lBQ3pCLFlBQVk7SUFDWixpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLFNBQVM7QUFDYjs7QUFFQTtJQUNJLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLG1CQUFtQjtJQUNuQixpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxZQUFZO0lBQ1oscUJBQXFCO0lBQ3JCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLDZCQUE2QjtBQUNqQzs7QUFFQTtJQUNJLGVBQWU7SUFDZixzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IscUJBQXFCO0lBQ3JCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLG1CQUFtQjtJQUNuQixrQkFBa0I7QUFDdEI7O0FBRUEsV0FBVztBQUNYO0lBQ0ksa0JBQWtCO0lBQ2xCLHFCQUFxQjtJQUNyQixZQUFZO0lBQ1osYUFBYTtJQUNiLGFBQWE7SUFDYixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxVQUFVO0lBQ1YsUUFBUTtJQUNSLFNBQVM7QUFDYjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixlQUFlO0lBQ2YsUUFBUTtJQUNSLHlCQUF5QjtJQUN6Qix1QkFBdUI7SUFDdkIsZUFBZTtJQUNmLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gsV0FBVztJQUNYLFVBQVU7SUFDVixTQUFTO0lBQ1QsV0FBVztJQUNYLHVCQUF1QjtJQUN2Qix1QkFBdUI7SUFDdkIsZUFBZTtJQUNmLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGtDQUFrQztBQUN0Qzs7QUFFQTtJQUNJLG9DQUFvQztBQUN4Qzs7QUFFQTtJQUNJLGtDQUFrQztJQUNsQyw4QkFBOEI7SUFDOUIsMEJBQTBCO0FBQzlCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLGtCQUFrQjtJQUNsQixjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLGtCQUFrQjtJQUNsQixnQkFBZ0I7SUFDaEIsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxZQUFZO0lBQ1osc0JBQXNCO0lBQ3RCLGdDQUFnQztJQUNoQyxrQkFBa0I7SUFDbEIscUJBQXFCO0lBQ3JCLHNCQUFzQjtJQUN0QixzQ0FBc0M7SUFDdEMsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0k7UUFDSSx1QkFBdUI7SUFDM0I7SUFDQTtRQUNJLHlCQUF5QjtJQUM3QjtBQUNKOztBQUVBO0lBQ0ksaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksMEJBQTBCO0FBQzlCOztBQUVBO0lBQ0ksbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksZUFBZTtBQUNuQjs7QUFFQTtJQUNJLCtCQUErQjtBQUNuQzs7QUFFQTtJQUNJLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLFVBQVU7SUFDVixZQUFZO0lBQ1osV0FBVztJQUNYLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLGNBQWM7QUFDbEI7O0FBRUE7SUFDSTtRQUNJLGVBQWU7SUFDbkI7O0lBRUE7UUFDSSxhQUFhO1FBQ2IscUNBQXFDO1FBQ3JDLGdCQUFnQjtJQUNwQjs7SUFFQTtRQUNJLG1CQUFtQjtJQUN2Qjs7SUFFQTtRQUNJLGVBQWU7SUFDbkI7O0lBRUE7UUFDSSxnQkFBZ0I7SUFDcEI7O0lBRUE7UUFDSSxlQUFlO0lBQ25COztJQUVBO1FBQ0ksbUJBQW1CO1FBQ25CLG9CQUFvQjtJQUN4QjtBQUNKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgICBmb250LWZhbWlseTogc3lzdGVtLXVpO1xcbiAgICBsaW5lLWhlaWdodDogMS41O1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IG1heC1jb250ZW50IDFmciBtYXgtY29udGVudDtcXG4gICAgbWluLWhlaWdodDogMTAwc3ZoO1xcbn1cXG5cXG5tYWluIHtcXG4gICAgd2lkdGg6IG1pbig3MGNoLCAxMDAlIC0gMnJlbSk7XFxuICAgIG1hcmdpbi1pbmxpbmU6IGF1dG87XFxuICAgIG1hcmdpbi10b3A6IDAuNXJlbTtcXG59XFxuXFxuaDEge1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyMTk2RjM7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgZm9udC1zaXplOiAxLjI1ZW07XFxufVxcblxcbi5sb2NhdGlvbi1pbnB1dCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBnYXA6IDFyZW07XFxufVxcblxcbmlucHV0LCBidXR0b24ge1xcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcblxcbmlucHV0W3R5cGU9XFxcInRleHRcXFwiXSB7XFxuICAgIGJvcmRlci1zdHlsZTogc29saWQ7XFxuICAgIHBhZGRpbmc6IDAgMC41cmVtO1xcbn1cXG5cXG4jc2VhcmNoIHtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBwYWRkaW5nOiAwLjI1cmVtIDFyZW07XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG4jc2VhcmNoOmRpc2FibGVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcblxcbiNzZWFyY2g6aG92ZXIge1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkZGQ7XFxufVxcblxcbi50b2dnbGUtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgcGxhY2UtY29udGVudDogY2VudGVyO1xcbiAgICBtYXJnaW4tdG9wOiAwLjVyZW07XFxufVxcblxcbmlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl0ge1xcbiAgICBncmlkLWNvbHVtbjogMSAvIC0xO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi8qIFNsaWRlciAqL1xcbi5zd2l0Y2gge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgd2lkdGg6IDIuNWVtO1xcbiAgICBoZWlnaHQ6IDEuNWVtO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uc3dpdGNoIGlucHV0IHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgd2lkdGg6IDA7XFxuICAgIGhlaWdodDogMDtcXG59XFxuXFxuLnNsaWRlciB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBpbnNldDogMDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzIxOTZGMztcXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiAuNHM7XFxuICAgIHRyYW5zaXRpb246IC40cztcXG4gICAgYm9yZGVyLXJhZGl1czogMzRweDtcXG59XFxuXFxuLnNsaWRlcjo6YmVmb3JlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgaGVpZ2h0OiAxZW07XFxuICAgIHdpZHRoOiAxZW07XFxuICAgIGxlZnQ6IDRweDtcXG4gICAgYm90dG9tOiA0cHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IC40cztcXG4gICAgdHJhbnNpdGlvbjogLjRzO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxufVxcblxcbmlucHV0OmNoZWNrZWQgKyAuc2xpZGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMzMsIDMzKTtcXG59XFxuXFxuaW5wdXQ6Zm9jdXMgKyAuc2xpZGVyIHtcXG4gICAgYm94LXNoYWRvdzogMCAwIDFweCByZ2IoMjU1LCAzMywgMzMpO1xcbn1cXG5cXG5pbnB1dDpjaGVja2VkICsgLnNsaWRlcjo6YmVmb3JlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMWVtKTtcXG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWCgxZW0pO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMWVtKTtcXG59XFxuXFxuLnN3aXRjaDo6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIsKwQ1xcXCI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogLTEuMjVyZW07XFxufVxcblxcbi5zd2l0Y2g6OmFmdGVyIHtcXG4gICAgY29udGVudDogXFxcIsKwRlxcXCI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgcmlnaHQ6IC0xLjEyNXJlbTtcXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XFxufVxcblxcbi5yZXN1bHRzLWNvbnRhaW5lciB7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgbWFyZ2luLXRvcDogMC41cmVtO1xcbn1cXG5cXG4ubG9hZGVyIHtcXG4gICAgd2lkdGg6IDQ4cHg7XFxuICAgIGhlaWdodDogNDhweDtcXG4gICAgYm9yZGVyOiA1cHggc29saWQgI2NjYztcXG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBhbmltYXRpb246IHJvdGF0aW9uIDFzIGxpbmVhciBpbmZpbml0ZTtcXG4gICAgbWFyZ2luLXRvcDogMzBzdmg7XFxufVxcblxcbkBrZXlmcmFtZXMgcm90YXRpb24ge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxuICAgIH1cXG59IFxcblxcbi53ZWF0aGVyLWNvbnRhaW5lciB7XFxuICAgIHBhZGRpbmc6IDAuNXJlbSAwO1xcbn1cXG5cXG4ud2VhdGhlci1jb250YWluZXI6bm90KDpmaXJzdC1vZi10eXBlKSB7XFxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCBncmV5O1xcbn1cXG5cXG5oMiB7XFxuICAgIGZvbnQtc2l6ZTogMS4xMjVyZW07XFxufVxcblxcbmltZyB7XFxuICAgIG1heC13aWR0aDogNDhweDtcXG59XFxuXFxuZm9vdGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZGFya3NsYXRlZ3JleTtcXG59XFxuXFxuZm9vdGVyPmEge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiAwLjVlbTtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBmaWxsOiB3aGl0ZTtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbn1cXG5cXG5zdmcge1xcbiAgICBtYXgtd2lkdGg6IDJlbTtcXG59XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDU0MXB4KSB7XFxuICAgIG1haW4ge1xcbiAgICAgICAgbWFyZ2luLXRvcDogMmVtO1xcbiAgICB9XFxuXFxuICAgIC5yZXN1bHRzLWNvbnRhaW5lciB7XFxuICAgICAgICBkaXNwbGF5OiBncmlkO1xcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcXG4gICAgICAgIG1hcmdpbi10b3A6IDNyZW07XFxuICAgIH1cXG5cXG4gICAgLm5vdywgLnJlc3VsdHMtbG9jYXRpb24ge1xcbiAgICAgICAgZ3JpZC1jb2x1bW46IDEgLyAtMTtcXG4gICAgfVxcblxcbiAgICAud2VhdGhlci1jb250YWluZXIge1xcbiAgICAgICAgcGFkZGluZzogMnJlbSAwO1xcbiAgICB9XFxuXFxuICAgIHAge1xcbiAgICAgICAgbWFyZ2luOiAwLjVyZW0gMDtcXG4gICAgfVxcblxcbiAgICBpbWcge1xcbiAgICAgICAgbWF4LXdpZHRoOiBub25lO1xcbiAgICB9XFxuXFxuICAgIC5sb2FkZXIsIC5lcnJvciB7XFxuICAgICAgICBncmlkLWNvbHVtbjogMSAvIC0xO1xcbiAgICAgICAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxuICAgIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XG5pbXBvcnQgZG9tQ29udHJvbGxlciBmcm9tIFwiLi9tb2R1bGVzL0RPTVwiO1xuXG5kb21Db250cm9sbGVyLnJlbmRlclBhZ2UoKTtcbiJdLCJuYW1lcyI6WyJnZXRGb3JlY2FzdFdlYXRoZXJEYXRhIiwiZG9tQ29udHJvbGxlciIsInVuaXRzIiwiY2l0eSIsIndlYXRoZXJEYXRhIiwidmFsaWRDaXR5IiwicmVuZGVySGVhZGVyIiwiaGVhZGVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwidGl0bGUiLCJ0ZXh0Q29udGVudCIsImFwcGVuZENoaWxkIiwicXVlcnlTZWxlY3RvciIsInJlbmRlckZvb3RlciIsImZvb3RlciIsImFuY2hvciIsInNldEF0dHJpYnV0ZSIsInAiLCJpY29uU3ZnIiwiY3JlYXRlRWxlbWVudE5TIiwiaWNvblBhdGgiLCJib2R5IiwicmVuZGVyUGFnZSIsIm1haW4iLCJsb2NhdGlvbiIsImxhYmVsIiwiaW5wdXQiLCJidG4iLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlU2VhcmNoIiwiY2xhc3NMaXN0IiwiYWRkIiwidG9nZ2xlQ29udGFpbmVyIiwidG9nZ2xlTGFiZWwiLCJ0b2dnbGUiLCJ0b2dnbGVVbml0cyIsInRvZ2dsZVNwYW4iLCJjb250YWluZXIiLCJmb2N1cyIsImxvYWRTZWFyY2giLCJnZXRFbGVtZW50QnlJZCIsInZhbHVlIiwic2hvd0Vycm9yIiwiZXJyb3JFbGUiLCJyZW5kZXJMb2FkZXIiLCJyZW1vdmVBdHRyaWJ1dGUiLCJjbGVhbldlYXRoZXJEaXNwbGF5IiwibmFtZSIsInJlbmRlcldlYXRoZXJEYXRhIiwibG9hZGVyIiwiZSIsInRhcmdldCIsImNoZWNrZWQiLCJwYXJlbnQiLCJjaGlsZCIsImZpcnN0RWxlbWVudENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJkYXRhIiwibm93Q29udGFpbmVyIiwibm93SWNvbiIsInNyYyIsIm5vdyIsImljb24iLCJub3dUZW1wIiwidG9VcHBlckNhc2UiLCJkaWN0IiwiaSIsImRheUNvbnRhaW5lciIsImRheSIsInNsaWNlIiwiZGF5SWNvbiIsImRheUF2Z1RlbXAiLCJ0ZW1wUmFuZ2UiLCJyYWluQ2hhbmNlIiwicmFpbl9jaGFuY2UiLCJzbm93X2NoYW5jZSIsInNub3dDaGFuY2UiLCJ1cmwiLCJvcHRpb25zIiwibW9kZSIsInJlc3BvbnNlIiwiZmV0Y2giLCJvayIsIkVycm9yIiwianNvbiIsImdldERhdGFGcm9tQVBJUmVzcG9uc2UiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJmb3JlY2FzdCIsImZvcmVjYXN0ZGF5IiwiZm9yRWFjaCIsIm9iaiIsInRlbXBfYyIsImF2Z3RlbXBfYyIsInRlbXBfZiIsImF2Z3RlbXBfZiIsIm1pbnRlbXBfYyIsIm1pbnRlbXBfZiIsIm1heHRlbXBfYyIsIm1heHRlbXBfZiIsImRhaWx5X2NoYW5jZV9vZl9yYWluIiwiZGFpbHlfY2hhbmNlX29mX3Nub3ciLCJjb25kaXRpb24iLCJwdXNoIiwiY3VycmVudCIsInRvZGF5IiwidG9tb3Jyb3ciLCJkYXlfYWZ0ZXJfdG9tb3Jyb3ciXSwic291cmNlUm9vdCI6IiJ9