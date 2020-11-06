"use strict";


const adFormElement = document.forms[1];
const adFormTitle = adFormElement.title;
const adFormType = adFormElement.type;
const adFormAddressElement = adFormElement.address;
const adFormPrice = adFormElement.price;
const adFormCheckIn = adFormElement.timein;
const adFormCheckOut = adFormElement.timeout;
const adFormRoom = adFormElement.rooms;
const adFormCapacity = adFormElement.capacity;
const adFormAvatar = adFormElement.avatar;
const adFormImages = adFormElement.images;
const adFormFeatures = adFormElement.features;
const adFormDescription = adFormElement.description;
const adFormHeaderPreview = adFormElement.querySelector(`.ad-form-header__preview img`);
const adFormImagesPreview = adFormElement.querySelector(`.ad-form__photo`);
const avatarFieldSet = adFormElement.querySelector(`.ad-form-header`);
const imagesFieldSet = adFormElement.querySelector(`.ad-form__photo-container`).parentNode;
const adFormSubmitBtn = adFormElement.querySelector(`button[type=submit]`);
const adoFormClearBtn = adFormElement.querySelector(`.ad-form__reset`);
const adFeatures = [];

const makeItemInvalid = (item, validityState) => {
  item.setCustomValidity(validityState);
  window.utils.makeRedBorder(item);
  item.parentNode.setAttribute(`valid`, `false`);
  adFormElement.reportValidity();
};

const makeFileItemInvalid = (item, fieldSetSelector, validityState) => {
  item.setCustomValidity(validityState);
  window.utils.makeRedBorder(item);
  fieldSetSelector.setAttribute(`valid`, `false`);
  adFormElement.reportValidity();
};

const checkFileTypeValidity = (fileInput, fieldSetSelector, previewBlock, images) => {
  for (let file of fileInput.files) {
    window.constants.VALID_FILE_TYPES.forEach((type) => {
      if (file.type === type) {
        window.utils.removeRedBorder(fileInput);
        fileInput.setCustomValidity(``);
        fieldSetSelector.setAttribute(`valid`, `true`);
      }
      makeFileItemInvalid(fileInput, fieldSetSelector, window.constants.ErrorMessages.wrongTypeOfFile);
    });
  }
  window.utils.removeRedBorder(fileInput);
  fieldSetSelector.setAttribute(`valid`, true);
  fileInput.setCustomValidity(``);
  switch (images) {
    case true:
      loadImages(fileInput, previewBlock);
      break;
    default:
      loadAvatar(fileInput, previewBlock);
  }
  adFormElement.reportValidity();
  return true;
};


const checkInputValidity = (item) => {
  if (item.validity.valueMissing) {
    makeItemInvalid(item, window.constants.ErrorMessages.valueMissing);
  } else if (item.validity.wrongRoom) {
    makeItemInvalid(item, window.constants.ErrorMessages.wrongRoom);
  } else if (item.validity.emptyItem) {
    makeItemInvalid(item, window.constants.ErrorMessages.emptyItem);
  } else if (item.validity.badInput) {
    makeItemInvalid(item, window.constants.ErrorMessages.badInput);
  } else if (item.validity.patternMismatch) {
    makeItemInvalid(item, window.constants.ErrorMessages.patternMismatch);
  } else if (item.validity.rangeOverflow) {
    makeItemInvalid(item, window.constants.ErrorMessages.rangeOverflow);
  } else if (item.validity.rangeUnderflow) {
    makeItemInvalid(item, window.constants.ErrorMessages.rangeUnderflow);
  } else if (item.validity.stepMismatch) {
    makeItemInvalid(item, window.constants.ErrorMessages.stepMismatch);
  } else if (item.validity.tooLong) {
    makeItemInvalid(item, window.constants.ErrorMessages.tooLong);
  } else if (item.validity.tooShort) {
    makeItemInvalid(item, window.constants.ErrorMessages.tooShort);
  } else if (item.validity.typeMismatch) {
    makeItemInvalid(item, window.constants.ErrorMessages.typeMismatch);
  } else {
    window.utils.removeRedBorder(item);
    item.setCustomValidity(``);
    item.parentNode.setAttribute(`valid`, `true`);
    adFormElement.reportValidity();
  }
};

const clearFormElements = (selectors) => {
  selectors.forEach((selector) => {
    selector.value = ``;
  });
};

const onSuccess = () => {
  const FRAGMENT = window.utils.fragment;
  const mainElement = document.querySelector(`main`);
  const successElement = document.querySelector(`#success`).content;
  const successMessage = window.constants.SuccessMessages.dataSent;

  const successTemplate = successElement.cloneNode(true);
  const successMessageElement = successTemplate.querySelector(`.success__message`);
  successMessageElement.innerText = `${successMessage}`;

  FRAGMENT.appendChild(successTemplate);
  mainElement.append(FRAGMENT);

  const successSelector = document.querySelector(`.success`);

  const removeSuccess = () => {
    successSelector.remove();
  };

  document.addEventListener(`keydown`, (evt) => {
    removeSuccess();
    window.utils.checkKeyDownEvent(evt, `Escape`, removeSuccess);
  });

  document.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    removeSuccess();
  });

};
const onError = (message) => {
  const FRAGMENT = window.utils.fragment;
  const mainElement = document.querySelector(`main`);
  const errorElement = document.querySelector(`#error`).content;

  const errorTemplate = errorElement.cloneNode(true);
  const errorMessage = errorElement.querySelector(`.error__message`);
  errorMessage.innerText = `${message}`;

  FRAGMENT.appendChild(errorTemplate);
  mainElement.append(FRAGMENT);

  const errorSelector = document.querySelector(`.error`);

  const removeError = () => {
    errorSelector.remove();
  };

  const errorButton = errorSelector.querySelector(`.error__button`);

  document.addEventListener(`keydown`, (evt) => {
    removeError();
    window.utils.checkKeyDownEvent(evt, `Escape`, removeError);
  });

  document.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    removeError();
  });

  errorButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    removeError();
  });
};

