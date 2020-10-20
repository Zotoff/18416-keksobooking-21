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
  const adFormSubmitBtn = adFormElement.querySelector(`button[type=submit]`);

  const checkInputValidity = (item) => {
    if (item.validity.valueMissing) {
      item.setCustomValidity(window.data.ErrorMessages.valueMissing);
      window.utils.makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
      adFormElement.reportValidity();
    } else if (item.validity.wrongRoom) {
      item.setCustomValidity(window.data.ErrorMessages.wrongRoom);
      window.utils.makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
      adFormElement.reportValidity();
    } else if (item.validity.emptyItem) {
      item.setCustomValidity(window.data.ErrorMessages.emptyItem);
      window.utils.makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
      adFormElement.reportValidity();
    } else if (item.validity.badInput) {
      item.setCustomValidity(window.data.ErrorMessages.badInput);
      window.utils.makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
      adFormElement.reportValidity();
    } else if (item.validity.patternMismatch) {
      item.setCustomValidity(window.data.ErrorMessages.patternMismatch);
      window.utils.makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
      adFormElement.reportValidity();
    } else if (item.validity.rangeOverflow) {
      item.setCustomValidity(window.data.ErrorMessages.rangeOverflow);
      window.utils.makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
      adFormElement.reportValidity();
    } else if (item.validity.rangeUnderflow) {
      item.setCustomValidity(window.data.ErrorMessages.rangeUnderflow);
      window.utils.makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
      adFormElement.reportValidity();
    } else if (item.validity.stepMismatch) {
      item.setCustomValidity(window.data.ErrorMessages.stepMismatch);
      window.utils.makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
      adFormElement.reportValidity();
    } else if (item.validity.tooLong) {
      item.setCustomValidity(window.data.ErrorMessages.tooLong);
      window.utils.makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
      adFormElement.reportValidity();
    } else if (item.validity.tooShort) {
      item.setCustomValidity(window.data.ErrorMessages.tooShort);
      window.utils.makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
      adFormElement.reportValidity();
    } else if (item.validity.typeMismatch) {
      item.setCustomValidity(window.data.ErrorMessages.typeMismatch);
      window.utils.makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
      adFormElement.reportValidity();
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
      window.utils.syncFields(adFormRoom, adFormCapacity, window.data.ROOMS_VALUES, window.data.GUESTS_VALUES, window.utils.syncGuestWithRooms);
      window.utils.syncFields(adFormType, adFormPrice, window.data.TYPES_VALUES, window.data.MIN_PRICES, window.utils.syncValueWithMin);
      window.utils.syncFields(adFormCheckIn, adFormCheckOut, window.data.TIMES_VALUES, window.data.TIMES_VALUES, window.utils.syncValue);
      adFormRoom.addEventListener(`change`, () => {
        window.utils.syncFields(adFormRoom, adFormCapacity, window.data.ROOMS_VALUES, window.data.GUESTS_VALUES, window.utils.syncGuestWithRooms);
      });
      adFormType.addEventListener(`change`, () => {
        window.utils.syncFields(adFormType, adFormPrice, window.data.TYPES_VALUES, window.data.MIN_PRICES, window.utils.syncValueWithMin);
      });
      adFormCheckIn.addEventListener(`change`, () => {
        window.utils.syncFields(adFormCheckIn, adFormCheckOut, window.data.TIMES_VALUES, window.data.TIMES_VALUES, window.utils.syncValue);
      });
      adFormCheckOut.addEventListener(`change`, () => {
        window.utils.syncFields(adFormCheckOut, adFormCheckIn, window.data.TIMES_VALUES, window.data.TIMES_VALUES, window.utils.syncValue);
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
          adFormElement.submit();
        }
      });
    }
  };
})();
