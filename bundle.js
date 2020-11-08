/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!************************!*\
  !*** ./js/debounce.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


window.debounce = function (cb) {
  window.setTimeout(function () {
    cb();
  }, window.constants.DEBOUNCE_INTERVAL);
};

})();

(() => {
/*!*************************!*\
  !*** ./js/constants.js ***!
  \*************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */



window.constants = {
  TYPES_VALUES: [`bungalow`, `flat`, `house`, `palace`],
  MIN_PRICES: [`0`, `1000`, `5000`, `10000`],
  TIMES_VALUES: [`12:00`, `13:00`, `14:00`],
  GUESTS_VALUES: [`1`, `2`, `3`, `0`],
  ROOMS_VALUES: [`1`, `2`, `3`, `100`],
  FILE_TYPES: [`gif`, `jpg`, `jpeg`, `png`],
  MAX_ANNOUNCEMENTS: 8,
  ROUND_MAP_PIN_SIZE: 62,
  ACTIVE_MAP_PIN_SIZE: 62,
  ACTIVE_MAP_PIN_EDGE_HEIGHT: 20,
  TIMEOUT_IN_MS: 10000,
  LOAD_URL: `https://21.javascript.pages.academy/keksobooking/data`,
  UPLOAD_URL: `https://21.javascript.pages.academy/keksobooking`,
  FILTERED_PINS_AMOUNT: 5,
  VALID_FILE_TYPES: [
    `image/jpeg`,
    `image/png`,
    `image/jpg`
  ],
  DEBOUNCE_INTERVAL: 500,
  MapInitialCoords: {
    x: 570,
    y: 375
  },
  ErrorMessages: {
    valueMissing: `Пожалуйста, заполните форму!`,
    wrongRoom: `Вы выбрали количество мест, не соответствующее количеству гостей`,
    emptyItem: `Пожалуйста, заполните поле`,
    badInput: `Вы ввели неверный тип данных`,
    patternMismatch: `Данные не соответствуют шаблону`,
    rangeOverflow: `Превышено максимальное значение`,
    rangeUnderflow: `Значение ниже минимального`,
    stepMismatch: `Превышен шаг`,
    tooLong: `Превышена максимальная длина`,
    tooShort: `Количество введенных символов ниже минимального`,
    typeMismatch: `Пожалуйста, проверьте правильность ввода`,
    noFilesSelected: `Не выбран файл для загрузки`,
    wrongTypeOfFile: `Разрешены только файлы в формате: jpeg, png, jpg`
  },
  NetworkErrorMessages: {
    wrongResponse: `Неверный запрос`,
    unauthorizedResponse: `Пользователь не авторизован`,
    notFoundResponse: `Данные не найдены`,
    internalErrorResponse: `Произошла ошибка сервера`,
  },
  PricesTypes: {
    low: 10000,
    middle: 50000
  },
  SuccessMessages: {
    dataSent: `Отправка данных прошла успешно!`
  },
  ResponseStatuses: {
    successResponse: 200,
    wrongResponse: 400,
    unauthorizedResponse: 401,
    notFoundResponse: 404,
    internalErrorResponse: 500
  },
  OfferTypes: {
    Palace: `palace`,
    Bungalo: `bungalow`,
    House: `house`,
    Flat: `flat`
  },
  CoordY: {
    MIN: 130,
    MAX: 630
  },
  FilterValues: {
    any: `any`,
    low: `low`,
    middle: `middle`,
    high: `high`,
  }
};


})();

