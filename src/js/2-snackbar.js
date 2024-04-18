import iziToast from "izitoast";
// additional style
import "izitoast/dist/css/iziToast.min.css";      
// strict mode
'use strict'

// define selectors
const form = document.querySelector(".form");
const delayInput = form.querySelector("input[name='delay']");
const selectedState = form.elements.state;
const submitBtn = document.querySelector(".submit-button");

// init variables
let delayValue; 
let stateValue;

// declare promise function
const promise = (state, delay) => { 
        return new Promise((resolve, reject) => { 
            setTimeout(() => { 
                if (state === "fulfilled") {
                    resolve(
                        iziToast.success({
                            title: 'OK',
                            message: `Fulfilled promise in ${delay} ms`
                        }));
                } else if (state === "rejected") { 
                    reject(
                         iziToast.error({
                            title: 'Error',
                            message: `Rejected promise in ${delay} ms`
                        }));
                }
            }, delay);
        });
    };

// set event listener on the form fields    
form.addEventListener("input", () => { 
    // define state value
    stateValue = selectedState.value;
    // define delay value
    if (delayInput.value) {
        (delayInput.value >= 0) ?
            (
                submitBtn.disabled = false,
                delayValue = delayInput.value
            ) : (
                submitBtn.disabled = true,
                iziToast.error({
                    title: 'Error',
                    message: 'Delay cannot be negative'
                }));
    } else { submitBtn.disabled = true; };
});

// set event listener on Create Notification button
form.addEventListener("submit", e => { 
    // prevent page reload on submit
    e.preventDefault();
    // Create promise
    promise(stateValue, delayValue)
        .then(() => { 
            console.log("Promise fulfilled successfully");
        })
        .catch(() => { 
            console.error("Promise rejected");
        });
});
