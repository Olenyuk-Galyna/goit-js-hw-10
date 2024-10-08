import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');
const daysOutput = document.querySelector('[data-days]');
const hoursOutput = document.querySelector('[data-hours]');
const minutesOutput = document.querySelector('[data-minutes]');
const secondsOutput = document.querySelector('[data-seconds]');

button.addEventListener('click', startTimer);

let userSelectedDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      button.disabled = true;
      iziToast.error({
        position: 'topRight',
        message: 'Please choose a date in the future',
      });
      return;
    }
    userSelectedDate = selectedDates[0];
    button.disabled = false;
  },
};

flatpickr(input, options);

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

function startTimer() {
  timerId = setInterval(updateTimer, 1000);
  button.disabled = true;
  input.disabled = true;
}
function updateTimer() {
  const timeDif = userSelectedDate - new Date();
  if (timeDif <= 0) {
    clearInterval(timerId);
    input.disabled = false;
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(timeDif);
  daysOutput.textContent = String(days).padStart(2, 0);
  hoursOutput.textContent = String(hours).padStart(2, 0);
  minutesOutput.textContent = String(minutes).padStart(2, 0);
  secondsOutput.textContent = String(seconds).padStart(2, 0);
}
