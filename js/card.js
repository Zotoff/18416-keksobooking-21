"use strict";

(function () {
  const fillDomWithAnnouncements = (data) => {
    const FRAGMENT = window.utils.fragment;
    const cardElement = document.querySelector(`#card`).content;

    const generateCardElement = (element) => {
      const cardTemplate = cardElement.cloneNode(true);
      const cardMain = cardTemplate.querySelector(`.popup`);
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

      cardMain.classList.add(`hidden`);
      window.utils.checkUndefinedValue(element.offer.title, cardTitle, () => {
        window.utils.enterTextContent(cardTitle, element.offer.title);
      });
      window.utils.checkUndefinedValue(element.offer.address, cardAddress, () => {
        window.utils.enterTextContent(cardAddress, element.offer.address);
      });
      window.utils.checkUndefinedValue(element.offer.price, cardPrice, () => {
        window.utils.enterTextContent(cardPrice, `${element.offer.price}₽/ночь`);
      });
      window.utils.checkUndefinedValue(element.offer.rooms, cardHouseRoomsAndGuests, () => {
        window.utils.checkUndefinedValue(element.offer.guests, cardHouseRoomsAndGuests, () => {
          window.utils.enterTextContent(cardHouseRoomsAndGuests, `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`);
        });
      });
      window.utils.checkUndefinedValue(element.offer.checkin, cardHouseCheckTime, () => {
        window.utils.checkUndefinedValue(element.offer.checkout, cardHouseCheckTime, () => {
          window.utils.enterTextContent(cardHouseCheckTime, `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`);
        });
      });
      window.utils.checkUndefinedValue(element.offer.features, cardHouseFeatures, () => {
        element.offer.features.forEach((feature) => {
          cardHouseFeatures.textContent += ` ` + feature;
        });
      });
      window.utils.checkUndefinedValue(element.offer.description, cardHouseDescription, () => {
        window.utils.enterTextContent(cardHouseDescription, element.offer.description);
      });
      window.utils.checkUndefinedValue(element.offer.photos, cardHousePhotosElement, () => {
        cardHousePhotosElement.innerHTML = ``;
        element.offer.photos.forEach((photo) => {
          const photoSrc = photo;
          const cardPhoto = cardHousePhoto.cloneNode(true);
          cardPhoto.classList.add(`popup__photo`);
          cardPhoto.setAttribute(`width`, `45`);
          cardPhoto.setAttribute(`height`, `45`);
          cardPhoto.setAttribute(`alt`, element.offer.title);
          cardPhoto.src = photoSrc;
          cardHousePhotosElement.appendChild(cardPhoto);
        });
      });
      window.utils.checkUndefinedValue(element.author.avatar, cardHouseUserAvatar, () => {
        cardHouseUserAvatar.src = element.author.avatar;
      });
      window.utils.checkUndefinedValue(element.offer.type, cardHouseType, () => {
        switch (element.offer.type) {
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
    for (let item of data) {
      FRAGMENT.appendChild(generateCardElement(item));
    }
    window.map.mapSelector.insertBefore(FRAGMENT, window.map.mapFiltersContainer);
  };
  const handleCardEvents = () => {
    const popUpElements = document.querySelectorAll(`.popup`);
    popUpElements.forEach((element) => {
      const popUpCloseBtn = element.querySelector(`.popup__close`);
      popUpCloseBtn.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        window.utils.hideElement(element);
      });
      popUpCloseBtn.addEventListener(`keydown`, (evt) => {
        const hideElement = () => {
          element.classList.add(`hidden`);
        };
        window.utils.checkKeyDownEvent(evt, `Enter`, hideElement);
        window.utils.checkKeyDownEvent(evt, `Escape`, hideElement);
      });
    });
  };
  window.card = {
    fillDomWithAnnouncements,
    handleCardEvents
  };
})();
