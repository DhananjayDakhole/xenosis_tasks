const startBtn = document.querySelector(".start_btn button");
const infoBox = document.querySelector(".info_box");
const exitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz_box");
const optionList = document.querySelector(".option_list");
const timeCount = quizBox.querySelector(".timer .time_sec");
const timeLine = quizBox.querySelector("header .time_line");
const timeOff = quizBox.querySelector("header .time_text");

startBtn.addEventListener("click", () => {
    infoBox.classList.add("activeInfo");
});

exitBtn.addEventListener("click", () => {
    infoBox.classList.remove("activeInfo");
});

continueBtn.addEventListener("click", () => {
    infoBox.classList.remove("activeInfo");
    quizBox.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(10);
    startTimerLine(0);
});

let queCount = 0;
let queNumb = 1;
let counter;
let counterLine;
let timeValue = 10;
let widthValue = 0;
let userScore = 0;

const nextBtn = quizBox.querySelector(".next_btn");
const resultBox = document.querySelector(".result_box");
const restartQuiz = resultBox.querySelector(".buttons .restart");
const quitQuiz = resultBox.querySelector(".buttons .quit");

restartQuiz.addEventListener('click', () => {
    quizBox.classList.add("activeQuiz");
    resultBox.classList.remove("activeResult");
    let queCount = 0;
    let queNumb = 1;
    let timeValue = 10;
    let widthValue = 0;
    let userScore = 0;
    showQuestions(queCount);
    queCounter(queNumb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    nextBtn.style.display = "none";
    timeOff.textContent = "Time Left";
});

quitQuiz.addEventListener('click', () => {
    window.location.reload();
});

nextBtn.addEventListener('click', () => {
    if (queCount < questions.length - 1) {
        queCount++;
        queNumb++;
        showQuestions(queCount);
        queCounter(queNumb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        nextBtn.style.display = "none";
        timeOff.textContent = "Time Left";
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Questions completed");
        showResultBox();
    }
});

function showQuestions(index) {
    const queText = document.querySelector(".que_text");

    let queTag = `<span>` + questions[index].numb + ". " + questions[index].question + `</span>`;
    let optionTag = `<div class="option"><span>` + questions[index].options[0] + `</span></div>`
        + `<div class="option"><span>` + questions[index].options[1] + `</span></div>`
        + `<div class="option"><span>` + questions[index].options[2] + `</span></div>`
        + `<div class="option"><span>` + questions[index].options[3] + `</span></div>`;
    queText.innerHTML = queTag;
    optionList.innerHTML = optionTag;
    const option = optionList.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onClick", "optionSelected(this)");
    }
}

let tickIcon = `<div class="icon tick"><i class="fas fa-check"></i></div>`;
let crossIcon = `<div class="icon cross"><i class="fas fa-times"></i></div>`;

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[queCount].answer;
    let allOptions = optionList.children.length;

    if (userAns == correctAns) {
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    }
    else {
        answer.classList.add("wrong");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAns) {
                optionList.children[i].setAttribute("class", "option correct");
                optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled");
    }
    nextBtn.style.display = "block";
};

function showResultBox() {
    infoBox.classList.remove("activeInfo");
    quizBox.classList.remove("activeQuiz");
    resultBox.classList.add("activeResult");
    const scoreText = resultBox.querySelector(".score_text");
    if (userScore >= 7) {
        let scoreTag = `<span>Congrats! You got <p>` + userScore + `</p> out of <p>` + questions.length + `</p></span>`;
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore >= 3) {
        let scoreTag = `<span>Nice, You got <p>` + userScore + `</p> out of <p>` + questions.length + `</p></span>`;
        scoreText.innerHTML = scoreTag;
    }
    else {
        let scoreTag = `<span>Sorry, You got only <p>` + userScore + `</p> out of <p>` + questions.length + `</p></span>`;
        scoreText.innerHTML = scoreTag;
    }
};

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent = "Time Off";

            let correctAns = questions[queCount].answer;
            let allOptions = optionList.children.length;

            for (let i = 0; i < allOptions; i++) {
                if (optionList.children[i].textContent == correctAns) {
                    optionList.children[i].setAttribute("class", "option correct");
                    optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }
            for (let i = 0; i < allOptions; i++) {
                optionList.children[i].classList.add("disabled");
            }
            nextBtn.style.display = "block";
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 21);
    function timer() {
        time += 1;
        timeLine.style.width = time + "px";
        if (time > 539) {
            clearInterval(counterLine);
        }
    }
}

function queCounter(index) {
    const buttonQuesCounter = quizBox.querySelector(".total_que");
    let totalQuesCountTag = `<span><p>` + index + `</p>of<p>` + questions.length + `</p>Questions</span>`;
    buttonQuesCounter.innerHTML = totalQuesCountTag;
}