import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f,i as h}from"./assets/vendor-d07556bb.js";const y=document.querySelectorAll(".value[data-days], .value[data-hours], .value[data-minutes], .value[data-seconds]"),p=Array.from(y),t=document.querySelector(".datetime-button");t.disabled=!0;const r=document.querySelector("#datetime-picker");r.disabled=!1;let i;const b={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){e[0].getTime()>=Date.now()?(i=e[0].getTime(),t.disabled=!1):(h.error({title:"Error",message:"Please choose a date in the future"}),t.disabled=!0)}};f("input#datetime-picker",b);function d(e){const u=Math.floor(e/864e5),l=Math.floor(e%864e5/36e5),c=Math.floor(e%864e5%36e5/6e4),m=Math.floor(e%864e5%36e5%6e4/1e3);return{days:u,hours:l,minutes:c,seconds:m}}function v(e){return String(e).padStart(2,"0")}t.addEventListener("click",()=>{t.disabled=!0,r.disabled=!0;let e=i-Date.now(),a=d(e);const n=setInterval(()=>{p.forEach(o=>{if(a.hasOwnProperty(Object.keys(o.dataset)[0])){let s=v(a[Object.keys(o.dataset)[0]]);o.textContent=s}}),a=d(e-1e3),e-=1e3,e<0&&(clearInterval(n),r.disabled=!1)},1e3)});
//# sourceMappingURL=commonHelpers.js.map
