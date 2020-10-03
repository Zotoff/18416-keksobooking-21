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
  const mapPinsElement = document.querySelector(`.map__pins`);
  const mapPinElement = document.querySelector(`#pin`).content;

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

  const generateDOMelement = (element) => {
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
      FRAGMENT.appendChild(generateDOMelement(data[i]));
    }
  };


  for (let i = 0; i < MAX_ANNOUNCEMENTS; i++) {
    const announcement = {
      author: {
        avatar: `img/avatars/user` + (i < MAX_ANNOUNCEMENTS ? `0` : ``) + (i + 1) + `.png`
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

  mapPinsElement.appendChild(FRAGMENT);
})();
