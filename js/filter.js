"use strict";

(function () {
  const filterForm = document.forms[0];
  const filterFormTypeElement = filterForm.querySelector(`#housing-type`);

  const filterTypes = () => {
    filterFormTypeElement.addEventListener(`change`, (evt) => {
      const mapCards = document.querySelectorAll(`.map__card`);
      const filterCardsAndPins = (type) => {
        mapCards.forEach((card) => {
          card.classList.add(`hidden`);
          if (type === card.querySelector(`.popup__type`).textContent) {
            const cardTitle = card.querySelector(`.popup__title`).textContent;
            window.pin.renderFilteredPins(cardTitle);
          } else if (type === `Все`) {
            window.pin.renderFilteredPins(`all`);
          }
        });
      };
      switch (evt.target.value) {
        case `palace`:
          filterCardsAndPins(`Дворец`);
          break;
        case `flat`:
          filterCardsAndPins(`Квартира`);
          break;
        case `bungalow`:
          filterCardsAndPins(`Бунгало`);
          break;
        case `house`:
          filterCardsAndPins(`Дом`);
          break;
        default:
          filterCardsAndPins(`Все`);
      }
    });
  };
  window.filter = {
    filterTypes
  };
})();
