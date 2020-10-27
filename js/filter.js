"use strict";

(function () {
  const filterForm = document.forms[0];
  const filterFormTypeElement = filterForm.querySelector(`#housing-type`);

  const filterTypes = () => {
    filterFormTypeElement.addEventListener(`change`, (evt) => {
      const filterablePins = document.querySelectorAll(`.map__pin[data-filter=filter]`);
      filterablePins.forEach((pin) => {
        if (evt.target.value !== `any` && pin.dataset.type !== evt.target.value) {
          pin.classList.add(`hidden`);
          return true;
        }
        pin.classList.remove(`hidden`);
        return true;
      });
    });
  };
  window.filter = {
    filterTypes
  };
})();
