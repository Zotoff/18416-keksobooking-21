"use strict";

(function () {
  window.utils = {
    fragment: document.createDocumentFragment(),
    generateRandomValue(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    generateRandomArray(array, length) {
      const resultArray = [];
      for (let i = 0; i < length; i++) {
        resultArray.push(array[i]);
      }
      return resultArray;
    },
    syncFields(firstField, secondField, firstValues, secondValues, syncFieldsCallBack) {
      const currentIndex = firstValues.indexOf(firstField.value);
      syncFieldsCallBack(secondField, secondValues[currentIndex]);
    },
    checkUndefinedValue(element, selector, cb) {
      if (!element) {
        selector.classList.add(`hidden`);
      }
      cb();
    },
    removeSymbolsFromString(str, symbols) {
      return str.substring(0, str.length - symbols);
    },
    checkMouseDownEvent(evt, code, cb) {
      if (evt.button === code) {
        cb();
      }
    },
    checkKeyDownEvent(evt, key, cb) {
      if (evt.key === key) {
        cb();
      }
    },
    enterTextContent(selector, content) {
      selector.textContent = content;
    },
    makeRedBorder(item) {
      item.classList.add(`input--error`);
    },
    removeRedBorder(item) {
      item.classList.remove(`input--error`);
    },
    syncValue(element, value) {
      element.value = value;
    },
    syncValueWithMin(element, value) {
      element.min = value;
      element.placeholder = value;
    },
    syncGuestWithRooms(guestField, guestValue) {
      guestField.value = guestValue;
      const currentValue = guestField.value;

      Array.from(guestField).forEach((option) => {
        option.disabled = (currentValue === `0`) ? (option.value !== `0`) : (option.value > currentValue || option.value === `0`);
      });
    }
  };
})();
