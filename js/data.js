"use strict";

(function () {
  window.data = {
    HOUSE_TITLES: [
      `Уютный дом`,
      `Классное бунгало`,
      `Милый особняк`,
      `Роскошный кексохаус`,
      `Деревянная пагода`,
      `Кексобукинг`,
      `Милый отель`,
      `Апартаменты у моря`,
    ],
    HOUSE_TYPES: [
      `palace`,
      `flat`,
      `house`,
      `bungalow`
    ],
    CHECKIN_CHECKOUT_TIMES: [
      `12:00`,
      `13:00`,
      `14:00`
    ],
    HOUSE_FEATURES: [
      `wifi`,
      `dishwasher`,
      `parking`,
      `washer`,
      `elevator`,
      `conditioner`
    ],
    HOUSE_DESCRIPTIONS: [
      `Good House`,
      `Simple House with parking`,
      `Awesome house`,
      `Bad house`
    ],
    HOUSE_PHOTOS: [
      `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
      `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
      `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
    ],
    TYPES_VALUES: [`bungalow`, `flat`, `house`, `palace`],
    MIN_PRICES: [`0`, `1000`, `5000`, `10000`],
    TIMES_VALUES: [`12:00`, `13:00`, `14:00`],
    GUESTS_VALUES: [
      `1`,
      `2`,
      `3`,
      `0`
    ],
    ROOMS_VALUES: [
      `1`,
      `2`,
      `3`,
      `100`
    ],
    ErrorMessages: {
      valueMissing: `Пожалуйста, заполните форму`,
      wrongRoom: `Вы выбрали количество мест, не соответствующее количеству гостей`,
      emptyItem: `Пожалуйста, заполните поле`,
      badInput: `Вы ввели неверный тип данных`,
      patternMismatch: `Данные не соответствуют шаблону`,
      rangeOverflow: `Превышено максимальное значение`,
      rangeUnderflow: `Значение ниже минимального`,
      stepMismatch: `Превышен шаг`,
      tooLong: `Превышена максимальная длина`,
      tooShort: `Количество введенных символов ниже минимального`,
      typeMismatch: `Пожалуйста, проверьте правильность ввода`,
    },
    OfferTypes: {
      Palace: `palace`,
      Bungalo: `bungalow`,
      House: `house`,
      Flat: `flat`
    },
    MAX_ANNOUNCEMENTS: 8,
    ROUND_MAP_PIN_SIZE: 65,
    ACTIVE_MAP_PIN_SIZE: 65,
    ACTIVE_MAP_PIN_EDGE_HEIGHT: 20
  };
})();
