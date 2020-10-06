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

  const MAX_ANNOUNCEMENTS = 8;

  const announcements = [];
  const mapElement = document.querySelector(`.map`);
  const mapFiltersContainer = document.querySelector(`.map__filters-container`);
  const mapPinsElement = document.querySelector(`.map__pins`);
  const mapPinElement = document.querySelector(`#pin`).content;
  const cardElement = document.querySelector(`#card`).content;

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

  const checkUndefinedValue = (element, selector, cb) => {
    if (!element) {
      selector.classList.add(`hidden`);
    } else {
      cb();
    }
  };

  const enterTextContent = (selector, content) => {
    selector.textContent = content;
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

  mapElement.classList.remove(`.map--faded`);

  fillDomWithPins(announcements);
  fillDomWithAnnouncements(announcements[0]);

  mapPinsElement.appendChild(FRAGMENT);
})();
