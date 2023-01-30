const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);
let timerId = null;
stopBtn.disabled = true;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function onStart(event) {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function onStop(event) {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(timerId);
}
