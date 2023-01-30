import Notiflix from 'notiflix';

const formEl = document.querySelector('form');
// const delayFormEl = document.querySelector('[name="delay"]');
// const stepFormEl = document.querySelector('[name="step"]');
// const amauntFormEl = document.querySelector('[name="amount"]');

formEl.addEventListener('submit', onFormSubmit);

//собирает данные с формы
function onFormSubmit(evt) {
  evt.preventDefault();
  const userData = {};
  for (let index = 0; index < evt.target.elements.length; index++) {
    const elem = evt.target.elements[index];
    if (elem.nodeName === 'INPUT') {
      userData[elem.name] = +elem.value;
    }
  }
  makeSamPromis(userData);
}

//принимает данные с формы и создает промисы
function makeSamPromis(value) {
  const { delay, amount, step } = value;
  for (let i = 0; i < amount; i++) {
    const newDelay = delay + i * step;
    createPromise(i + 1, newDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

// делает один промис
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({
          position,
          delay,
        });
      } else {
        reject({
          position,
          delay,
        });
      }
    }, delay);
  });
}
