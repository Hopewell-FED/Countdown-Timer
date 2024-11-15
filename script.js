"use strict";

let countDown;

//Select html elements
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");
const customTimeBtn = document.querySelector(".submit__button");

//Function to start count down
function timer(seconds) {
  //clear any existing timer
  clearInterval(countDown);

  const now = Date.now();
  const future = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(future);

  countDown = setInterval(() => {
    const newNow = Date.now();
    const secondsLeft = Math.round((future - newNow) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countDown);
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

//Function to display time left
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsRemaining = seconds % 60;

  const displayMinutes = `${minutes < 10 ? "0" : ""}${minutes}:${
    secondsRemaining < 10 ? "0" : ""
  }${secondsRemaining}`;

  timerDisplay.textContent = displayMinutes;
}

//Function to display timer end time
function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();

  const adjustedHour = hour > 12 ? hour % 12 : hour;
  const minutes = end.getMinutes();

  const amPM = hour > 12 ? "PM" : "AM";

  endTime.textContent = `Be Back At ${adjustedHour}: ${
    minutes < 10 ? "0" : ""
  }${minutes} ${amPM}`;
}

//function to start timer
function startTimer() {
  const seconds = parseInt(this.dataset.time);

  timer(seconds);
}

//Adding click events to buttons
buttons.forEach((button) => button.addEventListener("click", startTimer));

//Form submission event
document.customForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const mins = this.minutes.value * 60;
  timer(mins);
  this.reset();
});
