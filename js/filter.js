"use strict";

(function () {
  const filterForm = document.forms[0];
  const filterFormTypeElement = filterForm.querySelector(`#housing-type`);
  const filterFormPriceELement = filterForm.querySelector(`#housing-price`);
  const filterFormRoomsElement = filterForm.querySelector(`#housing-rooms`);
  const filterFormGuestsElement = filterForm.querySelector(`#housing-guests`);
  const filterFormFeaturesFieldSet = filterForm.querySelector(`#housing-features`);

  let newType = `any`;
  let newPriceType = `any`;
  let newRooms = `any`;
  let newGuests = `any`;
  let newFeatures = [];

  const handleFilters = (data) => {
    const dataToFilter = [];
    for (let item of data) {
      dataToFilter.push(item);
    }

    const updateFilters = () => {

      const filteredByType = (item) => {
        if (item.offer.type === newType) {
          return item;
        } else if (item.offer.type === `any`) {
          return item;
        }
        return item;
      };
      const filteredByPrice = (item) => {
        switch (newPriceType) {
          case `low`:
            if (item.offer.price < 10000) {
              return item;
            }
            break;
          case `middle`:
            if (item.offer.price >= 10000 && item.offer.price <= 50000) {
              return item;
            }
            break;
          case `high`:
            if (item.offer.price > 50000) {
              return item;
            }
            break;
          default:
            return item;
        }
        return item;
      };

      const filteredByRooms = (item) => {
        if (item.offer.rooms === +newRooms) {
          return item;
        } else if (newRooms === `any`) {
          return item;
        }
        return item;
      };

      const filteredByGuests = (item) => {
        if (item.offer.guests === +newGuests) {
          return item;
        } else if (newGuests === `any`) {
          return item;
        }
        return item;
      };

      const filteredByFeatures = (item) => {
        newFeatures.forEach((element) => {
          item.offer.features.forEach((itemFeature) => {
            if (itemFeature.indexOf(element.value) !== -1) {
              return item;
            }
            return item;
          });
          return item;
        });
      };

      const filteredFinal = dataToFilter.filter(filteredByType).filter(filteredByPrice).filter(filteredByRooms).filter(filteredByGuests).filter(filteredByFeatures);
      return filteredFinal;
    };
    filterFormTypeElement.addEventListener(`change`, (evt) => {
      const type = evt.target.value;
      newType = type;
      updateFilters();
    });
    filterFormPriceELement.addEventListener(`change`, (evt) => {
      const priceType = evt.target.value;
      newPriceType = priceType;
      updateFilters();
    });
    filterFormRoomsElement.addEventListener(`change`, (evt) => {
      const rooms = evt.target.value;
      newRooms = rooms;
      updateFilters();
    });
    filterFormGuestsElement.addEventListener(`change`, (evt) => {
      const guests = evt.target.value;
      newGuests = guests;
      updateFilters();
    });
    filterFormFeaturesFieldSet.addEventListener(`change`, () => {
      let featuresAmount = filterFormFeaturesFieldSet.querySelectorAll(`input:checked`);
      const clickedFeatures = Array.from(featuresAmount);
      newFeatures = clickedFeatures;
      updateFilters();
    });
  };

  const filterTypes = () => {
    filterFormTypeElement.addEventListener(`change`, (evt) => {
      const filterablePins = document.querySelectorAll(`.map__pin[data-filter=filter]`);
      filterablePins.forEach((pin) => {
        if (evt.target.value !== `any` && pin.dataset.type !== evt.target.value) {
          pin.classList.add(`hidden`);
          return true;
        }
        pin.classList.remove(`hidden`);
        return pin;
      });
    });
  };

  const filterPrices = () => {
    filterFormPriceELement.addEventListener(`change`, (evt) => {
      evt.preventDefault();
      const filterablePins = document.querySelectorAll(`.map__pin[data-filter=filter]`);
      filterablePins.forEach((pin) => {
        const pinPrice = +pin.dataset.price;
        switch (evt.target.value) {
          case `middle`:
            if (pinPrice >= 50000 && pinPrice <= 10000) {
              pin.classList.add(`hidden`);
              return true;
            }
            break;
          case `low`:
            if (pinPrice > 10000) {
              pin.classList.add(`hidden`);
              return true;
            }
            break;
          case `high`:
            if (pinPrice > 50000) {
              pin.classList.add(`hidden`);
              return true;
            }
            break;
          default:
        }
        return true;
      });

    });
  };

  window.filter = {
    filterTypes,
    filterPrices,
    handleFilters
  };
})();
