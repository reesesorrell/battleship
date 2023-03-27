/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/factories/gameboardFactory.js":
/*!*******************************************!*\
  !*** ./src/factories/gameboardFactory.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const gameBoard = () => {
  const boardSize = 10;
  var boardArray = [];
  for (let i = 0; i < boardSize; i++) {
    var emptyRow = [];
    for (let i = 0; i < boardSize; i++) {
      emptyRow.push(null);
    }
    boardArray.push(emptyRow);
  }
  var shipList = [];
  const placeShip = function (shipObject, startingCoor) {
    let yDirection = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var shipLength = shipObject.getLength();
    var startingX = startingCoor[0];
    var startingY = startingCoor[1];
    if (yDirection) {
      for (let i = 0; i < shipLength; i++) {
        boardArray[startingY + i][startingX] = [shipObject, null];
      }
    } else {
      for (let i = 0; i < shipLength; i++) {
        boardArray[startingY][startingX + i] = [shipObject, null];
      }
    }
    shipList.push(shipObject);
  };
  const receiveAttack = coor => {
    var xCoor = coor[0];
    var yCoor = coor[1];
    var currentSpot = boardArray[yCoor][xCoor];
    if (currentSpot == 'miss') {
      return 'double miss';
    } else if (currentSpot) {
      if (!currentSpot[1]) {
        if (_trackHit(xCoor, yCoor)) {
          return 'sunk';
        }
        return 'hit';
      } else {
        return 'double hit';
      }
    } else {
      _trackMiss(xCoor, yCoor);
      return 'miss';
    }
  };
  const areAllSunk = () => {
    for (let i = 0; i < shipList.length; i++) {
      if (!shipList[i].isSunk()) {
        return false;
      }
    }
    return true;
  };
  const _trackHit = (xCoor, yCoor) => {
    const shipObject = boardArray[yCoor][xCoor][0];
    shipObject.hit();
    boardArray[yCoor][xCoor][1] = 'hit';
    if (shipObject.isSunk()) {
      return true;
    }
  };
  const _trackMiss = (xCoor, yCoor) => {
    boardArray[yCoor][xCoor] = 'miss';
  };
  return {
    placeShip,
    receiveAttack,
    areAllSunk
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameBoard);

/***/ }),

/***/ "./src/factories/playerFactory.js":
/*!****************************************!*\
  !*** ./src/factories/playerFactory.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const player = (name, playerGameboard) => {
  const getName = () => {
    return name;
  };
  const attack = (gameboard, coors) => {
    return gameboard.receiveAttack(coors);
  };
  return {
    getName,
    attack,
    playerGameboard
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (player);

/***/ }),

/***/ "./src/factories/shipFactory.js":
/*!**************************************!*\
  !*** ./src/factories/shipFactory.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const ship = length => {
  var hits = 0;
  const getLength = () => {
    return length;
  };
  const getHits = () => {
    return hits;
  };
  const hit = () => {
    hits += 1;
  };
  const isSunk = () => {
    return hits >= length;
  };
  return {
    getLength,
    getHits,
    hit,
    isSunk
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ship);

/***/ }),

/***/ "./src/helpers/computerPlayer.js":
/*!***************************************!*\
  !*** ./src/helpers/computerPlayer.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _factories_playerFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factories/playerFactory */ "./src/factories/playerFactory.js");

const computerPlayer = (newName, playerGameboard) => {
  const {
    getName,
    attack
  } = (0,_factories_playerFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(newName, playerGameboard);
  var unAttackedArray = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      unAttackedArray.push([i, j]);
    }
  }
  const makeRandomAttack = gameboard => {
    let index = Math.floor(Math.random() * unAttackedArray.length);
    let coor = unAttackedArray[index];
    unAttackedArray.splice(index, 1);
    return [attack(gameboard, coor), coor];
  };
  return {
    getName,
    makeRandomAttack,
    playerGameboard
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (computerPlayer);

/***/ }),

/***/ "./src/helpers/domBoardBuilder.js":
/*!****************************************!*\
  !*** ./src/helpers/domBoardBuilder.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeBoard": () => (/* binding */ makeBoard)
/* harmony export */ });
/* harmony import */ var display_adder_reese__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! display-adder-reese */ "./node_modules/display-adder-reese/display-adder.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style.css */ "./src/style.css");


const makeBoard = (boardParent, ID, onclickFunction) => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const space = display_adder_reese__WEBPACK_IMPORTED_MODULE_0__["default"].createDiv(boardParent, '', '' + ID + i + j, 'board-space');
      if (ID == 'computer') {
        space.onclick = onclickFunction;
      }
    }
  }
};


/***/ }),

/***/ "./src/helpers/gameloop.js":
/*!*********************************!*\
  !*** ./src/helpers/gameloop.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _factories_shipFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factories/shipFactory */ "./src/factories/shipFactory.js");
/* harmony import */ var _factories_playerFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../factories/playerFactory */ "./src/factories/playerFactory.js");
/* harmony import */ var _factories_gameboardFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../factories/gameboardFactory */ "./src/factories/gameboardFactory.js");
/* harmony import */ var _computerPlayer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./computerPlayer */ "./src/helpers/computerPlayer.js");