(() => {
/*!***********************!*\
  !*** ./js/network.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const createXhrRequest = (method, url, successHandler, errorHandler) => {
  let xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.addEventListener(`load`, () => {
    let error;
    switch (xhr.status) {
      case window.constants.ResponseStatuses.successResponse:
        successHandler(xhr.response);
        break;
      case window.constants.ResponseStatuses.wrongResponse:
        error = window.constants.NetworkErrorMessages.wrongResponse;
        break;
      case window.constants.ResponseStatuses.unauthorizedResponse:
        error = window.constants.NetworkErrorMessages.unauthorizedResponse;
        break;
      case window.constants.ResponseStatuses.notFoundResponse:
        error = window.constants.NetworkErrorMessages.notFoundResponse;
        break;
      case window.constants.ResponseStatuses.internalErrorResponse:
        error = window.constants.NetworkErrorMessages.internalErrorResponse;
        break;
      default:
        error = `Статус ответа: ${xhr.status} | ${xhr.statusText}`;
    }
    if (error) {
      errorHandler(error);
    }
  });
  xhr.addEventListener(`error`, () => {
    errorHandler(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, () => {
    errorHandler(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.timeout = window.constants.TIMEOUT_IN_MS; // 10s

  xhr.open(method, url);
  return xhr;
};
const loadData = (successHandler, errorHandler) => {
  createXhrRequest(`GET`, window.constants.LOAD_URL, successHandler, errorHandler).send();
};
const uploadData = (data, successHandler, errorHandler) => {
  createXhrRequest(`POST`, window.constants.UPLOAD_URL, successHandler, errorHandler).send(data);
};

window.network = {
  load: loadData,
  upload: uploadData
};


})();

(() => {
/*!*********************!*\
  !*** ./js/utils.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


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
const getAvatarNumber = (avatar) => {
  const avatarText = avatar.match(/\d+/);
  const avatarNumber = avatarText[0];
  const id = +avatarNumber;
  return id;
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
  getAvatarNumber,
};

})();

(() => {
/*!********************!*\
  !*** ./js/form.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const adFormElement = document.forms[1];
const adFormTitle = adFormElement.title;
const adFormType = adFormElement.type;
const adFormAddressElement = adFormElement.address;
const adFormPrice = adFormElement.price;
const adFormCheckIn = adFormElement.timein;
const adFormCheckOut = adFormElement.timeout;
const adFormRoom = adFormElement.rooms;
const adFormCapacity = adFormElement.capacity;
const adFormAvatar = adFormElement.avatar;
const adFormImages = adFormElement.images;
const adFormFeatures = adFormElement.features;
const adFormDescription = adFormElement.description;
const adFormHeaderPreview = adFormElement.querySelector(`.ad-form-header__preview`);
const adFormImagesPreview = adFormElement.querySelector(`.ad-form__photo`);
const avatarFieldSet = adFormElement.querySelector(`.ad-form-header`);
const imagesFieldSet = adFormElement.querySelector(`.ad-form__photo-container`).parentNode;
const adFormSubmitBtn = adFormElement.querySelector(`button[type=submit]`);
const adoFormClearBtn = adFormElement.querySelector(`.ad-form__reset`);
const adFeatures = [];

const makeItemInvalid = (item, validityState) => {
  item.setCustomValidity(validityState);
  window.utils.makeRedBorder(item);
  item.parentNode.setAttribute(`valid`, `false`);
  adFormElement.reportValidity();
};

const makeFileItemInvalid = (item, fieldSetSelector, validityState) => {
  item.setCustomValidity(validityState);
  window.utils.makeRedBorder(item);
  fieldSetSelector.setAttribute(`valid`, `false`);
  adFormElement.reportValidity();
};

const checkFileTypeValidity = (fileInput, fieldSetSelector) => {
  for (let file of fileInput.files) {
    window.constants.VALID_FILE_TYPES.forEach((type) => {
      if (file.type === type) {
        window.utils.removeRedBorder(fileInput);
        fileInput.setCustomValidity(``);
        fieldSetSelector.setAttribute(`valid`, `true`);
      }
      makeFileItemInvalid(fileInput, fieldSetSelector, window.constants.ErrorMessages.wrongTypeOfFile);
    });
  }
  window.utils.removeRedBorder(fileInput);
  fieldSetSelector.setAttribute(`valid`, true);
  fileInput.setCustomValidity(``);
  return true;
};


const checkInputValidity = (item) => {
  if (item.validity.valueMissing) {
    makeItemInvalid(item, window.constants.ErrorMessages.valueMissing);
  } else if (item.validity.wrongRoom) {
    makeItemInvalid(item, window.constants.ErrorMessages.wrongRoom);
  } else if (item.validity.emptyItem) {
    makeItemInvalid(item, window.constants.ErrorMessages.emptyItem);
  } else if (item.validity.badInput) {
    makeItemInvalid(item, window.constants.ErrorMessages.badInput);
  } else if (item.validity.patternMismatch) {
    makeItemInvalid(item, window.constants.ErrorMessages.patternMismatch);
  } else if (item.validity.rangeOverflow) {
    makeItemInvalid(item, window.constants.ErrorMessages.rangeOverflow);
  } else if (item.validity.rangeUnderflow) {
    makeItemInvalid(item, window.constants.ErrorMessages.rangeUnderflow);
  } else if (item.validity.stepMismatch) {
    makeItemInvalid(item, window.constants.ErrorMessages.stepMismatch);
  } else if (item.validity.tooLong) {
    makeItemInvalid(item, window.constants.ErrorMessages.tooLong);
  } else if (item.validity.tooShort) {
    makeItemInvalid(item, window.constants.ErrorMessages.tooShort);
  } else if (item.validity.typeMismatch) {
    makeItemInvalid(item, window.constants.ErrorMessages.typeMismatch);
  } else {
    window.utils.removeRedBorder(item);
    item.setCustomValidity(``);
    item.parentNode.setAttribute(`valid`, `true`);
    adFormElement.reportValidity();
  }
};

const clearFormElements = (selectors) => {
  selectors.forEach((selector) => {
    selector.value = ``;
  });
};

const onSuccess = () => {

  const FRAGMENT = window.utils.fragment;
  const mainElement = document.querySelector(`main`);
  const successElement = document.querySelector(`#success`).content;
  const successMessage = window.constants.SuccessMessages.dataSent;

  const successTemplate = successElement.cloneNode(true);
  const successMessageElement = successTemplate.querySelector(`.success__message`);
  successMessageElement.innerText = `${successMessage}`;

  FRAGMENT.appendChild(successTemplate);
  mainElement.append(FRAGMENT);

  const successSelector = document.querySelectorAll(`.success`);

  const removeSuccess = () => {
    successSelector.forEach((item) => {
      item.remove();
    });
  };

  document.addEventListener(`keydown`, (evt) => {
    removeSuccess();
    window.utils.checkKeyDownEvent(evt, `Escape`, removeSuccess);
  });

  document.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    removeSuccess();
  });

  window.map.makeMapInactive();

};
const onError = (message) => {
  const FRAGMENT = window.utils.fragment;
  const mainElement = document.querySelector(`main`);
  const errorElement = document.querySelector(`#error`).content;

  const errorTemplate = errorElement.cloneNode(true);
  const errorMessage = errorElement.querySelector(`.error__message`);
  errorMessage.innerText = `${message}`;

  FRAGMENT.appendChild(errorTemplate);
  mainElement.append(FRAGMENT);

  const errorSelector = document.querySelector(`.error`);

  const removeError = () => {
    errorSelector.remove();
  };

  const errorButton = errorSelector.querySelector(`.error__button`);

  document.addEventListener(`keydown`, (evt) => {
    removeError();
    window.utils.checkKeyDownEvent(evt, `Escape`, removeError);
  });

  document.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    removeError();
  });

  errorButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    removeError();
  });
};

const setAddress = (toggler, coordX, coordY) => {
  if (toggler === `initial`) {
    const calculateMapPinEdgeCoord = (axis, coord, pinSize) => {
      let mapPinEdgeCoord = 0;
      if (axis === `x`) {
        mapPinEdgeCoord = Math.floor(+coord + (pinSize / 2));
      } else if (axis === `y`) {
        mapPinEdgeCoord = Math.floor(+coord + pinSize);
      }
      return mapPinEdgeCoord;
    };

    const calculatedXCoord = calculateMapPinEdgeCoord(`x`, coordX, window.constants.ACTIVE_MAP_PIN_SIZE);
    const calculatedYCoord = calculateMapPinEdgeCoord(`y`, coordY, window.constants.ACTIVE_MAP_PIN_SIZE);

    const coordMessage = `${calculatedXCoord} ${calculatedYCoord}`;
    adFormAddressElement.setAttribute(`value`, coordMessage);
  }
  if (toggler === `work`) {
    const coordMessage = `${coordX} ${coordY}`;
    adFormAddressElement.setAttribute(`value`, coordMessage);
  }
  adFormAddressElement.setAttribute(`readonly`, `readonly`);
};

const submitAdForm = (formData) => {
  window.network.upload(formData, onSuccess, onError);
};

const loadImagesPreviews = (fileHandler, previewSelector) => {
  let picReader = new FileReader();
  picReader.addEventListener(`load`, (evt) => {
    const picFile = evt.target;
    const div = document.createElement(`div`);
    div.className = `ad-form__photo__preview`;
    div.innerHTML = `<img src="${picFile.result}" title="${picFile.name}" width="25" height="25"/>`;
    previewSelector.insertBefore(div, null);
  });
  picReader.readAsDataURL(fileHandler);
};

const loadAvatarPreview = (fileHandler) => {
  let picReader = new FileReader();
  picReader.addEventListener(`load`, (evt) => {
    const picFile = evt.target;
    const avatarPreviewImage = adFormHeaderPreview.querySelector(`img`);
    avatarPreviewImage.src = `${picFile.result}`;
    avatarPreviewImage.alt = `${picFile.name}`;
  });
  picReader.readAsDataURL(fileHandler);
};

adFormImages.addEventListener(`change`, (evt) => {
  let files = evt.target.files;
  adFormImagesPreview.innerHTML = ``;
  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    if (!file.type.match(`image`)) {
      continue;
    }
    loadImagesPreviews(file, adFormImagesPreview);
  }
});

adFormAvatar.addEventListener(`change`, (evt) => {
  let files = evt.target.files;
  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    if (!file.type.match(`image`)) {
      continue;
    }
    loadAvatarPreview(file);
  }
});

const disableForm = () => {
  adFormElement.querySelectorAll(`fieldset`).forEach((fieldset) => {
    fieldset.setAttribute(`disabled`, `true`);
  });
  const houseImages = Array.from(adFormImagesPreview.childNodes);
  const avatarImage = adFormHeaderPreview.querySelector(`img`);
  houseImages.forEach((image) => {
    image.remove();
  });
  avatarImage.src = `img/muffin-grey.svg`;
  clearFormElements([adFormTitle, adFormPrice, adFormDescription, adFormAvatar, adFormImages, adFormFeatures]);
  adFormElement.classList.add(`ad-form--disabled`);
};

window.form = {
  adFormElement,
  adFormElementFieldsets: adFormElement.querySelectorAll(`fieldset`),
  activateForm() {
    window.utils.syncFields(adFormRoom, adFormCapacity, window.constants.ROOMS_VALUES, window.constants.GUESTS_VALUES, window.utils.syncGuestWithRooms);
    window.utils.syncFields(adFormType, adFormPrice, window.constants.TYPES_VALUES, window.constants.MIN_PRICES, window.utils.syncValueWithMin);
    window.utils.syncFields(adFormCheckIn, adFormCheckOut, window.constants.TIMES_VALUES, window.constants.TIMES_VALUES, window.utils.syncValue);
    adFormRoom.addEventListener(`change`, () => {
      window.utils.syncFields(adFormRoom, adFormCapacity, window.constants.ROOMS_VALUES, window.constants.GUESTS_VALUES, window.utils.syncGuestWithRooms);
    });
    adFormType.addEventListener(`change`, () => {
      window.utils.syncFields(adFormType, adFormPrice, window.constants.TYPES_VALUES, window.constants.MIN_PRICES, window.utils.syncValueWithMin);
    });
    adFormCheckIn.addEventListener(`change`, () => {
      window.utils.syncFields(adFormCheckIn, adFormCheckOut, window.constants.TIMES_VALUES, window.constants.TIMES_VALUES, window.utils.syncValue);
    });
    adFormCheckOut.addEventListener(`change`, () => {
      window.utils.syncFields(adFormCheckOut, adFormCheckIn, window.constants.TIMES_VALUES, window.constants.TIMES_VALUES, window.utils.syncValue);
    });
    adFormFeatures.forEach((feature) => {
      feature.addEventListener(`change`, () => {
        adFeatures.push(feature.value);
      });
    });
    adoFormClearBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      window.map.makeMapInactive();
    });
    adFormAvatar.addEventListener(`change`, () => {
      checkFileTypeValidity(adFormAvatar, avatarFieldSet, adFormHeaderPreview, false);
    });
    adFormImages.addEventListener(`change`, () => {
      checkFileTypeValidity(adFormImages, imagesFieldSet, adFormImagesPreview, true);
    });
  },
  checkFormValidity() {
    checkInputValidity(adFormTitle);
    checkInputValidity(adFormPrice);
    checkInputValidity(adFormAddressElement);
  },
  interactWithForm() {
    checkInputValidity(adFormTitle);
    checkInputValidity(adFormPrice);
    checkInputValidity(adFormCapacity);
    adFormTitle.addEventListener(`input`, (evt) => {
      checkInputValidity(evt.target);
    });
    adFormPrice.addEventListener(`input`, (evt) => {
      checkInputValidity(evt.target);
    });
  },
  submitForm() {
    adFormSubmitBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.activateForm();
      this.checkFormValidity();
      const fieldSets = adFormElement.querySelectorAll(`fieldset[valid=false]`);
      if (!fieldSets.length) {
        const formData = new FormData(document.querySelector(`.ad-form`));
        submitAdForm(formData);
      }
    });
  },
  setAddress,
  disableForm
};


})();

(() => {
/*!**********************!*\
  !*** ./js/filter.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const filterForm = document.forms[0];
const filterFormTypeElement = filterForm.querySelector(`#housing-type`);
const filterFormPriceELement = filterForm.querySelector(`#housing-price`);
const filterFormRoomsElement = filterForm.querySelector(`#housing-rooms`);
const filterFormGuestsElement = filterForm.querySelector(`#housing-guests`);
const filterFormFeaturesFieldSet = filterForm.querySelector(`#housing-features`);

const filter = {
  type: window.constants.FilterValues.any,
  price: window.constants.FilterValues.any,
  guests: window.constants.FilterValues.any,
  rooms: window.constants.FilterValues.any,
  features: []
};

const handleFilters = (data) => {
  const dataToFilter = [];
  const filteredResponse = data.slice(0, window.constants.FILTERED_PINS_AMOUNT);
  for (let item of filteredResponse) {
    dataToFilter.push(item);
  }
  const updateFilters = () => {

    const filterTypes = (type, item) => {
      switch (type) {
        case window.constants.FilterValues.any:
          return item;
        default:
          if (item.offer.type === filter.type) {
            return item;
          } else {
            return false;
          }
      }
    };
    const filterGuests = (guests, item) => {
      switch (guests) {
        case window.constants.FilterValues.any:
          return item;
        default:
          if (item.offer.guests === +filter.guests) {
            return item;
          } else {
            return false;
          }
      }
    };
    const filterRooms = (rooms, item) => {
      switch (rooms) {
        case window.constants.FilterValues.any:
          return item;
        default:
          if (item.offer.rooms === +filter.rooms) {
            return item;
          } else {
            return false;
          }
      }
    };
    const filterPrice = (price, item) => {
      switch (price) {
        case window.constants.FilterValues.low:
          if (item.offer.price < 10000) {
            return item;
          } else {
            return false;
          }
        case window.constants.FilterValues.middle:
          if (item.offer.price > 10000 && item.offer.price <= 50000) {
            return item;
          } else {
            return false;
          }
        case window.constants.FilterValues.high:
          if (item.offer.price > 50000) {
            return item;
          } else {
            return false;
          }
        default:
          return item;
      }
    };
    const filterFeatures = (features, item) => {
      if (!features.length) {
        return true;
      }
      let hasAllFeatures = true;
      for (let i = 0; i < features.length; i++) {
        if (!item.offer.features.includes(features[i])) {
          hasAllFeatures = false;
          break;
        }
      }
      return hasAllFeatures;
    };
    const filteredFinal = dataToFilter.filter((item) => filterTypes(filter.type, item) && filterGuests(filter.guests, item) && filterRooms(filter.rooms, item) && filterPrice(filter.price, item) && filterFeatures(filter.features, item));
    window.card.getAnnouncements(filteredFinal);
    window.pin.setupPins(filteredFinal);
    window.pin.handlePinsAndCards(document.querySelectorAll(`.map__pin[type=button]`));
  };
  filterFormTypeElement.addEventListener(`change`, (evt) => {
    const type = evt.target.value;
    filter.type = type;
    window.debounce(updateFilters);
  });
  filterFormRoomsElement.addEventListener(`change`, (evt) => {
    const rooms = evt.target.value;
    filter.rooms = rooms;
    window.debounce(updateFilters);
  });
  filterFormGuestsElement.addEventListener(`change`, (evt) => {
    const guests = evt.target.value;
    filter.guests = guests;
    window.debounce(updateFilters);
  });
  filterFormPriceELement.addEventListener(`change`, (evt) => {
    const priceType = evt.target.value;
    filter.price = priceType;
    window.debounce(updateFilters);
  });
  filterFormFeaturesFieldSet.addEventListener(`change`, () => {
    let featuresAmount = filterFormFeaturesFieldSet.querySelectorAll(`input:checked`);
    const clickedAmountsArray = Array.from(featuresAmount);
    const clickedFeaturesArray = [];
    clickedAmountsArray.forEach((amount) => {
      const value = amount.value;
      clickedFeaturesArray.push(value);
    });
    filter.features = clickedFeaturesArray;
    window.debounce(updateFilters);
  });
};
window.filter = {
  handleFilters
};

})();

(() => {
/*!*******************!*\
  !*** ./js/map.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const mapFiltersForm = document.querySelector(`.map__filters`);
const mapFiltersContainerElement = document.querySelector(`.map__filters-container`);
const mapPinActiveX = document.querySelector(`.map__pin`).style.left;
const mapPinActiveY = document.querySelector(`.map__pin`).style.top;
const mapElement = document.querySelector(`.map`);

const initialSetup = () => {
  mapElement.classList.add(`map--faded`);
  mapFiltersForm.setAttribute(`disabled`, `true`);
  window.form.adFormElementFieldsets.forEach((element) => {
    element.setAttribute(`disabled`, `true`);
  });
};

const makeMapInactive = () => {
  mapElement.classList.add(`map--faded`);
  mapFiltersForm.setAttribute(`disabled`, `true`);

  const mainPin = document.querySelector(`.map__pin`);

  mainPin.style.left = window.constants.MapInitialCoords.x + `px`;
  mainPin.style.top = window.constants.MapInitialCoords.y + `px`;

  window.form.setAddress(`initial`, window.constants.MapInitialCoords.x, window.constants.MapInitialCoords.y);

  window.form.disableForm();
  const mapPins = document.querySelectorAll(`button[type=button].map__pin`);
  mapPins.forEach((pin) => {
    pin.remove();
  });

};

window.map = {
  mapSelector: mapElement,
  mapFiltersContainer: mapFiltersContainerElement,
  initialSetup,
  makeMapInactive,
  setMapActive() {
    mapFiltersForm.removeAttribute(`disabled`);
    window.form.adFormElementFieldsets.forEach((element) => {
      element.removeAttribute(`disabled`);
    });
    window.form.adFormElement.classList.remove(`ad-form--disabled`);
    mapElement.classList.remove(`map--faded`);

    const mapPinActiveXCoord = window.utils.removeSymbolsFromString(mapPinActiveX, 2);
    const mapPinActiveYCoord = window.utils.removeSymbolsFromString(mapPinActiveY, 2);

    window.form.setAddress(`work`, mapPinActiveXCoord, mapPinActiveYCoord);

    const handleResponse = (data) => {
      const filteredResponse = data.slice(0, window.constants.FILTERED_PINS_AMOUNT);
      window.card.getAnnouncements(filteredResponse);
      window.pin.setupPins(filteredResponse);
      window.pin.handlePinsAndCards(document.querySelectorAll(`.map__pin`));
      window.pin.moveMainPin();
      window.filter.handleFilters(data);
      window.form.submitForm();
    };
    const onSuccess = (response) => {
      handleResponse(response);
    };
    const onError = (message) => {
      const noticeElement = document.querySelector(`.notice`);
      noticeElement.insertAdjacentHTML(`beforebegin`, `<div class="error-message"><p>${message}</p></div>`);
    };
    window.network.load(onSuccess, onError);
  },
  workWithActiveMap() {
    window.pin.moveMainPin();
    window.form.submitForm();
  }
};

})();

(() => {
/*!*******************!*\
  !*** ./js/pin.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */



const FRAGMENT = window.utils.fragment;
const mapPinsElement = document.querySelector(`.map__pins`);
const mapPinElement = document.querySelector(`#pin`).content;
const mainPinElement = document.querySelector(`.map__pin--main`);
const mapPinInactiveX = document.querySelector(`.map__pin`).style.left;
const mapPinInactiveY = document.querySelector(`.map__pin`).style.top;

const generateMapPinElement = (element) => {
  const mapPinTemplate = mapPinElement.cloneNode(true);
  const mapPinButton = mapPinTemplate.querySelector(`.map__pin`);
  const mapPinButtonImage = mapPinTemplate.querySelector(`img`);
  const pinId = window.utils.getAvatarNumber(element.author.avatar);
  mapPinButton.style.left = `${element.location.x}px`;
  mapPinButton.style.top = `${element.location.y + 35}px`;
  mapPinButtonImage.src = element.author.avatar;
  mapPinButtonImage.setAttribute(`alt`, element.offer.title);
  mapPinButton.setAttribute(`data-id`, pinId);

  return mapPinTemplate;
};
const fillDomWithPins = (pins) => {
  const pinsToRemove = document.querySelectorAll(`.map__pin[type=button]`);
  pinsToRemove.forEach((pin) => {
    pin.remove();
  });
  pins.forEach((pin) => {
    FRAGMENT.appendChild(generateMapPinElement(pin));
  });
  mapPinsElement.appendChild(FRAGMENT);
};
const initiatePins = () => {
  if (window.map.mapSelector.classList.contains(`map--faded`)) {
    const mapPinInactiveXCoord = window.utils.removeSymbolsFromString(mapPinInactiveX, 2);
    const mapPinInactiveYCoord = window.utils.removeSymbolsFromString(mapPinInactiveY, 2);
    handleMainPin();
    window.form.setAddress(`initial`, mapPinInactiveXCoord, mapPinInactiveYCoord);
  }
};
const handleMainPin = () => {
  mainPinElement.addEventListener(`click`, (evt) => {
    if (window.map.mapSelector.classList.contains(`map--faded`)) {
      window.utils.checkMouseDownEvent(evt, 0, window.map.setMapActive);
    } else {
      window.utils.checkMouseDownEvent(evt, 0, window.map.workWithActiveMap);
    }
  });

  mainPinElement.addEventListener(`keydown`, (evt) => {
    if (window.map.mapSelector.classList.contains(`map--faded`)) {
      window.utils.checkKeyDownEvent(evt, `Enter`, window.map.setMapActive);
    } else {
      window.utils.checkKeyDownEvent(evt, `Enter`, window.map.workWithActiveMap);
    }
  });
};
const handlePinsAndCards = (pins) => {
  pins.forEach((pin) => {
    pin.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      window.card.announcements.forEach((announcement) => {
        if (+pin.dataset.id === announcement.id) {
          window.card.fillDomWithAnnouncements(announcement);
        }
      });
      window.card.handleCardEvents();
    });
  });
};
const renderFilteredPins = (title) => {
  let filteredPins = Array.from(mapPinsElement.querySelectorAll(`.map__pin`));
  let filteredPinsWithoutMain = filteredPins.slice(1, window.constants.FILTERED_PINS_AMOUNT + 1);
  filteredPinsWithoutMain.forEach((pin) => {
    if (title === pin.querySelector(`img`).alt) {
      pin.classList.remove(`hidden`);
      return true;
    }
    if (title === `all`) {
      pin.classList.remove(`hidden`);
      return true;
    }
    pin.classList.add(`hidden`);
    return true;
  });
};

