"use strict";


window.constants = {
  TYPES_VALUES: [`bungalow`, `flat`, `house`, `palace`],
  MIN_PRICES: [`0`, `1000`, `5000`, `10000`],
  TIMES_VALUES: [`12:00`, `13:00`, `14:00`],
  GUESTS_VALUES: [`1`, `2`, `3`, `0`],
  ROOMS_VALUES: [`1`, `2`, `3`, `100`],
  FILE_TYPES: [`gif`, `jpg`, `jpeg`, `png`],
  MAX_ANNOUNCEMENTS: 8,
  ROUND_MAP_PIN_SIZE: 62,
  ACTIVE_MAP_PIN_SIZE: 62,
  ACTIVE_MAP_PIN_EDGE_HEIGHT: 20,
  TIMEOUT_IN_MS: 10000,
  LOAD_URL: `https://21.javascript.pages.academy/keksobooking/data`,
  UPLOAD_URL: `https://21.javascript.pages.academy/keksobooking`,
  FILTERED_PINS_AMOUNT: 5,
  VALID_FILE_TYPES: [
    `image/jpeg`,
    `image/png`,
    `image/jpg`
  ],
  DEBOUNCE_INTERVAL: 500,
  MapInitialCoords: {
    x: 570,
    y: 375
  },
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
    noFilesSelected: `Не выбран файл для загрузки`,
    wrongTypeOfFile: `Разрешены только файлы в формате: jpeg, png, jpg`
  },
  NetworkErrorMessages: {
    wrongResponse: `Неверный запрос`,
    unauthorizedResponse: `Пользователь не авторизован`,
    notFoundResponse: `Данные не найдены`,
    internalErrorResponse: `Произошла ошибка сервера`,
  },
  PricesTypes: {
    low: 10000,
    middle: 50000
  },
  SuccessMessages: {
    dataSent: `Отправка данных прошла успешно!`
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
  CoordY: {
    MIN: 130,
    MAX: 630
  },
  FilterValues: {
    any: `any`,
    low: `low`,
    middle: `middle`,
    high: `high`,
  }
};

