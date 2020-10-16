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
      mapPinEdgeCoord = Math.floor(+coord + pinSize + window.data.ACTIVE_MAP_PIN_EDGE_HEIGHT);
    }
    return mapPinEdgeCoord;
  };

  window.map = {
    mapSelector: mapElement,
    mapFiltersContainer: mapFiltersContainerElement,
    initialSetup() {
      mapElement.classList.add(`map--faded`);
      mapFiltersForm.setAttribute(`disabled`, `true`);
      window.form.adFormElementFieldsets.forEach((element) => {
        element.setAttribute(`disabled`, `true`);
      });
    },
    setMapActive() {
      mapFiltersForm.removeAttribute(`disabled`);
      window.form.adFormElementFieldsets.forEach((element) => {
        element.removeAttribute(`disabled`);
      });
      window.form.adFormElement.classList.remove(`ad-form--disabled`);
      mapElement.classList.remove(`map--faded`);

      const mapPinActiveXCoord = window.utils.removeSymbolsFromString(mapPinActiveX, 2);
      const mapPinActiveYCoord = window.utils.removeSymbolsFromString(mapPinActiveY, 2);
      const mapPinActiveEdgeXCoord = calculateMapPinEdgeCoord(`x`, mapPinActiveXCoord, window.data.ACTIVE_MAP_PIN_SIZE);
      const mapPinActiveEdgeYCoord = calculateMapPinEdgeCoord(`y`, mapPinActiveYCoord, window.data.ACTIVE_MAP_PIN_SIZE);

      const edgePinCoordsMessage = `${mapPinActiveEdgeXCoord} ${mapPinActiveEdgeYCoord}`;
      window.form.adFormAddress.setAttribute(`value`, edgePinCoordsMessage);
      window.form.adFormAddress.setAttribute(`readonly`, `readonly`);
      window.pin.setupPins(window.card.announcements);
      window.card.fillDomWithAnnouncements(window.card.announcements);
      window.card.handleCardEvents();
      window.form.submitForm();
    },
  };
})();
