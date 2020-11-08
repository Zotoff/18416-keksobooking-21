"use strict";

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
