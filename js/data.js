"use strict";

(function () {
  window.data = {
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
      valueMissing: `Пожалуйста, заполните форму!`,
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
    ResponseStatuses: {
      successResponse: 200,
      wrongResponse: 400,
      unauthorizedResponse: 401,
      notFoundResponse: 404,
      internalErrorResponse: 500
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
    ACTIVE_MAP_PIN_EDGE_HEIGHT: 20,
    TIMEOUT_IN_MS: 10000,
    LOAD_URL: `https://21.javascript.pages.academy/keksobooking/data`
  };
})();
