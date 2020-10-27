"use strict";

(function () {
  const announcements = [];
  const getAnnouncements = (data) => {
    for (let announcement of data) {
      const Announcement = {};
      Announcement.title = announcement.offer.title;
      Announcement.avatar = announcement.author.avatar;
      Announcement.address = announcement.offer.address;
      Announcement.price = announcement.offer.price;
      Announcement.rooms = announcement.offer.rooms;
      Announcement.guests = announcement.offer.guests;
      Announcement.type = announcement.offer.type;
      Announcement.checkin = announcement.offer.checkin;
      Announcement.checkout = announcement.offer.checkout;
      Announcement.features = announcement.offer.features;
      Announcement.description = announcement.offer.description;
      Announcement.photos = announcement.offer.photos;
      Announcement.location = announcement.location;
      Announcement.id = window.utils.getAvatarNumber(announcement.author.avatar);

      announcements.push(Announcement);
    }
  };
  const fillDomWithAnnouncements = (data) => {
    const FRAGMENT = window.utils.fragment;
    const cardElement = document.querySelector(`#card`).content;
    const info = data;

    const cardElements = document.querySelectorAll(`.map__card`);
    cardElements.forEach((element) => {
      element.remove();
    });

    const generateCardElement = () => {
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

      window.utils.checkUndefinedValue(info.title, cardTitle, () => {
        window.utils.enterTextContent(cardTitle, info.title);
      });
      window.utils.checkUndefinedValue(info.address, cardAddress, () => {
        window.utils.enterTextContent(cardAddress, info.address);
      });
      window.utils.checkUndefinedValue(info.price, cardPrice, () => {
        window.utils.enterTextContent(cardPrice, `${info.price}₽/ночь`);
      });
      window.utils.checkUndefinedValue(info.rooms, cardHouseRoomsAndGuests, () => {
        window.utils.checkUndefinedValue(info.guests, cardHouseRoomsAndGuests, () => {
          window.utils.enterTextContent(cardHouseRoomsAndGuests, `${info.rooms} комнаты для ${info.guests} гостей`);
        });
      });
      window.utils.checkUndefinedValue(info.checkin, cardHouseCheckTime, () => {
        window.utils.checkUndefinedValue(info.checkout, cardHouseCheckTime, () => {
          window.utils.enterTextContent(cardHouseCheckTime, `Заезд после ${info.checkin}, выезд до ${info.checkout}`);
        });
      });
      window.utils.checkUndefinedValue(info.features, cardHouseFeatures, () => {
        info.features.forEach((feature) => {
          cardHouseFeatures.textContent += ` ` + feature;
        });
      });
      window.utils.checkUndefinedValue(info.description, cardHouseDescription, () => {
        window.utils.enterTextContent(cardHouseDescription, info.description);
      });
      window.utils.checkUndefinedValue(info.photos, cardHousePhotosElement, () => {
        cardHousePhotosElement.innerHTML = ``;
        info.photos.forEach((photo) => {
          const photoSrc = photo;
          const cardPhoto = cardHousePhoto.cloneNode(true);
          cardPhoto.classList.add(`popup__photo`);
          cardPhoto.setAttribute(`width`, `45`);
          cardPhoto.setAttribute(`height`, `45`);
          cardPhoto.setAttribute(`alt`, info.title);
          cardPhoto.src = photoSrc;
          cardHousePhotosElement.appendChild(cardPhoto);
        });
      });
      window.utils.checkUndefinedValue(info.avatar, cardHouseUserAvatar, () => {
        cardHouseUserAvatar.src = info.avatar;
      });
      window.utils.checkUndefinedValue(info.type, cardHouseType, () => {
        switch (info.type) {
          case window.constants.OfferTypes.Palace:
            cardHouseType.textContent = `Дворец`;
            break;
          case window.constants.OfferTypes.Flat:
            cardHouseType.textContent = `Квартира`;
            break;
          case window.constants.OfferTypes.House:
            cardHouseType.textContent = `Дом`;
            break;
          default:
            cardHouseType.textContent = `Бунгало`;
            break;
        }
      });
      return cardTemplate;
    };

    FRAGMENT.appendChild(generateCardElement(data));
    window.map.mapSelector.insertBefore(FRAGMENT, window.map.mapFiltersContainer);
  };
  const handleCardEvents = () => {
    const popUpElement = document.querySelector(`.popup`);
    if (popUpElement) {
      const popUpCloseBtn = popUpElement.querySelector(`.popup__close`);
      popUpCloseBtn.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        window.utils.hideElement(popUpElement);
      });
      popUpCloseBtn.addEventListener(`keydown`, (evt) => {
        const hideElement = () => {
          popUpElement.classList.add(`hidden`);
        };
        window.utils.checkKeyDownEvent(evt, `Enter`, hideElement);
      });
      document.addEventListener(`keydown`, (evt) => {
        const hideElement = () => {
          popUpElement.classList.add(`hidden`);
        };
        window.utils.checkKeyDownEvent(evt, `Escape`, hideElement);
      });
    }
  };
  window.card = {
    fillDomWithAnnouncements,
    handleCardEvents,
    getAnnouncements,
    announcements
  };
})();
