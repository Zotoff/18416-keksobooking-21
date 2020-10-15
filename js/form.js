"use strict";

(function () {
  const adFormElement = document.querySelector(`.ad-form`);
  const adFormTitle = adFormElement.querySelector(`#title`);
  const adFormType = adFormElement.querySelector(`#type`);
  const adFormPrice = adFormElement.querySelector(`#price`);
  const adFormCheckIn = adFormElement.querySelector(`#timein`);
  const adFormCheckOut = adFormElement.querySelector(`#timeout`);
  const adFormRoom = adFormElement.querySelector(`#room_number`);
  const adFormCapacity = adFormElement.querySelector(`#capacity`);
  const adFormSubmitBtn = adFormElement.querySelector(`button[type=submit]`);

  const checkInputValidity = (item) => {
    if (item.validity.valueMissing) {
      item.setCustomValidity(window.data.ErrorMessages.valueMissing);
      window.util.makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
    } else if (item.validity.wrongRoom) {
      item.setCustomValidity(window.data.ErrorMessages.wrongRoom);
      window.util.makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
    } else if (item.validity.emptyItem) {
      item.setCustomValidity(window.data.ErrorMessages.emptyItem);
      window.util.makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
    } else if (item.validity.badInput) {
      item.setCustomValidity(window.data.ErrorMessages.badInput);
      window.util.makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
    } else if (item.validity.patternMismatch) {
      item.setCustomValidity(window.data.ErrorMessages.patternMismatch);
      window.util.makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
    } else if (item.validity.rangeOverflow) {
      item.setCustomValidity(window.data.ErrorMessages.rangeOverflow);
      window.util.makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
    } else if (item.validity.rangeUnderflow) {
      item.setCustomValidity(window.data.ErrorMessages.rangeUnderflow);
      window.util.makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
    } else if (item.validity.stepMismatch) {
      item.setCustomValidity(window.data.ErrorMessages.stepMismatch);
      window.util.makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
    } else if (item.validity.tooLong) {
      item.setCustomValidity(window.data.ErrorMessages.tooLong);
      window.util.makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
    } else if (item.validity.tooShort) {
      item.setCustomValidity(window.data.ErrorMessages.tooShort);
      window.util.makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
    } else if (item.validity.typeMismatch) {
      item.setCustomValidity(window.data.ErrorMessages.typeMismatch);
      window.util.makeRedBorder(item);
      item.parentNode.setAttribute(`valid`, `false`);
    } else {
      window.util.removeRedBorder(item);
      item.setCustomValidity(``);
      item.parentNode.setAttribute(`valid`, `true`);
    }
  };

  window.form = {
    adFormSelector: adFormElement,
    adFormAddress: adFormElement.querySelector(`#address`),
    adFormElementFieldsets: adFormElement.querySelectorAll(`fieldset`),
    activateForm() {
      window.util.syncFields(adFormRoom, adFormCapacity, window.data.ROOMS_VALUES, window.data.GUESTS_VALUES, window.util.syncGuestWithRooms);
      window.util.syncFields(adFormType, adFormPrice, window.data.TYPES_VALUES, window.data.MIN_PRICES, window.util.syncValueWithMin);
      window.util.syncFields(adFormCheckIn, adFormCheckOut, window.data.TIMES_VALUES, window.data.TIMES_VALUES, window.util.syncValue);
      adFormRoom.addEventListener(`change`, () => {
        window.util.syncFields(adFormRoom, adFormCapacity, window.data.ROOMS_VALUES, window.data.GUESTS_VALUES, window.util.syncGuestWithRooms);
      });
      adFormType.addEventListener(`change`, () => {
        window.util.syncFields(adFormType, adFormPrice, window.data.TYPES_VALUES, window.data.MIN_PRICES, window.util.syncValueWithMin);
      });
      adFormCheckIn.addEventListener(`change`, () => {
        window.util.syncFields(adFormCheckIn, adFormCheckOut, window.data.TIMES_VALUES, window.data.TIMES_VALUES, window.util.syncValue);
      });
      adFormCheckOut.addEventListener(`change`, () => {
        window.util.syncFields(adFormCheckOut, adFormCheckIn, window.data.TIMES_VALUES, window.data.TIMES_VALUES, window.util.syncValue);
      });
    },
    interactWithForm() {
      checkInputValidity(adFormTitle);
      checkInputValidity(adFormPrice);
      checkInputValidity(this.adFormAddress);
    },
    submitForm() {
      adFormSubmitBtn.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this.activateForm();
        this.interactWithForm();
        const fieldSets = adFormElement.querySelectorAll(`fieldset[valid=false]`);
        if (!fieldSets.length) {
          adFormElement.submit();
        }
      });
    }
  };
})();
