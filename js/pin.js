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
    pins.forEach((pin) => {
      FRAGMENT.appendChild(generateMapPinElement(pin));
    });
    mapPinsElement.appendChild(FRAGMENT);
  };

  window.pin = {
    setupPins(data) {
      fillDomWithPins(data);
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
    handleMainPin() {
      mainPinElement.addEventListener(`mousedown`, (evt) => {
        window.utils.checkMouseDownEvent(evt, 0, window.map.setMapActive);
      });

      mainPinElement.addEventListener(`keydown`, (evt) => {
        window.utils.checkKeyDownEvent(evt, `Enter`, window.map.setMapActive);
      });
    },
    handlePinsAndCards(pins, cards) {
      pins.forEach((pin) => {
        pin.addEventListener(`click`, (evt) => {
          evt.preventDefault();
          const pinAlt = pin.querySelector(`img`).alt;
          cards.forEach((card) => {
            if (card.querySelector(`.popup__title`).innerText === pinAlt) {
              card.classList.toggle(`hidden`);
            } else {
              card.classList.add(`hidden`);
            }
          });
        });
      });
    }
  };
})();