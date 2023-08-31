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
    const location = document.createElement("div");
    const label = document.createElement("label");
    label.setAttribute("for", "location");
    label.textContent = "City:";
    location.appendChild(label);
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", "location");
    input.setAttribute("id", "location");
    input.setAttribute("placeholder", "New York");
    location.appendChild(input);
    const btn = document.createElement("button");
    btn.textContent = "Search";
    btn.setAttribute("id", "search");
    btn.addEventListener("click", handleSearch);
    location.appendChild(btn);
    const toggle = document.createElement("input");
    toggle.setAttribute("type", "checkbox");
    toggle.setAttribute("id", "units");
    toggle.addEventListener("click", toggleUnits);
    location.appendChild(toggle);
    location.classList.add("location-input");
    document.querySelector("body").appendChild(location);
    const container = document.createElement("section");
    container.classList.add("results-container");
    document.querySelector("body").appendChild(container);
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n}\n\nbody {\n    font-family: system-ui;\n    line-height: 1.5;\n    width: min(70ch, 100% - 2rem);\n    margin-inline: auto;\n    margin-top: 0.5rem;\n}\n\n.location-input {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    place-items: center;\n}\n\ninput, button {\n    border-radius: 5px;\n}\n\ninput[type=\"text\"] {\n    border-style: solid;\n    padding: 0 0.5rem;\n    max-width: 10rem;\n}\n\n#search {\n    border: none;\n    padding: 0.25rem 0.5rem;\n    font-weight: bold;\n}\n\n#search:hover {\n    cursor: pointer;\n    background-color: darkgray;\n}\n\ninput[type=\"checkbox\"] {\n    grid-column: 1 / -1;\n    margin-top: 0.5rem;\n    position: relative;\n}\n/*\ninput[type=\"checkbox\"]::before {\n    content: \"°C\";\n    position: absolute;\n    left: -1.125rem;\n}*/\n\ninput[type=\"checkbox\"]::after {\n    content: \"°F\";\n    position: absolute;\n    right: -1.085rem;\n    text-align: right;\n}\n\n.results-container {\n    text-align: center;\n    margin-top: 0.5rem;\n}\n\n.weather-container {\n    padding: 0.5rem 0;\n}\n\n.weather-container:not(:first-of-type) {\n    border-top: 1px solid grey;\n}\n\nh2 {\n    font-size: 1.125rem;\n}\n\nimg {\n    max-width: 48px;\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,SAAS;IACT,UAAU;IACV,sBAAsB;AAC1B;;AAEA;IACI,sBAAsB;IACtB,gBAAgB;IAChB,6BAA6B;IAC7B,mBAAmB;IACnB,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,qCAAqC;IACrC,mBAAmB;AACvB;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,mBAAmB;IACnB,iBAAiB;IACjB,gBAAgB;AACpB;;AAEA;IACI,YAAY;IACZ,uBAAuB;IACvB,iBAAiB;AACrB;;AAEA;IACI,eAAe;IACf,0BAA0B;AAC9B;;AAEA;IACI,mBAAmB;IACnB,kBAAkB;IAClB,kBAAkB;AACtB;AACA;;;;;EAKE;;AAEF;IACI,aAAa;IACb,kBAAkB;IAClB,gBAAgB;IAChB,iBAAiB;AACrB;;AAEA;IACI,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,0BAA0B;AAC9B;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,eAAe;AACnB","sourcesContent":["* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n}\n\nbody {\n    font-family: system-ui;\n    line-height: 1.5;\n    width: min(70ch, 100% - 2rem);\n    margin-inline: auto;\n    margin-top: 0.5rem;\n}\n\n.location-input {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    place-items: center;\n}\n\ninput, button {\n    border-radius: 5px;\n}\n\ninput[type=\"text\"] {\n    border-style: solid;\n    padding: 0 0.5rem;\n    max-width: 10rem;\n}\n\n#search {\n    border: none;\n    padding: 0.25rem 0.5rem;\n    font-weight: bold;\n}\n\n#search:hover {\n    cursor: pointer;\n    background-color: darkgray;\n}\n\ninput[type=\"checkbox\"] {\n    grid-column: 1 / -1;\n    margin-top: 0.5rem;\n    position: relative;\n}\n/*\ninput[type=\"checkbox\"]::before {\n    content: \"°C\";\n    position: absolute;\n    left: -1.125rem;\n}*/\n\ninput[type=\"checkbox\"]::after {\n    content: \"°F\";\n    position: absolute;\n    right: -1.085rem;\n    text-align: right;\n}\n\n.results-container {\n    text-align: center;\n    margin-top: 0.5rem;\n}\n\n.weather-container {\n    padding: 0.5rem 0;\n}\n\n.weather-container:not(:first-of-type) {\n    border-top: 1px solid grey;\n}\n\nh2 {\n    font-size: 1.125rem;\n}\n\nimg {\n    max-width: 48px;\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFlO1dBQ2YsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7Ozs7O0FDQXFCO0FBQ3FCO0FBRTFDQyxvREFBYSxDQUFDSSxVQUFVLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbW9kdWxlcy9ET00uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbW9kdWxlcy9hcGkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdldEZvcmVjYXN0V2VhdGhlckRhdGEgZnJvbSBcIi4vYXBpXCI7XG5cbmNvbnN0IGRvbUNvbnRyb2xsZXIgPSAoKCkgPT4ge1xuICBsZXQgdW5pdHMgPSBcImNcIjtcbiAgbGV0IGNpdHkgPSBcIk5ZQ1wiO1xuICBsZXQgd2VhdGhlckRhdGE7XG5cbiAgY29uc3QgcmVuZGVyUGFnZSA9ICgpID0+IHtcbiAgICBjb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgbGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIFwibG9jYXRpb25cIik7XG4gICAgbGFiZWwudGV4dENvbnRlbnQgPSBcIkNpdHk6XCI7XG4gICAgbG9jYXRpb24uYXBwZW5kQ2hpbGQobGFiZWwpO1xuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJsb2NhdGlvblwiKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImxvY2F0aW9uXCIpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIsIFwiTmV3IFlvcmtcIik7XG4gICAgbG9jYXRpb24uYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnRuLnRleHRDb250ZW50ID0gXCJTZWFyY2hcIjtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJzZWFyY2hcIik7XG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVTZWFyY2gpO1xuICAgIGxvY2F0aW9uLmFwcGVuZENoaWxkKGJ0bik7XG4gICAgY29uc3QgdG9nZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIHRvZ2dsZS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiY2hlY2tib3hcIik7XG4gICAgdG9nZ2xlLnNldEF0dHJpYnV0ZShcImlkXCIsIFwidW5pdHNcIik7XG4gICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVVbml0cyk7XG4gICAgbG9jYXRpb24uYXBwZW5kQ2hpbGQodG9nZ2xlKTtcbiAgICBsb2NhdGlvbi5jbGFzc0xpc3QuYWRkKFwibG9jYXRpb24taW5wdXRcIik7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYXBwZW5kQ2hpbGQobG9jYXRpb24pO1xuXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJyZXN1bHRzLWNvbnRhaW5lclwiKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuXG4gICAgaW5wdXQuZm9jdXMoKTtcbiAgICBsb2FkU2VhcmNoKCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2VhcmNoID0gKCkgPT4ge1xuICAgIGNvbnN0IGxvY2F0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2NhdGlvblwiKS52YWx1ZTtcbiAgICBjb25zb2xlLmxvZyhsb2NhdGlvbik7XG4gICAgaWYgKCFsb2NhdGlvbikgcmV0dXJuO1xuICAgIGNpdHkgPSBsb2NhdGlvbjtcbiAgICBsb2FkU2VhcmNoKCk7XG4gIH07XG5cbiAgY29uc3QgbG9hZFNlYXJjaCA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFwiKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XG4gICAgd2VhdGhlckRhdGEgPSBhd2FpdCBnZXRGb3JlY2FzdFdlYXRoZXJEYXRhKGNpdHkpO1xuICAgIGJ0bi5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvY2F0aW9uXCIpLnZhbHVlID0gXCJcIjtcbiAgICBjb25zb2xlLmxvZyh3ZWF0aGVyRGF0YSk7XG4gICAgY2xlYW5XZWF0aGVyRGlzcGxheSgpO1xuICAgIHJlbmRlcldlYXRoZXJEYXRhKHdlYXRoZXJEYXRhKTtcbiAgfTtcblxuICBjb25zdCB0b2dnbGVVbml0cyA9IChlKSA9PiB7XG4gICAgdW5pdHMgPSBlLnRhcmdldC5jaGVja2VkID8gXCJmXCIgOiBcImNcIjtcbiAgICBjbGVhbldlYXRoZXJEaXNwbGF5KCk7XG4gICAgcmVuZGVyV2VhdGhlckRhdGEod2VhdGhlckRhdGEpO1xuICB9O1xuXG4gIGNvbnN0IGNsZWFuV2VhdGhlckRpc3BsYXkgPSAoKSA9PiB7XG4gICAgY29uc3QgcGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXN1bHRzLWNvbnRhaW5lclwiKTtcbiAgICBsZXQgY2hpbGQgPSBwYXJlbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgd2hpbGUgKGNoaWxkKSB7XG4gICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICAgICAgY2hpbGQgPSBwYXJlbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlbmRlcldlYXRoZXJEYXRhID0gKGRhdGEpID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc3VsdHMtY29udGFpbmVyXCIpO1xuICAgIGNvbnN0IGxvY2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgbG9jYXRpb24udGV4dENvbnRlbnQgPSBgU2hvd2luZyByZXN1bHRzIGZvciBsb2NhdGlvbjogJHtkYXRhLmxvY2F0aW9ufWA7XG4gICAgbG9jYXRpb24uY2xhc3NMaXN0LmFkZChcInJlc3VsdHMtbG9jYXRpb25cIik7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxvY2F0aW9uKTtcblxuICAgIGNvbnN0IG5vd0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbm93Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ3ZWF0aGVyLWNvbnRhaW5lclwiKTtcbiAgICBub3dDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm5vd1wiKTtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9IFwiTm93XCI7XG4gICAgbm93Q29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICBjb25zdCBub3dJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBub3dJY29uLnNyYyA9IGBodHRwczoke2RhdGEubm93Lmljb259YDtcbiAgICBub3dDb250YWluZXIuYXBwZW5kQ2hpbGQobm93SWNvbik7XG4gICAgY29uc3Qgbm93VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIG5vd1RlbXAudGV4dENvbnRlbnQgPSBgQ3VycmVudGx5OiAke1xuICAgICAgZGF0YS5ub3dbYHRlbXBfJHt1bml0c31gXVxuICAgIH3CsCR7dW5pdHMudG9VcHBlckNhc2UoKX1gO1xuICAgIG5vd0NvbnRhaW5lci5hcHBlbmRDaGlsZChub3dUZW1wKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobm93Q29udGFpbmVyKTtcblxuICAgIGNvbnN0IGRpY3QgPSB7IDA6IFwidG9kYXlcIiwgMTogXCJ0b21vcnJvd1wiLCAyOiBcImRheV9hZnRlcl90b21vcnJvd1wiIH07XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgY29uc3QgZGF5Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGRheUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwid2VhdGhlci1jb250YWluZXJcIik7XG4gICAgICBkYXlDb250YWluZXIuY2xhc3NMaXN0LmFkZChkaWN0W2ldKTtcbiAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgICAgY29uc3QgZGF5ID1cbiAgICAgICAgZGljdFtpXSA9PT0gXCJkYXlfYWZ0ZXJfdG9tb3Jyb3dcIiA/IFwiZGF5IGFmdGVyIHRvbW9ycm93XCIgOiBkaWN0W2ldO1xuICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBkYXlbMF0udG9VcHBlckNhc2UoKSArIGRheS5zbGljZSgxKTtcbiAgICAgIGRheUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgICBjb25zdCBkYXlJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgIGRheUljb24uc3JjID0gYGh0dHBzOiR7ZGF0YVtkaWN0W2ldXS5pY29ufWA7XG4gICAgICBkYXlDb250YWluZXIuYXBwZW5kQ2hpbGQoZGF5SWNvbik7XG4gICAgICBjb25zdCBkYXlBdmdUZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICBkYXlBdmdUZW1wLnRleHRDb250ZW50ID0gYEF2ZzogJHtcbiAgICAgICAgZGF0YVtkaWN0W2ldXVtgdGVtcF8ke3VuaXRzfWBdXG4gICAgICB9wrAke3VuaXRzLnRvVXBwZXJDYXNlKCl9YDtcbiAgICAgIGRheUNvbnRhaW5lci5hcHBlbmRDaGlsZChkYXlBdmdUZW1wKTtcbiAgICAgIGNvbnN0IHRlbXBSYW5nZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgdGVtcFJhbmdlLnRleHRDb250ZW50ID0gYCR7XG4gICAgICAgIGRhdGFbZGljdFtpXV1bYG1pbnRlbXBfJHt1bml0c31gXVxuICAgICAgfcKwJHt1bml0cy50b1VwcGVyQ2FzZSgpfSAtICR7XG4gICAgICAgIGRhdGFbZGljdFtpXV1bYG1heHRlbXBfJHt1bml0c31gXVxuICAgICAgfcKwJHt1bml0cy50b1VwcGVyQ2FzZSgpfWA7XG4gICAgICBkYXlDb250YWluZXIuYXBwZW5kQ2hpbGQodGVtcFJhbmdlKTtcbiAgICAgIGNvbnN0IHJhaW5DaGFuY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgIHJhaW5DaGFuY2UudGV4dENvbnRlbnQgPSBgUmFpbiBjaGFuY2U6ICR7ZGF0YVtkaWN0W2ldXS5yYWluX2NoYW5jZX0lYDtcbiAgICAgIGRheUNvbnRhaW5lci5hcHBlbmRDaGlsZChyYWluQ2hhbmNlKTtcbiAgICAgIGlmIChkYXRhW2RpY3RbaV1dLnNub3dfY2hhbmNlKSB7XG4gICAgICAgIGNvbnN0IHNub3dDaGFuY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgc25vd0NoYW5jZS50ZXh0Q29udGVudCA9IGBSYWluIGNoYW5jZTogJHtkYXRhW2RpY3RbaV1dLnNub3dfY2hhbmNlfSVgO1xuICAgICAgICBkYXlDb250YWluZXIuYXBwZW5kQ2hpbGQoc25vd0NoYW5jZSk7XG4gICAgICB9XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGF5Q29udGFpbmVyKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICByZW5kZXJQYWdlLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZG9tQ29udHJvbGxlcjtcbiIsImFzeW5jIGZ1bmN0aW9uIGdldEZvcmVjYXN0V2VhdGhlckRhdGEobG9jYXRpb24pIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB1cmwgPSBgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9ZTk5MGU4MjBiMmM2NGVlZjgwYTE1NTQ1MDIzMjUwOCZxPSR7bG9jYXRpb259JmRheXM9M2A7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIG1vZGU6IFwiY29yc1wiLFxuICAgIH07XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuICAgIGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBjb25uZWN0IHRvIEFQSVwiKTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIHJldHVybiBnZXREYXRhRnJvbUFQSVJlc3BvbnNlKGRhdGEpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREYXRhRnJvbUFQSVJlc3BvbnNlKGRhdGEpIHtcbiAgY29uc3QgZm9yZWNhc3QgPSBbXTtcbiAgZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheS5mb3JFYWNoKChkYXkpID0+IHtcbiAgICBjb25zdCBvYmogPSB7fTtcbiAgICBvYmoudGVtcF9jID0gZGF5LmRheS5hdmd0ZW1wX2M7XG4gICAgb2JqLnRlbXBfZiA9IGRheS5kYXkuYXZndGVtcF9mO1xuICAgIG9iai5taW50ZW1wX2MgPSBkYXkuZGF5Lm1pbnRlbXBfYztcbiAgICBvYmoubWludGVtcF9mID0gZGF5LmRheS5taW50ZW1wX2Y7XG4gICAgb2JqLm1heHRlbXBfYyA9IGRheS5kYXkubWF4dGVtcF9jO1xuICAgIG9iai5tYXh0ZW1wX2YgPSBkYXkuZGF5Lm1heHRlbXBfZjtcbiAgICBvYmoucmFpbl9jaGFuY2UgPSBkYXkuZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWluO1xuICAgIG9iai5zbm93X2NoYW5jZSA9IGRheS5kYXkuZGFpbHlfY2hhbmNlX29mX3Nub3c7XG4gICAgb2JqLmljb24gPSBkYXkuZGF5LmNvbmRpdGlvbi5pY29uO1xuICAgIGZvcmVjYXN0LnB1c2gob2JqKTtcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgbm93OiB7XG4gICAgICB0ZW1wX2M6IGRhdGEuY3VycmVudC50ZW1wX2MsXG4gICAgICB0ZW1wX2Y6IGRhdGEuY3VycmVudC50ZW1wX2YsXG4gICAgICBpY29uOiBkYXRhLmN1cnJlbnQuY29uZGl0aW9uLmljb24sXG4gICAgfSxcbiAgICB0b2RheTogZm9yZWNhc3RbMF0sXG4gICAgdG9tb3Jyb3c6IGZvcmVjYXN0WzFdLFxuICAgIGRheV9hZnRlcl90b21vcnJvdzogZm9yZWNhc3RbMl0sXG4gICAgbG9jYXRpb246IGRhdGEubG9jYXRpb24ubmFtZSxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0Rm9yZWNhc3RXZWF0aGVyRGF0YTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKiB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICAgIGZvbnQtZmFtaWx5OiBzeXN0ZW0tdWk7XFxuICAgIGxpbmUtaGVpZ2h0OiAxLjU7XFxuICAgIHdpZHRoOiBtaW4oNzBjaCwgMTAwJSAtIDJyZW0pO1xcbiAgICBtYXJnaW4taW5saW5lOiBhdXRvO1xcbiAgICBtYXJnaW4tdG9wOiAwLjVyZW07XFxufVxcblxcbi5sb2NhdGlvbi1pbnB1dCB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxuICAgIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmlucHV0LCBidXR0b24ge1xcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcblxcbmlucHV0W3R5cGU9XFxcInRleHRcXFwiXSB7XFxuICAgIGJvcmRlci1zdHlsZTogc29saWQ7XFxuICAgIHBhZGRpbmc6IDAgMC41cmVtO1xcbiAgICBtYXgtd2lkdGg6IDEwcmVtO1xcbn1cXG5cXG4jc2VhcmNoIHtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBwYWRkaW5nOiAwLjI1cmVtIDAuNXJlbTtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbiNzZWFyY2g6aG92ZXIge1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGRhcmtncmF5O1xcbn1cXG5cXG5pbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdIHtcXG4gICAgZ3JpZC1jb2x1bW46IDEgLyAtMTtcXG4gICAgbWFyZ2luLXRvcDogMC41cmVtO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcbi8qXFxuaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXTo6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIsKwQ1xcXCI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogLTEuMTI1cmVtO1xcbn0qL1xcblxcbmlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06OmFmdGVyIHtcXG4gICAgY29udGVudDogXFxcIsKwRlxcXCI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgcmlnaHQ6IC0xLjA4NXJlbTtcXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XFxufVxcblxcbi5yZXN1bHRzLWNvbnRhaW5lciB7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgbWFyZ2luLXRvcDogMC41cmVtO1xcbn1cXG5cXG4ud2VhdGhlci1jb250YWluZXIge1xcbiAgICBwYWRkaW5nOiAwLjVyZW0gMDtcXG59XFxuXFxuLndlYXRoZXItY29udGFpbmVyOm5vdCg6Zmlyc3Qtb2YtdHlwZSkge1xcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgZ3JleTtcXG59XFxuXFxuaDIge1xcbiAgICBmb250LXNpemU6IDEuMTI1cmVtO1xcbn1cXG5cXG5pbWcge1xcbiAgICBtYXgtd2lkdGg6IDQ4cHg7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxTQUFTO0lBQ1QsVUFBVTtJQUNWLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLHNCQUFzQjtJQUN0QixnQkFBZ0I7SUFDaEIsNkJBQTZCO0lBQzdCLG1CQUFtQjtJQUNuQixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IscUNBQXFDO0lBQ3JDLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLG1CQUFtQjtJQUNuQixpQkFBaUI7SUFDakIsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksWUFBWTtJQUNaLHVCQUF1QjtJQUN2QixpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsMEJBQTBCO0FBQzlCOztBQUVBO0lBQ0ksbUJBQW1CO0lBQ25CLGtCQUFrQjtJQUNsQixrQkFBa0I7QUFDdEI7QUFDQTs7Ozs7RUFLRTs7QUFFRjtJQUNJLGFBQWE7SUFDYixrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSwwQkFBMEI7QUFDOUI7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxlQUFlO0FBQ25CXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgICBmb250LWZhbWlseTogc3lzdGVtLXVpO1xcbiAgICBsaW5lLWhlaWdodDogMS41O1xcbiAgICB3aWR0aDogbWluKDcwY2gsIDEwMCUgLSAycmVtKTtcXG4gICAgbWFyZ2luLWlubGluZTogYXV0bztcXG4gICAgbWFyZ2luLXRvcDogMC41cmVtO1xcbn1cXG5cXG4ubG9jYXRpb24taW5wdXQge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcbiAgICBwbGFjZS1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5pbnB1dCwgYnV0dG9uIHtcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG5cXG5pbnB1dFt0eXBlPVxcXCJ0ZXh0XFxcIl0ge1xcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xcbiAgICBwYWRkaW5nOiAwIDAuNXJlbTtcXG4gICAgbWF4LXdpZHRoOiAxMHJlbTtcXG59XFxuXFxuI3NlYXJjaCB7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgcGFkZGluZzogMC4yNXJlbSAwLjVyZW07XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG4jc2VhcmNoOmhvdmVyIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBkYXJrZ3JheTtcXG59XFxuXFxuaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXSB7XFxuICAgIGdyaWQtY29sdW1uOiAxIC8gLTE7XFxuICAgIG1hcmdpbi10b3A6IDAuNXJlbTtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG4vKlxcbmlucHV0W3R5cGU9XFxcImNoZWNrYm94XFxcIl06OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCLCsENcXFwiO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IC0xLjEyNXJlbTtcXG59Ki9cXG5cXG5pbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdOjphZnRlciB7XFxuICAgIGNvbnRlbnQ6IFxcXCLCsEZcXFwiO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHJpZ2h0OiAtMS4wODVyZW07XFxuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xcbn1cXG5cXG4ucmVzdWx0cy1jb250YWluZXIge1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIG1hcmdpbi10b3A6IDAuNXJlbTtcXG59XFxuXFxuLndlYXRoZXItY29udGFpbmVyIHtcXG4gICAgcGFkZGluZzogMC41cmVtIDA7XFxufVxcblxcbi53ZWF0aGVyLWNvbnRhaW5lcjpub3QoOmZpcnN0LW9mLXR5cGUpIHtcXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIGdyZXk7XFxufVxcblxcbmgyIHtcXG4gICAgZm9udC1zaXplOiAxLjEyNXJlbTtcXG59XFxuXFxuaW1nIHtcXG4gICAgbWF4LXdpZHRoOiA0OHB4O1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcbmltcG9ydCBkb21Db250cm9sbGVyIGZyb20gXCIuL21vZHVsZXMvRE9NXCI7XG5cbmRvbUNvbnRyb2xsZXIucmVuZGVyUGFnZSgpO1xuIl0sIm5hbWVzIjpbImdldEZvcmVjYXN0V2VhdGhlckRhdGEiLCJkb21Db250cm9sbGVyIiwidW5pdHMiLCJjaXR5Iiwid2VhdGhlckRhdGEiLCJyZW5kZXJQYWdlIiwibG9jYXRpb24iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJsYWJlbCIsInNldEF0dHJpYnV0ZSIsInRleHRDb250ZW50IiwiYXBwZW5kQ2hpbGQiLCJpbnB1dCIsImJ0biIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVTZWFyY2giLCJ0b2dnbGUiLCJ0b2dnbGVVbml0cyIsImNsYXNzTGlzdCIsImFkZCIsInF1ZXJ5U2VsZWN0b3IiLCJjb250YWluZXIiLCJmb2N1cyIsImxvYWRTZWFyY2giLCJnZXRFbGVtZW50QnlJZCIsInZhbHVlIiwiY29uc29sZSIsImxvZyIsInJlbW92ZUF0dHJpYnV0ZSIsImNsZWFuV2VhdGhlckRpc3BsYXkiLCJyZW5kZXJXZWF0aGVyRGF0YSIsImUiLCJ0YXJnZXQiLCJjaGVja2VkIiwicGFyZW50IiwiY2hpbGQiLCJmaXJzdEVsZW1lbnRDaGlsZCIsInJlbW92ZUNoaWxkIiwiZGF0YSIsIm5vd0NvbnRhaW5lciIsInRpdGxlIiwibm93SWNvbiIsInNyYyIsIm5vdyIsImljb24iLCJub3dUZW1wIiwidG9VcHBlckNhc2UiLCJkaWN0IiwiaSIsImRheUNvbnRhaW5lciIsImRheSIsInNsaWNlIiwiZGF5SWNvbiIsImRheUF2Z1RlbXAiLCJ0ZW1wUmFuZ2UiLCJyYWluQ2hhbmNlIiwicmFpbl9jaGFuY2UiLCJzbm93X2NoYW5jZSIsInNub3dDaGFuY2UiLCJ1cmwiLCJvcHRpb25zIiwibW9kZSIsInJlc3BvbnNlIiwiZmV0Y2giLCJvayIsIkVycm9yIiwianNvbiIsImdldERhdGFGcm9tQVBJUmVzcG9uc2UiLCJlcnJvciIsImZvcmVjYXN0IiwiZm9yZWNhc3RkYXkiLCJmb3JFYWNoIiwib2JqIiwidGVtcF9jIiwiYXZndGVtcF9jIiwidGVtcF9mIiwiYXZndGVtcF9mIiwibWludGVtcF9jIiwibWludGVtcF9mIiwibWF4dGVtcF9jIiwibWF4dGVtcF9mIiwiZGFpbHlfY2hhbmNlX29mX3JhaW4iLCJkYWlseV9jaGFuY2Vfb2Zfc25vdyIsImNvbmRpdGlvbiIsInB1c2giLCJjdXJyZW50IiwidG9kYXkiLCJ0b21vcnJvdyIsImRheV9hZnRlcl90b21vcnJvdyIsIm5hbWUiXSwic291cmNlUm9vdCI6IiJ9