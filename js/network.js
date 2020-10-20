"use strict";

(function () {
  const createXhrRequest = (method, url, successHandler, errorHandler) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, () => {
      let error;
      switch (xhr.status) {
        case window.data.ResponseStatuses.successResponse:
          successHandler(xhr.response);
          break;
        case window.data.ResponseStatuses.wrongResponse:
          error = `Неверный запрос`;
          break;
        case window.data.ResponseStatuses.unauthorizedResponse:
          error = `Пользователь не авторизован`;
          break;
        case window.data.ResponseStatuses.notFoundResponse:
          error = `Ничего не найдено`;
          break;
        case window.data.ResponseStatuses.internalErrorResponse:
          error = `Произошла ошибка сервера`;
          break;
        default:
          error = `Статус ответа: ${xhr.status} | ${xhr.statusText}`;
      }
      if (error) {
        errorHandler(error);
      }
    });
    xhr.addEventListener(`error`, () => {
      errorHandler(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      errorHandler(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = window.data.TIMEOUT_IN_MS; // 10s

    xhr.open(method, url);
    return xhr;
  };
  const loadData = (successHandler, errorHandler) => {
    createXhrRequest(`GET`, window.data.LOAD_URL, successHandler, errorHandler).send();
  };

  window.network = {
    load: loadData
  };
})();
