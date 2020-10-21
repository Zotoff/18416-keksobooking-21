"use strict";

(function () {
  const generateRandomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };
  const generateRandomArray = (array, length) => {
    const resultArray = [];
    for (let i = 0; i < length; i++) {
      resultArray.push(array[i]);
    }
    return resultArray;
  };
  const hideElement = (element) => {
    element.classList.add(`hidden`);
  };
  const syncFields = (firstField, secondField, firstValues, secondValues, syncFieldsCallBack) => {
    const currentIndex = firstValues.indexOf(firstField.value);
    syncFieldsCallBack(secondField, secondValues[currentIndex]);
  };
  const checkUndefinedValue = (element, selector, cb) => {
    if (!element) {
      selector.classList.add(`hidden`);
    }
    cb();
  };
  const removeSymbolsFromString = (str, symbols) => {
    return str.substring(0, str.length - symbols);
  };
  const checkMouseDownEvent = (evt, code, cb) => {
    if (evt.button === code) {
      cb();
    }
  };
  const checkKeyDownEvent = (evt, key, cb) => {
    if (evt.key === key) {
      cb();
    }
  };
  const enterTextContent = (selector, content) => {
    selector.textContent = content;
  };
  const makeRedBorder = (item) => {
    item.classList.add(`input--error`);
  };
  const removeRedBorder = (item) => {
    item.classList.remove(`input--error`);
  };
  const syncValue = (element, value) => {
    element.value = value;
  };
  const syncValueWithMin = (element, value) => {
    element.min = value;
    element.placeholder = value;
  };
  const syncGuestWithRooms = (guestField, guestValue) => {
    guestField.value = guestValue;
    const currentValue = guestField.value;

    Array.from(guestField).forEach((option) => {
      option.disabled = (currentValue === `0`) ? (option.value !== `0`) : (option.value > currentValue || option.value === `0`);
    });
  };
  window.utils = {
    fragment: document.createDocumentFragment(),
    generateRandomValue,
    generateRandomArray,
    hideElement,
    syncFields,
    checkUndefinedValue,
    removeSymbolsFromString,
    checkMouseDownEvent,
    checkKeyDownEvent,
    enterTextContent,
    makeRedBorder,
    removeRedBorder,
    syncValue,
    syncValueWithMin,
    syncGuestWithRooms,
  };
})();