const moveMainPin = () => {
  mainPinElement.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    const mapWidth = window.map.mapSelector.clientWidth;
    const maxYCoord = window.constants.CoordY.MAX - (window.constants.ACTIVE_MAP_PIN_SIZE);
    const minYCoord = window.constants.CoordY.MIN - (window.constants.ACTIVE_MAP_PIN_SIZE);

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      let currentCoords = {
        x: mainPinElement.offsetLeft - shift.x,
        y: mainPinElement.offsetTop - shift.y
      };

      if (currentCoords.x >= -(window.constants.ACTIVE_MAP_PIN_SIZE / 2) && currentCoords.x <= mapWidth - window.constants.ACTIVE_MAP_PIN_SIZE / 2 && currentCoords.y >= minYCoord &&
        currentCoords.y <= maxYCoord) {
        mainPinElement.style.top = currentCoords.y + `px`;
        mainPinElement.style.left = currentCoords.x + `px`;

        const mapPinEdgeYValue = Math.floor(currentCoords.y + window.constants.ACTIVE_MAP_PIN_SIZE);
        const mapPinEdgeXValue = Math.floor(currentCoords.x + (window.constants.ACTIVE_MAP_PIN_SIZE / 2));

        window.form.setAddress(`work`, mapPinEdgeXValue, mapPinEdgeYValue);
      }
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
};

