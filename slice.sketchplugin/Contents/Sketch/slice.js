var that = this;
function run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports['default'] = function (context) {
  var doc = context.document;
  var selected = context.selection;
  if (selected.length == 0) {
    doc.showMessage('select at least one layer.');
    return;
  }

  option = {
    frame: 32
  };

  selected.forEach(function (layer) {
    slice(layer, option);
  });
  doc.showMessage('sliced ' + selected.length + ' layer(s).');
};

function slice(layer, option) {
  var name = layer.name();
  var layers = MSLayerArray.arrayWithLayer(layer);
  var group = MSLayerGroup.groupFromLayers(layers);
  group.setName(name + '_export');

  var slice = MSSliceLayer.sliceLayerFromLayer(layer);
  slice.setName(name);

  var sliceFrame = slice.frame();
  var layerFrame = layer.frame();

  if (option.hasOwnProperty('padding')) {

    var padding = void 0;
    var temp_padding = option.padding;
    //
    if (typeof option.padding == "number") {
      padding = {
        top: temp_padding,
        right: temp_padding,
        bottom: temp_padding,
        left: temp_padding
      };
    } else {
      padding = Object.assign({
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }, temp_padding);
    }
    sliceFrame.setX(layerFrame.x() - padding.left);
    sliceFrame.setY(layerFrame.y() - padding.top);
    sliceFrame.setWidth(layerFrame.width() + padding.left + padding.right);
    sliceFrame.setHeight(layerFrame.height() + padding.top + padding.bottom);
  } else if (option.hasOwnProperty('frame')) {

    var frame = void 0;
    var temp_frame = option.frame;

    if (typeof option.frame == "number") {
      frame = {
        width: temp_frame,
        height: temp_frame
      };
    } else {
      // use layer's width and height as default
      frame = Object.assign({
        width: layerFrame.width(),
        height: layerFrame.height()
      }, option.frame);
    }
    sliceFrame.setWidth(frame.width);
    sliceFrame.setHeight(frame.height);
    var sliceX = (layerFrame.width() - sliceFrame.width()) / 2;
    var sliceY = (layerFrame.height() - sliceFrame.height()) / 2;
    var sliceXFloor = Math.floor(sliceX);
    var sliceYFloor = Math.floor(sliceY);
    sliceFrame.setX(sliceXFloor);
    sliceFrame.setY(sliceYFloor);

    //adjust layer so it's placed in the middle of the slice
    var sliceXleftover = sliceX - sliceXFloor;
    var sliceYleftover = sliceY - sliceYFloor;
    if (sliceXleftover !== 0 || sliceYleftover !== 0) {
      layerFrame.setX(layerFrame.x() - sliceXleftover);
      layerFrame.setY(layerFrame.y() - sliceYleftover);
    }
  }

  //set slice to only do content
  slice.exportOptions().setLayerOptions(2);
  context.document.reloadInspector();

  // resize group
  group.layerDidEndResize();

  // create symbol
  if (option.hasOwnProperty('symbol') && option.symbol) {
    var groups = MSLayerArray.arrayWithLayers([slice, layer]);
    if (MSSymbolCreator.canCreateSymbolFromLayers(groups)) {
      MSSymbolCreator.createSymbolFromLayers_withName_onSymbolsPage(groups, name, true);
      group.ungroup();
    }
  }

  return slice;
}

/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = run.bind(this, 'default')
