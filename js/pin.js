"use strict";

(function () {
  const FRAGMENT = window.util.fragment;
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
    setupPins() {
      const announcements = window.announcements;
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
      const fillDomWithPins = (data) => {
        for (let i = 0; i < data.length; i++) {
          FRAGMENT.appendChild(generateMapPinElement(data[i]));
        }
        mapPinsElement.appendChild(FRAGMENT);
      };
      const enterCoordinatesToAddress = () => {
        if (window.map.mapSelector.classList.contains(`map--faded`)) {
          const mapPinInactiveXCoord = window.util.removeSymbolsFromString(mapPinInactiveX, 2);
          const mapPinInactiveYCoord = window.util.removeSymbolsFromString(mapPinInactiveY, 2);
          const mapPinXCenterCoord = calculateMapPinCenterCoord(mapPinInactiveXCoord, window.data.ROUND_MAP_PIN_SIZE);
          const mapPinYCenterCoord = calculateMapPinCenterCoord(mapPinInactiveYCoord, window.data.ROUND_MAP_PIN_SIZE);
          const coordMessage = `${mapPinXCenterCoord} ${mapPinYCenterCoord}`;
          window.form.adFormAddress.setAttribute(`value`, coordMessage);
        }
      };
      fillDomWithPins(announcements);
      enterCoordinatesToAddress();
    },
    handlePinEvents() {
      mainPinElement.addEventListener(`mousedown`, (evt) => {
        window.util.checkMouseDownEvent(evt, 0, window.map.setMapActive);
      });

      mainPinElement.addEventListener(`keydown`, (evt) => {
        window.util.checkKeyDownEvent(evt, `Enter`, window.map.setMapActive);
      });
    }
  };
})();
