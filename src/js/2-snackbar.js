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
let stateValue = "fulfilled";

// declare promise function
const promise = (state, delay) => { 
        return new Promise((resolve, reject) => { 
            setTimeout(() => { 
                if (state === "fulfilled") {
                    resolve("success");
                } else if (state === "rejected") { 
                    reject("error");
                }
            }, delay);
        });
    };

// set event listener on the form fields    
form.addEventListener("input", () => { 
    // define State value
    stateValue = selectedState.value;
    // define Delay value
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

// set event listener on the Create Notification button
form.addEventListener("submit", e => { 
    // prevent page reload on submit
    e.preventDefault();
    // create promise
    promise(stateValue, delayValue)
        .then(() => { 
            console.log("Promise fulfilled successfully");
            iziToast.success({
                            title: 'OK',
                            message: `Fulfilled promise in ${delayValue} ms`
                        });
        })
        .catch(() => { 
            console.error("Promise rejected");
            iziToast.error({
                            title: 'Error',
                            message: `Rejected promise in ${delayValue} ms`
                        });
        });
});
