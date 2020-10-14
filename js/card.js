"use strict";

(function () {
  window.card = {
    setupAnnouncements() {
      const announcements = [];
      const fillAnnouncements = () => {
        for (let i = 0; i < window.data.MAX_ANNOUNCEMENTS; i++) {
          const announcement = {
            author: {
              avatar: `img/avatars/user0${i + 1}.png`
            },
            offer: {
              title: window.data.HOUSE_TITLES[window.util.generateRandomValue(0, window.data.HOUSE_TITLES.length)],
              address: `${window.util.generateRandomValue(100, 450)}, ${window.util.generateRandomValue(0, 600)}`,
              price: window.util.generateRandomValue(0, 1000),
              type: window.data.HOUSE_TYPES[window.util.generateRandomValue(0, window.data.HOUSE_TYPES.length)],
              rooms: window.util.generateRandomValue(1, 4),
              guests: window.util.generateRandomValue(1, 10),
              checkin: window.data.CHECKIN_CHECKOUT_TIMES[window.util.generateRandomValue(0, window.data.CHECKIN_CHECKOUT_TIMES.length)],
              checkout: window.data.CHECKIN_CHECKOUT_TIMES[window.util.generateRandomValue(0, window.data.CHECKIN_CHECKOUT_TIMES.length)],
              features: window.util.generateRandomArray(window.data.HOUSE_FEATURES, window.util.generateRandomValue(1, window.data.HOUSE_FEATURES.length)),
              description: window.data.HOUSE_DESCRIPTIONS[window.util.generateRandomValue(0, window.data.HOUSE_DESCRIPTIONS.length)],
              photos: window.util.generateRandomArray(window.data.HOUSE_PHOTOS, window.util.generateRandomValue(1, window.data.HOUSE_PHOTOS.length))
            },
            location: {
              x: window.util.generateRandomValue(0, 1150),
              y: window.util.generateRandomValue(130, 630)
            }
          };
          announcements.push(announcement);
        }
        window.announcements = announcements;
      };
      fillAnnouncements();
    },
    fillDomWithAnnouncements(data) {
      const FRAGMENT = window.util.fragment;
      const cardElement = document.querySelector(`#card`).content;

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

        window.util.checkUndefinedValue(element.offer.title, cardTitle, () => {
          window.util.enterTextContent(cardTitle, element.offer.title);
        });
        window.util.checkUndefinedValue(element.offer.address, cardAddress, () => {
          window.util.enterTextContent(cardAddress, element.offer.address);
        });
        window.util.checkUndefinedValue(element.offer.price, cardPrice, () => {
          window.util.enterTextContent(cardPrice, `${element.offer.price}₽/ночь`);
        });
        window.util.checkUndefinedValue(element.offer.rooms, cardHouseRoomsAndGuests, () => {
          window.util.checkUndefinedValue(element.offer.guests, cardHouseRoomsAndGuests, () => {
            window.util.enterTextContent(cardHouseRoomsAndGuests, `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`);
          });
        });
        window.util.checkUndefinedValue(element.offer.checkin, cardHouseCheckTime, () => {
          window.util.checkUndefinedValue(element.offer.checkout, cardHouseCheckTime, () => {
            window.util.enterTextContent(cardHouseCheckTime, `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`);
          });
        });
        window.util.checkUndefinedValue(element.offer.features, cardHouseFeatures, () => {
          element.offer.features.forEach((feature) => {
            cardHouseFeatures.textContent += ` ` + feature;
          });
        });
        window.util.checkUndefinedValue(element.offer.description, cardHouseDescription, () => {
          window.util.enterTextContent(cardHouseDescription, element.offer.description);
        });
        window.util.checkUndefinedValue(element.offer.photos, cardHousePhotosElement, () => {
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
        window.util.checkUndefinedValue(element.author.avatar, cardHouseUserAvatar, () => {
          cardHouseUserAvatar.src = element.author.avatar;
        });
        window.util.checkUndefinedValue(element.offer.type, cardHouseType, () => {
          switch (element.offer.type) {
            case window.data.OfferTypes.Palace:
              cardHouseType.textContent = `Дворец`;
              break;
            case window.data.OfferTypes.Flat:
              cardHouseType.textContent = `Квартира`;
              break;
            case window.data.OfferTypes.House:
              cardHouseType.textContent = `Дом`;
              break;
            case window.data.OfferTypes.Bungalo:
              cardHouseType.textContent = `Бунгало`;
              break;
          }
        });
        return cardTemplate;
      };
      FRAGMENT.appendChild(generateCardElement(data));
      window.map.mapSelector.insertBefore(FRAGMENT, window.map.mapFiltersContainer);
    },
    handleCardEvents() {
      const popUpElement = document.querySelector(`.popup`);
      const popUpCloseBtn = popUpElement.querySelector(`.popup__close`);
      popUpCloseBtn.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        popUpElement.classList.add(`hidden`);
      });
    }
  };

})();
