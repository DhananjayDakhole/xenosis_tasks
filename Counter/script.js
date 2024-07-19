const mainCount = document.querySelector('#count');
let curValue = 0;

const btnDecrement = document.querySelector('#decrement');
const btnReset = document.querySelector('#reset');
const btnIncrement = document.querySelector('#increment');

btnIncrement.addEventListener("click", () => {
    curValue++;
    mainCount.textContent = curValue;
})

btnDecrement.addEventListener("click", () => {
    curValue--;
    mainCount.textContent = curValue;
})

btnReset.addEventListener("click", () => {
    curValue = 0;
    mainCount.textContent = curValue;
})