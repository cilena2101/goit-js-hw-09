import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

let getRef = selector => document.querySelector(selector);
const inputDateTimePickerRef = getRef('#datetime-picker');
const btnStartRef = getRef('[data-start]');
const daysRef = getRef('[data-days]');
const hoursRef = getRef('[data-hours]');
const minutesRef = getRef('[data-minutes]');
const secondsRef = getRef('[data-seconds]');

btnStartRef.setAttribute('disabled', true);

let deltaTime = 0;
let timerId = null;
let formatDate = null;
const DELAY = 1000;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    currentDifferenceDate(selectedDates[0]);
  },
};

flatpickr(inputDateTimePickerRef, options);

btnStartRef.addEventListener('click', onBtnStart);

function onBtnStart() {
  timerId = setInterval(startTimer, DELAY);
}

function startTimer() {
  btnStartRef.setAttribute('disabled', true);
  inputDateTimePickerRef.setAttribute('disabled', true);
  deltaTime -= 1000;

  if (secondsRef.textContent <= 0 && minutesRef.textContent <= 0) {
    Notify.success('Time over');
    clearInterval(timerId);
  } else {
    formatDate = convertMs(deltaTime);
    convertDate(formatDate);
  }
}

window.addEventListener('keydown', evt => {
  if (evt.code === 'Escape' && timerId) {
    clearInterval(timerId);

    inputDateTimePickerRef.removeAttribute('disabled');
    btnStartRef.setAttribute('disabled', true);

    secondsRef.textContent = '00';
    minutesRef.textContent = '00';
    hoursRef.textContent = '00';
    daysRef.textContent = '00';
  }
});

function currentDifferenceDate(selectedDates) {
  const currentDate = Date.now();

  if (selectedDates < currentDate) {
    btnStartRef.setAttribute('disabled', true);
    return Notify.failure('Please choose a date in the future');
  }

  deltaTime = selectedDates.getTime() - currentDate;
  formatDate = convertMs(deltaTime);

 	convertDate(formatDate);
  btnStartRef.removeAttribute('disabled');
}


function convertDate(formatDate) {
  secondsRef.textContent = formatDate.seconds;
  minutesRef.textContent = formatDate.minutes;
  hoursRef.textContent = formatDate.hours;
  daysRef.textContent = formatDate.days;
}

function addLeadingZero(value) {
	return String(value).padStart(2, '0');
	
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

