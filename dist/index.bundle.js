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
    weatherData = await (0,_api__WEBPACK_IMPORTED_MODULE_0__["default"])(city);
    btn.removeAttribute("disabled");
    document.getElementById("location").value = "";
    console.log(weatherData);
    cleanWeatherDisplay();
    renderWeatherData(weatherData);
  };
  const toggleUnits = e => {
    console.log(e.target);
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n}\n\nbody {\n    font-family: system-ui;\n    line-height: 1.5;\n    width: min(70ch, 100% - 2rem);\n    margin-inline: auto;\n    margin-top: 0.5rem;\n}\n\n.location-input {\n    display: flex;\n    justify-content: center;\n    gap: 1rem;\n}\n\ninput, button {\n    border-radius: 5px;\n}\n\ninput[type=\"text\"] {\n    border-style: solid;\n    padding: 0 0.5rem;\n}\n\n#search {\n    border: none;\n    padding: 0.25rem 1rem;\n    font-weight: bold;\n}\n\n#search:disabled {\n    background-color: transparent;\n}\n\n#search:hover {\n    cursor: pointer;\n    background-color: darkgray;\n}\n\n.toggle-container {\n    display: grid;\n    place-content: center;\n    margin-top: 0.5rem;\n}\n\ninput[type=\"checkbox\"] {\n    grid-column: 1 / -1;\n    position: relative;\n}\n\n/* Slider */\n.switch {\n    position: relative;\n    display: inline-block;\n    width: 2.5em;\n    height: 1.5em;\n    display: flex;\n    align-items: center;\n}\n\n.switch input {\n    opacity: 0;\n    width: 0;\n    height: 0;\n}\n\n.slider {\n    position: absolute;\n    cursor: pointer;\n    inset: 0;\n    background-color: #2196F3;\n    -webkit-transition: .4s;\n    transition: .4s;\n    border-radius: 34px;\n}\n\n.slider::before {\n    position: absolute;\n    content: \"\";\n    height: 1em;\n    width: 1em;\n    left: 4px;\n    bottom: 4px;\n    background-color: white;\n    -webkit-transition: .4s;\n    transition: .4s;\n    border-radius: 50%;\n}\n\ninput:checked + .slider {\n    background-color: rgb(255, 33, 33);\n}\n\ninput:focus + .slider {\n    box-shadow: 0 0 1px rgb(255, 33, 33);\n}\n\ninput:checked + .slider::before {\n    -webkit-transform: translateX(1em);\n    -ms-transform: translateX(1em);\n    transform: translateX(1em);\n}\n\n.switch::before {\n    content: \"°C\";\n    position: absolute;\n    left: -1.25rem;\n}\n\n.switch::after {\n    content: \"°F\";\n    position: absolute;\n    right: -1.125rem;\n    text-align: right;\n}\n\n.results-container {\n    text-align: center;\n    margin-top: 0.5rem;\n}\n\n.weather-container {\n    padding: 0.5rem 0;\n}\n\n.weather-container:not(:first-of-type) {\n    border-top: 1px solid grey;\n}\n\nh2 {\n    font-size: 1.125rem;\n}\n\nimg {\n    max-width: 48px;\n}\n\n@media (min-width: 541px) {\n    body {\n        height: calc(100svh - 2rem);\n        display: grid;\n        place-content: center;\n    }\n\n    .results-container {\n        display: grid;\n        grid-template-columns: repeat(3, 1fr);\n        margin-top: 3rem;\n    }\n\n    .now, .results-location {\n        grid-column: 1 / -1;\n    }\n\n    .weather-container {\n        padding: 2rem 0;\n    }\n\n    p {\n        margin: 0.5rem 0;\n    }\n\n    img {\n        max-width: none;\n    }\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,SAAS;IACT,UAAU;IACV,sBAAsB;AAC1B;;AAEA;IACI,sBAAsB;IACtB,gBAAgB;IAChB,6BAA6B;IAC7B,mBAAmB;IACnB,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,SAAS;AACb;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,mBAAmB;IACnB,iBAAiB;AACrB;;AAEA;IACI,YAAY;IACZ,qBAAqB;IACrB,iBAAiB;AACrB;;AAEA;IACI,6BAA6B;AACjC;;AAEA;IACI,eAAe;IACf,0BAA0B;AAC9B;;AAEA;IACI,aAAa;IACb,qBAAqB;IACrB,kBAAkB;AACtB;;AAEA;IACI,mBAAmB;IACnB,kBAAkB;AACtB;;AAEA,WAAW;AACX;IACI,kBAAkB;IAClB,qBAAqB;IACrB,YAAY;IACZ,aAAa;IACb,aAAa;IACb,mBAAmB;AACvB;;AAEA;IACI,UAAU;IACV,QAAQ;IACR,SAAS;AACb;;AAEA;IACI,kBAAkB;IAClB,eAAe;IACf,QAAQ;IACR,yBAAyB;IACzB,uBAAuB;IACvB,eAAe;IACf,mBAAmB;AACvB;;AAEA;IACI,kBAAkB;IAClB,WAAW;IACX,WAAW;IACX,UAAU;IACV,SAAS;IACT,WAAW;IACX,uBAAuB;IACvB,uBAAuB;IACvB,eAAe;IACf,kBAAkB;AACtB;;AAEA;IACI,kCAAkC;AACtC;;AAEA;IACI,oCAAoC;AACxC;;AAEA;IACI,kCAAkC;IAClC,8BAA8B;IAC9B,0BAA0B;AAC9B;;AAEA;IACI,aAAa;IACb,kBAAkB;IAClB,cAAc;AAClB;;AAEA;IACI,aAAa;IACb,kBAAkB;IAClB,gBAAgB;IAChB,iBAAiB;AACrB;;AAEA;IACI,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,0BAA0B;AAC9B;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI;QACI,2BAA2B;QAC3B,aAAa;QACb,qBAAqB;IACzB;;IAEA;QACI,aAAa;QACb,qCAAqC;QACrC,gBAAgB;IACpB;;IAEA;QACI,mBAAmB;IACvB;;IAEA;QACI,eAAe;IACnB;;IAEA;QACI,gBAAgB;IACpB;;IAEA;QACI,eAAe;IACnB;AACJ","sourcesContent":["* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n}\n\nbody {\n    font-family: system-ui;\n    line-height: 1.5;\n    width: min(70ch, 100% - 2rem);\n    margin-inline: auto;\n    margin-top: 0.5rem;\n}\n\n.location-input {\n    display: flex;\n    justify-content: center;\n    gap: 1rem;\n}\n\ninput, button {\n    border-radius: 5px;\n}\n\ninput[type=\"text\"] {\n    border-style: solid;\n    padding: 0 0.5rem;\n}\n\n#search {\n    border: none;\n    padding: 0.25rem 1rem;\n    font-weight: bold;\n}\n\n#search:disabled {\n    background-color: transparent;\n}\n\n#search:hover {\n    cursor: pointer;\n    background-color: darkgray;\n}\n\n.toggle-container {\n    display: grid;\n    place-content: center;\n    margin-top: 0.5rem;\n}\n\ninput[type=\"checkbox\"] {\n    grid-column: 1 / -1;\n    position: relative;\n}\n\n/* Slider */\n.switch {\n    position: relative;\n    display: inline-block;\n    width: 2.5em;\n    height: 1.5em;\n    display: flex;\n    align-items: center;\n}\n\n.switch input {\n    opacity: 0;\n    width: 0;\n    height: 0;\n}\n\n.slider {\n    position: absolute;\n    cursor: pointer;\n    inset: 0;\n    background-color: #2196F3;\n    -webkit-transition: .4s;\n    transition: .4s;\n    border-radius: 34px;\n}\n\n.slider::before {\n    position: absolute;\n    content: \"\";\n    height: 1em;\n    width: 1em;\n    left: 4px;\n    bottom: 4px;\n    background-color: white;\n    -webkit-transition: .4s;\n    transition: .4s;\n    border-radius: 50%;\n}\n\ninput:checked + .slider {\n    background-color: rgb(255, 33, 33);\n}\n\ninput:focus + .slider {\n    box-shadow: 0 0 1px rgb(255, 33, 33);\n}\n\ninput:checked + .slider::before {\n    -webkit-transform: translateX(1em);\n    -ms-transform: translateX(1em);\n    transform: translateX(1em);\n}\n\n.switch::before {\n    content: \"°C\";\n    position: absolute;\n    left: -1.25rem;\n}\n\n.switch::after {\n    content: \"°F\";\n    position: absolute;\n    right: -1.125rem;\n    text-align: right;\n}\n\n.results-container {\n    text-align: center;\n    margin-top: 0.5rem;\n}\n\n.weather-container {\n    padding: 0.5rem 0;\n}\n\n.weather-container:not(:first-of-type) {\n    border-top: 1px solid grey;\n}\n\nh2 {\n    font-size: 1.125rem;\n}\n\nimg {\n    max-width: 48px;\n}\n\n@media (min-width: 541px) {\n    body {\n        height: calc(100svh - 2rem);\n        display: grid;\n        place-content: center;\n    }\n\n    .results-container {\n        display: grid;\n        grid-template-columns: repeat(3, 1fr);\n        margin-top: 3rem;\n    }\n\n    .now, .results-location {\n        grid-column: 1 / -1;\n    }\n\n    .weather-container {\n        padding: 2rem 0;\n    }\n\n    p {\n        margin: 0.5rem 0;\n    }\n\n    img {\n        max-width: none;\n    }\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSxlQUFlLDRCQUE0QjtXQUMzQyxlQUFlO1dBQ2YsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7Ozs7O0FDQXFCO0FBQ3FCO0FBRTFDQyxvREFBYSxDQUFDSSxVQUFVLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbW9kdWxlcy9ET00uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbW9kdWxlcy9hcGkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdldEZvcmVjYXN0V2VhdGhlckRhdGEgZnJvbSBcIi4vYXBpXCI7XG5cbmNvbnN0IGRvbUNvbnRyb2xsZXIgPSAoKCkgPT4ge1xuICBsZXQgdW5pdHMgPSBcImNcIjtcbiAgbGV0IGNpdHkgPSBcIk5ZQ1wiO1xuICBsZXQgd2VhdGhlckRhdGE7XG5cbiAgY29uc3QgcmVuZGVyUGFnZSA9ICgpID0+IHtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gICAgY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIGxhYmVsLnNldEF0dHJpYnV0ZShcImZvclwiLCBcImxvY2F0aW9uXCIpO1xuICAgIGxhYmVsLnRleHRDb250ZW50ID0gXCJDaXR5OiBcIjtcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwibG9jYXRpb25cIik7XG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJsb2NhdGlvblwiKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJwbGFjZWhvbGRlclwiLCBcIk5ldyBZb3JrXCIpO1xuICAgIGxhYmVsLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICBsb2NhdGlvbi5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidG4udGV4dENvbnRlbnQgPSBcIlNlYXJjaFwiO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInNlYXJjaFwiKTtcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVNlYXJjaCk7XG4gICAgbG9jYXRpb24uYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICBsb2NhdGlvbi5jbGFzc0xpc3QuYWRkKFwibG9jYXRpb24taW5wdXRcIik7XG4gICAgYm9keS5hcHBlbmRDaGlsZChsb2NhdGlvbik7XG5cbiAgICBjb25zdCB0b2dnbGVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRvZ2dsZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwidG9nZ2xlLWNvbnRhaW5lclwiKTtcbiAgICBjb25zdCB0b2dnbGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICB0b2dnbGVMYWJlbC5jbGFzc0xpc3QuYWRkKFwic3dpdGNoXCIpO1xuICAgIGNvbnN0IHRvZ2dsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICB0b2dnbGUuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImNoZWNrYm94XCIpO1xuICAgIHRvZ2dsZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInVuaXRzXCIpO1xuICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlVW5pdHMpO1xuICAgIHRvZ2dsZUxhYmVsLmFwcGVuZENoaWxkKHRvZ2dsZSk7XG4gICAgY29uc3QgdG9nZ2xlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIHRvZ2dsZVNwYW4uY2xhc3NMaXN0LmFkZChcInNsaWRlclwiKTtcbiAgICB0b2dnbGVMYWJlbC5hcHBlbmRDaGlsZCh0b2dnbGVTcGFuKTtcbiAgICB0b2dnbGVDb250YWluZXIuYXBwZW5kQ2hpbGQodG9nZ2xlTGFiZWwpO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQodG9nZ2xlQ29udGFpbmVyKTtcblxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwicmVzdWx0cy1jb250YWluZXJcIik7XG4gICAgYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuXG4gICAgaW5wdXQuZm9jdXMoKTtcbiAgICBsb2FkU2VhcmNoKCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2VhcmNoID0gKCkgPT4ge1xuICAgIGNvbnN0IGxvY2F0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2NhdGlvblwiKS52YWx1ZTtcbiAgICBjb25zb2xlLmxvZyhsb2NhdGlvbik7XG4gICAgaWYgKCFsb2NhdGlvbikgcmV0dXJuO1xuICAgIGNpdHkgPSBsb2NhdGlvbjtcbiAgICBsb2FkU2VhcmNoKCk7XG4gIH07XG5cbiAgY29uc3QgbG9hZFNlYXJjaCA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFwiKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XG4gICAgd2VhdGhlckRhdGEgPSBhd2FpdCBnZXRGb3JlY2FzdFdlYXRoZXJEYXRhKGNpdHkpO1xuICAgIGJ0bi5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvY2F0aW9uXCIpLnZhbHVlID0gXCJcIjtcbiAgICBjb25zb2xlLmxvZyh3ZWF0aGVyRGF0YSk7XG4gICAgY2xlYW5XZWF0aGVyRGlzcGxheSgpO1xuICAgIHJlbmRlcldlYXRoZXJEYXRhKHdlYXRoZXJEYXRhKTtcbiAgfTtcblxuICBjb25zdCB0b2dnbGVVbml0cyA9IChlKSA9PiB7XG4gICAgY29uc29sZS5sb2coZS50YXJnZXQpO1xuICAgIHVuaXRzID0gZS50YXJnZXQuY2hlY2tlZCA/IFwiZlwiIDogXCJjXCI7XG4gICAgY2xlYW5XZWF0aGVyRGlzcGxheSgpO1xuICAgIHJlbmRlcldlYXRoZXJEYXRhKHdlYXRoZXJEYXRhKTtcbiAgfTtcblxuICBjb25zdCBjbGVhbldlYXRoZXJEaXNwbGF5ID0gKCkgPT4ge1xuICAgIGNvbnN0IHBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzdWx0cy1jb250YWluZXJcIik7XG4gICAgbGV0IGNoaWxkID0gcGFyZW50LmZpcnN0RWxlbWVudENoaWxkO1xuICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICAgIGNoaWxkID0gcGFyZW50LmZpcnN0RWxlbWVudENoaWxkO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZW5kZXJXZWF0aGVyRGF0YSA9IChkYXRhKSA9PiB7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXN1bHRzLWNvbnRhaW5lclwiKTtcbiAgICBjb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGxvY2F0aW9uLnRleHRDb250ZW50ID0gYFNob3dpbmcgcmVzdWx0cyBmb3IgbG9jYXRpb246ICR7ZGF0YS5sb2NhdGlvbn1gO1xuICAgIGxvY2F0aW9uLmNsYXNzTGlzdC5hZGQoXCJyZXN1bHRzLWxvY2F0aW9uXCIpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChsb2NhdGlvbik7XG5cbiAgICBjb25zdCBub3dDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIG5vd0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwid2VhdGhlci1jb250YWluZXJcIik7XG4gICAgbm93Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJub3dcIik7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIk5vd1wiO1xuICAgIG5vd0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgY29uc3Qgbm93SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgbm93SWNvbi5zcmMgPSBgaHR0cHM6JHtkYXRhLm5vdy5pY29ufWA7XG4gICAgbm93Q29udGFpbmVyLmFwcGVuZENoaWxkKG5vd0ljb24pO1xuICAgIGNvbnN0IG5vd1RlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBub3dUZW1wLnRleHRDb250ZW50ID0gYEN1cnJlbnRseTogJHtcbiAgICAgIGRhdGEubm93W2B0ZW1wXyR7dW5pdHN9YF1cbiAgICB9wrAke3VuaXRzLnRvVXBwZXJDYXNlKCl9YDtcbiAgICBub3dDb250YWluZXIuYXBwZW5kQ2hpbGQobm93VGVtcCk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5vd0NvbnRhaW5lcik7XG5cbiAgICBjb25zdCBkaWN0ID0geyAwOiBcInRvZGF5XCIsIDE6IFwidG9tb3Jyb3dcIiwgMjogXCJkYXlfYWZ0ZXJfdG9tb3Jyb3dcIiB9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgIGNvbnN0IGRheUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBkYXlDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIndlYXRoZXItY29udGFpbmVyXCIpO1xuICAgICAgZGF5Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoZGljdFtpXSk7XG4gICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICAgIGNvbnN0IGRheSA9XG4gICAgICAgIGRpY3RbaV0gPT09IFwiZGF5X2FmdGVyX3RvbW9ycm93XCIgPyBcImRheSBhZnRlciB0b21vcnJvd1wiIDogZGljdFtpXTtcbiAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gZGF5WzBdLnRvVXBwZXJDYXNlKCkgKyBkYXkuc2xpY2UoMSk7XG4gICAgICBkYXlDb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgICAgY29uc3QgZGF5SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICBkYXlJY29uLnNyYyA9IGBodHRwczoke2RhdGFbZGljdFtpXV0uaWNvbn1gO1xuICAgICAgZGF5Q29udGFpbmVyLmFwcGVuZENoaWxkKGRheUljb24pO1xuICAgICAgY29uc3QgZGF5QXZnVGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgZGF5QXZnVGVtcC50ZXh0Q29udGVudCA9IGBBdmc6ICR7XG4gICAgICAgIGRhdGFbZGljdFtpXV1bYHRlbXBfJHt1bml0c31gXVxuICAgICAgfcKwJHt1bml0cy50b1VwcGVyQ2FzZSgpfWA7XG4gICAgICBkYXlDb250YWluZXIuYXBwZW5kQ2hpbGQoZGF5QXZnVGVtcCk7XG4gICAgICBjb25zdCB0ZW1wUmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgIHRlbXBSYW5nZS50ZXh0Q29udGVudCA9IGAke1xuICAgICAgICBkYXRhW2RpY3RbaV1dW2BtaW50ZW1wXyR7dW5pdHN9YF1cbiAgICAgIH3CsCR7dW5pdHMudG9VcHBlckNhc2UoKX0gLSAke1xuICAgICAgICBkYXRhW2RpY3RbaV1dW2BtYXh0ZW1wXyR7dW5pdHN9YF1cbiAgICAgIH3CsCR7dW5pdHMudG9VcHBlckNhc2UoKX1gO1xuICAgICAgZGF5Q29udGFpbmVyLmFwcGVuZENoaWxkKHRlbXBSYW5nZSk7XG4gICAgICBjb25zdCByYWluQ2hhbmNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICByYWluQ2hhbmNlLnRleHRDb250ZW50ID0gYFJhaW4gY2hhbmNlOiAke2RhdGFbZGljdFtpXV0ucmFpbl9jaGFuY2V9JWA7XG4gICAgICBkYXlDb250YWluZXIuYXBwZW5kQ2hpbGQocmFpbkNoYW5jZSk7XG4gICAgICBpZiAoZGF0YVtkaWN0W2ldXS5zbm93X2NoYW5jZSkge1xuICAgICAgICBjb25zdCBzbm93Q2hhbmNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIHNub3dDaGFuY2UudGV4dENvbnRlbnQgPSBgUmFpbiBjaGFuY2U6ICR7ZGF0YVtkaWN0W2ldXS5zbm93X2NoYW5jZX0lYDtcbiAgICAgICAgZGF5Q29udGFpbmVyLmFwcGVuZENoaWxkKHNub3dDaGFuY2UpO1xuICAgICAgfVxuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRheUNvbnRhaW5lcik7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcmVuZGVyUGFnZSxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRvbUNvbnRyb2xsZXI7XG4iLCJhc3luYyBmdW5jdGlvbiBnZXRGb3JlY2FzdFdlYXRoZXJEYXRhKGxvY2F0aW9uKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgdXJsID0gYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PWU5OTBlODIwYjJjNjRlZWY4MGExNTU0NTAyMzI1MDgmcT0ke2xvY2F0aW9ufSZkYXlzPTNgO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBtb2RlOiBcImNvcnNcIixcbiAgICB9O1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gY29ubmVjdCB0byBBUElcIik7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICByZXR1cm4gZ2V0RGF0YUZyb21BUElSZXNwb25zZShkYXRhKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGF0YUZyb21BUElSZXNwb25zZShkYXRhKSB7XG4gIGNvbnN0IGZvcmVjYXN0ID0gW107XG4gIGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXkuZm9yRWFjaCgoZGF5KSA9PiB7XG4gICAgY29uc3Qgb2JqID0ge307XG4gICAgb2JqLnRlbXBfYyA9IGRheS5kYXkuYXZndGVtcF9jO1xuICAgIG9iai50ZW1wX2YgPSBkYXkuZGF5LmF2Z3RlbXBfZjtcbiAgICBvYmoubWludGVtcF9jID0gZGF5LmRheS5taW50ZW1wX2M7XG4gICAgb2JqLm1pbnRlbXBfZiA9IGRheS5kYXkubWludGVtcF9mO1xuICAgIG9iai5tYXh0ZW1wX2MgPSBkYXkuZGF5Lm1heHRlbXBfYztcbiAgICBvYmoubWF4dGVtcF9mID0gZGF5LmRheS5tYXh0ZW1wX2Y7XG4gICAgb2JqLnJhaW5fY2hhbmNlID0gZGF5LmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbjtcbiAgICBvYmouc25vd19jaGFuY2UgPSBkYXkuZGF5LmRhaWx5X2NoYW5jZV9vZl9zbm93O1xuICAgIG9iai5pY29uID0gZGF5LmRheS5jb25kaXRpb24uaWNvbjtcbiAgICBmb3JlY2FzdC5wdXNoKG9iaik7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIG5vdzoge1xuICAgICAgdGVtcF9jOiBkYXRhLmN1cnJlbnQudGVtcF9jLFxuICAgICAgdGVtcF9mOiBkYXRhLmN1cnJlbnQudGVtcF9mLFxuICAgICAgaWNvbjogZGF0YS5jdXJyZW50LmNvbmRpdGlvbi5pY29uLFxuICAgIH0sXG4gICAgdG9kYXk6IGZvcmVjYXN0WzBdLFxuICAgIHRvbW9ycm93OiBmb3JlY2FzdFsxXSxcbiAgICBkYXlfYWZ0ZXJfdG9tb3Jyb3c6IGZvcmVjYXN0WzJdLFxuICAgIGxvY2F0aW9uOiBkYXRhLmxvY2F0aW9uLm5hbWUsXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldEZvcmVjYXN0V2VhdGhlckRhdGE7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgICBmb250LWZhbWlseTogc3lzdGVtLXVpO1xcbiAgICBsaW5lLWhlaWdodDogMS41O1xcbiAgICB3aWR0aDogbWluKDcwY2gsIDEwMCUgLSAycmVtKTtcXG4gICAgbWFyZ2luLWlubGluZTogYXV0bztcXG4gICAgbWFyZ2luLXRvcDogMC41cmVtO1xcbn1cXG5cXG4ubG9jYXRpb24taW5wdXQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgZ2FwOiAxcmVtO1xcbn1cXG5cXG5pbnB1dCwgYnV0dG9uIHtcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG5cXG5pbnB1dFt0eXBlPVxcXCJ0ZXh0XFxcIl0ge1xcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xcbiAgICBwYWRkaW5nOiAwIDAuNXJlbTtcXG59XFxuXFxuI3NlYXJjaCB7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgcGFkZGluZzogMC4yNXJlbSAxcmVtO1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuI3NlYXJjaDpkaXNhYmxlZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4jc2VhcmNoOmhvdmVyIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBkYXJrZ3JheTtcXG59XFxuXFxuLnRvZ2dsZS1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBwbGFjZS1jb250ZW50OiBjZW50ZXI7XFxuICAgIG1hcmdpbi10b3A6IDAuNXJlbTtcXG59XFxuXFxuaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXSB7XFxuICAgIGdyaWQtY29sdW1uOiAxIC8gLTE7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLyogU2xpZGVyICovXFxuLnN3aXRjaCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB3aWR0aDogMi41ZW07XFxuICAgIGhlaWdodDogMS41ZW07XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zd2l0Y2ggaW5wdXQge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB3aWR0aDogMDtcXG4gICAgaGVpZ2h0OiAwO1xcbn1cXG5cXG4uc2xpZGVyIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGluc2V0OiAwO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjE5NkYzO1xcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IC40cztcXG4gICAgdHJhbnNpdGlvbjogLjRzO1xcbiAgICBib3JkZXItcmFkaXVzOiAzNHB4O1xcbn1cXG5cXG4uc2xpZGVyOjpiZWZvcmUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICBoZWlnaHQ6IDFlbTtcXG4gICAgd2lkdGg6IDFlbTtcXG4gICAgbGVmdDogNHB4O1xcbiAgICBib3R0b206IDRweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogLjRzO1xcbiAgICB0cmFuc2l0aW9uOiAuNHM7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuXFxuaW5wdXQ6Y2hlY2tlZCArIC5zbGlkZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCAzMywgMzMpO1xcbn1cXG5cXG5pbnB1dDpmb2N1cyArIC5zbGlkZXIge1xcbiAgICBib3gtc2hhZG93OiAwIDAgMXB4IHJnYigyNTUsIDMzLCAzMyk7XFxufVxcblxcbmlucHV0OmNoZWNrZWQgKyAuc2xpZGVyOjpiZWZvcmUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgxZW0pO1xcbiAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDFlbSk7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxZW0pO1xcbn1cXG5cXG4uc3dpdGNoOjpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiwrBDXFxcIjtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiAtMS4yNXJlbTtcXG59XFxuXFxuLnN3aXRjaDo6YWZ0ZXIge1xcbiAgICBjb250ZW50OiBcXFwiwrBGXFxcIjtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICByaWdodDogLTEuMTI1cmVtO1xcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcXG59XFxuXFxuLnJlc3VsdHMtY29udGFpbmVyIHtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBtYXJnaW4tdG9wOiAwLjVyZW07XFxufVxcblxcbi53ZWF0aGVyLWNvbnRhaW5lciB7XFxuICAgIHBhZGRpbmc6IDAuNXJlbSAwO1xcbn1cXG5cXG4ud2VhdGhlci1jb250YWluZXI6bm90KDpmaXJzdC1vZi10eXBlKSB7XFxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCBncmV5O1xcbn1cXG5cXG5oMiB7XFxuICAgIGZvbnQtc2l6ZTogMS4xMjVyZW07XFxufVxcblxcbmltZyB7XFxuICAgIG1heC13aWR0aDogNDhweDtcXG59XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDU0MXB4KSB7XFxuICAgIGJvZHkge1xcbiAgICAgICAgaGVpZ2h0OiBjYWxjKDEwMHN2aCAtIDJyZW0pO1xcbiAgICAgICAgZGlzcGxheTogZ3JpZDtcXG4gICAgICAgIHBsYWNlLWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgfVxcblxcbiAgICAucmVzdWx0cy1jb250YWluZXIge1xcbiAgICAgICAgZGlzcGxheTogZ3JpZDtcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxuICAgICAgICBtYXJnaW4tdG9wOiAzcmVtO1xcbiAgICB9XFxuXFxuICAgIC5ub3csIC5yZXN1bHRzLWxvY2F0aW9uIHtcXG4gICAgICAgIGdyaWQtY29sdW1uOiAxIC8gLTE7XFxuICAgIH1cXG5cXG4gICAgLndlYXRoZXItY29udGFpbmVyIHtcXG4gICAgICAgIHBhZGRpbmc6IDJyZW0gMDtcXG4gICAgfVxcblxcbiAgICBwIHtcXG4gICAgICAgIG1hcmdpbjogMC41cmVtIDA7XFxuICAgIH1cXG5cXG4gICAgaW1nIHtcXG4gICAgICAgIG1heC13aWR0aDogbm9uZTtcXG4gICAgfVxcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksU0FBUztJQUNULFVBQVU7SUFDVixzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxzQkFBc0I7SUFDdEIsZ0JBQWdCO0lBQ2hCLDZCQUE2QjtJQUM3QixtQkFBbUI7SUFDbkIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixTQUFTO0FBQ2I7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxtQkFBbUI7SUFDbkIsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksWUFBWTtJQUNaLHFCQUFxQjtJQUNyQixpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSw2QkFBNkI7QUFDakM7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsMEJBQTBCO0FBQzlCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHFCQUFxQjtJQUNyQixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxtQkFBbUI7SUFDbkIsa0JBQWtCO0FBQ3RCOztBQUVBLFdBQVc7QUFDWDtJQUNJLGtCQUFrQjtJQUNsQixxQkFBcUI7SUFDckIsWUFBWTtJQUNaLGFBQWE7SUFDYixhQUFhO0lBQ2IsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksVUFBVTtJQUNWLFFBQVE7SUFDUixTQUFTO0FBQ2I7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsZUFBZTtJQUNmLFFBQVE7SUFDUix5QkFBeUI7SUFDekIsdUJBQXVCO0lBQ3ZCLGVBQWU7SUFDZixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsV0FBVztJQUNYLFdBQVc7SUFDWCxVQUFVO0lBQ1YsU0FBUztJQUNULFdBQVc7SUFDWCx1QkFBdUI7SUFDdkIsdUJBQXVCO0lBQ3ZCLGVBQWU7SUFDZixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxrQ0FBa0M7QUFDdEM7O0FBRUE7SUFDSSxvQ0FBb0M7QUFDeEM7O0FBRUE7SUFDSSxrQ0FBa0M7SUFDbEMsOEJBQThCO0lBQzlCLDBCQUEwQjtBQUM5Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYixrQkFBa0I7SUFDbEIsY0FBYztBQUNsQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSwwQkFBMEI7QUFDOUI7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxlQUFlO0FBQ25COztBQUVBO0lBQ0k7UUFDSSwyQkFBMkI7UUFDM0IsYUFBYTtRQUNiLHFCQUFxQjtJQUN6Qjs7SUFFQTtRQUNJLGFBQWE7UUFDYixxQ0FBcUM7UUFDckMsZ0JBQWdCO0lBQ3BCOztJQUVBO1FBQ0ksbUJBQW1CO0lBQ3ZCOztJQUVBO1FBQ0ksZUFBZTtJQUNuQjs7SUFFQTtRQUNJLGdCQUFnQjtJQUNwQjs7SUFFQTtRQUNJLGVBQWU7SUFDbkI7QUFDSlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgZm9udC1mYW1pbHk6IHN5c3RlbS11aTtcXG4gICAgbGluZS1oZWlnaHQ6IDEuNTtcXG4gICAgd2lkdGg6IG1pbig3MGNoLCAxMDAlIC0gMnJlbSk7XFxuICAgIG1hcmdpbi1pbmxpbmU6IGF1dG87XFxuICAgIG1hcmdpbi10b3A6IDAuNXJlbTtcXG59XFxuXFxuLmxvY2F0aW9uLWlucHV0IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGdhcDogMXJlbTtcXG59XFxuXFxuaW5wdXQsIGJ1dHRvbiB7XFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXG59XFxuXFxuaW5wdXRbdHlwZT1cXFwidGV4dFxcXCJdIHtcXG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXG4gICAgcGFkZGluZzogMCAwLjVyZW07XFxufVxcblxcbiNzZWFyY2gge1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIHBhZGRpbmc6IDAuMjVyZW0gMXJlbTtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbiNzZWFyY2g6ZGlzYWJsZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuXFxuI3NlYXJjaDpob3ZlciB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZGFya2dyYXk7XFxufVxcblxcbi50b2dnbGUtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgcGxhY2UtY29udGVudDogY2VudGVyO1xcbiAgICBtYXJnaW4tdG9wOiAwLjVyZW07XFxufVxcblxcbmlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl0ge1xcbiAgICBncmlkLWNvbHVtbjogMSAvIC0xO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi8qIFNsaWRlciAqL1xcbi5zd2l0Y2gge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgd2lkdGg6IDIuNWVtO1xcbiAgICBoZWlnaHQ6IDEuNWVtO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uc3dpdGNoIGlucHV0IHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgd2lkdGg6IDA7XFxuICAgIGhlaWdodDogMDtcXG59XFxuXFxuLnNsaWRlciB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBpbnNldDogMDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzIxOTZGMztcXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiAuNHM7XFxuICAgIHRyYW5zaXRpb246IC40cztcXG4gICAgYm9yZGVyLXJhZGl1czogMzRweDtcXG59XFxuXFxuLnNsaWRlcjo6YmVmb3JlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgaGVpZ2h0OiAxZW07XFxuICAgIHdpZHRoOiAxZW07XFxuICAgIGxlZnQ6IDRweDtcXG4gICAgYm90dG9tOiA0cHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IC40cztcXG4gICAgdHJhbnNpdGlvbjogLjRzO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxufVxcblxcbmlucHV0OmNoZWNrZWQgKyAuc2xpZGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMzMsIDMzKTtcXG59XFxuXFxuaW5wdXQ6Zm9jdXMgKyAuc2xpZGVyIHtcXG4gICAgYm94LXNoYWRvdzogMCAwIDFweCByZ2IoMjU1LCAzMywgMzMpO1xcbn1cXG5cXG5pbnB1dDpjaGVja2VkICsgLnNsaWRlcjo6YmVmb3JlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMWVtKTtcXG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWCgxZW0pO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMWVtKTtcXG59XFxuXFxuLnN3aXRjaDo6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIsKwQ1xcXCI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogLTEuMjVyZW07XFxufVxcblxcbi5zd2l0Y2g6OmFmdGVyIHtcXG4gICAgY29udGVudDogXFxcIsKwRlxcXCI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgcmlnaHQ6IC0xLjEyNXJlbTtcXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XFxufVxcblxcbi5yZXN1bHRzLWNvbnRhaW5lciB7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgbWFyZ2luLXRvcDogMC41cmVtO1xcbn1cXG5cXG4ud2VhdGhlci1jb250YWluZXIge1xcbiAgICBwYWRkaW5nOiAwLjVyZW0gMDtcXG59XFxuXFxuLndlYXRoZXItY29udGFpbmVyOm5vdCg6Zmlyc3Qtb2YtdHlwZSkge1xcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgZ3JleTtcXG59XFxuXFxuaDIge1xcbiAgICBmb250LXNpemU6IDEuMTI1cmVtO1xcbn1cXG5cXG5pbWcge1xcbiAgICBtYXgtd2lkdGg6IDQ4cHg7XFxufVxcblxcbkBtZWRpYSAobWluLXdpZHRoOiA1NDFweCkge1xcbiAgICBib2R5IHtcXG4gICAgICAgIGhlaWdodDogY2FsYygxMDBzdmggLSAycmVtKTtcXG4gICAgICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgICAgICBwbGFjZS1jb250ZW50OiBjZW50ZXI7XFxuICAgIH1cXG5cXG4gICAgLnJlc3VsdHMtY29udGFpbmVyIHtcXG4gICAgICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcbiAgICAgICAgbWFyZ2luLXRvcDogM3JlbTtcXG4gICAgfVxcblxcbiAgICAubm93LCAucmVzdWx0cy1sb2NhdGlvbiB7XFxuICAgICAgICBncmlkLWNvbHVtbjogMSAvIC0xO1xcbiAgICB9XFxuXFxuICAgIC53ZWF0aGVyLWNvbnRhaW5lciB7XFxuICAgICAgICBwYWRkaW5nOiAycmVtIDA7XFxuICAgIH1cXG5cXG4gICAgcCB7XFxuICAgICAgICBtYXJnaW46IDAuNXJlbSAwO1xcbiAgICB9XFxuXFxuICAgIGltZyB7XFxuICAgICAgICBtYXgtd2lkdGg6IG5vbmU7XFxuICAgIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XG5pbXBvcnQgZG9tQ29udHJvbGxlciBmcm9tIFwiLi9tb2R1bGVzL0RPTVwiO1xuXG5kb21Db250cm9sbGVyLnJlbmRlclBhZ2UoKTtcbiJdLCJuYW1lcyI6WyJnZXRGb3JlY2FzdFdlYXRoZXJEYXRhIiwiZG9tQ29udHJvbGxlciIsInVuaXRzIiwiY2l0eSIsIndlYXRoZXJEYXRhIiwicmVuZGVyUGFnZSIsImJvZHkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJsb2NhdGlvbiIsImNyZWF0ZUVsZW1lbnQiLCJsYWJlbCIsInNldEF0dHJpYnV0ZSIsInRleHRDb250ZW50IiwiaW5wdXQiLCJhcHBlbmRDaGlsZCIsImJ0biIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVTZWFyY2giLCJjbGFzc0xpc3QiLCJhZGQiLCJ0b2dnbGVDb250YWluZXIiLCJ0b2dnbGVMYWJlbCIsInRvZ2dsZSIsInRvZ2dsZVVuaXRzIiwidG9nZ2xlU3BhbiIsImNvbnRhaW5lciIsImZvY3VzIiwibG9hZFNlYXJjaCIsImdldEVsZW1lbnRCeUlkIiwidmFsdWUiLCJjb25zb2xlIiwibG9nIiwicmVtb3ZlQXR0cmlidXRlIiwiY2xlYW5XZWF0aGVyRGlzcGxheSIsInJlbmRlcldlYXRoZXJEYXRhIiwiZSIsInRhcmdldCIsImNoZWNrZWQiLCJwYXJlbnQiLCJjaGlsZCIsImZpcnN0RWxlbWVudENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJkYXRhIiwibm93Q29udGFpbmVyIiwidGl0bGUiLCJub3dJY29uIiwic3JjIiwibm93IiwiaWNvbiIsIm5vd1RlbXAiLCJ0b1VwcGVyQ2FzZSIsImRpY3QiLCJpIiwiZGF5Q29udGFpbmVyIiwiZGF5Iiwic2xpY2UiLCJkYXlJY29uIiwiZGF5QXZnVGVtcCIsInRlbXBSYW5nZSIsInJhaW5DaGFuY2UiLCJyYWluX2NoYW5jZSIsInNub3dfY2hhbmNlIiwic25vd0NoYW5jZSIsInVybCIsIm9wdGlvbnMiLCJtb2RlIiwicmVzcG9uc2UiLCJmZXRjaCIsIm9rIiwiRXJyb3IiLCJqc29uIiwiZ2V0RGF0YUZyb21BUElSZXNwb25zZSIsImVycm9yIiwiZm9yZWNhc3QiLCJmb3JlY2FzdGRheSIsImZvckVhY2giLCJvYmoiLCJ0ZW1wX2MiLCJhdmd0ZW1wX2MiLCJ0ZW1wX2YiLCJhdmd0ZW1wX2YiLCJtaW50ZW1wX2MiLCJtaW50ZW1wX2YiLCJtYXh0ZW1wX2MiLCJtYXh0ZW1wX2YiLCJkYWlseV9jaGFuY2Vfb2ZfcmFpbiIsImRhaWx5X2NoYW5jZV9vZl9zbm93IiwiY29uZGl0aW9uIiwicHVzaCIsImN1cnJlbnQiLCJ0b2RheSIsInRvbW9ycm93IiwiZGF5X2FmdGVyX3RvbW9ycm93IiwibmFtZSJdLCJzb3VyY2VSb290IjoiIn0=