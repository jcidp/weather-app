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
  const renderPage = () => {
    const location = document.createElement("div");
    const label = document.createElement("label");
    label.setAttribute("for", "location");
    label.textContent = "Location";
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
  };
  const handleSearch = async () => {
    const location = document.getElementById("location").value;
    console.log(location);
    if (!location) return;
    const btn = document.getElementById("search");
    btn.setAttribute("disabled", true);
    const weatherData = await (0,_api__WEBPACK_IMPORTED_MODULE_0__["default"])(location);
    btn.removeAttribute("disabled");
    document.getElementById("location").value = "";
    console.log(weatherData);
    removeChildren(document.querySelector(".results-container"));
    renderWeatherData(weatherData);
  };
  const toggleUnits = e => {
    units = e.target.checked ? "c" : "f";
  };
  const removeChildren = parent => {
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
    nowTemp.textContent = "Currently: " + data.now[`temp_${units}`] + "°";
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
      dayAvgTemp.textContent = "Avg: " + data[dict[i]][`temp_${units}`] + "°";
      dayContainer.appendChild(dayAvgTemp);
      const tempRange = document.createElement("p");
      tempRange.textContent = `${data[dict[i]][`mintemp_${units}`]}° - ${data[dict[i]][`maxtemp_${units}`]}°`;
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
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDYkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0MsZUFBZTtXQUNmLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7OztBQ0FxQjtBQUNxQjtBQUUxQ0Msb0RBQWEsQ0FBQ0UsVUFBVSxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvRE9NLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvYXBpLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBnZXRGb3JlY2FzdFdlYXRoZXJEYXRhIGZyb20gXCIuL2FwaVwiO1xuXG5jb25zdCBkb21Db250cm9sbGVyID0gKCgpID0+IHtcbiAgbGV0IHVuaXRzID0gXCJjXCI7XG4gIGNvbnN0IHJlbmRlclBhZ2UgPSAoKSA9PiB7XG4gICAgY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIGxhYmVsLnNldEF0dHJpYnV0ZShcImZvclwiLCBcImxvY2F0aW9uXCIpO1xuICAgIGxhYmVsLnRleHRDb250ZW50ID0gXCJMb2NhdGlvblwiO1xuICAgIGxvY2F0aW9uLmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwibG9jYXRpb25cIik7XG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJsb2NhdGlvblwiKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJwbGFjZWhvbGRlclwiLCBcIk5ldyBZb3JrXCIpO1xuICAgIGxvY2F0aW9uLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ0bi50ZXh0Q29udGVudCA9IFwiU2VhcmNoXCI7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIFwic2VhcmNoXCIpO1xuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlU2VhcmNoKTtcbiAgICBsb2NhdGlvbi5hcHBlbmRDaGlsZChidG4pO1xuICAgIGNvbnN0IHRvZ2dsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICB0b2dnbGUuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImNoZWNrYm94XCIpO1xuICAgIHRvZ2dsZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInVuaXRzXCIpO1xuICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlVW5pdHMpO1xuICAgIGxvY2F0aW9uLmFwcGVuZENoaWxkKHRvZ2dsZSk7XG4gICAgbG9jYXRpb24uY2xhc3NMaXN0LmFkZChcImxvY2F0aW9uLWlucHV0XCIpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFwcGVuZENoaWxkKGxvY2F0aW9uKTtcblxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwicmVzdWx0cy1jb250YWluZXJcIik7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTZWFyY2ggPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvY2F0aW9uXCIpLnZhbHVlO1xuICAgIGNvbnNvbGUubG9nKGxvY2F0aW9uKTtcbiAgICBpZiAoIWxvY2F0aW9uKSByZXR1cm47XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hcIik7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIHRydWUpO1xuICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgZ2V0Rm9yZWNhc3RXZWF0aGVyRGF0YShsb2NhdGlvbik7XG4gICAgYnRuLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9jYXRpb25cIikudmFsdWUgPSBcIlwiO1xuICAgIGNvbnNvbGUubG9nKHdlYXRoZXJEYXRhKTtcbiAgICByZW1vdmVDaGlsZHJlbihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc3VsdHMtY29udGFpbmVyXCIpKTtcbiAgICByZW5kZXJXZWF0aGVyRGF0YSh3ZWF0aGVyRGF0YSk7XG4gIH07XG5cbiAgY29uc3QgdG9nZ2xlVW5pdHMgPSAoZSkgPT4ge1xuICAgIHVuaXRzID0gZS50YXJnZXQuY2hlY2tlZCA/IFwiY1wiIDogXCJmXCI7XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlQ2hpbGRyZW4gPSAocGFyZW50KSA9PiB7XG4gICAgbGV0IGNoaWxkID0gcGFyZW50LmZpcnN0RWxlbWVudENoaWxkO1xuICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICAgIGNoaWxkID0gcGFyZW50LmZpcnN0RWxlbWVudENoaWxkO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZW5kZXJXZWF0aGVyRGF0YSA9IChkYXRhKSA9PiB7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXN1bHRzLWNvbnRhaW5lclwiKTtcbiAgICBjb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGxvY2F0aW9uLnRleHRDb250ZW50ID0gYFNob3dpbmcgcmVzdWx0cyBmb3IgbG9jYXRpb246ICR7ZGF0YS5sb2NhdGlvbn1gO1xuICAgIGxvY2F0aW9uLmNsYXNzTGlzdC5hZGQoXCJyZXN1bHRzLWxvY2F0aW9uXCIpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChsb2NhdGlvbik7XG5cbiAgICBjb25zdCBub3dDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIG5vd0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwid2VhdGhlci1jb250YWluZXJcIik7XG4gICAgbm93Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJub3dcIik7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIk5vd1wiO1xuICAgIG5vd0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgY29uc3Qgbm93SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgbm93SWNvbi5zcmMgPSBgaHR0cHM6JHtkYXRhLm5vdy5pY29ufWA7XG4gICAgbm93Q29udGFpbmVyLmFwcGVuZENoaWxkKG5vd0ljb24pO1xuICAgIGNvbnN0IG5vd1RlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBub3dUZW1wLnRleHRDb250ZW50ID0gXCJDdXJyZW50bHk6IFwiICsgZGF0YS5ub3dbYHRlbXBfJHt1bml0c31gXSArIFwiwrBcIjtcbiAgICBub3dDb250YWluZXIuYXBwZW5kQ2hpbGQobm93VGVtcCk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5vd0NvbnRhaW5lcik7XG5cbiAgICBjb25zdCBkaWN0ID0geyAwOiBcInRvZGF5XCIsIDE6IFwidG9tb3Jyb3dcIiwgMjogXCJkYXlfYWZ0ZXJfdG9tb3Jyb3dcIiB9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgIGNvbnN0IGRheUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBkYXlDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIndlYXRoZXItY29udGFpbmVyXCIpO1xuICAgICAgZGF5Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoZGljdFtpXSk7XG4gICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICAgIGNvbnN0IGRheSA9XG4gICAgICAgIGRpY3RbaV0gPT09IFwiZGF5X2FmdGVyX3RvbW9ycm93XCIgPyBcImRheSBhZnRlciB0b21vcnJvd1wiIDogZGljdFtpXTtcbiAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gZGF5WzBdLnRvVXBwZXJDYXNlKCkgKyBkYXkuc2xpY2UoMSk7XG4gICAgICBkYXlDb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgICAgY29uc3QgZGF5SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICBkYXlJY29uLnNyYyA9IGBodHRwczoke2RhdGFbZGljdFtpXV0uaWNvbn1gO1xuICAgICAgZGF5Q29udGFpbmVyLmFwcGVuZENoaWxkKGRheUljb24pO1xuICAgICAgY29uc3QgZGF5QXZnVGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgZGF5QXZnVGVtcC50ZXh0Q29udGVudCA9IFwiQXZnOiBcIiArIGRhdGFbZGljdFtpXV1bYHRlbXBfJHt1bml0c31gXSArIFwiwrBcIjtcbiAgICAgIGRheUNvbnRhaW5lci5hcHBlbmRDaGlsZChkYXlBdmdUZW1wKTtcbiAgICAgIGNvbnN0IHRlbXBSYW5nZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgdGVtcFJhbmdlLnRleHRDb250ZW50ID0gYCR7ZGF0YVtkaWN0W2ldXVtgbWludGVtcF8ke3VuaXRzfWBdfcKwIC0gJHtcbiAgICAgICAgZGF0YVtkaWN0W2ldXVtgbWF4dGVtcF8ke3VuaXRzfWBdXG4gICAgICB9wrBgO1xuICAgICAgZGF5Q29udGFpbmVyLmFwcGVuZENoaWxkKHRlbXBSYW5nZSk7XG4gICAgICBjb25zdCByYWluQ2hhbmNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICByYWluQ2hhbmNlLnRleHRDb250ZW50ID0gYFJhaW4gY2hhbmNlOiAke2RhdGFbZGljdFtpXV0ucmFpbl9jaGFuY2V9JWA7XG4gICAgICBkYXlDb250YWluZXIuYXBwZW5kQ2hpbGQocmFpbkNoYW5jZSk7XG4gICAgICBpZiAoZGF0YVtkaWN0W2ldXS5zbm93X2NoYW5jZSkge1xuICAgICAgICBjb25zdCBzbm93Q2hhbmNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIHNub3dDaGFuY2UudGV4dENvbnRlbnQgPSBgUmFpbiBjaGFuY2U6ICR7ZGF0YVtkaWN0W2ldXS5zbm93X2NoYW5jZX0lYDtcbiAgICAgICAgZGF5Q29udGFpbmVyLmFwcGVuZENoaWxkKHNub3dDaGFuY2UpO1xuICAgICAgfVxuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRheUNvbnRhaW5lcik7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcmVuZGVyUGFnZSxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRvbUNvbnRyb2xsZXI7XG4iLCJhc3luYyBmdW5jdGlvbiBnZXRGb3JlY2FzdFdlYXRoZXJEYXRhKGxvY2F0aW9uKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgdXJsID0gYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PWU5OTBlODIwYjJjNjRlZWY4MGExNTU0NTAyMzI1MDgmcT0ke2xvY2F0aW9ufSZkYXlzPTNgO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBtb2RlOiBcImNvcnNcIixcbiAgICB9O1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gY29ubmVjdCB0byBBUElcIik7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICByZXR1cm4gZ2V0RGF0YUZyb21BUElSZXNwb25zZShkYXRhKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGF0YUZyb21BUElSZXNwb25zZShkYXRhKSB7XG4gIGNvbnN0IGZvcmVjYXN0ID0gW107XG4gIGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXkuZm9yRWFjaCgoZGF5KSA9PiB7XG4gICAgY29uc3Qgb2JqID0ge307XG4gICAgb2JqLnRlbXBfYyA9IGRheS5kYXkuYXZndGVtcF9jO1xuICAgIG9iai50ZW1wX2YgPSBkYXkuZGF5LmF2Z3RlbXBfZjtcbiAgICBvYmoubWludGVtcF9jID0gZGF5LmRheS5taW50ZW1wX2M7XG4gICAgb2JqLm1pbnRlbXBfZiA9IGRheS5kYXkubWludGVtcF9mO1xuICAgIG9iai5tYXh0ZW1wX2MgPSBkYXkuZGF5Lm1heHRlbXBfYztcbiAgICBvYmoubWF4dGVtcF9mID0gZGF5LmRheS5tYXh0ZW1wX2Y7XG4gICAgb2JqLnJhaW5fY2hhbmNlID0gZGF5LmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbjtcbiAgICBvYmouc25vd19jaGFuY2UgPSBkYXkuZGF5LmRhaWx5X2NoYW5jZV9vZl9zbm93O1xuICAgIG9iai5pY29uID0gZGF5LmRheS5jb25kaXRpb24uaWNvbjtcbiAgICBmb3JlY2FzdC5wdXNoKG9iaik7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIG5vdzoge1xuICAgICAgdGVtcF9jOiBkYXRhLmN1cnJlbnQudGVtcF9jLFxuICAgICAgdGVtcF9mOiBkYXRhLmN1cnJlbnQudGVtcF9mLFxuICAgICAgaWNvbjogZGF0YS5jdXJyZW50LmNvbmRpdGlvbi5pY29uLFxuICAgIH0sXG4gICAgdG9kYXk6IGZvcmVjYXN0WzBdLFxuICAgIHRvbW9ycm93OiBmb3JlY2FzdFsxXSxcbiAgICBkYXlfYWZ0ZXJfdG9tb3Jyb3c6IGZvcmVjYXN0WzJdLFxuICAgIGxvY2F0aW9uOiBkYXRhLmxvY2F0aW9uLm5hbWUsXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldEZvcmVjYXN0V2VhdGhlckRhdGE7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIlwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJcIixcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xuaW1wb3J0IGRvbUNvbnRyb2xsZXIgZnJvbSBcIi4vbW9kdWxlcy9ET01cIjtcblxuZG9tQ29udHJvbGxlci5yZW5kZXJQYWdlKCk7XG4iXSwibmFtZXMiOlsiZ2V0Rm9yZWNhc3RXZWF0aGVyRGF0YSIsImRvbUNvbnRyb2xsZXIiLCJ1bml0cyIsInJlbmRlclBhZ2UiLCJsb2NhdGlvbiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImxhYmVsIiwic2V0QXR0cmlidXRlIiwidGV4dENvbnRlbnQiLCJhcHBlbmRDaGlsZCIsImlucHV0IiwiYnRuIiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZVNlYXJjaCIsInRvZ2dsZSIsInRvZ2dsZVVuaXRzIiwiY2xhc3NMaXN0IiwiYWRkIiwicXVlcnlTZWxlY3RvciIsImNvbnRhaW5lciIsImdldEVsZW1lbnRCeUlkIiwidmFsdWUiLCJjb25zb2xlIiwibG9nIiwid2VhdGhlckRhdGEiLCJyZW1vdmVBdHRyaWJ1dGUiLCJyZW1vdmVDaGlsZHJlbiIsInJlbmRlcldlYXRoZXJEYXRhIiwiZSIsInRhcmdldCIsImNoZWNrZWQiLCJwYXJlbnQiLCJjaGlsZCIsImZpcnN0RWxlbWVudENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJkYXRhIiwibm93Q29udGFpbmVyIiwidGl0bGUiLCJub3dJY29uIiwic3JjIiwibm93IiwiaWNvbiIsIm5vd1RlbXAiLCJkaWN0IiwiaSIsImRheUNvbnRhaW5lciIsImRheSIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJkYXlJY29uIiwiZGF5QXZnVGVtcCIsInRlbXBSYW5nZSIsInJhaW5DaGFuY2UiLCJyYWluX2NoYW5jZSIsInNub3dfY2hhbmNlIiwic25vd0NoYW5jZSIsInVybCIsIm9wdGlvbnMiLCJtb2RlIiwicmVzcG9uc2UiLCJmZXRjaCIsIm9rIiwiRXJyb3IiLCJqc29uIiwiZ2V0RGF0YUZyb21BUElSZXNwb25zZSIsImVycm9yIiwiZm9yZWNhc3QiLCJmb3JlY2FzdGRheSIsImZvckVhY2giLCJvYmoiLCJ0ZW1wX2MiLCJhdmd0ZW1wX2MiLCJ0ZW1wX2YiLCJhdmd0ZW1wX2YiLCJtaW50ZW1wX2MiLCJtaW50ZW1wX2YiLCJtYXh0ZW1wX2MiLCJtYXh0ZW1wX2YiLCJkYWlseV9jaGFuY2Vfb2ZfcmFpbiIsImRhaWx5X2NoYW5jZV9vZl9zbm93IiwiY29uZGl0aW9uIiwicHVzaCIsImN1cnJlbnQiLCJ0b2RheSIsInRvbW9ycm93IiwiZGF5X2FmdGVyX3RvbW9ycm93IiwibmFtZSJdLCJzb3VyY2VSb290IjoiIn0=