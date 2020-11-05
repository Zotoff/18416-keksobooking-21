"use strict";

(function () {
  const filterForm = document.forms[0];
  const filterFormTypeElement = filterForm.querySelector(`#housing-type`);
  const filterFormPriceELement = filterForm.querySelector(`#housing-price`);
  const filterFormRoomsElement = filterForm.querySelector(`#housing-rooms`);
  const filterFormGuestsElement = filterForm.querySelector(`#housing-guests`);
  const filterFormFeaturesFieldSet = filterForm.querySelector(`#housing-features`);

  const filter = {
    type: window.constants.FilterValues.any,
    price: window.constants.FilterValues.any,
    guests: window.constants.FilterValues.any,
    rooms: window.constants.FilterValues.any,
    features: []
  };

  const handleFilters = (data) => {
    const dataToFilter = [];
    const filteredResponse = data.slice(0, window.constants.FILTERED_PINS_AMOUNT);
    for (let item of filteredResponse) {
      dataToFilter.push(item);
    }
    const updateFilters = () => {

      const filterTypes = (type, item) => {
        switch (type) {
          case window.constants.FilterValues.any:
            return item;
          default:
            if (item.offer.type === filter.type) {
              return item;
            } else {
              return false;
            }
        }
      };
      const filterGuests = (guests, item) => {
        switch (guests) {
          case window.constants.FilterValues.any:
            return item;
          default:
            if (item.offer.guests === +filter.guests) {
              return item;
            } else {
              return false;
            }
        }
      };
      const filterRooms = (rooms, item) => {
        switch (rooms) {
          case window.constants.FilterValues.any:
            return item;
          default:
            if (item.offer.rooms === +filter.rooms) {
              return item;
            } else {
              return false;
            }
        }
      };
      const filterPrice = (price, item) => {
        switch (price) {
          case window.constants.FilterValues.low:
            if (item.offer.price < 10000) {
              return item;
            } else {
              return false;
            }
          case window.constants.FilterValues.middle:
            if (item.offer.price > 10000 && item.offer.price <= 50000) {
              return item;
            } else {
              return false;
            }
          case window.constants.FilterValues.high:
            if (item.offer.price > 50000) {
              return item;
            } else {
              return false;
            }
          default:
            return item;
        }
      };
      const filterFeatures = (features, item) => {
        if (!features.length) {
          return true;
        }
        let hasAllFeatures = true;
        for (let i = 0; i < features.length; i++) {
          if (!item.offer.features.includes(features[i])) {
            hasAllFeatures = false;
            break;
          }
        }
        return hasAllFeatures;
      };
      const filteredFinal = dataToFilter.filter((item) => filterTypes(filter.type, item) && filterGuests(filter.guests, item) && filterRooms(filter.rooms, item) && filterPrice(filter.price, item) && filterFeatures(filter.features, item));
      window.card.getAnnouncements(filteredFinal);
      window.pin.setupPins(filteredFinal);
      window.pin.handlePinsAndCards(document.querySelectorAll(`.map__pin[type=button]`));
    };
    filterFormTypeElement.addEventListener(`change`, (evt) => {
      const type = evt.target.value;
      filter.type = type;
      updateFilters();
    });
    filterFormRoomsElement.addEventListener(`change`, (evt) => {
      const rooms = evt.target.value;
      filter.rooms = rooms;
      updateFilters();
    });
    filterFormGuestsElement.addEventListener(`change`, (evt) => {
      const guests = evt.target.value;
      filter.guests = guests;
      updateFilters();
    });
    filterFormPriceELement.addEventListener(`change`, (evt) => {
      const priceType = evt.target.value;
      filter.price = priceType;
      updateFilters();
    });
    filterFormFeaturesFieldSet.addEventListener(`change`, () => {
      let featuresAmount = filterFormFeaturesFieldSet.querySelectorAll(`input:checked`);
      const clickedAmountsArray = Array.from(featuresAmount);
      const clickedFeaturesArray = [];
      clickedAmountsArray.forEach((amount) => {
        const value = amount.value;
        clickedFeaturesArray.push(value);
      });
      filter.features = clickedFeaturesArray;
      updateFilters();
    });
  };
  window.filter = {
    handleFilters
  };
})();
