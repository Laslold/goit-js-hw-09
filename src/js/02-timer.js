import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const btnStart = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const selectorEl = document.querySelector('#datetime-picker');

// flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const userDateMiliSec = selectedDates[0].getTime();
    const curentDate = Date.now();

    if (userDateMiliSec <= curentDate) {
      btnStart.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      selectTime = userDateMiliSec;
      btnStart.disabled = false;
    }
  },
};

flatpickr(selectorEl, options);
//********************** */

//started params
btnStart.disabled = true;

let selectTime = 0;

let timerId = null;
/******************/

btnStart.addEventListener('click', onStartBtn);

function onStartBtn(event) {
  selectorEl.disabled = true;
  btnStart.disabled = true;
  timerId = setInterval(() => {
    //time is over
    if (selectTime - Date.now() <= 0) {
      clearInterval(timerId);
      selectorEl.disabled = false;
      return;
    }
    //time ok
    const result = convertMs(selectTime - Date.now());
    const { days, hours, minutes, seconds } = result;
    secondsEl.textContent = addLeadingZero(seconds);
    minutesEl.textContent = addLeadingZero(minutes);
    hoursEl.textContent = addLeadingZero(hours);
    daysEl.textContent = addLeadingZero(days);
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