window.pin = {
  mapPinsElement,
  setupPins(data) {
    fillDomWithPins(data);
  },
  initiatePins,
  handleMainPin,
  handlePinsAndCards,
  renderFilteredPins,
  moveMainPin
};


})();

(() => {
/*!********************!*\
  !*** ./js/card.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */



const announcements = [];
const getAnnouncements = (data) => {
  for (let item of data) {
    const announcement = {};
    announcement.title = item.offer.title;
    announcement.avatar = item.author.avatar;
    announcement.address = item.offer.address;
    announcement.price = item.offer.price;
    announcement.rooms = item.offer.rooms;
    announcement.guests = item.offer.guests;
    announcement.type = item.offer.type;
    announcement.checkin = item.offer.checkin;
    announcement.checkout = item.offer.checkout;
    announcement.features = item.offer.features;
    announcement.description = item.offer.description;
    announcement.photos = item.offer.photos;
    announcement.location = item.location;
    announcement.id = window.utils.getAvatarNumber(item.author.avatar);

    announcements.push(announcement);
  }
};
const fillDomWithAnnouncements = (data) => {
  const FRAGMENT = window.utils.fragment;
  const cardElement = document.querySelector(`#card`).content;
  const info = data;

  const cardElements = document.querySelectorAll(`.map__card`);
  cardElements.forEach((element) => {
    element.remove();
  });

  const generateCardElement = () => {
    const cardTemplate = cardElement.cloneNode(true);
    const cardTitle = cardTemplate.querySelector(`.popup__title`);
    const cardAddress = cardTemplate.querySelector(`.popup__text--address`);
    const cardPrice = cardTemplate.querySelector(`.popup__text--price`);
    const cardHouseType = cardTemplate.querySelector(`.popup__type`);
    const cardHouseRoomsAndGuests = cardTemplate.querySelector(`.popup__text--capacity`);
    const cardHouseCheckTime = cardTemplate.querySelector(`.popup__text--time`);
    const cardHouseFeatures = cardTemplate.querySelector(`.popup__features`);
    const cardHouseDescription = cardTemplate.querySelector(`.popup__description`);
    const cardHousePhotosElement = cardTemplate.querySelector(`.popup__photos`);
    const cardHousePhoto = cardTemplate.querySelector(`.popup__photos img`);
    const cardHouseUserAvatar = cardTemplate.querySelector(`.popup__avatar`);

    window.utils.checkUndefinedValue(info.title, cardTitle, () => {
      window.utils.enterTextContent(cardTitle, info.title);
    });
    window.utils.checkUndefinedValue(info.address, cardAddress, () => {
      window.utils.enterTextContent(cardAddress, info.address);
    });
    window.utils.checkUndefinedValue(info.price, cardPrice, () => {
      window.utils.enterTextContent(cardPrice, `${info.price}₽/ночь`);
    });
    window.utils.checkUndefinedValue(info.rooms, cardHouseRoomsAndGuests, () => {
      window.utils.checkUndefinedValue(info.guests, cardHouseRoomsAndGuests, () => {
        window.utils.enterTextContent(cardHouseRoomsAndGuests, `${info.rooms} комнаты для ${info.guests} гостей`);
      });
    });
    window.utils.checkUndefinedValue(info.checkin, cardHouseCheckTime, () => {
      window.utils.checkUndefinedValue(info.checkout, cardHouseCheckTime, () => {
        window.utils.enterTextContent(cardHouseCheckTime, `Заезд после ${info.checkin}, выезд до ${info.checkout}`);
      });
    });
    window.utils.checkUndefinedValue(info.features, cardHouseFeatures, () => {
      info.features.forEach((feature) => {
        cardHouseFeatures.textContent += ` ` + feature;
      });
    });
    window.utils.checkUndefinedValue(info.description, cardHouseDescription, () => {
      window.utils.enterTextContent(cardHouseDescription, info.description);
    });
    window.utils.checkUndefinedValue(info.photos, cardHousePhotosElement, () => {
      cardHousePhotosElement.innerHTML = ``;
      info.photos.forEach((photo) => {
        const photoSrc = photo;
        const cardPhoto = cardHousePhoto.cloneNode(true);
        cardPhoto.classList.add(`popup__photo`);
        cardPhoto.setAttribute(`width`, `45`);
        cardPhoto.setAttribute(`height`, `45`);
        cardPhoto.setAttribute(`alt`, info.title);
        cardPhoto.src = photoSrc;
        cardHousePhotosElement.appendChild(cardPhoto);
      });
    });
    window.utils.checkUndefinedValue(info.avatar, cardHouseUserAvatar, () => {
      cardHouseUserAvatar.src = info.avatar;
    });
    window.utils.checkUndefinedValue(info.type, cardHouseType, () => {
      switch (info.type) {
        case window.constants.OfferTypes.Palace:
          cardHouseType.textContent = `Дворец`;
          break;
        case window.constants.OfferTypes.Flat:
          cardHouseType.textContent = `Квартира`;
          break;
        case window.constants.OfferTypes.House:
          cardHouseType.textContent = `Дом`;
          break;
        default:
          cardHouseType.textContent = `Бунгало`;
          break;
      }
    });
    return cardTemplate;
  };

  FRAGMENT.appendChild(generateCardElement(data));
  window.map.mapSelector.insertBefore(FRAGMENT, window.map.mapFiltersContainer);
};
const handleCardEvents = () => {
  const popUpElement = document.querySelector(`.popup`);
  if (popUpElement) {
    const popUpCloseBtn = popUpElement.querySelector(`.popup__close`);
    popUpCloseBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      window.utils.hideElement(popUpElement);
    });
    popUpCloseBtn.addEventListener(`keydown`, (evt) => {
      const hideElement = () => {
        popUpElement.classList.add(`hidden`);
      };
      window.utils.checkKeyDownEvent(evt, `Enter`, hideElement);
    });
    document.addEventListener(`keydown`, (evt) => {
      const hideElement = () => {
        popUpElement.classList.add(`hidden`);
      };
      window.utils.checkKeyDownEvent(evt, `Escape`, hideElement);
    });
  }
};
window.card = {
  fillDomWithAnnouncements,
  handleCardEvents,
  getAnnouncements,
  announcements
};

})();

(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


window.map.initialSetup();
window.pin.initiatePins();
window.form.activateForm();


})();

/******/ })()
;