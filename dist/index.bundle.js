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
  let city = "NYC";
  let weatherData;
  const renderPage = () => {
    const body = document.querySelector("body");
    const location = document.createElement("div");
    const label = document.createElement("label");
    label.setAttribute("for", "location");
    label.textContent = "City: ";
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", "location");
    input.setAttribute("id", "location");
    input.setAttribute("placeholder", "New York");
    label.appendChild(input);
    location.appendChild(label);
    const btn = document.createElement("button");
    btn.textContent = "Search";
    btn.setAttribute("id", "search");
    btn.addEventListener("click", handleSearch);
    location.appendChild(btn);
    location.classList.add("location-input");
    body.appendChild(location);
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
    body.appendChild(toggleContainer);
    const container = document.createElement("section");
    container.classList.add("results-container");
    body.appendChild(container);
    input.focus();
    loadSearch();
  };
  const handleSearch = () => {
    const location = document.getElementById("location").value;
    console.log(location);
    if (!location) return;
    city = location;
    loadSearch();
  };
  const loadSearch = async () => {
    const btn = document.getElementById("search");
    btn.setAttribute("disabled", true);
    renderLoader();
    //return;
    weatherData = await (0,_api__WEBPACK_IMPORTED_MODULE_0__["default"])(city);
    btn.removeAttribute("disabled");
    document.getElementById("location").value = "";
    cleanWeatherDisplay();
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n}\n\nbody {\n    font-family: system-ui;\n    line-height: 1.5;\n    width: min(70ch, 100% - 2rem);\n    margin-inline: auto;\n    margin-top: 0.5rem;\n}\n\n.location-input {\n    display: flex;\n    justify-content: center;\n    gap: 1rem;\n}\n\ninput, button {\n    border-radius: 5px;\n}\n\ninput[type=\"text\"] {\n    border-style: solid;\n    padding: 0 0.5rem;\n}\n\n#search {\n    border: none;\n    padding: 0.25rem 1rem;\n    font-weight: bold;\n}\n\n#search:disabled {\n    background-color: transparent;\n}\n\n#search:hover {\n    cursor: pointer;\n    background-color: darkgray;\n}\n\n.toggle-container {\n    display: grid;\n    place-content: center;\n    margin-top: 0.5rem;\n}\n\ninput[type=\"checkbox\"] {\n    grid-column: 1 / -1;\n    position: relative;\n}\n\n/* Slider */\n.switch {\n    position: relative;\n    display: inline-block;\n    width: 2.5em;\n    height: 1.5em;\n    display: flex;\n    align-items: center;\n}\n\n.switch input {\n    opacity: 0;\n    width: 0;\n    height: 0;\n}\n\n.slider {\n    position: absolute;\n    cursor: pointer;\n    inset: 0;\n    background-color: #2196F3;\n    -webkit-transition: .4s;\n    transition: .4s;\n    border-radius: 34px;\n}\n\n.slider::before {\n    position: absolute;\n    content: \"\";\n    height: 1em;\n    width: 1em;\n    left: 4px;\n    bottom: 4px;\n    background-color: white;\n    -webkit-transition: .4s;\n    transition: .4s;\n    border-radius: 50%;\n}\n\ninput:checked + .slider {\n    background-color: rgb(255, 33, 33);\n}\n\ninput:focus + .slider {\n    box-shadow: 0 0 1px rgb(255, 33, 33);\n}\n\ninput:checked + .slider::before {\n    -webkit-transform: translateX(1em);\n    -ms-transform: translateX(1em);\n    transform: translateX(1em);\n}\n\n.switch::before {\n    content: \"°C\";\n    position: absolute;\n    left: -1.25rem;\n}\n\n.switch::after {\n    content: \"°F\";\n    position: absolute;\n    right: -1.125rem;\n    text-align: right;\n}\n\n.results-container {\n    text-align: center;\n    margin-top: 0.5rem;\n}\n\n.loader {\n    width: 48px;\n    height: 48px;\n    border: 5px solid #ccc;\n    border-bottom-color: transparent;\n    border-radius: 50%;\n    display: inline-block;\n    box-sizing: border-box;\n    animation: rotation 1s linear infinite;\n    margin-top: 30svh;\n}\n\n@keyframes rotation {\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n} \n\n.weather-container {\n    padding: 0.5rem 0;\n}\n\n.weather-container:not(:first-of-type) {\n    border-top: 1px solid grey;\n}\n\nh2 {\n    font-size: 1.125rem;\n}\n\nimg {\n    max-width: 48px;\n}\n\n@media (min-width: 541px) {\n    body {\n        height: calc(100svh - 2rem);\n        display: grid;\n        place-content: center;\n    }\n\n    .results-container {\n        display: grid;\n        grid-template-columns: repeat(3, 1fr);\n        margin-top: 3rem;\n    }\n\n    .now, .results-location {\n        grid-column: 1 / -1;\n    }\n\n    .weather-container {\n        padding: 2rem 0;\n    }\n\n    p {\n        margin: 0.5rem 0;\n    }\n\n    img {\n        max-width: none;\n    }\n\n    .loader {\n        margin-top: 0;\n        grid-column: 1 / -1;\n        justify-self: center;\n    }\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,SAAS;IACT,UAAU;IACV,sBAAsB;AAC1B;;AAEA;IACI,sBAAsB;IACtB,gBAAgB;IAChB,6BAA6B;IAC7B,mBAAmB;IACnB,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,SAAS;AACb;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,mBAAmB;IACnB,iBAAiB;AACrB;;AAEA;IACI,YAAY;IACZ,qBAAqB;IACrB,iBAAiB;AACrB;;AAEA;IACI,6BAA6B;AACjC;;AAEA;IACI,eAAe;IACf,0BAA0B;AAC9B;;AAEA;IACI,aAAa;IACb,qBAAqB;IACrB,kBAAkB;AACtB;;AAEA;IACI,mBAAmB;IACnB,kBAAkB;AACtB;;AAEA,WAAW;AACX;IACI,kBAAkB;IAClB,qBAAqB;IACrB,YAAY;IACZ,aAAa;IACb,aAAa;IACb,mBAAmB;AACvB;;AAEA;IACI,UAAU;IACV,QAAQ;IACR,SAAS;AACb;;AAEA;IACI,kBAAkB;IAClB,eAAe;IACf,QAAQ;IACR,yBAAyB;IACzB,uBAAuB;IACvB,eAAe;IACf,mBAAmB;AACvB;;AAEA;IACI,kBAAkB;IAClB,WAAW;IACX,WAAW;IACX,UAAU;IACV,SAAS;IACT,WAAW;IACX,uBAAuB;IACvB,uBAAuB;IACvB,eAAe;IACf,kBAAkB;AACtB;;AAEA;IACI,kCAAkC;AACtC;;AAEA;IACI,oCAAoC;AACxC;;AAEA;IACI,kCAAkC;IAClC,8BAA8B;IAC9B,0BAA0B;AAC9B;;AAEA;IACI,aAAa;IACb,kBAAkB;IAClB,cAAc;AAClB;;AAEA;IACI,aAAa;IACb,kBAAkB;IAClB,gBAAgB;IAChB,iBAAiB;AACrB;;AAEA;IACI,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,sBAAsB;IACtB,gCAAgC;IAChC,kBAAkB;IAClB,qBAAqB;IACrB,sBAAsB;IACtB,sCAAsC;IACtC,iBAAiB;AACrB;;AAEA;IACI;QACI,uBAAuB;IAC3B;IACA;QACI,yBAAyB;IAC7B;AACJ;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,0BAA0B;AAC9B;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI;QACI,2BAA2B;QAC3B,aAAa;QACb,qBAAqB;IACzB;;IAEA;QACI,aAAa;QACb,qCAAqC;QACrC,gBAAgB;IACpB;;IAEA;QACI,mBAAmB;IACvB;;IAEA;QACI,eAAe;IACnB;;IAEA;QACI,gBAAgB;IACpB;;IAEA;QACI,eAAe;IACnB;;IAEA;QACI,aAAa;QACb,mBAAmB;QACnB,oBAAoB;IACxB;AACJ","sourcesContent":["* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n}\n\nbody {\n    font-family: system-ui;\n    line-height: 1.5;\n    width: min(70ch, 100% - 2rem);\n    margin-inline: auto;\n    margin-top: 0.5rem;\n}\n\n.location-input {\n    display: flex;\n    justify-content: center;\n    gap: 1rem;\n}\n\ninput, button {\n    border-radius: 5px;\n}\n\ninput[type=\"text\"] {\n    border-style: solid;\n    padding: 0 0.5rem;\n}\n\n#search {\n    border: none;\n    padding: 0.25rem 1rem;\n    font-weight: bold;\n}\n\n#search:disabled {\n    background-color: transparent;\n}\n\n#search:hover {\n    cursor: pointer;\n    background-color: darkgray;\n}\n\n.toggle-container {\n    display: grid;\n    place-content: center;\n    margin-top: 0.5rem;\n}\n\ninput[type=\"checkbox\"] {\n    grid-column: 1 / -1;\n    position: relative;\n}\n\n/* Slider */\n.switch {\n    position: relative;\n    display: inline-block;\n    width: 2.5em;\n    height: 1.5em;\n    display: flex;\n    align-items: center;\n}\n\n.switch input {\n    opacity: 0;\n    width: 0;\n    height: 0;\n}\n\n.slider {\n    position: absolute;\n    cursor: pointer;\n    inset: 0;\n    background-color: #2196F3;\n    -webkit-transition: .4s;\n    transition: .4s;\n    border-radius: 34px;\n}\n\n.slider::before {\n    position: absolute;\n    content: \"\";\n    height: 1em;\n    width: 1em;\n    left: 4px;\n    bottom: 4px;\n    background-color: white;\n    -webkit-transition: .4s;\n    transition: .4s;\n    border-radius: 50%;\n}\n\ninput:checked + .slider {\n    background-color: rgb(255, 33, 33);\n}\n\ninput:focus + .slider {\n    box-shadow: 0 0 1px rgb(255, 33, 33);\n}\n\ninput:checked + .slider::before {\n    -webkit-transform: translateX(1em);\n    -ms-transform: translateX(1em);\n    transform: translateX(1em);\n}\n\n.switch::before {\n    content: \"°C\";\n    position: absolute;\n    left: -1.25rem;\n}\n\n.switch::after {\n    content: \"°F\";\n    position: absolute;\n    right: -1.125rem;\n    text-align: right;\n}\n\n.results-container {\n    text-align: center;\n    margin-top: 0.5rem;\n}\n\n.loader {\n    width: 48px;\n    height: 48px;\n    border: 5px solid #ccc;\n    border-bottom-color: transparent;\n    border-radius: 50%;\n    display: inline-block;\n    box-sizing: border-box;\n    animation: rotation 1s linear infinite;\n    margin-top: 30svh;\n}\n\n@keyframes rotation {\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n} \n\n.weather-container {\n    padding: 0.5rem 0;\n}\n\n.weather-container:not(:first-of-type) {\n    border-top: 1px solid grey;\n}\n\nh2 {\n    font-size: 1.125rem;\n}\n\nimg {\n    max-width: 48px;\n}\n\n@media (min-width: 541px) {\n    body {\n        height: calc(100svh - 2rem);\n        display: grid;\n        place-content: center;\n    }\n\n    .results-container {\n        display: grid;\n        grid-template-columns: repeat(3, 1fr);\n        margin-top: 3rem;\n    }\n\n    .now, .results-location {\n        grid-column: 1 / -1;\n    }\n\n    .weather-container {\n        padding: 2rem 0;\n    }\n\n    p {\n        margin: 0.5rem 0;\n    }\n\n    img {\n        max-width: none;\n    }\n\n    .loader {\n        margin-top: 0;\n        grid-column: 1 / -1;\n        justify-self: center;\n    }\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNJLFVBQVUsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9tb2R1bGVzL0RPTS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9tb2R1bGVzL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZ2V0Rm9yZWNhc3RXZWF0aGVyRGF0YSBmcm9tIFwiLi9hcGlcIjtcblxuY29uc3QgZG9tQ29udHJvbGxlciA9ICgoKSA9PiB7XG4gIGxldCB1bml0cyA9IFwiY1wiO1xuICBsZXQgY2l0eSA9IFwiTllDXCI7XG4gIGxldCB3ZWF0aGVyRGF0YTtcblxuICBjb25zdCByZW5kZXJQYWdlID0gKCkgPT4ge1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbiAgICBjb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgbGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIFwibG9jYXRpb25cIik7XG4gICAgbGFiZWwudGV4dENvbnRlbnQgPSBcIkNpdHk6IFwiO1xuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJsb2NhdGlvblwiKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImxvY2F0aW9uXCIpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIsIFwiTmV3IFlvcmtcIik7XG4gICAgbGFiZWwuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICAgIGxvY2F0aW9uLmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ0bi50ZXh0Q29udGVudCA9IFwiU2VhcmNoXCI7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIFwic2VhcmNoXCIpO1xuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlU2VhcmNoKTtcbiAgICBsb2NhdGlvbi5hcHBlbmRDaGlsZChidG4pO1xuICAgIGxvY2F0aW9uLmNsYXNzTGlzdC5hZGQoXCJsb2NhdGlvbi1pbnB1dFwiKTtcbiAgICBib2R5LmFwcGVuZENoaWxkKGxvY2F0aW9uKTtcblxuICAgIGNvbnN0IHRvZ2dsZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdG9nZ2xlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0b2dnbGUtY29udGFpbmVyXCIpO1xuICAgIGNvbnN0IHRvZ2dsZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIHRvZ2dsZUxhYmVsLmNsYXNzTGlzdC5hZGQoXCJzd2l0Y2hcIik7XG4gICAgY29uc3QgdG9nZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIHRvZ2dsZS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiY2hlY2tib3hcIik7XG4gICAgdG9nZ2xlLnNldEF0dHJpYnV0ZShcImlkXCIsIFwidW5pdHNcIik7XG4gICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVVbml0cyk7XG4gICAgdG9nZ2xlTGFiZWwuYXBwZW5kQ2hpbGQodG9nZ2xlKTtcbiAgICBjb25zdCB0b2dnbGVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgdG9nZ2xlU3Bhbi5jbGFzc0xpc3QuYWRkKFwic2xpZGVyXCIpO1xuICAgIHRvZ2dsZUxhYmVsLmFwcGVuZENoaWxkKHRvZ2dsZVNwYW4pO1xuICAgIHRvZ2dsZUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2dnbGVMYWJlbCk7XG4gICAgYm9keS5hcHBlbmRDaGlsZCh0b2dnbGVDb250YWluZXIpO1xuXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJyZXN1bHRzLWNvbnRhaW5lclwiKTtcbiAgICBib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG5cbiAgICBpbnB1dC5mb2N1cygpO1xuICAgIGxvYWRTZWFyY2goKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTZWFyY2ggPSAoKSA9PiB7XG4gICAgY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvY2F0aW9uXCIpLnZhbHVlO1xuICAgIGNvbnNvbGUubG9nKGxvY2F0aW9uKTtcbiAgICBpZiAoIWxvY2F0aW9uKSByZXR1cm47XG4gICAgY2l0eSA9IGxvY2F0aW9uO1xuICAgIGxvYWRTZWFyY2goKTtcbiAgfTtcblxuICBjb25zdCBsb2FkU2VhcmNoID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoXCIpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCB0cnVlKTtcbiAgICByZW5kZXJMb2FkZXIoKTtcbiAgICAvL3JldHVybjtcbiAgICB3ZWF0aGVyRGF0YSA9IGF3YWl0IGdldEZvcmVjYXN0V2VhdGhlckRhdGEoY2l0eSk7XG4gICAgYnRuLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9jYXRpb25cIikudmFsdWUgPSBcIlwiO1xuICAgIGNsZWFuV2VhdGhlckRpc3BsYXkoKTtcbiAgICByZW5kZXJXZWF0aGVyRGF0YSh3ZWF0aGVyRGF0YSk7XG4gIH07XG5cbiAgY29uc3QgcmVuZGVyTG9hZGVyID0gKCkgPT4ge1xuICAgIGNsZWFuV2VhdGhlckRpc3BsYXkoKTtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc3VsdHMtY29udGFpbmVyXCIpO1xuICAgIGNvbnN0IGxvYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIGxvYWRlci5jbGFzc0xpc3QuYWRkKFwibG9hZGVyXCIpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChsb2FkZXIpO1xuICB9O1xuXG4gIGNvbnN0IHRvZ2dsZVVuaXRzID0gKGUpID0+IHtcbiAgICB1bml0cyA9IGUudGFyZ2V0LmNoZWNrZWQgPyBcImZcIiA6IFwiY1wiO1xuICAgIGNsZWFuV2VhdGhlckRpc3BsYXkoKTtcbiAgICByZW5kZXJXZWF0aGVyRGF0YSh3ZWF0aGVyRGF0YSk7XG4gIH07XG5cbiAgY29uc3QgY2xlYW5XZWF0aGVyRGlzcGxheSA9ICgpID0+IHtcbiAgICBjb25zdCBwYXJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc3VsdHMtY29udGFpbmVyXCIpO1xuICAgIGxldCBjaGlsZCA9IHBhcmVudC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChjaGlsZCk7XG4gICAgICBjaGlsZCA9IHBhcmVudC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVuZGVyV2VhdGhlckRhdGEgPSAoZGF0YSkgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzdWx0cy1jb250YWluZXJcIik7XG4gICAgY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBsb2NhdGlvbi50ZXh0Q29udGVudCA9IGBTaG93aW5nIHJlc3VsdHMgZm9yIGxvY2F0aW9uOiAke2RhdGEubG9jYXRpb259YDtcbiAgICBsb2NhdGlvbi5jbGFzc0xpc3QuYWRkKFwicmVzdWx0cy1sb2NhdGlvblwiKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobG9jYXRpb24pO1xuXG4gICAgY29uc3Qgbm93Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBub3dDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIndlYXRoZXItY29udGFpbmVyXCIpO1xuICAgIG5vd0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwibm93XCIpO1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gXCJOb3dcIjtcbiAgICBub3dDb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgIGNvbnN0IG5vd0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIG5vd0ljb24uc3JjID0gYGh0dHBzOiR7ZGF0YS5ub3cuaWNvbn1gO1xuICAgIG5vd0NvbnRhaW5lci5hcHBlbmRDaGlsZChub3dJY29uKTtcbiAgICBjb25zdCBub3dUZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgbm93VGVtcC50ZXh0Q29udGVudCA9IGBDdXJyZW50bHk6ICR7XG4gICAgICBkYXRhLm5vd1tgdGVtcF8ke3VuaXRzfWBdXG4gICAgfcKwJHt1bml0cy50b1VwcGVyQ2FzZSgpfWA7XG4gICAgbm93Q29udGFpbmVyLmFwcGVuZENoaWxkKG5vd1RlbXApO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChub3dDb250YWluZXIpO1xuXG4gICAgY29uc3QgZGljdCA9IHsgMDogXCJ0b2RheVwiLCAxOiBcInRvbW9ycm93XCIsIDI6IFwiZGF5X2FmdGVyX3RvbW9ycm93XCIgfTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICBjb25zdCBkYXlDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZGF5Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ3ZWF0aGVyLWNvbnRhaW5lclwiKTtcbiAgICAgIGRheUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGRpY3RbaV0pO1xuICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgICBjb25zdCBkYXkgPVxuICAgICAgICBkaWN0W2ldID09PSBcImRheV9hZnRlcl90b21vcnJvd1wiID8gXCJkYXkgYWZ0ZXIgdG9tb3Jyb3dcIiA6IGRpY3RbaV07XG4gICAgICB0aXRsZS50ZXh0Q29udGVudCA9IGRheVswXS50b1VwcGVyQ2FzZSgpICsgZGF5LnNsaWNlKDEpO1xuICAgICAgZGF5Q29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICAgIGNvbnN0IGRheUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgZGF5SWNvbi5zcmMgPSBgaHR0cHM6JHtkYXRhW2RpY3RbaV1dLmljb259YDtcbiAgICAgIGRheUNvbnRhaW5lci5hcHBlbmRDaGlsZChkYXlJY29uKTtcbiAgICAgIGNvbnN0IGRheUF2Z1RlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgIGRheUF2Z1RlbXAudGV4dENvbnRlbnQgPSBgQXZnOiAke1xuICAgICAgICBkYXRhW2RpY3RbaV1dW2B0ZW1wXyR7dW5pdHN9YF1cbiAgICAgIH3CsCR7dW5pdHMudG9VcHBlckNhc2UoKX1gO1xuICAgICAgZGF5Q29udGFpbmVyLmFwcGVuZENoaWxkKGRheUF2Z1RlbXApO1xuICAgICAgY29uc3QgdGVtcFJhbmdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICB0ZW1wUmFuZ2UudGV4dENvbnRlbnQgPSBgJHtcbiAgICAgICAgZGF0YVtkaWN0W2ldXVtgbWludGVtcF8ke3VuaXRzfWBdXG4gICAgICB9wrAke3VuaXRzLnRvVXBwZXJDYXNlKCl9IC0gJHtcbiAgICAgICAgZGF0YVtkaWN0W2ldXVtgbWF4dGVtcF8ke3VuaXRzfWBdXG4gICAgICB9wrAke3VuaXRzLnRvVXBwZXJDYXNlKCl9YDtcbiAgICAgIGRheUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0ZW1wUmFuZ2UpO1xuICAgICAgY29uc3QgcmFpbkNoYW5jZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgcmFpbkNoYW5jZS50ZXh0Q29udGVudCA9IGBSYWluIGNoYW5jZTogJHtkYXRhW2RpY3RbaV1dLnJhaW5fY2hhbmNlfSVgO1xuICAgICAgZGF5Q29udGFpbmVyLmFwcGVuZENoaWxkKHJhaW5DaGFuY2UpO1xuICAgICAgaWYgKGRhdGFbZGljdFtpXV0uc25vd19jaGFuY2UpIHtcbiAgICAgICAgY29uc3Qgc25vd0NoYW5jZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICBzbm93Q2hhbmNlLnRleHRDb250ZW50ID0gYFJhaW4gY2hhbmNlOiAke2RhdGFbZGljdFtpXV0uc25vd19jaGFuY2V9JWA7XG4gICAgICAgIGRheUNvbnRhaW5lci5hcHBlbmRDaGlsZChzbm93Q2hhbmNlKTtcbiAgICAgIH1cbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkYXlDb250YWluZXIpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHJlbmRlclBhZ2UsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBkb21Db250cm9sbGVyO1xuIiwiYXN5bmMgZnVuY3Rpb24gZ2V0Rm9yZWNhc3RXZWF0aGVyRGF0YShsb2NhdGlvbikge1xuICB0cnkge1xuICAgIGNvbnN0IHVybCA9IGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT1lOTkwZTgyMGIyYzY0ZWVmODBhMTU1NDUwMjMyNTA4JnE9JHtsb2NhdGlvbn0mZGF5cz0zYDtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgbW9kZTogXCJjb3JzXCIsXG4gICAgfTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG4gICAgaWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGNvbm5lY3QgdG8gQVBJXCIpO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgcmV0dXJuIGdldERhdGFGcm9tQVBJUmVzcG9uc2UoZGF0YSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERhdGFGcm9tQVBJUmVzcG9uc2UoZGF0YSkge1xuICBjb25zdCBmb3JlY2FzdCA9IFtdO1xuICBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5LmZvckVhY2goKGRheSkgPT4ge1xuICAgIGNvbnN0IG9iaiA9IHt9O1xuICAgIG9iai50ZW1wX2MgPSBkYXkuZGF5LmF2Z3RlbXBfYztcbiAgICBvYmoudGVtcF9mID0gZGF5LmRheS5hdmd0ZW1wX2Y7XG4gICAgb2JqLm1pbnRlbXBfYyA9IGRheS5kYXkubWludGVtcF9jO1xuICAgIG9iai5taW50ZW1wX2YgPSBkYXkuZGF5Lm1pbnRlbXBfZjtcbiAgICBvYmoubWF4dGVtcF9jID0gZGF5LmRheS5tYXh0ZW1wX2M7XG4gICAgb2JqLm1heHRlbXBfZiA9IGRheS5kYXkubWF4dGVtcF9mO1xuICAgIG9iai5yYWluX2NoYW5jZSA9IGRheS5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW47XG4gICAgb2JqLnNub3dfY2hhbmNlID0gZGF5LmRheS5kYWlseV9jaGFuY2Vfb2Zfc25vdztcbiAgICBvYmouaWNvbiA9IGRheS5kYXkuY29uZGl0aW9uLmljb247XG4gICAgZm9yZWNhc3QucHVzaChvYmopO1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICBub3c6IHtcbiAgICAgIHRlbXBfYzogZGF0YS5jdXJyZW50LnRlbXBfYyxcbiAgICAgIHRlbXBfZjogZGF0YS5jdXJyZW50LnRlbXBfZixcbiAgICAgIGljb246IGRhdGEuY3VycmVudC5jb25kaXRpb24uaWNvbixcbiAgICB9LFxuICAgIHRvZGF5OiBmb3JlY2FzdFswXSxcbiAgICB0b21vcnJvdzogZm9yZWNhc3RbMV0sXG4gICAgZGF5X2FmdGVyX3RvbW9ycm93OiBmb3JlY2FzdFsyXSxcbiAgICBsb2NhdGlvbjogZGF0YS5sb2NhdGlvbi5uYW1lLFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRGb3JlY2FzdFdlYXRoZXJEYXRhO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgZm9udC1mYW1pbHk6IHN5c3RlbS11aTtcXG4gICAgbGluZS1oZWlnaHQ6IDEuNTtcXG4gICAgd2lkdGg6IG1pbig3MGNoLCAxMDAlIC0gMnJlbSk7XFxuICAgIG1hcmdpbi1pbmxpbmU6IGF1dG87XFxuICAgIG1hcmdpbi10b3A6IDAuNXJlbTtcXG59XFxuXFxuLmxvY2F0aW9uLWlucHV0IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGdhcDogMXJlbTtcXG59XFxuXFxuaW5wdXQsIGJ1dHRvbiB7XFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXG59XFxuXFxuaW5wdXRbdHlwZT1cXFwidGV4dFxcXCJdIHtcXG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXG4gICAgcGFkZGluZzogMCAwLjVyZW07XFxufVxcblxcbiNzZWFyY2gge1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIHBhZGRpbmc6IDAuMjVyZW0gMXJlbTtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbiNzZWFyY2g6ZGlzYWJsZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuXFxuI3NlYXJjaDpob3ZlciB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZGFya2dyYXk7XFxufVxcblxcbi50b2dnbGUtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgcGxhY2UtY29udGVudDogY2VudGVyO1xcbiAgICBtYXJnaW4tdG9wOiAwLjVyZW07XFxufVxcblxcbmlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl0ge1xcbiAgICBncmlkLWNvbHVtbjogMSAvIC0xO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi8qIFNsaWRlciAqL1xcbi5zd2l0Y2gge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgd2lkdGg6IDIuNWVtO1xcbiAgICBoZWlnaHQ6IDEuNWVtO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uc3dpdGNoIGlucHV0IHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgd2lkdGg6IDA7XFxuICAgIGhlaWdodDogMDtcXG59XFxuXFxuLnNsaWRlciB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBpbnNldDogMDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzIxOTZGMztcXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiAuNHM7XFxuICAgIHRyYW5zaXRpb246IC40cztcXG4gICAgYm9yZGVyLXJhZGl1czogMzRweDtcXG59XFxuXFxuLnNsaWRlcjo6YmVmb3JlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgaGVpZ2h0OiAxZW07XFxuICAgIHdpZHRoOiAxZW07XFxuICAgIGxlZnQ6IDRweDtcXG4gICAgYm90dG9tOiA0cHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IC40cztcXG4gICAgdHJhbnNpdGlvbjogLjRzO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxufVxcblxcbmlucHV0OmNoZWNrZWQgKyAuc2xpZGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMzMsIDMzKTtcXG59XFxuXFxuaW5wdXQ6Zm9jdXMgKyAuc2xpZGVyIHtcXG4gICAgYm94LXNoYWRvdzogMCAwIDFweCByZ2IoMjU1LCAzMywgMzMpO1xcbn1cXG5cXG5pbnB1dDpjaGVja2VkICsgLnNsaWRlcjo6YmVmb3JlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMWVtKTtcXG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWCgxZW0pO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMWVtKTtcXG59XFxuXFxuLnN3aXRjaDo6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIsKwQ1xcXCI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogLTEuMjVyZW07XFxufVxcblxcbi5zd2l0Y2g6OmFmdGVyIHtcXG4gICAgY29udGVudDogXFxcIsKwRlxcXCI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgcmlnaHQ6IC0xLjEyNXJlbTtcXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XFxufVxcblxcbi5yZXN1bHRzLWNvbnRhaW5lciB7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgbWFyZ2luLXRvcDogMC41cmVtO1xcbn1cXG5cXG4ubG9hZGVyIHtcXG4gICAgd2lkdGg6IDQ4cHg7XFxuICAgIGhlaWdodDogNDhweDtcXG4gICAgYm9yZGVyOiA1cHggc29saWQgI2NjYztcXG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBhbmltYXRpb246IHJvdGF0aW9uIDFzIGxpbmVhciBpbmZpbml0ZTtcXG4gICAgbWFyZ2luLXRvcDogMzBzdmg7XFxufVxcblxcbkBrZXlmcmFtZXMgcm90YXRpb24ge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxuICAgIH1cXG59IFxcblxcbi53ZWF0aGVyLWNvbnRhaW5lciB7XFxuICAgIHBhZGRpbmc6IDAuNXJlbSAwO1xcbn1cXG5cXG4ud2VhdGhlci1jb250YWluZXI6bm90KDpmaXJzdC1vZi10eXBlKSB7XFxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCBncmV5O1xcbn1cXG5cXG5oMiB7XFxuICAgIGZvbnQtc2l6ZTogMS4xMjVyZW07XFxufVxcblxcbmltZyB7XFxuICAgIG1heC13aWR0aDogNDhweDtcXG59XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDU0MXB4KSB7XFxuICAgIGJvZHkge1xcbiAgICAgICAgaGVpZ2h0OiBjYWxjKDEwMHN2aCAtIDJyZW0pO1xcbiAgICAgICAgZGlzcGxheTogZ3JpZDtcXG4gICAgICAgIHBsYWNlLWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgfVxcblxcbiAgICAucmVzdWx0cy1jb250YWluZXIge1xcbiAgICAgICAgZGlzcGxheTogZ3JpZDtcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxuICAgICAgICBtYXJnaW4tdG9wOiAzcmVtO1xcbiAgICB9XFxuXFxuICAgIC5ub3csIC5yZXN1bHRzLWxvY2F0aW9uIHtcXG4gICAgICAgIGdyaWQtY29sdW1uOiAxIC8gLTE7XFxuICAgIH1cXG5cXG4gICAgLndlYXRoZXItY29udGFpbmVyIHtcXG4gICAgICAgIHBhZGRpbmc6IDJyZW0gMDtcXG4gICAgfVxcblxcbiAgICBwIHtcXG4gICAgICAgIG1hcmdpbjogMC41cmVtIDA7XFxuICAgIH1cXG5cXG4gICAgaW1nIHtcXG4gICAgICAgIG1heC13aWR0aDogbm9uZTtcXG4gICAgfVxcblxcbiAgICAubG9hZGVyIHtcXG4gICAgICAgIG1hcmdpbi10b3A6IDA7XFxuICAgICAgICBncmlkLWNvbHVtbjogMSAvIC0xO1xcbiAgICAgICAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxuICAgIH1cXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLFNBQVM7SUFDVCxVQUFVO0lBQ1Ysc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0ksc0JBQXNCO0lBQ3RCLGdCQUFnQjtJQUNoQiw2QkFBNkI7SUFDN0IsbUJBQW1CO0lBQ25CLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsU0FBUztBQUNiOztBQUVBO0lBQ0ksa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksbUJBQW1CO0lBQ25CLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLFlBQVk7SUFDWixxQkFBcUI7SUFDckIsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksNkJBQTZCO0FBQ2pDOztBQUVBO0lBQ0ksZUFBZTtJQUNmLDBCQUEwQjtBQUM5Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYixxQkFBcUI7SUFDckIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksbUJBQW1CO0lBQ25CLGtCQUFrQjtBQUN0Qjs7QUFFQSxXQUFXO0FBQ1g7SUFDSSxrQkFBa0I7SUFDbEIscUJBQXFCO0lBQ3JCLFlBQVk7SUFDWixhQUFhO0lBQ2IsYUFBYTtJQUNiLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLFVBQVU7SUFDVixRQUFRO0lBQ1IsU0FBUztBQUNiOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGVBQWU7SUFDZixRQUFRO0lBQ1IseUJBQXlCO0lBQ3pCLHVCQUF1QjtJQUN2QixlQUFlO0lBQ2YsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLFdBQVc7SUFDWCxXQUFXO0lBQ1gsVUFBVTtJQUNWLFNBQVM7SUFDVCxXQUFXO0lBQ1gsdUJBQXVCO0lBQ3ZCLHVCQUF1QjtJQUN2QixlQUFlO0lBQ2Ysa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksa0NBQWtDO0FBQ3RDOztBQUVBO0lBQ0ksb0NBQW9DO0FBQ3hDOztBQUVBO0lBQ0ksa0NBQWtDO0lBQ2xDLDhCQUE4QjtJQUM5QiwwQkFBMEI7QUFDOUI7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isa0JBQWtCO0lBQ2xCLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isa0JBQWtCO0lBQ2xCLGdCQUFnQjtJQUNoQixpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksV0FBVztJQUNYLFlBQVk7SUFDWixzQkFBc0I7SUFDdEIsZ0NBQWdDO0lBQ2hDLGtCQUFrQjtJQUNsQixxQkFBcUI7SUFDckIsc0JBQXNCO0lBQ3RCLHNDQUFzQztJQUN0QyxpQkFBaUI7QUFDckI7O0FBRUE7SUFDSTtRQUNJLHVCQUF1QjtJQUMzQjtJQUNBO1FBQ0kseUJBQXlCO0lBQzdCO0FBQ0o7O0FBRUE7SUFDSSxpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSwwQkFBMEI7QUFDOUI7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxlQUFlO0FBQ25COztBQUVBO0lBQ0k7UUFDSSwyQkFBMkI7UUFDM0IsYUFBYTtRQUNiLHFCQUFxQjtJQUN6Qjs7SUFFQTtRQUNJLGFBQWE7UUFDYixxQ0FBcUM7UUFDckMsZ0JBQWdCO0lBQ3BCOztJQUVBO1FBQ0ksbUJBQW1CO0lBQ3ZCOztJQUVBO1FBQ0ksZUFBZTtJQUNuQjs7SUFFQTtRQUNJLGdCQUFnQjtJQUNwQjs7SUFFQTtRQUNJLGVBQWU7SUFDbkI7O0lBRUE7UUFDSSxhQUFhO1FBQ2IsbUJBQW1CO1FBQ25CLG9CQUFvQjtJQUN4QjtBQUNKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgICBmb250LWZhbWlseTogc3lzdGVtLXVpO1xcbiAgICBsaW5lLWhlaWdodDogMS41O1xcbiAgICB3aWR0aDogbWluKDcwY2gsIDEwMCUgLSAycmVtKTtcXG4gICAgbWFyZ2luLWlubGluZTogYXV0bztcXG4gICAgbWFyZ2luLXRvcDogMC41cmVtO1xcbn1cXG5cXG4ubG9jYXRpb24taW5wdXQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgZ2FwOiAxcmVtO1xcbn1cXG5cXG5pbnB1dCwgYnV0dG9uIHtcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG5cXG5pbnB1dFt0eXBlPVxcXCJ0ZXh0XFxcIl0ge1xcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xcbiAgICBwYWRkaW5nOiAwIDAuNXJlbTtcXG59XFxuXFxuI3NlYXJjaCB7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgcGFkZGluZzogMC4yNXJlbSAxcmVtO1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuI3NlYXJjaDpkaXNhYmxlZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4jc2VhcmNoOmhvdmVyIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBkYXJrZ3JheTtcXG59XFxuXFxuLnRvZ2dsZS1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBwbGFjZS1jb250ZW50OiBjZW50ZXI7XFxuICAgIG1hcmdpbi10b3A6IDAuNXJlbTtcXG59XFxuXFxuaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXSB7XFxuICAgIGdyaWQtY29sdW1uOiAxIC8gLTE7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLyogU2xpZGVyICovXFxuLnN3aXRjaCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB3aWR0aDogMi41ZW07XFxuICAgIGhlaWdodDogMS41ZW07XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zd2l0Y2ggaW5wdXQge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB3aWR0aDogMDtcXG4gICAgaGVpZ2h0OiAwO1xcbn1cXG5cXG4uc2xpZGVyIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGluc2V0OiAwO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjE5NkYzO1xcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IC40cztcXG4gICAgdHJhbnNpdGlvbjogLjRzO1xcbiAgICBib3JkZXItcmFkaXVzOiAzNHB4O1xcbn1cXG5cXG4uc2xpZGVyOjpiZWZvcmUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICBoZWlnaHQ6IDFlbTtcXG4gICAgd2lkdGg6IDFlbTtcXG4gICAgbGVmdDogNHB4O1xcbiAgICBib3R0b206IDRweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogLjRzO1xcbiAgICB0cmFuc2l0aW9uOiAuNHM7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuXFxuaW5wdXQ6Y2hlY2tlZCArIC5zbGlkZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCAzMywgMzMpO1xcbn1cXG5cXG5pbnB1dDpmb2N1cyArIC5zbGlkZXIge1xcbiAgICBib3gtc2hhZG93OiAwIDAgMXB4IHJnYigyNTUsIDMzLCAzMyk7XFxufVxcblxcbmlucHV0OmNoZWNrZWQgKyAuc2xpZGVyOjpiZWZvcmUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgxZW0pO1xcbiAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDFlbSk7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxZW0pO1xcbn1cXG5cXG4uc3dpdGNoOjpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiwrBDXFxcIjtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiAtMS4yNXJlbTtcXG59XFxuXFxuLnN3aXRjaDo6YWZ0ZXIge1xcbiAgICBjb250ZW50OiBcXFwiwrBGXFxcIjtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICByaWdodDogLTEuMTI1cmVtO1xcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcXG59XFxuXFxuLnJlc3VsdHMtY29udGFpbmVyIHtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBtYXJnaW4tdG9wOiAwLjVyZW07XFxufVxcblxcbi5sb2FkZXIge1xcbiAgICB3aWR0aDogNDhweDtcXG4gICAgaGVpZ2h0OiA0OHB4O1xcbiAgICBib3JkZXI6IDVweCBzb2xpZCAjY2NjO1xcbiAgICBib3JkZXItYm90dG9tLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIGFuaW1hdGlvbjogcm90YXRpb24gMXMgbGluZWFyIGluZmluaXRlO1xcbiAgICBtYXJnaW4tdG9wOiAzMHN2aDtcXG59XFxuXFxuQGtleWZyYW1lcyByb3RhdGlvbiB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcXG4gICAgfVxcbn0gXFxuXFxuLndlYXRoZXItY29udGFpbmVyIHtcXG4gICAgcGFkZGluZzogMC41cmVtIDA7XFxufVxcblxcbi53ZWF0aGVyLWNvbnRhaW5lcjpub3QoOmZpcnN0LW9mLXR5cGUpIHtcXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIGdyZXk7XFxufVxcblxcbmgyIHtcXG4gICAgZm9udC1zaXplOiAxLjEyNXJlbTtcXG59XFxuXFxuaW1nIHtcXG4gICAgbWF4LXdpZHRoOiA0OHB4O1xcbn1cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogNTQxcHgpIHtcXG4gICAgYm9keSB7XFxuICAgICAgICBoZWlnaHQ6IGNhbGMoMTAwc3ZoIC0gMnJlbSk7XFxuICAgICAgICBkaXNwbGF5OiBncmlkO1xcbiAgICAgICAgcGxhY2UtY29udGVudDogY2VudGVyO1xcbiAgICB9XFxuXFxuICAgIC5yZXN1bHRzLWNvbnRhaW5lciB7XFxuICAgICAgICBkaXNwbGF5OiBncmlkO1xcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcXG4gICAgICAgIG1hcmdpbi10b3A6IDNyZW07XFxuICAgIH1cXG5cXG4gICAgLm5vdywgLnJlc3VsdHMtbG9jYXRpb24ge1xcbiAgICAgICAgZ3JpZC1jb2x1bW46IDEgLyAtMTtcXG4gICAgfVxcblxcbiAgICAud2VhdGhlci1jb250YWluZXIge1xcbiAgICAgICAgcGFkZGluZzogMnJlbSAwO1xcbiAgICB9XFxuXFxuICAgIHAge1xcbiAgICAgICAgbWFyZ2luOiAwLjVyZW0gMDtcXG4gICAgfVxcblxcbiAgICBpbWcge1xcbiAgICAgICAgbWF4LXdpZHRoOiBub25lO1xcbiAgICB9XFxuXFxuICAgIC5sb2FkZXIge1xcbiAgICAgICAgbWFyZ2luLXRvcDogMDtcXG4gICAgICAgIGdyaWQtY29sdW1uOiAxIC8gLTE7XFxuICAgICAgICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXG4gICAgfVxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcbmltcG9ydCBkb21Db250cm9sbGVyIGZyb20gXCIuL21vZHVsZXMvRE9NXCI7XG5cbmRvbUNvbnRyb2xsZXIucmVuZGVyUGFnZSgpO1xuIl0sIm5hbWVzIjpbImdldEZvcmVjYXN0V2VhdGhlckRhdGEiLCJkb21Db250cm9sbGVyIiwidW5pdHMiLCJjaXR5Iiwid2VhdGhlckRhdGEiLCJyZW5kZXJQYWdlIiwiYm9keSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImxvY2F0aW9uIiwiY3JlYXRlRWxlbWVudCIsImxhYmVsIiwic2V0QXR0cmlidXRlIiwidGV4dENvbnRlbnQiLCJpbnB1dCIsImFwcGVuZENoaWxkIiwiYnRuIiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZVNlYXJjaCIsImNsYXNzTGlzdCIsImFkZCIsInRvZ2dsZUNvbnRhaW5lciIsInRvZ2dsZUxhYmVsIiwidG9nZ2xlIiwidG9nZ2xlVW5pdHMiLCJ0b2dnbGVTcGFuIiwiY29udGFpbmVyIiwiZm9jdXMiLCJsb2FkU2VhcmNoIiwiZ2V0RWxlbWVudEJ5SWQiLCJ2YWx1ZSIsImNvbnNvbGUiLCJsb2ciLCJyZW5kZXJMb2FkZXIiLCJyZW1vdmVBdHRyaWJ1dGUiLCJjbGVhbldlYXRoZXJEaXNwbGF5IiwicmVuZGVyV2VhdGhlckRhdGEiLCJsb2FkZXIiLCJlIiwidGFyZ2V0IiwiY2hlY2tlZCIsInBhcmVudCIsImNoaWxkIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImRhdGEiLCJub3dDb250YWluZXIiLCJ0aXRsZSIsIm5vd0ljb24iLCJzcmMiLCJub3ciLCJpY29uIiwibm93VGVtcCIsInRvVXBwZXJDYXNlIiwiZGljdCIsImkiLCJkYXlDb250YWluZXIiLCJkYXkiLCJzbGljZSIsImRheUljb24iLCJkYXlBdmdUZW1wIiwidGVtcFJhbmdlIiwicmFpbkNoYW5jZSIsInJhaW5fY2hhbmNlIiwic25vd19jaGFuY2UiLCJzbm93Q2hhbmNlIiwidXJsIiwib3B0aW9ucyIsIm1vZGUiLCJyZXNwb25zZSIsImZldGNoIiwib2siLCJFcnJvciIsImpzb24iLCJnZXREYXRhRnJvbUFQSVJlc3BvbnNlIiwiZXJyb3IiLCJmb3JlY2FzdCIsImZvcmVjYXN0ZGF5IiwiZm9yRWFjaCIsIm9iaiIsInRlbXBfYyIsImF2Z3RlbXBfYyIsInRlbXBfZiIsImF2Z3RlbXBfZiIsIm1pbnRlbXBfYyIsIm1pbnRlbXBfZiIsIm1heHRlbXBfYyIsIm1heHRlbXBfZiIsImRhaWx5X2NoYW5jZV9vZl9yYWluIiwiZGFpbHlfY2hhbmNlX29mX3Nub3ciLCJjb25kaXRpb24iLCJwdXNoIiwiY3VycmVudCIsInRvZGF5IiwidG9tb3Jyb3ciLCJkYXlfYWZ0ZXJfdG9tb3Jyb3ciLCJuYW1lIl0sInNvdXJjZVJvb3QiOiIifQ==