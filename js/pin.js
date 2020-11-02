"use strict";

(function () {
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
    mapPinButton.setAttribute(`data-type`, element.offer.type);
    mapPinButton.setAttribute(`data-price`, element.offer.price);
    mapPinButton.setAttribute(`data-rooms`, element.offer.rooms);
    mapPinButton.setAttribute(`data-guests`, element.offer.guests);
    mapPinButton.setAttribute(`data-features`, element.offer.features);
    mapPinButton.setAttribute(`data-filter`, `filter`);

    return mapPinTemplate;
  };
  const fillDomWithPins = (pins) => {
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
          // const mapPinEdgeYValue = Math.floor(currentCoords.y - (window.constants.ACTIVE_MAP_PIN_SIZE + window.constants.ACTIVE_MAP_PIN_EDGE_HEIGHT));
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
