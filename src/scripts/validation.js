function clearValidation(form, validationConfig) {
  const inputList = Array.from(
    form.querySelectorAll(validationConfig.inputSelector)
  );
  inputList.forEach((inputElement) => {
    hideInputError(form, inputElement, validationConfig);
  });
  const buttonElement = form.querySelector(
    validationConfig.submitButtonSelector
  );
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
}

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}_error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}_error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
};

function setCustomValidity(inputElement) {
  if (
    (inputElement.name === "place-name" ||
      inputElement.name === "name" ||
      inputElement.name === "description") &&
    !/^[A-Za-zА-Яа-яЁё\s-]*$/.test(inputElement.value)
  ) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
}

const checkInputValidity = (formElement, inputElement, validationConfig) => {
  setCustomValidity(inputElement);
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    const inputList = Array.from(
      formElement.querySelectorAll(validationConfig.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      validationConfig.submitButtonSelector
    );
    toggleButtonState(inputList, buttonElement, validationConfig);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement, validationConfig);
        toggleButtonState(inputList, buttonElement, validationConfig);
      });
    });
  });
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

export { enableValidation, clearValidation };
