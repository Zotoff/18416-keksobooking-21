"use strict";

const createXhrRequest = (method, url, successHandler, errorHandler) => {
  let xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.addEventListener(`load`, () => {
    let error;
    switch (xhr.status) {
      case window.constants.ResponseStatuses.successResponse:
        successHandler(xhr.response);
        break;
      case window.constants.ResponseStatuses.wrongResponse:
        error = window.constants.NetworkErrorMessages.wrongResponse;
        break;
      case window.constants.ResponseStatuses.unauthorizedResponse:
        error = window.constants.NetworkErrorMessages.unauthorizedResponse;
        break;
      case window.constants.ResponseStatuses.notFoundResponse:
        error = window.constants.NetworkErrorMessages.notFoundResponse;
        break;
      case window.constants.ResponseStatuses.internalErrorResponse:
        error = window.constants.NetworkErrorMessages.internalErrorResponse;
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

  xhr.timeout = window.constants.TIMEOUT_IN_MS; // 10s

  xhr.open(method, url);
  return xhr;
};
const loadData = (successHandler, errorHandler) => {
  createXhrRequest(`GET`, window.constants.LOAD_URL, successHandler, errorHandler).send();
};
const uploadData = (data, successHandler, errorHandler) => {
  createXhrRequest(`POST`, window.constants.UPLOAD_URL, successHandler, errorHandler).send(data);
};

window.network = {
  load: loadData,
  upload: uploadData
};

