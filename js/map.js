"use strict";

(function () {
  const mapFiltersForm = document.querySelector(`.map__filters`);
  const mapFiltersContainerElement = document.querySelector(`.map__filters-container`);
  const mapPinActiveX = document.querySelector(`.map__pin`).style.left;
  const mapPinActiveY = document.querySelector(`.map__pin`).style.top;
  const mapElement = document.querySelector(`.map`);
  const calculateMapPinEdgeCoord = (axis, coord, pinSize) => {
    let mapPinEdgeCoord = 0;
    if (axis === `x`) {
      mapPinEdgeCoord = Math.floor(+coord + (pinSize / 2));
    } else if (axis === `y`) {
      mapPinEdgeCoord = Math.floor(+coord + pinSize + window.constants.ACTIVE_MAP_PIN_EDGE_HEIGHT);
    }
    return mapPinEdgeCoord;
  };
  const initialSetup = () => {
    mapElement.classList.add(`map--faded`);
    mapFiltersForm.setAttribute(`disabled`, `true`);
    window.form.adFormElementFieldsets.forEach((element) => {
      element.setAttribute(`disabled`, `true`);
    });
    window.pin.handleMainPin();
  };

  window.map = {
    mapSelector: mapElement,
    mapFiltersContainer: mapFiltersContainerElement,
    initialSetup,
    setMapActive() {
      mapFiltersForm.removeAttribute(`disabled`);
      window.form.adFormElementFieldsets.forEach((element) => {
        element.removeAttribute(`disabled`);
      });
      window.form.adFormElement.classList.remove(`ad-form--disabled`);
      mapElement.classList.remove(`map--faded`);

      const mapPinActiveXCoord = window.utils.removeSymbolsFromString(mapPinActiveX, 2);
      const mapPinActiveYCoord = window.utils.removeSymbolsFromString(mapPinActiveY, 2);
      const mapPinActiveEdgeXCoord = calculateMapPinEdgeCoord(`x`, mapPinActiveXCoord, window.constants.ACTIVE_MAP_PIN_SIZE);
      const mapPinActiveEdgeYCoord = calculateMapPinEdgeCoord(`y`, mapPinActiveYCoord, window.constants.ACTIVE_MAP_PIN_SIZE);
      const edgePinCoordsMessage = `${mapPinActiveEdgeXCoord} ${mapPinActiveEdgeYCoord}`;
      window.form.adFormAddress.setAttribute(`value`, edgePinCoordsMessage);
      window.form.adFormAddress.setAttribute(`readonly`, `readonly`);

      const handleResponse = (data) => {
        const filteredResponse = data.slice(0, window.constants.FILTERED_PINS_AMOUNT);

        window.card.fillDomWithAnnouncements(filteredResponse);
        window.pin.setupPins(filteredResponse);
        window.form.interactWithForm();
        window.card.handleCardEvents();
        window.pin.handlePinsAndCards(document.querySelectorAll(`.map__pin`), document.querySelectorAll(`.map__card`));
        window.filter.filterTypes(filteredResponse);
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
  };
})();
