"use strict";

(function () {
  const FRAGMENT = window.utils.fragment;
  const mapPinsElement = document.querySelector(`.map__pins`);
  const mapPinElement = document.querySelector(`#pin`).content;
  const mainPinElement = document.querySelector(`.map__pin--main`);
  const mapPinInactiveX = document.querySelector(`.map__pin`).style.left;
  const mapPinInactiveY = document.querySelector(`.map__pin`).style.top;

  const calculateMapPinCenterCoord = (coord, pinSize) => {
    const centerCoord = Math.floor(+coord + (pinSize / 2));
    return centerCoord;
  };

  window.pin = {
    setupPins(data) {
      const announcements = data;
      const generateMapPinElement = (element) => {
        const mapPinTemplate = mapPinElement.cloneNode(true);
        const mapPinButton = mapPinTemplate.querySelector(`.map__pin`);
        const mapPinButtonImage = mapPinTemplate.querySelector(`img`);

        mapPinButton.style.left = `${element.location.x}px`;
        mapPinButton.style.top = `${element.location.y + 35}px`;
        mapPinButtonImage.src = element.author.avatar;
        mapPinButtonImage.setAttribute(`alt`, element.offer.title);

        return mapPinTemplate;
      };
      const fillDomWithPins = (pins) => {
        for (let item of pins) {
          FRAGMENT.appendChild(generateMapPinElement(item));
        }
        mapPinsElement.appendChild(FRAGMENT);
      };
      fillDomWithPins(announcements);
    },
    initiatePins() {
      if (window.map.mapSelector.classList.contains(`map--faded`)) {
        const mapPinInactiveXCoord = window.utils.removeSymbolsFromString(mapPinInactiveX, 2);
        const mapPinInactiveYCoord = window.utils.removeSymbolsFromString(mapPinInactiveY, 2);
        const mapPinXCenterCoord = calculateMapPinCenterCoord(mapPinInactiveXCoord, window.data.ROUND_MAP_PIN_SIZE);
        const mapPinYCenterCoord = calculateMapPinCenterCoord(mapPinInactiveYCoord, window.data.ROUND_MAP_PIN_SIZE);
        const coordMessage = `${mapPinXCenterCoord} ${mapPinYCenterCoord}`;
        window.form.adFormAddress.setAttribute(`value`, coordMessage);
      }
    },
    handlePinEvents() {
      mainPinElement.addEventListener(`mousedown`, (evt) => {
        window.utils.checkMouseDownEvent(evt, 0, window.map.setMapActive);
      });

      mainPinElement.addEventListener(`keydown`, (evt) => {
        window.utils.checkKeyDownEvent(evt, `Enter`, window.map.setMapActive);
      });
    }
  };
})();
