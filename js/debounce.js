'use strict';

window.debounce = function (cb) {
  window.setTimeout(function () {
    cb();
  }, window.constants.DEBOUNCE_INTERVAL);
};
