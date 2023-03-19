const dataStartRef = document.querySelector('[data-start]');
const dataStopRef = document.querySelector('[data-stop]');
const bodyRef = document.querySelector('body');

dataStartRef.addEventListener('click', onStart);
dataStopRef.addEventListener('click', onStop);

let timerId = null;
const DELAY = 1000;

function onStart() {
	timerId = setInterval(getBgColor, DELAY);
	dataStartRef.toggleAttribute('disabled');
}

function getBgColor() {
	bodyRef.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function onStop() {
	clearInterval(timerId);
	dataStartRef.removeAttribute('disabled');
}