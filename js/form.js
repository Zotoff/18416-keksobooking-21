"use strict";

(function () {
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
  const avatarFieldSet = adFormElement.querySelector(`.ad-form-header`);
  const imagesFieldSet = adFormElement.querySelector(`.ad-form__photo-container`).parentNode;
  const adFormSubmitBtn = adFormElement.querySelector(`button[type=submit]`);

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

  const checkFileTypeValidity = (fileInput, fieldSetSelector) => {
    if (fileInput.files.length === 0) {
      makeFileItemInvalid(fileInput, fieldSetSelector, window.constants.ErrorMessages.noFilesSelected);
    } else {
      for (let file of fileInput.files) {
        window.constants.validFileTypes.forEach((type) => {
          if (file.type === type) {
            window.utils.removeRedBorder(fileInput);
            fileInput.setCustomValidity(``);
            return true;
          }
          makeItemInvalid(fileInput, window.constants.ErrorMessages.wrongTypeOfFile);
          return true;
        });
      }
      window.utils.removeRedBorder(fileInput);
      fieldSetSelector.setAttribute(`valid`, true);
      fileInput.setCustomValidity(``);
      return true;
    }
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
    }
  };

  window.form = {
    adFormElement,
    adFormAddress: document.querySelector(`input[name=address]`),
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
    },
    checkFormValidity() {
      checkInputValidity(adFormTitle);
      checkInputValidity(adFormPrice);
      checkInputValidity(adFormAddressElement);
      checkFileTypeValidity(adFormAvatar, avatarFieldSet);
      checkFileTypeValidity(adFormImages, imagesFieldSet);
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
          adFormElement.submit();
        }
      });
    }
  };
})();
