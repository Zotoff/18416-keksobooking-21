"use strict";
(function () {
  const announcements = [];
  const mapElement = document.querySelector(`.map`);
  const mapPinsElement = document.querySelector(`.map__pins`);
  const mapPinElement = document.querySelector(`#pin`).content;
  const FRAGMENT = document.createDocumentFragment();

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

    mapPinButton.style.left = `${element.location.x + 25}px`;
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


  const houseTitles = [
    `Уютный дом`,
    `Классное бунгало`,
    `Милый особняк`,
    `Роскошный кексохаус`,
    `Деревянная пагода`,
    `Кексобукинг`,
    `Милый отель`,
    `Апартаменты у моря`,
  ];

  const houseTypes = [
    `palace`,
    `flat`,
    `house`,
    `bungalow`
  ];

  const checkinTimes = [
    `12:00`,
    `13:00`,
    `14:00`
  ];

  const checkOutTimes = [
    `12:00`,
    `13:00`,
    `14:00`
  ];

  const houseFeatures = [
    `wifi`,
    `dishwasher`,
    `parking`,
    `washer`,
    `elevator`,
    `conditioner`
  ];

  const houseDescriptions = [
    `Good House`,
    `Simple House with parking`,
    `Awesome house`,
    `Bad house`
  ];

  const housePhotos = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  ];

  for (let i = 0; i < 8; i++) {
    const announcement = {
      author: {
        avatar: `img/avatars/user0${generateRandomValue(1, 8)}.png`
      },
      offer: {
        title: houseTitles[generateRandomValue(0, houseTitles.length)],
        address: `${generateRandomValue(100, 450)}, ${generateRandomValue(0, 600)}`,
        price: generateRandomValue(0, 1000),
        type: houseTypes[generateRandomValue(0, houseTypes.length)],
        rooms: generateRandomValue(1, 4),
        guests: generateRandomValue(1, 10),
        checkin: checkinTimes[generateRandomValue(0, checkinTimes.length)],
        checkout: checkOutTimes[generateRandomValue(0, checkOutTimes.length)],
        features: generateRandomArray(houseFeatures, generateRandomValue(1, houseFeatures.length)),
        description: houseDescriptions[generateRandomValue(0, houseDescriptions.length)],
        photos: generateRandomArray(housePhotos, generateRandomValue(1, housePhotos.length))
      },
      location: {
        x: generateRandomValue(0, 1200),
        y: generateRandomValue(130, 630)
      }
    };
    announcements.push(announcement);
  }

  mapElement.classList.remove(`.map--faded`);

  fillDomWithPins(announcements);

  mapPinsElement.appendChild(FRAGMENT);
})();
