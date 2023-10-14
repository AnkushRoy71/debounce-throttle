const input = document.getElementById("search");
const debounce = document.getElementById("debounce");
const throttle = document.getElementById("throttle");

function fun(e) {
  debounce.innerText = e;
  //console.log("hi");
}

function throte(e) {
  throttle.innerText = e;
}

function debounceFun(cb, delay = 1000) {
  let timmer;
  return function (...args) {
    clearTimeout(timmer);
    timmer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

function throttleFun(cb, delay = 1000) {
  let delayOver = true;
  let waitingArgs;
  timeout = () => {
    if (waitingArgs) {
      cb(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeout, delay);
    } else {
      delayOver = true;
    }
  };

  return (...args) => {
    if (delayOver) {
      cb(...args);
      setTimeout(timeout, delay);
      delayOver = false;
    } else {
      waitingArgs = args;
    }
  };
}

// here debounceFun is called every time the data function is called so it is not correct
// const data =  () => {
//   return debounceFun(fun, 2000);
// }

const debounceCall = debounceFun(fun, 2000); // here debounceFun is called only once at initialization

const throttleCall = throttleFun(throte, 2000);

input.addEventListener("input", (e) => {
  debounceCall(e.target.value);
  throttleCall(e.target.value);
});