const game = playerName => {
  var playerShipOne;
  var playerShipTwo;
  var computerShipOne;
  var computerShipTwo;
  var computerGameboard;
  var playerGameboard;
  var realPlayer;
  var aiPlayer;
  var isPlayerTurn = true;
  const setUpTestGame = () => {
    computerShipOne = (0,_factories_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(5);
    computerShipTwo = (0,_factories_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(4);
    computerGameboard = (0,_factories_gameboardFactory__WEBPACK_IMPORTED_MODULE_2__["default"])();
    computerGameboard.placeShip(computerShipOne, [0, 0]);
    computerGameboard.placeShip(computerShipTwo, [5, 0], true);
    aiPlayer = (0,_computerPlayer__WEBPACK_IMPORTED_MODULE_3__["default"])('Computer', computerGameboard);
    playerShipOne = (0,_factories_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(5);
    playerShipTwo = (0,_factories_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(4);
    playerGameboard = (0,_factories_gameboardFactory__WEBPACK_IMPORTED_MODULE_2__["default"])();
    playerGameboard.placeShip(playerShipOne, [0, 9]);
    playerGameboard.placeShip(playerShipTwo, [5, 6], true);
    realPlayer = (0,_factories_playerFactory__WEBPACK_IMPORTED_MODULE_1__["default"])(playerName, playerGameboard);
  };
  const takeTurn = coors => {
    if (isPlayerTurn) {
      isPlayerTurn = false;
      return realPlayer.attack(computerGameboard, coors);
    } else {
      isPlayerTurn = true;
      return aiPlayer.makeRandomAttack(playerGameboard);
    }
  };
  const _assignShips = shipArray => {
    for (let i = 0; i < 5; i++) {
      shipArray[i] = (0,_factories_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(i + 1);
    }
  };
  const checkPlayerWin = () => {
    if (computerGameboard.areAllSunk()) {
      return true;
    }
  };
  const checkComputerWin = () => {
    if (playerGameboard.areAllSunk()) {
      return true;
    }
  };
  return {
    setUpTestGame,
    takeTurn,
    checkPlayerWin,
    checkComputerWin
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (game);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.board-space {\n    background-color: red;\n}\n\n.board-holder {\n    display: grid;\n    grid-template-rows: repeat(10, 40px);\n    grid-template-columns: repeat(10, 40px);\n    gap: 1px;\n}\n\n#content {\n    display: flex;\n    margin-top: 70px;\n    justify-content: space-around;\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":";AACA;IACI,qBAAqB;AACzB;;AAEA;IACI,aAAa;IACb,oCAAoC;IACpC,uCAAuC;IACvC,QAAQ;AACZ;;AAEA;IACI,aAAa;IACb,gBAAgB;IAChB,6BAA6B;AACjC","sourcesContent":["\n.board-space {\n    background-color: red;\n}\n\n.board-holder {\n    display: grid;\n    grid-template-rows: repeat(10, 40px);\n    grid-template-columns: repeat(10, 40px);\n    gap: 1px;\n}\n\n#content {\n    display: flex;\n    margin-top: 70px;\n    justify-content: space-around;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



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
/***/ ((module) => {



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

/***/ "./node_modules/display-adder-reese/display-adder.js":
/*!***********************************************************!*\
  !*** ./node_modules/display-adder-reese/display-adder.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

const displayAdder = (function() {
    const createDiv = (parentElement, textContent='', divId='', divClass='') => {
        return _createElement(parentElement, 'div', textContent, divId, divClass);
    }

    const createImage = (parentElement, imageSource, imageId='', imageClass='') => {
        var newImage = new Image();
        newImage.src = imageSource;
        _addClasses(newImage, imageClass);
        newImage.id = imageId;
        parentElement.appendChild(newImage);
        return newImage;
    }

    const createButton = (parentElement, onclickFunction, textContent='', buttonId = '', buttonClass='') => {
        const newButton = _createElement(parentElement, 'button', textContent, buttonId, buttonClass);
        newButton.onclick = onclickFunction;
        return newButton;
    }

    const createForm = (parentElement, textContent='', formId='', formClass='') => {
        return _createElement(parentElement, 'form', textContent, formId, formClass);
    }

    const createInput = (parentElement, inputType, inputName, textContent='', inputId='', inputClass='') => {
        const newInput = _createElement(parentElement, 'input', textContent, inputId, inputClass);
        newInput.type = inputType;
        newInput.name = inputName;
        return newInput;
    }

    const _createElement = (parentElement, elementType, textContent='', elementId='', elementClass='') => {
        const newElement = document.createElement(elementType);
        _addClasses(newElement, elementClass);
        newElement.id = elementId;
        newElement.textContent = textContent;
        parentElement.appendChild(newElement)
        return newElement;
    }

    const _addClasses = (element, classes) => {
        if (classes) {
            const classList = classes.split(',');
            classList.forEach(oneClass => {
                element.classList.add(oneClass);
            });
        }
    }

    return {createDiv, createImage, createButton, createForm, createInput};
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (displayAdder);

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



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
/***/ ((module) => {



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
/***/ ((module) => {



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
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



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
/***/ ((module) => {



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
/***/ ((module) => {



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
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var display_adder_reese__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! display-adder-reese */ "./node_modules/display-adder-reese/display-adder.js");
/* harmony import */ var _helpers_gameloop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/gameloop */ "./src/helpers/gameloop.js");
/* harmony import */ var _helpers_domBoardBuilder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/domBoardBuilder */ "./src/helpers/domBoardBuilder.js");




const realGame = (0,_helpers_gameloop__WEBPACK_IMPORTED_MODULE_2__["default"])('Reese');
realGame.setUpTestGame();
function runGame() {
  let xCoor = +this.id.slice(-2, -1);
  let yCoor = +this.id.slice(-1);
  let hitState = realGame.takeTurn([xCoor, yCoor]);
  if (hitState == 'hit') {
    this.textContent = 'X';
    this.onclick = '';
  } else if (hitState == 'miss') {
    this.textContent = 'O';
    this.onclick = '';
  } else if (hitState == 'sunk') {
    this.textContent = '!';
    this.onclick = '';
  }
  if (realGame.checkPlayerWin()) {
    console.log('gg');
  }
  setTimeout(() => {
    makeComputerMove();
  }, 200);
}
function makeComputerMove() {
  let computerHitArray = realGame.takeTurn();
  let computerHitState = computerHitArray[0];
  let computerAttackCoors = computerHitArray[1];
  if (computerHitState == 'hit') {
    let space = document.getElementById('player' + computerAttackCoors[0] + computerAttackCoors[1]);
    space.textContent = 'X';
  } else if (computerHitState == 'miss') {
    let space = document.getElementById('player' + computerAttackCoors[0] + computerAttackCoors[1]);
    space.textContent = 'O';
  } else if (computerHitState == 'sunk') {
    let space = document.getElementById('player' + computerAttackCoors[0] + computerAttackCoors[1]);
    space.textContent = '!';
  }
  if (realGame.checkComputerWin()) {
    console.log('just luck');
  }
}
const content = display_adder_reese__WEBPACK_IMPORTED_MODULE_1__["default"].createDiv(document.body, '', 'content');
const boardHolder = display_adder_reese__WEBPACK_IMPORTED_MODULE_1__["default"].createDiv(content, '', 'player-board-holder', 'board-holder');
(0,_helpers_domBoardBuilder__WEBPACK_IMPORTED_MODULE_3__.makeBoard)(boardHolder, 'player', runGame);
const computerBoardHolder = display_adder_reese__WEBPACK_IMPORTED_MODULE_1__["default"].createDiv(content, '', 'computer-board-holder', 'board-holder');
(0,_helpers_domBoardBuilder__WEBPACK_IMPORTED_MODULE_3__.makeBoard)(computerBoardHolder, 'computer', runGame);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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T0FBTyxDQUFDQyxHQUFHLENBQUMsV0FBVyxDQUFDO0VBQzVCO0FBQ0o7QUFFQSxNQUFNUSxPQUFPLEdBQUd2QyxxRUFBc0IsQ0FBQ3FDLFFBQVEsQ0FBQ0csSUFBSSxFQUFFLEVBQUUsRUFBRSxTQUFTLENBQUM7QUFFcEUsTUFBTUMsV0FBVyxHQUFHekMscUVBQXNCLENBQUN1QyxPQUFPLEVBQUUsRUFBRSxFQUFFLHFCQUFxQixFQUFFLGNBQWMsQ0FBQztBQUM5RnRDLG1FQUFTLENBQUN3QyxXQUFXLEVBQUUsUUFBUSxFQUFFaEIsT0FBTyxDQUFDO0FBRXpDLE1BQU1pQixtQkFBbUIsR0FBRzFDLHFFQUFzQixDQUFDdUMsT0FBTyxFQUFFLEVBQUUsRUFBRSx1QkFBdUIsRUFBRSxjQUFjLENBQUM7QUFDeEd0QyxtRUFBUyxDQUFDeUMsbUJBQW1CLEVBQUUsVUFBVSxFQUFFakIsT0FBTyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9nYW1lYm9hcmRGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL3BsYXllckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvc2hpcEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9oZWxwZXJzL2NvbXB1dGVyUGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaGVscGVycy9kb21Cb2FyZEJ1aWxkZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9oZWxwZXJzL2dhbWVsb29wLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Rpc3BsYXktYWRkZXItcmVlc2UvZGlzcGxheS1hZGRlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBnYW1lQm9hcmQgPSAoKSA9PiB7XG5cbiAgICBjb25zdCBib2FyZFNpemUgPSAxMDtcblxuICAgIHZhciBib2FyZEFycmF5ID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkU2l6ZTsgaSsrKSB7XG4gICAgICAgIHZhciBlbXB0eVJvdyA9IFtdXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmRTaXplOyBpKyspIHtcbiAgICAgICAgICAgIGVtcHR5Um93LnB1c2gobnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgYm9hcmRBcnJheS5wdXNoKGVtcHR5Um93KTtcbiAgICB9XG5cbiAgICB2YXIgc2hpcExpc3QgPSBbXVxuXG4gICAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXBPYmplY3QsIHN0YXJ0aW5nQ29vciwgeURpcmVjdGlvbiA9IGZhbHNlKSA9PiB7XG4gICAgICAgIHZhciBzaGlwTGVuZ3RoID0gc2hpcE9iamVjdC5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIHN0YXJ0aW5nWCA9IHN0YXJ0aW5nQ29vclswXTtcbiAgICAgICAgdmFyIHN0YXJ0aW5nWSA9IHN0YXJ0aW5nQ29vclsxXTtcbiAgICAgICAgaWYgKHlEaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYm9hcmRBcnJheVtzdGFydGluZ1kraV1bc3RhcnRpbmdYXSA9IFtzaGlwT2JqZWN0LCBudWxsXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYm9hcmRBcnJheVtzdGFydGluZ1ldW3N0YXJ0aW5nWCtpXSA9IFtzaGlwT2JqZWN0LCBudWxsXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzaGlwTGlzdC5wdXNoKHNoaXBPYmplY3QpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcikgPT4ge1xuICAgICAgICB2YXIgeENvb3IgPSBjb29yWzBdO1xuICAgICAgICB2YXIgeUNvb3IgPSBjb29yWzFdO1xuICAgICAgICB2YXIgY3VycmVudFNwb3QgPSBib2FyZEFycmF5W3lDb29yXVt4Q29vcl07XG4gICAgICAgIGlmKGN1cnJlbnRTcG90ID09ICdtaXNzJykge1xuICAgICAgICAgICAgcmV0dXJuICdkb3VibGUgbWlzcyc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY3VycmVudFNwb3QpIHtcbiAgICAgICAgICAgIGlmICghY3VycmVudFNwb3RbMV0pIHtcbiAgICAgICAgICAgICAgICBpZihfdHJhY2tIaXQoeENvb3IsIHlDb29yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3N1bmsnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gJ2hpdCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2RvdWJsZSBoaXQnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgX3RyYWNrTWlzcyh4Q29vciwgeUNvb3IpO1xuICAgICAgICAgICAgcmV0dXJuICdtaXNzJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGFyZUFsbFN1bmsgPSAoKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgaWYgKCFzaGlwTGlzdFtpXS5pc1N1bmsoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBfdHJhY2tIaXQgPSAoeENvb3IsIHlDb29yKSA9PiB7XG4gICAgICAgIGNvbnN0IHNoaXBPYmplY3QgPSBib2FyZEFycmF5W3lDb29yXVt4Q29vcl1bMF07XG4gICAgICAgIHNoaXBPYmplY3QuaGl0KCk7XG4gICAgICAgIGJvYXJkQXJyYXlbeUNvb3JdW3hDb29yXVsxXSA9ICdoaXQnO1xuICAgICAgICBpZiAoc2hpcE9iamVjdC5pc1N1bmsoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBfdHJhY2tNaXNzID0gKHhDb29yLCB5Q29vcikgPT4ge1xuICAgICAgICBib2FyZEFycmF5W3lDb29yXVt4Q29vcl0gPSAnbWlzcyc7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB7cGxhY2VTaGlwLCByZWNlaXZlQXR0YWNrLCBhcmVBbGxTdW5rfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2FtZUJvYXJkOyIsIlxuY29uc3QgcGxheWVyID0gKG5hbWUsIHBsYXllckdhbWVib2FyZCkgPT4ge1xuICAgIGNvbnN0IGdldE5hbWUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgIH1cblxuICAgIGNvbnN0IGF0dGFjayA9IChnYW1lYm9hcmQsIGNvb3JzKSA9PiB7XG4gICAgICAgIHJldHVybiBnYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhjb29ycyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtnZXROYW1lLCBhdHRhY2ssIHBsYXllckdhbWVib2FyZH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcGxheWVyOyIsImNvbnN0IHNoaXAgPSAobGVuZ3RoKSA9PiB7XG4gICAgdmFyIGhpdHMgPSAwO1xuXG4gICAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gbGVuZ3RoO1xuICAgIH1cbiAgICBjb25zdCBnZXRIaXRzID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gaGl0cztcbiAgICB9XG5cbiAgICBjb25zdCBoaXQgPSAoKSA9PiB7XG4gICAgICAgIGhpdHMgKz0gMTtcbiAgICB9XG5cbiAgICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiAoaGl0cyA+PSBsZW5ndGgpO1xuICAgIH1cblxuICAgIHJldHVybiB7Z2V0TGVuZ3RoLCBnZXRIaXRzLCBoaXQsIGlzU3Vua307XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNoaXA7IiwiaW1wb3J0IHBsYXllciBmcm9tIFwiLi4vZmFjdG9yaWVzL3BsYXllckZhY3RvcnlcIjtcblxuY29uc3QgY29tcHV0ZXJQbGF5ZXIgPSAobmV3TmFtZSwgcGxheWVyR2FtZWJvYXJkKSA9PiB7XG4gICAgY29uc3Qge2dldE5hbWUsIGF0dGFja30gPSBwbGF5ZXIobmV3TmFtZSwgcGxheWVyR2FtZWJvYXJkKTtcblxuICAgIHZhciB1bkF0dGFja2VkQXJyYXkgPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgICAgIHVuQXR0YWNrZWRBcnJheS5wdXNoKFtpLCBqXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgbWFrZVJhbmRvbUF0dGFjayA9IChnYW1lYm9hcmQpID0+IHtcblxuICAgICAgICBsZXQgaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqdW5BdHRhY2tlZEFycmF5Lmxlbmd0aClcbiAgICAgICAgbGV0IGNvb3IgPSB1bkF0dGFja2VkQXJyYXlbaW5kZXhdO1xuICAgICAgICB1bkF0dGFja2VkQXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgICAgICByZXR1cm4gW2F0dGFjayhnYW1lYm9hcmQsIGNvb3IpLCBjb29yXTtcbiAgICB9XG5cbiAgICByZXR1cm4ge2dldE5hbWUsIG1ha2VSYW5kb21BdHRhY2ssIHBsYXllckdhbWVib2FyZH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29tcHV0ZXJQbGF5ZXIiLCJpbXBvcnQgZGlzcGxheUFkZGVyIGZyb20gXCJkaXNwbGF5LWFkZGVyLXJlZXNlXCJcbmltcG9ydCBcIi4uL3N0eWxlLmNzc1wiXG5cbmNvbnN0IG1ha2VCb2FyZCA9IChib2FyZFBhcmVudCwgSUQsIG9uY2xpY2tGdW5jdGlvbikgPT4ge1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICAgICAgY29uc3Qgc3BhY2UgPSBkaXNwbGF5QWRkZXIuY3JlYXRlRGl2KGJvYXJkUGFyZW50LCAnJywgJycgKyBJRCArIGkgKyBqLCAnYm9hcmQtc3BhY2UnKTtcbiAgICAgICAgICAgIGlmIChJRCA9PSAnY29tcHV0ZXInKSB7XG4gICAgICAgICAgICAgICAgc3BhY2Uub25jbGljayA9IG9uY2xpY2tGdW5jdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IHttYWtlQm9hcmR9IiwiaW1wb3J0IHNoaXAgZnJvbSBcIi4uL2ZhY3Rvcmllcy9zaGlwRmFjdG9yeVwiO1xuaW1wb3J0IHBsYXllciBmcm9tIFwiLi4vZmFjdG9yaWVzL3BsYXllckZhY3RvcnlcIjtcbmltcG9ydCBnYW1lYm9hcmQgZnJvbSBcIi4uL2ZhY3Rvcmllcy9nYW1lYm9hcmRGYWN0b3J5XCI7XG5pbXBvcnQgY29tcHV0ZXJQbGF5ZXIgZnJvbSBcIi4vY29tcHV0ZXJQbGF5ZXJcIjtcblxuY29uc3QgZ2FtZSA9IChwbGF5ZXJOYW1lKSA9PiB7XG4gICAgdmFyIHBsYXllclNoaXBPbmU7XG4gICAgdmFyIHBsYXllclNoaXBUd287XG4gICAgdmFyIGNvbXB1dGVyU2hpcE9uZTtcbiAgICB2YXIgY29tcHV0ZXJTaGlwVHdvO1xuICAgIHZhciBjb21wdXRlckdhbWVib2FyZFxuICAgIHZhciBwbGF5ZXJHYW1lYm9hcmRcbiAgICB2YXIgcmVhbFBsYXllcjtcbiAgICB2YXIgYWlQbGF5ZXI7XG4gICAgdmFyIGlzUGxheWVyVHVybiA9IHRydWU7XG5cbiAgICBjb25zdCBzZXRVcFRlc3RHYW1lID0gKCkgPT4ge1xuICAgICAgICBjb21wdXRlclNoaXBPbmUgPSBzaGlwKDUpO1xuICAgICAgICBjb21wdXRlclNoaXBUd28gPSBzaGlwKDQpO1xuICAgICAgICBjb21wdXRlckdhbWVib2FyZCA9IGdhbWVib2FyZCgpO1xuICAgICAgICBjb21wdXRlckdhbWVib2FyZC5wbGFjZVNoaXAoY29tcHV0ZXJTaGlwT25lLCBbMCwwXSk7XG4gICAgICAgIGNvbXB1dGVyR2FtZWJvYXJkLnBsYWNlU2hpcChjb21wdXRlclNoaXBUd28sIFs1LCAwXSwgdHJ1ZSk7XG4gICAgICAgIGFpUGxheWVyID0gY29tcHV0ZXJQbGF5ZXIoJ0NvbXB1dGVyJywgY29tcHV0ZXJHYW1lYm9hcmQpO1xuXG4gICAgICAgIHBsYXllclNoaXBPbmUgPSBzaGlwKDUpO1xuICAgICAgICBwbGF5ZXJTaGlwVHdvID0gc2hpcCg0KTtcbiAgICAgICAgcGxheWVyR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCk7XG4gICAgICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAocGxheWVyU2hpcE9uZSwgWzAsIDldKTtcbiAgICAgICAgcGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcChwbGF5ZXJTaGlwVHdvLCBbNSwgNl0sIHRydWUpO1xuICAgICAgICByZWFsUGxheWVyID0gcGxheWVyKHBsYXllck5hbWUsIHBsYXllckdhbWVib2FyZCk7XG4gICAgfVxuXG4gICAgY29uc3QgdGFrZVR1cm4gPSAoY29vcnMpID0+IHtcbiAgICAgICAgaWYgKGlzUGxheWVyVHVybikge1xuICAgICAgICAgICAgaXNQbGF5ZXJUdXJuID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gcmVhbFBsYXllci5hdHRhY2soY29tcHV0ZXJHYW1lYm9hcmQsIGNvb3JzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlzUGxheWVyVHVybiA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gYWlQbGF5ZXIubWFrZVJhbmRvbUF0dGFjayhwbGF5ZXJHYW1lYm9hcmQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgX2Fzc2lnblNoaXBzID0gKHNoaXBBcnJheSkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaTw1OyBpKyspIHtcbiAgICAgICAgICAgIHNoaXBBcnJheVtpXSA9IHNoaXAoaSsxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNoZWNrUGxheWVyV2luID0gKCkgPT4ge1xuICAgICAgICBpZiAoY29tcHV0ZXJHYW1lYm9hcmQuYXJlQWxsU3VuaygpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNoZWNrQ29tcHV0ZXJXaW4gPSAoKSA9PiB7XG4gICAgICAgIGlmIChwbGF5ZXJHYW1lYm9hcmQuYXJlQWxsU3VuaygpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7c2V0VXBUZXN0R2FtZSwgdGFrZVR1cm4sIGNoZWNrUGxheWVyV2luLCBjaGVja0NvbXB1dGVyV2lufVxufVxuXG5leHBvcnQgZGVmYXVsdCBnYW1lOyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLmJvYXJkLXNwYWNlIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbn1cXG5cXG4uYm9hcmQtaG9sZGVyIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDQwcHgpO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgNDBweCk7XFxuICAgIGdhcDogMXB4O1xcbn1cXG5cXG4jY29udGVudCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIG1hcmdpbi10b3A6IDcwcHg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCI7QUFDQTtJQUNJLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYixvQ0FBb0M7SUFDcEMsdUNBQXVDO0lBQ3ZDLFFBQVE7QUFDWjs7QUFFQTtJQUNJLGFBQWE7SUFDYixnQkFBZ0I7SUFDaEIsNkJBQTZCO0FBQ2pDXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIlxcbi5ib2FyZC1zcGFjZSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG59XFxuXFxuLmJvYXJkLWhvbGRlciB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCA0MHB4KTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDQwcHgpO1xcbiAgICBnYXA6IDFweDtcXG59XFxuXFxuI2NvbnRlbnQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBtYXJnaW4tdG9wOiA3MHB4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbmNvbnN0IGRpc3BsYXlBZGRlciA9IChmdW5jdGlvbigpIHtcbiAgICBjb25zdCBjcmVhdGVEaXYgPSAocGFyZW50RWxlbWVudCwgdGV4dENvbnRlbnQ9JycsIGRpdklkPScnLCBkaXZDbGFzcz0nJykgPT4ge1xuICAgICAgICByZXR1cm4gX2NyZWF0ZUVsZW1lbnQocGFyZW50RWxlbWVudCwgJ2RpdicsIHRleHRDb250ZW50LCBkaXZJZCwgZGl2Q2xhc3MpO1xuICAgIH1cblxuICAgIGNvbnN0IGNyZWF0ZUltYWdlID0gKHBhcmVudEVsZW1lbnQsIGltYWdlU291cmNlLCBpbWFnZUlkPScnLCBpbWFnZUNsYXNzPScnKSA9PiB7XG4gICAgICAgIHZhciBuZXdJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBuZXdJbWFnZS5zcmMgPSBpbWFnZVNvdXJjZTtcbiAgICAgICAgX2FkZENsYXNzZXMobmV3SW1hZ2UsIGltYWdlQ2xhc3MpO1xuICAgICAgICBuZXdJbWFnZS5pZCA9IGltYWdlSWQ7XG4gICAgICAgIHBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQobmV3SW1hZ2UpO1xuICAgICAgICByZXR1cm4gbmV3SW1hZ2U7XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlQnV0dG9uID0gKHBhcmVudEVsZW1lbnQsIG9uY2xpY2tGdW5jdGlvbiwgdGV4dENvbnRlbnQ9JycsIGJ1dHRvbklkID0gJycsIGJ1dHRvbkNsYXNzPScnKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0J1dHRvbiA9IF9jcmVhdGVFbGVtZW50KHBhcmVudEVsZW1lbnQsICdidXR0b24nLCB0ZXh0Q29udGVudCwgYnV0dG9uSWQsIGJ1dHRvbkNsYXNzKTtcbiAgICAgICAgbmV3QnV0dG9uLm9uY2xpY2sgPSBvbmNsaWNrRnVuY3Rpb247XG4gICAgICAgIHJldHVybiBuZXdCdXR0b247XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlRm9ybSA9IChwYXJlbnRFbGVtZW50LCB0ZXh0Q29udGVudD0nJywgZm9ybUlkPScnLCBmb3JtQ2xhc3M9JycpID0+IHtcbiAgICAgICAgcmV0dXJuIF9jcmVhdGVFbGVtZW50KHBhcmVudEVsZW1lbnQsICdmb3JtJywgdGV4dENvbnRlbnQsIGZvcm1JZCwgZm9ybUNsYXNzKTtcbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVJbnB1dCA9IChwYXJlbnRFbGVtZW50LCBpbnB1dFR5cGUsIGlucHV0TmFtZSwgdGV4dENvbnRlbnQ9JycsIGlucHV0SWQ9JycsIGlucHV0Q2xhc3M9JycpID0+IHtcbiAgICAgICAgY29uc3QgbmV3SW5wdXQgPSBfY3JlYXRlRWxlbWVudChwYXJlbnRFbGVtZW50LCAnaW5wdXQnLCB0ZXh0Q29udGVudCwgaW5wdXRJZCwgaW5wdXRDbGFzcyk7XG4gICAgICAgIG5ld0lucHV0LnR5cGUgPSBpbnB1dFR5cGU7XG4gICAgICAgIG5ld0lucHV0Lm5hbWUgPSBpbnB1dE5hbWU7XG4gICAgICAgIHJldHVybiBuZXdJbnB1dDtcbiAgICB9XG5cbiAgICBjb25zdCBfY3JlYXRlRWxlbWVudCA9IChwYXJlbnRFbGVtZW50LCBlbGVtZW50VHlwZSwgdGV4dENvbnRlbnQ9JycsIGVsZW1lbnRJZD0nJywgZWxlbWVudENsYXNzPScnKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlKTtcbiAgICAgICAgX2FkZENsYXNzZXMobmV3RWxlbWVudCwgZWxlbWVudENsYXNzKTtcbiAgICAgICAgbmV3RWxlbWVudC5pZCA9IGVsZW1lbnRJZDtcbiAgICAgICAgbmV3RWxlbWVudC50ZXh0Q29udGVudCA9IHRleHRDb250ZW50O1xuICAgICAgICBwYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKG5ld0VsZW1lbnQpXG4gICAgICAgIHJldHVybiBuZXdFbGVtZW50O1xuICAgIH1cblxuICAgIGNvbnN0IF9hZGRDbGFzc2VzID0gKGVsZW1lbnQsIGNsYXNzZXMpID0+IHtcbiAgICAgICAgaWYgKGNsYXNzZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGNsYXNzTGlzdCA9IGNsYXNzZXMuc3BsaXQoJywnKTtcbiAgICAgICAgICAgIGNsYXNzTGlzdC5mb3JFYWNoKG9uZUNsYXNzID0+IHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQob25lQ2xhc3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge2NyZWF0ZURpdiwgY3JlYXRlSW1hZ2UsIGNyZWF0ZUJ1dHRvbiwgY3JlYXRlRm9ybSwgY3JlYXRlSW5wdXR9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZGlzcGxheUFkZGVyOyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcbmltcG9ydCBkaXNwbGF5QWRkZXIgZnJvbSBcImRpc3BsYXktYWRkZXItcmVlc2VcIjtcbmltcG9ydCBnYW1lIGZyb20gXCIuL2hlbHBlcnMvZ2FtZWxvb3BcIjtcbmltcG9ydCB7IG1ha2VCb2FyZCB9IGZyb20gXCIuL2hlbHBlcnMvZG9tQm9hcmRCdWlsZGVyXCI7XG5cbmNvbnN0IHJlYWxHYW1lID0gZ2FtZSgnUmVlc2UnKTtcbnJlYWxHYW1lLnNldFVwVGVzdEdhbWUoKTtcblxuZnVuY3Rpb24gcnVuR2FtZSgpe1xuICAgIGxldCB4Q29vciA9ICt0aGlzLmlkLnNsaWNlKC0yLCAtMSk7XG4gICAgbGV0IHlDb29yID0gK3RoaXMuaWQuc2xpY2UoLTEpO1xuICAgIGxldCBoaXRTdGF0ZSA9IHJlYWxHYW1lLnRha2VUdXJuKFt4Q29vciwgeUNvb3JdKTtcbiAgICBpZiAoaGl0U3RhdGUgPT0gJ2hpdCcpIHtcbiAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9ICdYJztcbiAgICAgICAgdGhpcy5vbmNsaWNrID0gJyc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGhpdFN0YXRlID09ICdtaXNzJykge1xuICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gJ08nO1xuICAgICAgICB0aGlzLm9uY2xpY2sgPSAnJztcbiAgICB9XG4gICAgZWxzZSBpZiAoaGl0U3RhdGUgPT0gJ3N1bmsnKSB7XG4gICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSAnISc7XG4gICAgICAgIHRoaXMub25jbGljayA9ICcnO1xuICAgIH1cbiAgICBpZiAocmVhbEdhbWUuY2hlY2tQbGF5ZXJXaW4oKSkge1xuICAgICAgICBjb25zb2xlLmxvZygnZ2cnKTtcbiAgICB9XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIG1ha2VDb21wdXRlck1vdmUoKTtcbiAgICB9LCAyMDApO1xufVxuXG5mdW5jdGlvbiBtYWtlQ29tcHV0ZXJNb3ZlKCkge1xuICAgIGxldCBjb21wdXRlckhpdEFycmF5ID0gcmVhbEdhbWUudGFrZVR1cm4oKTtcbiAgICBsZXQgY29tcHV0ZXJIaXRTdGF0ZSA9IGNvbXB1dGVySGl0QXJyYXlbMF07XG4gICAgbGV0IGNvbXB1dGVyQXR0YWNrQ29vcnMgPSBjb21wdXRlckhpdEFycmF5WzFdO1xuICAgIGlmIChjb21wdXRlckhpdFN0YXRlID09ICdoaXQnKSB7XG4gICAgICAgIGxldCBzcGFjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXInICsgY29tcHV0ZXJBdHRhY2tDb29yc1swXSArIGNvbXB1dGVyQXR0YWNrQ29vcnNbMV0pO1xuICAgICAgICBzcGFjZS50ZXh0Q29udGVudCA9ICdYJztcbiAgICB9XG4gICAgZWxzZSBpZiAoY29tcHV0ZXJIaXRTdGF0ZSA9PSAnbWlzcycpIHtcbiAgICAgICAgbGV0IHNwYWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllcicgKyBjb21wdXRlckF0dGFja0Nvb3JzWzBdICsgY29tcHV0ZXJBdHRhY2tDb29yc1sxXSk7XG4gICAgICAgIHNwYWNlLnRleHRDb250ZW50ID0gJ08nO1xuICAgIH1cbiAgICBlbHNlIGlmIChjb21wdXRlckhpdFN0YXRlID09ICdzdW5rJykge1xuICAgICAgICBsZXQgc3BhY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyJyArIGNvbXB1dGVyQXR0YWNrQ29vcnNbMF0gKyBjb21wdXRlckF0dGFja0Nvb3JzWzFdKTtcbiAgICAgICAgc3BhY2UudGV4dENvbnRlbnQgPSAnISc7XG4gICAgfVxuICAgIGlmIChyZWFsR2FtZS5jaGVja0NvbXB1dGVyV2luKCkpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2p1c3QgbHVjaycpO1xuICAgIH1cbn1cblxuY29uc3QgY29udGVudCA9IGRpc3BsYXlBZGRlci5jcmVhdGVEaXYoZG9jdW1lbnQuYm9keSwgJycsICdjb250ZW50Jyk7XG5cbmNvbnN0IGJvYXJkSG9sZGVyID0gZGlzcGxheUFkZGVyLmNyZWF0ZURpdihjb250ZW50LCAnJywgJ3BsYXllci1ib2FyZC1ob2xkZXInLCAnYm9hcmQtaG9sZGVyJyk7XG5tYWtlQm9hcmQoYm9hcmRIb2xkZXIsICdwbGF5ZXInLCBydW5HYW1lKTtcblxuY29uc3QgY29tcHV0ZXJCb2FyZEhvbGRlciA9IGRpc3BsYXlBZGRlci5jcmVhdGVEaXYoY29udGVudCwgJycsICdjb21wdXRlci1ib2FyZC1ob2xkZXInLCAnYm9hcmQtaG9sZGVyJyk7XG5tYWtlQm9hcmQoY29tcHV0ZXJCb2FyZEhvbGRlciwgJ2NvbXB1dGVyJywgcnVuR2FtZSk7Il0sIm5hbWVzIjpbImdhbWVCb2FyZCIsImJvYXJkU2l6ZSIsImJvYXJkQXJyYXkiLCJpIiwiZW1wdHlSb3ciLCJwdXNoIiwic2hpcExpc3QiLCJwbGFjZVNoaXAiLCJzaGlwT2JqZWN0Iiwic3RhcnRpbmdDb29yIiwieURpcmVjdGlvbiIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsInNoaXBMZW5ndGgiLCJnZXRMZW5ndGgiLCJzdGFydGluZ1giLCJzdGFydGluZ1kiLCJyZWNlaXZlQXR0YWNrIiwiY29vciIsInhDb29yIiwieUNvb3IiLCJjdXJyZW50U3BvdCIsIl90cmFja0hpdCIsIl90cmFja01pc3MiLCJhcmVBbGxTdW5rIiwiaXNTdW5rIiwiaGl0IiwicGxheWVyIiwibmFtZSIsInBsYXllckdhbWVib2FyZCIsImdldE5hbWUiLCJhdHRhY2siLCJnYW1lYm9hcmQiLCJjb29ycyIsInNoaXAiLCJoaXRzIiwiZ2V0SGl0cyIsImNvbXB1dGVyUGxheWVyIiwibmV3TmFtZSIsInVuQXR0YWNrZWRBcnJheSIsImoiLCJtYWtlUmFuZG9tQXR0YWNrIiwiaW5kZXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJzcGxpY2UiLCJkaXNwbGF5QWRkZXIiLCJtYWtlQm9hcmQiLCJib2FyZFBhcmVudCIsIklEIiwib25jbGlja0Z1bmN0aW9uIiwic3BhY2UiLCJjcmVhdGVEaXYiLCJvbmNsaWNrIiwiZ2FtZSIsInBsYXllck5hbWUiLCJwbGF5ZXJTaGlwT25lIiwicGxheWVyU2hpcFR3byIsImNvbXB1dGVyU2hpcE9uZSIsImNvbXB1dGVyU2hpcFR3byIsImNvbXB1dGVyR2FtZWJvYXJkIiwicmVhbFBsYXllciIsImFpUGxheWVyIiwiaXNQbGF5ZXJUdXJuIiwic2V0VXBUZXN0R2FtZSIsInRha2VUdXJuIiwiX2Fzc2lnblNoaXBzIiwic2hpcEFycmF5IiwiY2hlY2tQbGF5ZXJXaW4iLCJjaGVja0NvbXB1dGVyV2luIiwicmVhbEdhbWUiLCJydW5HYW1lIiwiaWQiLCJzbGljZSIsImhpdFN0YXRlIiwidGV4dENvbnRlbnQiLCJjb25zb2xlIiwibG9nIiwic2V0VGltZW91dCIsIm1ha2VDb21wdXRlck1vdmUiLCJjb21wdXRlckhpdEFycmF5IiwiY29tcHV0ZXJIaXRTdGF0ZSIsImNvbXB1dGVyQXR0YWNrQ29vcnMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY29udGVudCIsImJvZHkiLCJib2FyZEhvbGRlciIsImNvbXB1dGVyQm9hcmRIb2xkZXIiXSwic291cmNlUm9vdCI6IiJ9