let currentQuestion = 0;

/* استعادة البيانات المحفوظة */

let savedAnswers =
    JSON.parse(localStorage.getItem("answers"));

let savedQuestion =
    parseInt(localStorage.getItem("currentQuestion"));

let answers =
    savedAnswers ||
    Array(questions.length).fill(null);

if (!isNaN(savedQuestion)) {

    currentQuestion = savedQuestion;

}

/* تحميل السؤال */

function loadQuestion() {

    document.getElementById("question-number").innerText =
        `السؤال ${currentQuestion + 1} من ${questions.length}`;

    document.getElementById("question-text").innerText =
        questions[currentQuestion].question;

    const optionsContainer =
        document.getElementById("options");

    optionsContainer.innerHTML = "";

    questions[currentQuestion].options.forEach((option, index) => {

        const button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "option-btn";

        button.textContent =
            option;

        if (answers[currentQuestion] === index) {

            button.classList.add(
                "selected"
            );

        }

        button.addEventListener("click", () => {

            answers[currentQuestion] =
                index;

            saveSession();

            loadQuestion();

        });

        optionsContainer.appendChild(
            button
        );

    });

    updateStats();

    updateProgress();

    updatePalette();

    updateNavigationButtons();

}
/* حفظ الجلسة */

function saveSession() {

    localStorage.setItem(
        "answers",
        JSON.stringify(answers)
    );

    localStorage.setItem(
        "currentQuestion",
        currentQuestion
    );

}

/* السؤال التالي */

function nextQuestion() {

    if (
        currentQuestion <
        questions.length - 1
    ) {

        currentQuestion++;

        saveSession();

        loadQuestion();

    }

}

/* السؤال السابق */

function previousQuestion() {

    if (
        currentQuestion > 0
    ) {

        currentQuestion--;

        saveSession();

        loadQuestion();

    }

}

/* لوحة التنقل */

function updatePalette() {

    let palette =
        document.getElementById(
            "question-palette"
        );

    palette.innerHTML = "";

    questions.forEach((question, index) => {

        let btn =
            document.createElement("button");

        btn.innerText =
            index + 1;

        btn.classList.add(
            "palette-btn"
        );

        if (
            answers[index] === null
        ) {

            btn.classList.add(
                "unanswered"
            );

        }

        if (
            answers[index] !== null
        ) {

            btn.classList.add(
                "answered"
            );

        }

        if (
            index === currentQuestion
        ) {

            btn.classList.add(
                "current"
            );

        }

        btn.onclick = function () {

            currentQuestion =
                index;

            saveSession();

            loadQuestion();

        };

        palette.appendChild(btn);

    });

}

/* شريط التقدم */

function updateProgress() {

    let answered =
        answers.filter(
            answer =>
            answer !== null
        ).length;

    let percentage =
        Math.round(
            (answered / questions.length) * 100
        );

    document.getElementById(
        "progress-bar"
    ).style.width =
        percentage + "%";

    document.getElementById(
        "progress-percent"
    ).innerText =
        percentage + "%";

}

/* العدادات */

function updateStats() {

    let answered =
        answers.filter(
            answer =>
            answer !== null
        ).length;

    let remaining =
        questions.length - answered;

    document.getElementById(
        "answered-count"
    ).innerText =
        "مجاب عنها: " +
        answered;

    document.getElementById(
        "remaining-count"
    ).innerText =
        "متبقي: " +
        remaining;

}

/* تعطيل الأزرار */

function updateNavigationButtons() {

    document.getElementById(
        "prev-btn"
    ).disabled =
        currentQuestion === 0;

    document.getElementById(
        "next-btn"
    ).disabled =
        currentQuestion ===
        questions.length - 1;

}

/* المؤقت */

let timeLeft = 300;

function startTimer() {

    const timerElement =
        document.getElementById(
            "timer"
        );

    const timer =
        setInterval(() => {

        let minutes =
            Math.floor(
                timeLeft / 60
            );

        let seconds =
            timeLeft % 60;

        minutes =
            String(minutes)
            .padStart(2, "0");

        seconds =
            String(seconds)
            .padStart(2, "0");

        timerElement.textContent =
            `${minutes}:${seconds}`;

        if (
            timeLeft <= 60
        ) {

            timerElement.style.color =
                "#ff5252";

            timerElement.style.borderColor =
                "#ff5252";

        }

        if (
            timeLeft <= 0
        ) {

            clearInterval(timer);

            calculateResult();

        }

        timeLeft--;

    }, 1000);

}

/* نافذة الإنهاء */

function finishExam() {

    let answered =
        answers.filter(
            answer =>
            answer !== null
        ).length;

    let remaining =
        questions.length -
        answered;

    let message =
        document.getElementById(
            "modal-message"
        );

    message.innerHTML = `

        <div class="modal-stats">

            <div class="modal-stat">
                مجاب عنها<br>
                ${answered}
            </div>

            <div class="modal-stat">
                متبقي<br>
                ${remaining}
            </div>

        </div>

        <p>

        ${
            remaining > 0
            ?
            "يمكنك مراجعة الأسئلة غير المكتملة أو تسليم الاختبار الآن."
            :
            "تمت الإجابة عن جميع الأسئلة وأصبح الاختبار جاهزاً للتسليم."
        }

        </p>

    `;

    document.getElementById(
        "finish-modal"
    ).style.display =
        "flex";

}

/* مراجعة الأسئلة */

function reviewQuestions() {

    let firstUnanswered =
        answers.findIndex(
            answer =>
            answer === null
        );

    if (
        firstUnanswered !== -1
    ) {

        currentQuestion =
            firstUnanswered;

        saveSession();

        loadQuestion();

    }

    closeModal();

}

/* إغلاق النافذة */

function closeModal() {

    document.getElementById(
        "finish-modal"
    ).style.display =
        "none";

}

/* حساب النتيجة */

function calculateResult() {

    let score = 0;

    answers.forEach((answer, index) => {

        if (
            answer ===
            questions[index].answer
        ) {

            score++;

        }

    });

    localStorage.setItem(
        "score",
        score
    );

    localStorage.setItem(
        "totalQuestions",
        questions.length
    );

    localStorage.removeItem(
        "answers"
    );

    localStorage.removeItem(
        "currentQuestion"
    );

    window.location.href =
        "result.html";

}

/* ربط الأزرار */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        document
            .getElementById(
                "review-btn"
            )
            .addEventListener(
                "click",
                reviewQuestions
            );

        document
            .getElementById(
                "submit-btn"
            )
            .addEventListener(
                "click",
                calculateResult
            );

        document
            .getElementById(
                "cancel-btn"
            )
            .addEventListener(
                "click",
                closeModal
            );

    }
);

/* التشغيل الأولي */

loadQuestion();

startTimer();