const setAddress = (toggler, coordX, coordY) => {
  if (toggler === `initial`) {
    const calculateMapPinEdgeCoord = (axis, coord, pinSize) => {
      let mapPinEdgeCoord = 0;
      if (axis === `x`) {
        mapPinEdgeCoord = Math.floor(+coord + (pinSize / 2));
      } else if (axis === `y`) {
        mapPinEdgeCoord = Math.floor(+coord + pinSize);
      }
      return mapPinEdgeCoord;
    };

    const calculatedXCoord = calculateMapPinEdgeCoord(`x`, coordX, window.constants.ACTIVE_MAP_PIN_SIZE);
    const calculatedYCoord = calculateMapPinEdgeCoord(`y`, coordY, window.constants.ACTIVE_MAP_PIN_SIZE);

    const coordMessage = `${calculatedXCoord} ${calculatedYCoord}`;
    adFormAddressElement.setAttribute(`value`, coordMessage);
  }
  if (toggler === `work`) {
    const coordMessage = `${coordX} ${coordY}`;
    adFormAddressElement.setAttribute(`value`, coordMessage);
  }
  adFormAddressElement.setAttribute(`readonly`, `readonly`);
};

const submitAdForm = (formData) => {
  window.network.upload(formData, onSuccess, onError);
};

const loadAvatar = (fileInput, previewBlock) => {
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.addEventListener(`load`, () => {
    previewBlock.src = reader.result;
  });
  reader.readAsDataURL(file);
};
const loadImages = (fileInput, previewBlock) => {
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.addEventListener(`load`, () => {
    const previewImage = document.createElement(`img`);
    previewImage.setAttribute(`src`, reader.result);
    previewBlock.append(previewImage);
    reader.readAsDataURL(file);
  });
};

window.form = {
  adFormElement,
  adFormElementFieldsets: adFormElement.querySelectorAll(`fieldset`),
  activateForm() {
    window.utils.syncFields(adFormRoom, adFormCapacity, window.constants.ROOMS_VALUES, window.constants.GUESTS_VALUES, window.utils.syncGuestWithRooms);
    window.utils.syncFields(adFormType, adFormPrice, window.constants.TYPES_VALUES, window.constants.MIN_PRICES, window.utils.syncValueWithMin);
    window.utils.syncFields(adFormCheckIn, adFormCheckOut, window.constants.TIMES_VALUES, window.constants.TIMES_VALUES, window.utils.syncValue);
    adFormRoom.addEventListener(`change`, () => {
      window.utils.syncFields(adFormRoom, adFormCapacity, window.constants.ROOMS_VALUES, window.constants.GUESTS_VALUES, window.utils.syncGuestWithRooms);
    });
    adFormType.addEventListener(`change`, () => {
      window.utils.syncFields(adFormType, adFormPrice, window.constants.TYPES_VALUES, window.constants.MIN_PRICES, window.utils.syncValueWithMin);
    });
    adFormCheckIn.addEventListener(`change`, () => {
      window.utils.syncFields(adFormCheckIn, adFormCheckOut, window.constants.TIMES_VALUES, window.constants.TIMES_VALUES, window.utils.syncValue);
    });
    adFormCheckOut.addEventListener(`change`, () => {
      window.utils.syncFields(adFormCheckOut, adFormCheckIn, window.constants.TIMES_VALUES, window.constants.TIMES_VALUES, window.utils.syncValue);
    });
    adFormFeatures.forEach((feature) => {
      feature.addEventListener(`change`, () => {
        adFeatures.push(feature.value);
      });
    });
    adoFormClearBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      clearFormElements([adFormTitle, adFormPrice, adFormDescription, adFormAvatar, adFormImages, adFormFeatures]);
    });
    adFormAvatar.addEventListener(`change`, () => {
      checkFileTypeValidity(adFormAvatar, avatarFieldSet, adFormHeaderPreview, false);
    });
    adFormImages.addEventListener(`change`, () => {
      checkFileTypeValidity(adFormImages, imagesFieldSet, adFormImagesPreview, true);
    });
  },
  checkFormValidity() {
    checkInputValidity(adFormTitle);
    checkInputValidity(adFormPrice);
    checkInputValidity(adFormAddressElement);
  },
  interactWithForm() {
    checkInputValidity(adFormTitle);
    checkInputValidity(adFormPrice);
    checkInputValidity(adFormCapacity);
    adFormTitle.addEventListener(`input`, (evt) => {
      checkInputValidity(evt.target);
    });
    adFormPrice.addEventListener(`input`, (evt) => {
      checkInputValidity(evt.target);
    });
  },
  submitForm() {
    adFormSubmitBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.activateForm();
      this.checkFormValidity();
      const fieldSets = adFormElement.querySelectorAll(`fieldset[valid=false]`);
      if (!fieldSets.length) {
        const formData = new FormData(document.querySelector(`.ad-form`));
        submitAdForm(formData);
      }
    });
  },
  setAddress
};

