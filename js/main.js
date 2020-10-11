"use strict";
(function () {
  const FRAGMENT = document.createDocumentFragment();

  const HOUSE_TITLES = [
    `Уютный дом`,
    `Классное бунгало`,
    `Милый особняк`,
    `Роскошный кексохаус`,
    `Деревянная пагода`,
    `Кексобукинг`,
    `Милый отель`,
    `Апартаменты у моря`,
  ];

  const HOUSE_TYPES = [
    `palace`,
    `flat`,
    `house`,
    `bungalow`
  ];

  const CHECKIN_CHECKOUT_TIMES = [
    `12:00`,
    `13:00`,
    `14:00`
  ];

  const HOUSE_FEATURES = [
    `wifi`,
    `dishwasher`,
    `parking`,
    `washer`,
    `elevator`,
    `conditioner`
  ];

  const HOUSE_DESCRIPTIONS = [
    `Good House`,
    `Simple House with parking`,
    `Awesome house`,
    `Bad house`
  ];

  const HOUSE_PHOTOS = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  ];

  const GUESTS_VALUES = [
    `1`,
    `2`,
    `3`,
    `0`
  ];

  const ROOMS_VALUES = [
    `1`,
    `2`,
    `3`,
    `100`
  ];

  const TYPES_VALUES = [`bungalow`, `flat`, `house`, `palace`];
  const MIN_PRICES = [`0`, `1000`, `5000`, `10000`];
  const TIMES_VALUES = [`12:00`, `13:00`, `14:00`];

  const ERROR_MESSAGES = {
    valueMissing: `Пожалуйста, заполните форму`,
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
  };

  const MAX_ANNOUNCEMENTS = 8;

  const ROUND_MAP_PIN_SIZE = 65;
  const ACTIVE_MAP_PIN_SIZE = 65;
  const ACTIVE_MAP_PIN_EDGE_HEIGHT = 20;

  const announcements = [];
  const mapElement = document.querySelector(`.map`);
  const mapFiltersContainer = document.querySelector(`.map__filters-container`);
  const mapPinsElement = document.querySelector(`.map__pins`);
  const mapPinElement = document.querySelector(`#pin`).content;
  const cardElement = document.querySelector(`#card`).content;
  const mapFiltersForm = document.querySelector(`.map__filters`);
  const mainPinElement = document.querySelector(`.map__pin--main`);

  const adFormElement = document.querySelector(`.ad-form`);
  const adFormElementFieldsets = adFormElement.querySelectorAll(`fieldset`);
  const adFormTitle = adFormElement.querySelector(`#title`);
  const adFormType = adFormElement.querySelector(`#type`);
  const adFormPrice = adFormElement.querySelector(`#price`);
  const adFormAddress = adFormElement.querySelector(`#address`);
  const adFormCheckIn = adFormElement.querySelector(`#timein`);
  const adFormCheckOut = adFormElement.querySelector(`#timeout`);
  const adFormRoom = adFormElement.querySelector(`#room_number`);
  const adFormCapacity = adFormElement.querySelector(`#capacity`);
  const adFormSubmitBtn = adFormElement.querySelector(`button[type=submit]`);

  const mapPinInactiveX = document.querySelector(`.map__pin`).style.left;
  const mapPinInactiveY = document.querySelector(`.map__pin`).style.top;

  const mapPinActiveX = document.querySelector(`.map__pin`).style.left;
  const mapPinActiveY = document.querySelector(`.map__pin`).style.top;

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

  const setMapActive = () => {
    mapFiltersForm.removeAttribute(`disabled`);
    adFormElementFieldsets.forEach((element) => {
      element.removeAttribute(`disabled`);
    });
    adFormElement.classList.remove(`ad-form--disabled`);
    mapElement.classList.remove(`map--faded`);

    const mapPinActiveXCoord = removeSymbolsFromString(mapPinActiveX, 2);
    const mapPinActiveYCoord = removeSymbolsFromString(mapPinActiveY, 2);
    const mapPinActiveEdgeXCoord = calculateMapPinEdgeCoord(`x`, mapPinActiveXCoord, ACTIVE_MAP_PIN_SIZE);
    const mapPinActiveEdgeYCoord = calculateMapPinEdgeCoord(`y`, mapPinActiveYCoord, ACTIVE_MAP_PIN_SIZE);

    const edgePinCoordsMessage = `${mapPinActiveEdgeXCoord} ${mapPinActiveEdgeYCoord}`;
    adFormAddress.setAttribute(`value`, edgePinCoordsMessage);
    adFormAddress.setAttribute(`disabled`, `true`);

    fillDomWithPins(announcements);
    fillDomWithAnnouncements(announcements[0]);

    activateForm();
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

  const calculateMapPinCenterCoord = (coord, pinSize) => {
    const centerCoord = Math.floor(+coord + (pinSize / 2));
    return centerCoord;
  };

  const calculateMapPinEdgeCoord = (axis, coord, pinSize) => {
    let mapPinEdgeCoord = 0;
    if (axis === `x`) {
      mapPinEdgeCoord = Math.floor(+coord + (pinSize / 2));
    } else if (axis === `y`) {
      mapPinEdgeCoord = Math.floor(+coord + pinSize + ACTIVE_MAP_PIN_EDGE_HEIGHT);
    }
    return mapPinEdgeCoord;
  };

  const enterTextContent = (selector, content) => {
    selector.textContent = content;
  };

  const checkInputValidity = (item) => {
    if (item.validity.valueMissing) {
      item.setCustomValidity(ERROR_MESSAGES.valueMissing);
      makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
    } else if (item.validity.wrongRoom) {
      item.setCustomValidity(ERROR_MESSAGES.wrongRoom);
      makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
    } else if (item.validity.emptyItem) {
      item.setCustomValidity(ERROR_MESSAGES.emptyItem);
      makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
    } else if (item.validity.badInput) {
      item.setCustomValidity(ERROR_MESSAGES.badInput);
      makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
    } else if (item.validity.patternMismatch) {
      item.setCustomValidity(ERROR_MESSAGES.patternMismatch);
      makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
    } else if (item.validity.rangeOverflow) {
      item.setCustomValidity(ERROR_MESSAGES.rangeOverflow);
      makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
    } else if (item.validity.rangeUnderflow) {
      item.setCustomValidity(ERROR_MESSAGES.rangeUnderflow);
      makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
    } else if (item.validity.stepMismatch) {
      item.setCustomValidity(ERROR_MESSAGES.stepMismatch);
      makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
    } else if (item.validity.tooLong) {
      item.setCustomValidity(ERROR_MESSAGES.tooLong);
      makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
    } else if (item.validity.tooShort) {
      item.setCustomValidity(ERROR_MESSAGES.tooShort);
      makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
    } else if (item.validity.typeMismatch) {
      item.setCustomValidity(ERROR_MESSAGES.typeMismatch);
      makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
    } else {
      removeRedBorder(item);
      item.setCustomValidity(``);
      item.parentNode.setAttribute(`valid`, `true`);
    }
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

  syncFields(adFormRoom, adFormCapacity, ROOMS_VALUES, GUESTS_VALUES, syncGuestWithRooms);
  syncFields(adFormType, adFormPrice, TYPES_VALUES, MIN_PRICES, syncValueWithMin);
  syncFields(adFormCheckIn, adFormCheckOut, TIMES_VALUES, TIMES_VALUES, syncValue);

  const activateForm = () => {
    syncFields(adFormRoom, adFormCapacity, ROOMS_VALUES, GUESTS_VALUES, syncGuestWithRooms);
    syncFields(adFormType, adFormPrice, TYPES_VALUES, MIN_PRICES, syncValueWithMin);
    syncFields(adFormCheckIn, adFormCheckOut, TIMES_VALUES, TIMES_VALUES, syncValue);
    adFormRoom.addEventListener(`change`, () => {
      syncFields(adFormRoom, adFormCapacity, ROOMS_VALUES, GUESTS_VALUES, syncGuestWithRooms);
    });
    adFormType.addEventListener(`change`, () => {
      syncFields(adFormType, adFormPrice, TYPES_VALUES, MIN_PRICES, syncValueWithMin);
    });
    adFormCheckIn.addEventListener(`change`, () => {
      syncFields(adFormCheckIn, adFormCheckOut, TIMES_VALUES, TIMES_VALUES, syncValue);
    });
  };

  const interactWithForm = () => {
    checkInputValidity(adFormTitle);
    checkInputValidity(adFormPrice);
    checkInputValidity(adFormAddress);
  };

  // const syncQuestWithRooms = (guest, room) => {
  //   if (guest !== room) {
  //     adFormCapacity.setCustomValidity(ERROR_MESSAGES.wrongRoom);
  //     makeRedBorder(adFormCapacity);
  //   } else {
  //     adFormCapacity.setCustomValidity(``);
  //     removeRedBorder(adFormCapacity);
  //   }
  //   adFormCapacity.addEventListener(`change`, (evt) => {
  //     console.log(`Change`);
  //     syncQuestWithRooms(guest, evt.target.value);
  //   });
  //   // const initialSelection = element.querySelector(`option[selected]`).value;
  //   // const capacityInitialSelection = adFormCapacity.querySelector(`option[selected]`).value;
  //   // if (initialSelection !== capacityInitialSelection) {
  //   //   adFormCapacity.setCustomValidity(ERROR_MESSAGES.wrongRoom);
  //   //   makeRedBorder(adFormCapacity);
  //   // } else {
  //   //   removeRedBorder(adFormCapacity);
  //   // }
  //   // adFormCapacity.addEventListener(`change`, (evt) => {
  //   //   if (initialSelection !== evt.target.value) {
  //   //     console.log(`firstWrong`);
  //   //     adFormCapacity.setCustomValidity(ERROR_MESSAGES.wrongRoom);
  //   //     makeRedBorder(adFormCapacity);
  //   //   } else {
  //   //     console.log(`firstCheck...`);
  //   //     adFormCapacity.setCustomValidity(``);
  //   //     removeRedBorder(adFormCapacity);
  //   //     const newCurrent = evt.target.querySelector(`option[value="${evt.target.value}"]`);
  //   //     checkQuestsValidity()
  //   //   }
  //   // });
  //   // adFormRoomNumber.addEventListener(`change`, (evt) => {
  //   //   const roomNumber = evt.target.value;
  //   //   switch (roomNumber) {
  //   //     case `1`:
  //   //       adFormCapacity.addEventListener(`change`, (ev) => {
  //   //         if (ev.target.value === `0`) {
  //   //           adFormCapacity.setCustomValidity(`Вы выбрали неподходящую комнату`);
  //   //           makeRedBorder(adFormCapacity);
  //   //         } else {
  //   //           adFormCapacity.setCustomValidity(``);
  //   //           removeRedBorder(adFormCapacity);
  //   //         }
  //   //       });
  //   //   }
  //   // });
  //   // adFormCapacity.addEventListener(`change`, (ev) => {
  //   //   if (ev.target.value === `0`) {
  //   //     adFormCapacity.setCustomValidity(`Вы выбрали неподходящую комнату`);
  //   //   } else {
  //   //     adFormCapacity.setCustomValidity(``);
  //   //   }
  //   // });
  // };

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


  const generateCardElement = (element) => {
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

    checkUndefinedValue(element.offer.title, cardTitle, () => {
      enterTextContent(cardTitle, element.offer.title);
    });
    checkUndefinedValue(element.offer.address, cardAddress, () => {
      enterTextContent(cardAddress, element.offer.address);
    });
    checkUndefinedValue(element.offer.price, cardPrice, () => {
      enterTextContent(cardPrice, `${element.offer.price}₽/ночь`);
    });
    checkUndefinedValue(element.offer.rooms, cardHouseRoomsAndGuests, () => {
      checkUndefinedValue(element.offer.guests, cardHouseRoomsAndGuests, () => {
        enterTextContent(cardHouseRoomsAndGuests, `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`);
      });
    });
    checkUndefinedValue(element.offer.checkin, cardHouseCheckTime, () => {
      checkUndefinedValue(element.offer.checkout, cardHouseCheckTime, () => {
        enterTextContent(cardHouseCheckTime, `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`);
      });
    });
    checkUndefinedValue(element.offer.features, cardHouseFeatures, () => {
      element.offer.features.forEach((feature) => {
        cardHouseFeatures.textContent += ` ` + feature;
      });
    });
    checkUndefinedValue(element.offer.description, cardHouseDescription, () => {
      enterTextContent(cardHouseDescription, element.offer.description);
    });
    checkUndefinedValue(element.offer.photos, cardHousePhotosElement, () => {
      cardHousePhotosElement.innerHTML = ``;
      for (let i = 0; i < element.offer.photos.length; i++) {
        const photoSrc = element.offer.photos[i];
        const cardPhoto = cardHousePhoto.cloneNode(true);
        cardPhoto.classList.add(`popup__photo`);
        cardPhoto.setAttribute(`width`, `45`);
        cardPhoto.setAttribute(`height`, `45`);
        cardPhoto.setAttribute(`alt`, element.offer.title);
        cardPhoto.src = photoSrc;
        cardHousePhotosElement.appendChild(cardPhoto);
      }
    });
    checkUndefinedValue(element.author.avatar, cardHouseUserAvatar, () => {
      cardHouseUserAvatar.src = element.author.avatar;
    });
    checkUndefinedValue(element.offer.type, cardHouseType, () => {
      switch (element.offer.type) {
        case `palace`:
          cardHouseType.textContent = `Дворец`;
          break;
        case `flat`:
          cardHouseType.textContent = `Квартира`;
          break;
        case `house`:
          cardHouseType.textContent = `Дом`;
          break;
        case `bungalow`:
          cardHouseType.textContent = `Бунгало`;
          break;
      }
    });
    return cardTemplate;
  };

  const fillDomWithPins = (data) => {
    for (let i = 0; i < data.length; i++) {
      FRAGMENT.appendChild(generateMapPinElement(data[i]));
    }
  };

  const fillDomWithAnnouncements = (data) => {
    FRAGMENT.appendChild(generateCardElement(data));
    mapElement.insertBefore(FRAGMENT, mapFiltersContainer);
  };


  for (let i = 0; i < MAX_ANNOUNCEMENTS; i++) {
    const announcement = {
      author: {
        avatar: `img/avatars/user0${i + 1}.png`
      },
      offer: {
        title: HOUSE_TITLES[generateRandomValue(0, HOUSE_TITLES.length)],
        address: `${generateRandomValue(100, 450)}, ${generateRandomValue(0, 600)}`,
        price: generateRandomValue(0, 1000),
        type: HOUSE_TYPES[generateRandomValue(0, HOUSE_TYPES.length)],
        rooms: generateRandomValue(1, 4),
        guests: generateRandomValue(1, 10),
        checkin: CHECKIN_CHECKOUT_TIMES[generateRandomValue(0, CHECKIN_CHECKOUT_TIMES.length)],
        checkout: CHECKIN_CHECKOUT_TIMES[generateRandomValue(0, CHECKIN_CHECKOUT_TIMES.length)],
        features: generateRandomArray(HOUSE_FEATURES, generateRandomValue(1, HOUSE_FEATURES.length)),
        description: HOUSE_DESCRIPTIONS[generateRandomValue(0, HOUSE_DESCRIPTIONS.length)],
        photos: generateRandomArray(HOUSE_PHOTOS, generateRandomValue(1, HOUSE_PHOTOS.length))
      },
      location: {
        x: generateRandomValue(0, 1150),
        y: generateRandomValue(130, 630)
      }
    };
    announcements.push(announcement);
  }

  mapPinsElement.appendChild(FRAGMENT);

  mapFiltersForm.setAttribute(`disabled`, `true`);
  adFormElementFieldsets.forEach((element) => {
    element.setAttribute(`disabled`, `true`);
  });

  if (mapElement.classList.contains(`map--faded`)) {
    const mapPinInactiveXCoord = removeSymbolsFromString(mapPinInactiveX, 2);
    const mapPinInactiveYCoord = removeSymbolsFromString(mapPinInactiveY, 2);
    const mapPinXCenterCoord = calculateMapPinCenterCoord(mapPinInactiveXCoord, ROUND_MAP_PIN_SIZE);
    const mapPinYCenterCoord = calculateMapPinCenterCoord(mapPinInactiveYCoord, ROUND_MAP_PIN_SIZE);
    const coordMessage = `${mapPinXCenterCoord} ${mapPinYCenterCoord}`;
    adFormAddress.setAttribute(`value`, coordMessage);
  }

  mainPinElement.addEventListener(`mousedown`, (evt) => {
    checkMouseDownEvent(evt, 0, setMapActive);
  });

  mainPinElement.addEventListener(`keydown`, (evt) => {
    checkKeyDownEvent(evt, `Enter`, setMapActive);
  });

  adFormSubmitBtn.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    activateForm();
    interactWithForm();
    const fieldSets = adFormElement.querySelectorAll(`fieldset[valid=false]`);
    if (fieldSets.length === 0) {
      adFormElement.submit();
    }
  });
})();
