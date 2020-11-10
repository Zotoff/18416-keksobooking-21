"use strict";

const announcements = [];
const getAnnouncements = (data) => {
  for (let item of data) {
    const announcement = {};
    announcement.title = item.offer.title;
    announcement.avatar = item.author.avatar;
    announcement.address = item.offer.address;
    announcement.price = item.offer.price;
    announcement.rooms = item.offer.rooms;
    announcement.guests = item.offer.guests;
    announcement.type = item.offer.type;
    announcement.checkin = item.offer.checkin;
    announcement.checkout = item.offer.checkout;
    announcement.features = item.offer.features;
    announcement.description = item.offer.description;
    announcement.photos = item.offer.photos;
    announcement.location = item.location;
    announcement.id = window.utils.getAvatarNumber(item.author.avatar);

    announcements.push(announcement);
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

  const popUpElement = document.querySelector(`.popup`);

  const closePopUpButton = popUpElement.querySelector(`.popup__close`);

  const closePopUp = () => {
    popUpElement.remove();
    closePopUpButton.removeEventListener(`click`, clickCloseButton);
    document.removeEventListener(`keydown`, pressEscapeOnPopup);
  };
  const pressEscapeOnPopup = (evt) => {
    window.utils.checkKeyDownEvent(evt, `Escape`, closePopUp);
  };
  const clickCloseButton = () => {
    closePopUp();
  };
  closePopUpButton.addEventListener(`click`, clickCloseButton);

  document.addEventListener(`keydown`, pressEscapeOnPopup);
};

const removeCardElements = () => {
  const cards = document.querySelectorAll(`.map__card`);
  cards.forEach((card) => {
    card.remove();
  });
};

window.card = {
  fillDomWithAnnouncements,
  getAnnouncements,
  announcements,
  removeCardElements
};
