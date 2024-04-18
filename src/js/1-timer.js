import iziToast from "izitoast";
// additional style
import "izitoast/dist/css/iziToast.min.css";    

import flatpickr from "flatpickr";
// additional style
import "flatpickr/dist/flatpickr.min.css";      
// strict mode
'use strict'

// define selectors
const dataValues = document.querySelectorAll(".value[data-days], .value[data-hours], .value[data-minutes], .value[data-seconds]");
// create array of the timer selectors
const valuesArray = Array.from(dataValues); 
// define selectors
const startBtn = document.querySelector(".datetime-button");
// page is loaded for the first time -> the Start button is not active
startBtn.disabled = true;
// define selectors
const inputElement = document.querySelector("#datetime-picker");
// page is loaded for the first time -> the Datetime picker is available to select a date
inputElement.disabled = false;

// init variables
let userSelectedDate;
const todayDate = Date.now();

// settings for flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        // selected date is from the future 
        (selectedDates[0].getTime() >= todayDate) ? (
            userSelectedDate = selectedDates[0].getTime(),
            startBtn.disabled = false
        ) : ( // selected date is from the past -> Error appears, Start button becomes inactive
                iziToast.error({
                    title: 'Error',
                    message: 'Please choose a date in the future'
                }),
            startBtn.disabled = true
        );
    }
  };

// create flatpickr instance  
flatpickr("input#datetime-picker", options);

// creates an object containing timer values
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

// add leading zeroes to timer values 
function addLeadingZero(value) { 
    return String(value).padStart(2, '0');
}

// set event listener on the Start button
startBtn.addEventListener("click", () => {
    // Start button is pressed and becomes inactive
    startBtn.disabled = true;
    // after the timer starts, the input field becomes inactive
    inputElement.disabled = true;
    // calculate the elapsed time
    let elapsedTime = userSelectedDate - todayDate;
    // initial object containing timer values
    let dateTime = convertMs(elapsedTime);
    
    // setInterval() starts the function and repeats it regularly after the specified time interval
    const intervalId = setInterval(() => {
        // updating timer fields
        valuesArray.forEach((element) => {
            if (dateTime.hasOwnProperty(Object.keys(element.dataset)[0])) {
                // formats values before updating timer fields
                let timerValue = addLeadingZero(dateTime[(Object.keys(element.dataset)[0])]);
                // updates a timer field
                element.textContent = timerValue;
            }
        });
        // decreasing timer values
        dateTime = convertMs(elapsedTime - 1000);
        elapsedTime -= 1000;

        // time is over
        if (elapsedTime < 0) {
            clearInterval(intervalId);
            inputElement.disabled = false;
        };
    }, 1000);
});