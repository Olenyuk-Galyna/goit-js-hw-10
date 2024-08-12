import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', submitForm);

function submitForm(event) {
  event.preventDefault();
  const { delay, state } = event.currentTarget.elements;

  createPromise(delay.value, state.value)
    .then(data =>
      iziToast.success({
        position: 'topRight',
        message: `✅ Fulfilled promise in ${data}ms`,
      })
    )
    .catch(error =>
      iziToast.error({
        position: 'topRight',
        message: `❌ Rejected promise in ${error}ms`,
      })
    );
  form.reset();
}

function createPromise(userDelay, userState) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userState === 'fulfilled') {
        resolve(userDelay);
      } else {
        reject(userDelay);
      }
    }, userDelay);
  });
}
