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
    const toggle = document.createElement("input");
    toggle.setAttribute("type", "checkbox");
    toggle.setAttribute("id", "units");
    toggle.addEventListener("click", toggleUnits);
    toggleContainer.appendChild(toggle);
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n}\n\nbody {\n    font-family: system-ui;\n    line-height: 1.5;\n    width: min(70ch, 100% - 2rem);\n    margin-inline: auto;\n    margin-top: 0.5rem;\n}\n\n.location-input {\n    display: flex;\n    justify-content: center;\n    gap: 1rem;\n}\n\ninput, button {\n    border-radius: 5px;\n}\n\ninput[type=\"text\"] {\n    border-style: solid;\n    padding: 0 0.5rem;\n}\n\n#search {\n    border: none;\n    padding: 0.25rem 1rem;\n    font-weight: bold;\n}\n\n#search:disabled {\n    background-color: transparent;\n}\n\n#search:hover {\n    cursor: pointer;\n    background-color: darkgray;\n}\n\n.toggle-container {\n    display: grid;\n    place-content: center;\n    margin-top: 0.5rem;\n}\n\ninput[type=\"checkbox\"] {\n    grid-column: 1 / -1;\n    position: relative;\n}\n/*\ninput[type=\"checkbox\"]::before {\n    content: \"°C\";\n    position: absolute;\n    left: -1.125rem;\n}*/\n\ninput[type=\"checkbox\"]::after {\n    content: \"°F\";\n    position: absolute;\n    right: -1.085rem;\n    text-align: right;\n}\n\n.results-container {\n    text-align: center;\n    margin-top: 0.5rem;\n}\n\n.weather-container {\n    padding: 0.5rem 0;\n}\n\n.weather-container:not(:first-of-type) {\n    border-top: 1px solid grey;\n}\n\nh2 {\n    font-size: 1.125rem;\n}\n\nimg {\n    max-width: 48px;\n}\n\n@media (min-width: 541px) {\n    body {\n        height: calc(100svh - 2rem);\n        display: grid;\n        place-content: center;\n    }\n\n    .results-container {\n        display: grid;\n        grid-template-columns: repeat(3, 1fr);\n        margin-top: 3rem;\n    }\n\n    .now, .results-location {\n        grid-column: 1 / -1;\n    }\n\n    .weather-container {\n        padding: 2rem 0;\n    }\n\n    p {\n        margin: 0.5rem 0;\n    }\n\n    img {\n        max-width: none;\n    }\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,SAAS;IACT,UAAU;IACV,sBAAsB;AAC1B;;AAEA;IACI,sBAAsB;IACtB,gBAAgB;IAChB,6BAA6B;IAC7B,mBAAmB;IACnB,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,SAAS;AACb;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,mBAAmB;IACnB,iBAAiB;AACrB;;AAEA;IACI,YAAY;IACZ,qBAAqB;IACrB,iBAAiB;AACrB;;AAEA;IACI,6BAA6B;AACjC;;AAEA;IACI,eAAe;IACf,0BAA0B;AAC9B;;AAEA;IACI,aAAa;IACb,qBAAqB;IACrB,kBAAkB;AACtB;;AAEA;IACI,mBAAmB;IACnB,kBAAkB;AACtB;AACA;;;;;EAKE;;AAEF;IACI,aAAa;IACb,kBAAkB;IAClB,gBAAgB;IAChB,iBAAiB;AACrB;;AAEA;IACI,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,0BAA0B;AAC9B;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI;QACI,2BAA2B;QAC3B,aAAa;QACb,qBAAqB;IACzB;;IAEA;QACI,aAAa;QACb,qCAAqC;QACrC,gBAAgB;IACpB;;IAEA;QACI,mBAAmB;IACvB;;IAEA;QACI,eAAe;IACnB;;IAEA;QACI,gBAAgB;IACpB;;IAEA;QACI,eAAe;IACnB;AACJ","sourcesContent":["* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n}\n\nbody {\n    font-family: system-ui;\n    line-height: 1.5;\n    width: min(70ch, 100% - 2rem);\n    margin-inline: auto;\n    margin-top: 0.5rem;\n}\n\n.location-input {\n    display: flex;\n    justify-content: center;\n    gap: 1rem;\n}\n\ninput, button {\n    border-radius: 5px;\n}\n\ninput[type=\"text\"] {\n    border-style: solid;\n    padding: 0 0.5rem;\n}\n\n#search {\n    border: none;\n    padding: 0.25rem 1rem;\n    font-weight: bold;\n}\n\n#search:disabled {\n    background-color: transparent;\n}\n\n#search:hover {\n    cursor: pointer;\n    background-color: darkgray;\n}\n\n.toggle-container {\n    display: grid;\n    place-content: center;\n    margin-top: 0.5rem;\n}\n\ninput[type=\"checkbox\"] {\n    grid-column: 1 / -1;\n    position: relative;\n}\n/*\ninput[type=\"checkbox\"]::before {\n    content: \"°C\";\n    position: absolute;\n    left: -1.125rem;\n}*/\n\ninput[type=\"checkbox\"]::after {\n    content: \"°F\";\n    position: absolute;\n    right: -1.085rem;\n    text-align: right;\n}\n\n.results-container {\n    text-align: center;\n    margin-top: 0.5rem;\n}\n\n.weather-container {\n    padding: 0.5rem 0;\n}\n\n.weather-container:not(:first-of-type) {\n    border-top: 1px solid grey;\n}\n\nh2 {\n    font-size: 1.125rem;\n}\n\nimg {\n    max-width: 48px;\n}\n\n@media (min-width: 541px) {\n    body {\n        height: calc(100svh - 2rem);\n        display: grid;\n        place-content: center;\n    }\n\n    .results-container {\n        display: grid;\n        grid-template-columns: repeat(3, 1fr);\n        margin-top: 3rem;\n    }\n\n    .now, .results-location {\n        grid-column: 1 / -1;\n    }\n\n    .weather-container {\n        padding: 2rem 0;\n    }\n\n    p {\n        margin: 0.5rem 0;\n    }\n\n    img {\n        max-width: none;\n    }\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFVLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbW9kdWxlcy9ET00uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbW9kdWxlcy9hcGkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdldEZvcmVjYXN0V2VhdGhlckRhdGEgZnJvbSBcIi4vYXBpXCI7XG5cbmNvbnN0IGRvbUNvbnRyb2xsZXIgPSAoKCkgPT4ge1xuICBsZXQgdW5pdHMgPSBcImNcIjtcbiAgbGV0IGNpdHkgPSBcIk5ZQ1wiO1xuICBsZXQgd2VhdGhlckRhdGE7XG5cbiAgY29uc3QgcmVuZGVyUGFnZSA9ICgpID0+IHtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gICAgY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIGxhYmVsLnNldEF0dHJpYnV0ZShcImZvclwiLCBcImxvY2F0aW9uXCIpO1xuICAgIGxhYmVsLnRleHRDb250ZW50ID0gXCJDaXR5OiBcIjtcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwibG9jYXRpb25cIik7XG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJsb2NhdGlvblwiKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJwbGFjZWhvbGRlclwiLCBcIk5ldyBZb3JrXCIpO1xuICAgIGxhYmVsLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICBsb2NhdGlvbi5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidG4udGV4dENvbnRlbnQgPSBcIlNlYXJjaFwiO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInNlYXJjaFwiKTtcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVNlYXJjaCk7XG4gICAgbG9jYXRpb24uYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICBsb2NhdGlvbi5jbGFzc0xpc3QuYWRkKFwibG9jYXRpb24taW5wdXRcIik7XG4gICAgYm9keS5hcHBlbmRDaGlsZChsb2NhdGlvbik7XG5cbiAgICBjb25zdCB0b2dnbGVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRvZ2dsZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwidG9nZ2xlLWNvbnRhaW5lclwiKTtcbiAgICBjb25zdCB0b2dnbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgdG9nZ2xlLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJjaGVja2JveFwiKTtcbiAgICB0b2dnbGUuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJ1bml0c1wiKTtcbiAgICB0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZVVuaXRzKTtcbiAgICB0b2dnbGVDb250YWluZXIuYXBwZW5kQ2hpbGQodG9nZ2xlKTtcbiAgICBib2R5LmFwcGVuZENoaWxkKHRvZ2dsZUNvbnRhaW5lcik7XG5cbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChcInJlc3VsdHMtY29udGFpbmVyXCIpO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcblxuICAgIGlucHV0LmZvY3VzKCk7XG4gICAgbG9hZFNlYXJjaCgpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNlYXJjaCA9ICgpID0+IHtcbiAgICBjb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9jYXRpb25cIikudmFsdWU7XG4gICAgY29uc29sZS5sb2cobG9jYXRpb24pO1xuICAgIGlmICghbG9jYXRpb24pIHJldHVybjtcbiAgICBjaXR5ID0gbG9jYXRpb247XG4gICAgbG9hZFNlYXJjaCgpO1xuICB9O1xuXG4gIGNvbnN0IGxvYWRTZWFyY2ggPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hcIik7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIHRydWUpO1xuICAgIHdlYXRoZXJEYXRhID0gYXdhaXQgZ2V0Rm9yZWNhc3RXZWF0aGVyRGF0YShjaXR5KTtcbiAgICBidG4ucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2NhdGlvblwiKS52YWx1ZSA9IFwiXCI7XG4gICAgY29uc29sZS5sb2cod2VhdGhlckRhdGEpO1xuICAgIGNsZWFuV2VhdGhlckRpc3BsYXkoKTtcbiAgICByZW5kZXJXZWF0aGVyRGF0YSh3ZWF0aGVyRGF0YSk7XG4gIH07XG5cbiAgY29uc3QgdG9nZ2xlVW5pdHMgPSAoZSkgPT4ge1xuICAgIHVuaXRzID0gZS50YXJnZXQuY2hlY2tlZCA/IFwiZlwiIDogXCJjXCI7XG4gICAgY2xlYW5XZWF0aGVyRGlzcGxheSgpO1xuICAgIHJlbmRlcldlYXRoZXJEYXRhKHdlYXRoZXJEYXRhKTtcbiAgfTtcblxuICBjb25zdCBjbGVhbldlYXRoZXJEaXNwbGF5ID0gKCkgPT4ge1xuICAgIGNvbnN0IHBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzdWx0cy1jb250YWluZXJcIik7XG4gICAgbGV0IGNoaWxkID0gcGFyZW50LmZpcnN0RWxlbWVudENoaWxkO1xuICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICAgIGNoaWxkID0gcGFyZW50LmZpcnN0RWxlbWVudENoaWxkO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZW5kZXJXZWF0aGVyRGF0YSA9IChkYXRhKSA9PiB7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXN1bHRzLWNvbnRhaW5lclwiKTtcbiAgICBjb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGxvY2F0aW9uLnRleHRDb250ZW50ID0gYFNob3dpbmcgcmVzdWx0cyBmb3IgbG9jYXRpb246ICR7ZGF0YS5sb2NhdGlvbn1gO1xuICAgIGxvY2F0aW9uLmNsYXNzTGlzdC5hZGQoXCJyZXN1bHRzLWxvY2F0aW9uXCIpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChsb2NhdGlvbik7XG5cbiAgICBjb25zdCBub3dDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIG5vd0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwid2VhdGhlci1jb250YWluZXJcIik7XG4gICAgbm93Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJub3dcIik7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIk5vd1wiO1xuICAgIG5vd0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgY29uc3Qgbm93SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgbm93SWNvbi5zcmMgPSBgaHR0cHM6JHtkYXRhLm5vdy5pY29ufWA7XG4gICAgbm93Q29udGFpbmVyLmFwcGVuZENoaWxkKG5vd0ljb24pO1xuICAgIGNvbnN0IG5vd1RlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBub3dUZW1wLnRleHRDb250ZW50ID0gYEN1cnJlbnRseTogJHtcbiAgICAgIGRhdGEubm93W2B0ZW1wXyR7dW5pdHN9YF1cbiAgICB9wrAke3VuaXRzLnRvVXBwZXJDYXNlKCl9YDtcbiAgICBub3dDb250YWluZXIuYXBwZW5kQ2hpbGQobm93VGVtcCk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5vd0NvbnRhaW5lcik7XG5cbiAgICBjb25zdCBkaWN0ID0geyAwOiBcInRvZGF5XCIsIDE6IFwidG9tb3Jyb3dcIiwgMjogXCJkYXlfYWZ0ZXJfdG9tb3Jyb3dcIiB9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgIGNvbnN0IGRheUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBkYXlDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIndlYXRoZXItY29udGFpbmVyXCIpO1xuICAgICAgZGF5Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoZGljdFtpXSk7XG4gICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICAgIGNvbnN0IGRheSA9XG4gICAgICAgIGRpY3RbaV0gPT09IFwiZGF5X2FmdGVyX3RvbW9ycm93XCIgPyBcImRheSBhZnRlciB0b21vcnJvd1wiIDogZGljdFtpXTtcbiAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gZGF5WzBdLnRvVXBwZXJDYXNlKCkgKyBkYXkuc2xpY2UoMSk7XG4gICAgICBkYXlDb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgICAgY29uc3QgZGF5SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICBkYXlJY29uLnNyYyA9IGBodHRwczoke2RhdGFbZGljdFtpXV0uaWNvbn1gO1xuICAgICAgZGF5Q29udGFpbmVyLmFwcGVuZENoaWxkKGRheUljb24pO1xuICAgICAgY29uc3QgZGF5QXZnVGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgZGF5QXZnVGVtcC50ZXh0Q29udGVudCA9IGBBdmc6ICR7XG4gICAgICAgIGRhdGFbZGljdFtpXV1bYHRlbXBfJHt1bml0c31gXVxuICAgICAgfcKwJHt1bml0cy50b1VwcGVyQ2FzZSgpfWA7XG4gICAgICBkYXlDb250YWluZXIuYXBwZW5kQ2hpbGQoZGF5QXZnVGVtcCk7XG4gICAgICBjb25zdCB0ZW1wUmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgIHRlbXBSYW5nZS50ZXh0Q29udGVudCA9IGAke1xuICAgICAgICBkYXRhW2RpY3RbaV1dW2BtaW50ZW1wXyR7dW5pdHN9YF1cbiAgICAgIH3CsCR7dW5pdHMudG9VcHBlckNhc2UoKX0gLSAke1xuICAgICAgICBkYXRhW2RpY3RbaV1dW2BtYXh0ZW1wXyR7dW5pdHN9YF1cbiAgICAgIH3CsCR7dW5pdHMudG9VcHBlckNhc2UoKX1gO1xuICAgICAgZGF5Q29udGFpbmVyLmFwcGVuZENoaWxkKHRlbXBSYW5nZSk7XG4gICAgICBjb25zdCByYWluQ2hhbmNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICByYWluQ2hhbmNlLnRleHRDb250ZW50ID0gYFJhaW4gY2hhbmNlOiAke2RhdGFbZGljdFtpXV0ucmFpbl9jaGFuY2V9JWA7XG4gICAgICBkYXlDb250YWluZXIuYXBwZW5kQ2hpbGQocmFpbkNoYW5jZSk7XG4gICAgICBpZiAoZGF0YVtkaWN0W2ldXS5zbm93X2NoYW5jZSkge1xuICAgICAgICBjb25zdCBzbm93Q2hhbmNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIHNub3dDaGFuY2UudGV4dENvbnRlbnQgPSBgUmFpbiBjaGFuY2U6ICR7ZGF0YVtkaWN0W2ldXS5zbm93X2NoYW5jZX0lYDtcbiAgICAgICAgZGF5Q29udGFpbmVyLmFwcGVuZENoaWxkKHNub3dDaGFuY2UpO1xuICAgICAgfVxuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRheUNvbnRhaW5lcik7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcmVuZGVyUGFnZSxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRvbUNvbnRyb2xsZXI7XG4iLCJhc3luYyBmdW5jdGlvbiBnZXRGb3JlY2FzdFdlYXRoZXJEYXRhKGxvY2F0aW9uKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgdXJsID0gYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PWU5OTBlODIwYjJjNjRlZWY4MGExNTU0NTAyMzI1MDgmcT0ke2xvY2F0aW9ufSZkYXlzPTNgO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBtb2RlOiBcImNvcnNcIixcbiAgICB9O1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gY29ubmVjdCB0byBBUElcIik7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICByZXR1cm4gZ2V0RGF0YUZyb21BUElSZXNwb25zZShkYXRhKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGF0YUZyb21BUElSZXNwb25zZShkYXRhKSB7XG4gIGNvbnN0IGZvcmVjYXN0ID0gW107XG4gIGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXkuZm9yRWFjaCgoZGF5KSA9PiB7XG4gICAgY29uc3Qgb2JqID0ge307XG4gICAgb2JqLnRlbXBfYyA9IGRheS5kYXkuYXZndGVtcF9jO1xuICAgIG9iai50ZW1wX2YgPSBkYXkuZGF5LmF2Z3RlbXBfZjtcbiAgICBvYmoubWludGVtcF9jID0gZGF5LmRheS5taW50ZW1wX2M7XG4gICAgb2JqLm1pbnRlbXBfZiA9IGRheS5kYXkubWludGVtcF9mO1xuICAgIG9iai5tYXh0ZW1wX2MgPSBkYXkuZGF5Lm1heHRlbXBfYztcbiAgICBvYmoubWF4dGVtcF9mID0gZGF5LmRheS5tYXh0ZW1wX2Y7XG4gICAgb2JqLnJhaW5fY2hhbmNlID0gZGF5LmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbjtcbiAgICBvYmouc25vd19jaGFuY2UgPSBkYXkuZGF5LmRhaWx5X2NoYW5jZV9vZl9zbm93O1xuICAgIG9iai5pY29uID0gZGF5LmRheS5jb25kaXRpb24uaWNvbjtcbiAgICBmb3JlY2FzdC5wdXNoKG9iaik7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIG5vdzoge1xuICAgICAgdGVtcF9jOiBkYXRhLmN1cnJlbnQudGVtcF9jLFxuICAgICAgdGVtcF9mOiBkYXRhLmN1cnJlbnQudGVtcF9mLFxuICAgICAgaWNvbjogZGF0YS5jdXJyZW50LmNvbmRpdGlvbi5pY29uLFxuICAgIH0sXG4gICAgdG9kYXk6IGZvcmVjYXN0WzBdLFxuICAgIHRvbW9ycm93OiBmb3JlY2FzdFsxXSxcbiAgICBkYXlfYWZ0ZXJfdG9tb3Jyb3c6IGZvcmVjYXN0WzJdLFxuICAgIGxvY2F0aW9uOiBkYXRhLmxvY2F0aW9uLm5hbWUsXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldEZvcmVjYXN0V2VhdGhlckRhdGE7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgICBmb250LWZhbWlseTogc3lzdGVtLXVpO1xcbiAgICBsaW5lLWhlaWdodDogMS41O1xcbiAgICB3aWR0aDogbWluKDcwY2gsIDEwMCUgLSAycmVtKTtcXG4gICAgbWFyZ2luLWlubGluZTogYXV0bztcXG4gICAgbWFyZ2luLXRvcDogMC41cmVtO1xcbn1cXG5cXG4ubG9jYXRpb24taW5wdXQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgZ2FwOiAxcmVtO1xcbn1cXG5cXG5pbnB1dCwgYnV0dG9uIHtcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG5cXG5pbnB1dFt0eXBlPVxcXCJ0ZXh0XFxcIl0ge1xcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xcbiAgICBwYWRkaW5nOiAwIDAuNXJlbTtcXG59XFxuXFxuI3NlYXJjaCB7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgcGFkZGluZzogMC4yNXJlbSAxcmVtO1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuI3NlYXJjaDpkaXNhYmxlZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4jc2VhcmNoOmhvdmVyIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBkYXJrZ3JheTtcXG59XFxuXFxuLnRvZ2dsZS1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBwbGFjZS1jb250ZW50OiBjZW50ZXI7XFxuICAgIG1hcmdpbi10b3A6IDAuNXJlbTtcXG59XFxuXFxuaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXSB7XFxuICAgIGdyaWQtY29sdW1uOiAxIC8gLTE7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuLypcXG5pbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdOjpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiwrBDXFxcIjtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiAtMS4xMjVyZW07XFxufSovXFxuXFxuaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTo6YWZ0ZXIge1xcbiAgICBjb250ZW50OiBcXFwiwrBGXFxcIjtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICByaWdodDogLTEuMDg1cmVtO1xcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcXG59XFxuXFxuLnJlc3VsdHMtY29udGFpbmVyIHtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBtYXJnaW4tdG9wOiAwLjVyZW07XFxufVxcblxcbi53ZWF0aGVyLWNvbnRhaW5lciB7XFxuICAgIHBhZGRpbmc6IDAuNXJlbSAwO1xcbn1cXG5cXG4ud2VhdGhlci1jb250YWluZXI6bm90KDpmaXJzdC1vZi10eXBlKSB7XFxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCBncmV5O1xcbn1cXG5cXG5oMiB7XFxuICAgIGZvbnQtc2l6ZTogMS4xMjVyZW07XFxufVxcblxcbmltZyB7XFxuICAgIG1heC13aWR0aDogNDhweDtcXG59XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDU0MXB4KSB7XFxuICAgIGJvZHkge1xcbiAgICAgICAgaGVpZ2h0OiBjYWxjKDEwMHN2aCAtIDJyZW0pO1xcbiAgICAgICAgZGlzcGxheTogZ3JpZDtcXG4gICAgICAgIHBsYWNlLWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgfVxcblxcbiAgICAucmVzdWx0cy1jb250YWluZXIge1xcbiAgICAgICAgZGlzcGxheTogZ3JpZDtcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxuICAgICAgICBtYXJnaW4tdG9wOiAzcmVtO1xcbiAgICB9XFxuXFxuICAgIC5ub3csIC5yZXN1bHRzLWxvY2F0aW9uIHtcXG4gICAgICAgIGdyaWQtY29sdW1uOiAxIC8gLTE7XFxuICAgIH1cXG5cXG4gICAgLndlYXRoZXItY29udGFpbmVyIHtcXG4gICAgICAgIHBhZGRpbmc6IDJyZW0gMDtcXG4gICAgfVxcblxcbiAgICBwIHtcXG4gICAgICAgIG1hcmdpbjogMC41cmVtIDA7XFxuICAgIH1cXG5cXG4gICAgaW1nIHtcXG4gICAgICAgIG1heC13aWR0aDogbm9uZTtcXG4gICAgfVxcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksU0FBUztJQUNULFVBQVU7SUFDVixzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxzQkFBc0I7SUFDdEIsZ0JBQWdCO0lBQ2hCLDZCQUE2QjtJQUM3QixtQkFBbUI7SUFDbkIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixTQUFTO0FBQ2I7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxtQkFBbUI7SUFDbkIsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksWUFBWTtJQUNaLHFCQUFxQjtJQUNyQixpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSw2QkFBNkI7QUFDakM7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsMEJBQTBCO0FBQzlCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHFCQUFxQjtJQUNyQixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxtQkFBbUI7SUFDbkIsa0JBQWtCO0FBQ3RCO0FBQ0E7Ozs7O0VBS0U7O0FBRUY7SUFDSSxhQUFhO0lBQ2Isa0JBQWtCO0lBQ2xCLGdCQUFnQjtJQUNoQixpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksMEJBQTBCO0FBQzlCOztBQUVBO0lBQ0ksbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksZUFBZTtBQUNuQjs7QUFFQTtJQUNJO1FBQ0ksMkJBQTJCO1FBQzNCLGFBQWE7UUFDYixxQkFBcUI7SUFDekI7O0lBRUE7UUFDSSxhQUFhO1FBQ2IscUNBQXFDO1FBQ3JDLGdCQUFnQjtJQUNwQjs7SUFFQTtRQUNJLG1CQUFtQjtJQUN2Qjs7SUFFQTtRQUNJLGVBQWU7SUFDbkI7O0lBRUE7UUFDSSxnQkFBZ0I7SUFDcEI7O0lBRUE7UUFDSSxlQUFlO0lBQ25CO0FBQ0pcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKiB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICAgIGZvbnQtZmFtaWx5OiBzeXN0ZW0tdWk7XFxuICAgIGxpbmUtaGVpZ2h0OiAxLjU7XFxuICAgIHdpZHRoOiBtaW4oNzBjaCwgMTAwJSAtIDJyZW0pO1xcbiAgICBtYXJnaW4taW5saW5lOiBhdXRvO1xcbiAgICBtYXJnaW4tdG9wOiAwLjVyZW07XFxufVxcblxcbi5sb2NhdGlvbi1pbnB1dCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBnYXA6IDFyZW07XFxufVxcblxcbmlucHV0LCBidXR0b24ge1xcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcblxcbmlucHV0W3R5cGU9XFxcInRleHRcXFwiXSB7XFxuICAgIGJvcmRlci1zdHlsZTogc29saWQ7XFxuICAgIHBhZGRpbmc6IDAgMC41cmVtO1xcbn1cXG5cXG4jc2VhcmNoIHtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBwYWRkaW5nOiAwLjI1cmVtIDFyZW07XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG4jc2VhcmNoOmRpc2FibGVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcblxcbiNzZWFyY2g6aG92ZXIge1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGRhcmtncmF5O1xcbn1cXG5cXG4udG9nZ2xlLWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIHBsYWNlLWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgbWFyZ2luLXRvcDogMC41cmVtO1xcbn1cXG5cXG5pbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdIHtcXG4gICAgZ3JpZC1jb2x1bW46IDEgLyAtMTtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG4vKlxcbmlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCLCsENcXFwiO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IC0xLjEyNXJlbTtcXG59Ki9cXG5cXG5pbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdOjphZnRlciB7XFxuICAgIGNvbnRlbnQ6IFxcXCLCsEZcXFwiO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHJpZ2h0OiAtMS4wODVyZW07XFxuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xcbn1cXG5cXG4ucmVzdWx0cy1jb250YWluZXIge1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIG1hcmdpbi10b3A6IDAuNXJlbTtcXG59XFxuXFxuLndlYXRoZXItY29udGFpbmVyIHtcXG4gICAgcGFkZGluZzogMC41cmVtIDA7XFxufVxcblxcbi53ZWF0aGVyLWNvbnRhaW5lcjpub3QoOmZpcnN0LW9mLXR5cGUpIHtcXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIGdyZXk7XFxufVxcblxcbmgyIHtcXG4gICAgZm9udC1zaXplOiAxLjEyNXJlbTtcXG59XFxuXFxuaW1nIHtcXG4gICAgbWF4LXdpZHRoOiA0OHB4O1xcbn1cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogNTQxcHgpIHtcXG4gICAgYm9keSB7XFxuICAgICAgICBoZWlnaHQ6IGNhbGMoMTAwc3ZoIC0gMnJlbSk7XFxuICAgICAgICBkaXNwbGF5OiBncmlkO1xcbiAgICAgICAgcGxhY2UtY29udGVudDogY2VudGVyO1xcbiAgICB9XFxuXFxuICAgIC5yZXN1bHRzLWNvbnRhaW5lciB7XFxuICAgICAgICBkaXNwbGF5OiBncmlkO1xcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcXG4gICAgICAgIG1hcmdpbi10b3A6IDNyZW07XFxuICAgIH1cXG5cXG4gICAgLm5vdywgLnJlc3VsdHMtbG9jYXRpb24ge1xcbiAgICAgICAgZ3JpZC1jb2x1bW46IDEgLyAtMTtcXG4gICAgfVxcblxcbiAgICAud2VhdGhlci1jb250YWluZXIge1xcbiAgICAgICAgcGFkZGluZzogMnJlbSAwO1xcbiAgICB9XFxuXFxuICAgIHAge1xcbiAgICAgICAgbWFyZ2luOiAwLjVyZW0gMDtcXG4gICAgfVxcblxcbiAgICBpbWcge1xcbiAgICAgICAgbWF4LXdpZHRoOiBub25lO1xcbiAgICB9XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xuaW1wb3J0IGRvbUNvbnRyb2xsZXIgZnJvbSBcIi4vbW9kdWxlcy9ET01cIjtcblxuZG9tQ29udHJvbGxlci5yZW5kZXJQYWdlKCk7XG4iXSwibmFtZXMiOlsiZ2V0Rm9yZWNhc3RXZWF0aGVyRGF0YSIsImRvbUNvbnRyb2xsZXIiLCJ1bml0cyIsImNpdHkiLCJ3ZWF0aGVyRGF0YSIsInJlbmRlclBhZ2UiLCJib2R5IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibG9jYXRpb24iLCJjcmVhdGVFbGVtZW50IiwibGFiZWwiLCJzZXRBdHRyaWJ1dGUiLCJ0ZXh0Q29udGVudCIsImlucHV0IiwiYXBwZW5kQ2hpbGQiLCJidG4iLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlU2VhcmNoIiwiY2xhc3NMaXN0IiwiYWRkIiwidG9nZ2xlQ29udGFpbmVyIiwidG9nZ2xlIiwidG9nZ2xlVW5pdHMiLCJjb250YWluZXIiLCJmb2N1cyIsImxvYWRTZWFyY2giLCJnZXRFbGVtZW50QnlJZCIsInZhbHVlIiwiY29uc29sZSIsImxvZyIsInJlbW92ZUF0dHJpYnV0ZSIsImNsZWFuV2VhdGhlckRpc3BsYXkiLCJyZW5kZXJXZWF0aGVyRGF0YSIsImUiLCJ0YXJnZXQiLCJjaGVja2VkIiwicGFyZW50IiwiY2hpbGQiLCJmaXJzdEVsZW1lbnRDaGlsZCIsInJlbW92ZUNoaWxkIiwiZGF0YSIsIm5vd0NvbnRhaW5lciIsInRpdGxlIiwibm93SWNvbiIsInNyYyIsIm5vdyIsImljb24iLCJub3dUZW1wIiwidG9VcHBlckNhc2UiLCJkaWN0IiwiaSIsImRheUNvbnRhaW5lciIsImRheSIsInNsaWNlIiwiZGF5SWNvbiIsImRheUF2Z1RlbXAiLCJ0ZW1wUmFuZ2UiLCJyYWluQ2hhbmNlIiwicmFpbl9jaGFuY2UiLCJzbm93X2NoYW5jZSIsInNub3dDaGFuY2UiLCJ1cmwiLCJvcHRpb25zIiwibW9kZSIsInJlc3BvbnNlIiwiZmV0Y2giLCJvayIsIkVycm9yIiwianNvbiIsImdldERhdGFGcm9tQVBJUmVzcG9uc2UiLCJlcnJvciIsImZvcmVjYXN0IiwiZm9yZWNhc3RkYXkiLCJmb3JFYWNoIiwib2JqIiwidGVtcF9jIiwiYXZndGVtcF9jIiwidGVtcF9mIiwiYXZndGVtcF9mIiwibWludGVtcF9jIiwibWludGVtcF9mIiwibWF4dGVtcF9jIiwibWF4dGVtcF9mIiwiZGFpbHlfY2hhbmNlX29mX3JhaW4iLCJkYWlseV9jaGFuY2Vfb2Zfc25vdyIsImNvbmRpdGlvbiIsInB1c2giLCJjdXJyZW50IiwidG9kYXkiLCJ0b21vcnJvdyIsImRheV9hZnRlcl90b21vcnJvdyIsIm5hbWUiXSwic291cmNlUm9vdCI6IiJ9