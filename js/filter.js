"use strict";

const filterForm = document.forms[0];
const filterFormType = filterForm.querySelector(`#housing-type`);
const filterFormPrice = filterForm.querySelector(`#housing-price`);
const filterFormRooms = filterForm.querySelector(`#housing-rooms`);
const filterFormGuests = filterForm.querySelector(`#housing-guests`);
const filterFormFeatures = filterForm.querySelector(`#housing-features`);

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
          if (item.offer.price < window.constants.PricesTypes.low) {
            return item;
          } else {
            return false;
          }
        case window.constants.FilterValues.middle:
          if (item.offer.price > window.constants.PricesTypes.low && item.offer.price <= window.constants.PricesTypes.middle) {
            return item;
          } else {
            return false;
          }
        case window.constants.FilterValues.high:
          if (item.offer.price > window.constants.PricesTypes.middle) {
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
    window.card.removeCardElements();
    window.pin.setupPins(filteredFinal);
    window.pin.handlePinsAndCards(document.querySelectorAll(`.map__pin[type=button]`));
  };
  filterFormType.addEventListener(`change`, (evt) => {
    filter.type = evt.target.value;
    window.debounce(updateFilters);
  });
  filterFormRooms.addEventListener(`change`, (evt) => {
    filter.rooms = evt.target.value;
    window.debounce(updateFilters);
  });
  filterFormGuests.addEventListener(`change`, (evt) => {
    filter.guests = evt.target.value;
    window.debounce(updateFilters);
  });
  filterFormPrice.addEventListener(`change`, (evt) => {
    filter.price = evt.target.value;
    window.debounce(updateFilters);
  });
  filterFormFeatures.addEventListener(`change`, () => {
    let featuresAmount = filterFormFeatures.querySelectorAll(`input:checked`);
    const clickedAmountsArray = Array.from(featuresAmount);
    const clickedFeaturesArray = [];
    clickedAmountsArray.forEach((amount) => {
      const value = amount.value;
      clickedFeaturesArray.push(value);
    });
    filter.features = clickedFeaturesArray;
    window.debounce(updateFilters);
  });
};
window.filter = {
  handleFilters,
  filterForm
};
