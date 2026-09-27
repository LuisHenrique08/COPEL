/* =========================================================
   CONFIGURAÇÃO DO QUIZ
========================================================= */

const questions = [

    {
        question: "Qual é a Razão de Ser da Copel?",
        answers: [
            "Gerar energia para o Paraná",
            "Iluminar vidas com pura energia",
            "Ser líder no setor elétrico",
            "Conectar pessoas e empresas"
        ],
        correct: 1
    },

    {
        question: "Qual é a Ambição da Copel?",
        answers: [
            "Ser a maior empresa do Paraná",
            "Ser referência mundial em tecnologia",
            "Ser a empresa que mais gera valor no setor elétrico brasileiro",
            "Ser a maior distribuidora de energia do Brasil"
        ],
        correct: 2
    },

    {
        question: "Qual dos itens abaixo é um dos valores da Copel?",
        answers: [
            "Cada cliente importa",
            "Velocidade acima de tudo",
            "Lucro em primeiro lugar",
            "Competição interna"
        ],
        correct: 0
    },

    {
        question: "O que significa o valor 'Movidos a futuro'?",
        answers: [
            "Trabalhar somente com novas tecnologias",
            "Ser fonte de conhecimento e inovação",
            "Priorizar resultados imediatos",
            "Evitar mudanças nos processos"
        ],
        correct: 1
    },

    {
        question: "Qual destes valores está relacionado diretamente à segurança?",
        answers: [
            "Cada cliente importa",
            "Movidos a futuro",
            "Segurança e ética são inegociáveis",
            "Entregamos resultados extraordinários"
        ],
        correct: 2
    },

    {
        question: "Qual é uma das principais funções de uma rede de distribuição de energia?",
        answers: [
            "Armazenar combustível",
            "Levar energia elétrica até os consumidores",
            "Produzir petróleo",
            "Controlar o trânsito"
        ],
        correct: 1
    },

    {
        question: "Qual equipamento é utilizado para transformar níveis de tensão em uma rede elétrica?",
        answers: [
            "Transformador",
            "Disjuntor",
            "Medidor",
            "Relé"
        ],
        correct: 0
    },

    {
        question: "Qual equipamento tem como uma de suas funções interromper um circuito elétrico em determinadas condições?",
        answers: [
            "Transformador",
            "Poste",
            "Disjuntor",
            "Condutor"
        ],
        correct: 2
    },

    {
        question: "Qual é um dos valores relacionados diretamente às pessoas da Copel?",
        answers: [
            "Nossa força é nossa gente",
            "Cada cliente importa",
            "Movidos a futuro",
            "Resultados extraordinários"
        ],
        correct: 0
    },

    {
        question: "Complete o valor da Copel: 'Segurança e ética são...'",
        answers: [
            "importantes",
            "recomendáveis",
            "inegociáveis",
            "opcionais"
        ],
        correct: 2
    }

];


/* =========================================================
   VARIÁVEIS
========================================================= */

let currentQuestion = 0;

let score = 0;

let userAnswers = [];

let playerName = "";

let playerRegistration = "";


/* =========================================================
   ELEMENTOS
========================================================= */

const registrationScreen =
    document.getElementById("registrationScreen");

const quizScreen =
    document.getElementById("quizScreen");

const resultScreen =
    document.getElementById("resultScreen");

const registrationForm =
    document.getElementById("registrationForm");

const questionNumber =
    document.getElementById("questionNumber");

const progressText =
    document.getElementById("progressText");

const progressBar =
    document.getElementById("progressBar");

const questionText =
    document.getElementById("questionText");

const answersContainer =
    document.getElementById("answersContainer");

const nextButton =
    document.getElementById("nextButton");

const scoreText =
    document.getElementById("scoreText");

const resultMessage =
    document.getElementById("resultMessage");

const reviewContainer =
    document.getElementById("reviewContainer");

const restartButton =
    document.getElementById("restartButton");


/* =========================================================
   INICIAR QUIZ
========================================================= */

registrationForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        playerName =
            document
                .getElementById("playerName")
                .value
                .trim();

        playerRegistration =
            document
                .getElementById("registration")
                .value
                .trim();


        if (
            playerName.length < 2 ||
            playerRegistration.length < 1
        ) {

            alert(
                "Preencha seu nome e sua matrícula."
            );

            return;
        }


        currentQuestion = 0;

        score = 0;

        userAnswers = [];


        registrationScreen.classList.add("hidden");

        quizScreen.classList.remove("hidden");

        resultScreen.classList.add("hidden");


        loadQuestion();

    }
);


/* =========================================================
   CARREGAR PERGUNTA
========================================================= */

function loadQuestion() {

    const question =
        questions[currentQuestion];


    questionNumber.textContent =
        `Pergunta ${currentQuestion + 1}`;


    progressText.textContent =
        `${currentQuestion + 1}/${questions.length}`;


    const progress =
        ((currentQuestion + 1) / questions.length) * 100;


    progressBar.style.width =
        `${progress}%`;


    questionText.textContent =
        question.question;


    answersContainer.innerHTML = "";


    nextButton.disabled = true;


    question.answers.forEach(
        function (answer, index) {

            const button =
                document.createElement("button");


            button.type = "button";

            button.className =
                "answer-button";

            button.textContent =
                answer;


            button.addEventListener(
                "click",
                function () {

                    selectAnswer(index);

                }
            );


            answersContainer.appendChild(button);

        }
    );


    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "Finalizar desafio"
            : "Próxima pergunta";
}


/* =========================================================
   SELECIONAR RESPOSTA
========================================================= */

function selectAnswer(index) {

    userAnswers[currentQuestion] =
        index;


    const buttons =
        document.querySelectorAll(
            ".answer-button"
        );


    buttons.forEach(
        function (button, buttonIndex) {

            button.classList.remove("selected");

            if (buttonIndex === index) {

                button.classList.add("selected");

            }

        }
    );


    nextButton.disabled = false;
}


/* =========================================================
   PRÓXIMA PERGUNTA
========================================================= */

nextButton.addEventListener(
    "click",
    function () {

        const selectedAnswer =
            userAnswers[currentQuestion];


        if (
            selectedAnswer === undefined
        ) {
            return;
        }


        if (
            selectedAnswer ===
            questions[currentQuestion].correct
        ) {

            score++;

        }


        currentQuestion++;


        if (
            currentQuestion <
            questions.length
        ) {

            loadQuestion();

        } else {

            finishQuiz();

        }

    }
);


/* =========================================================
   FINALIZAR QUIZ
========================================================= */

async function finishQuiz() {

    quizScreen.classList.add("hidden");

    resultScreen.classList.remove("hidden");


    scoreText.textContent =
        `${score}/${questions.length}`;


    showResultMessage();

    showReview();


    await saveResult();

}


/* =========================================================
   MENSAGEM DO RESULTADO
========================================================= */

function showResultMessage() {

    const percentage =
        (score / questions.length) * 100;


    if (percentage === 100) {

        resultMessage.textContent =
            "Parabéns! Você acertou todas as perguntas.";

    } else if (percentage >= 70) {

        resultMessage.textContent =
            "Muito bom! Você demonstrou bastante conhecimento.";

    } else if (percentage >= 50) {

        resultMessage.textContent =
            "Bom resultado! Continue conhecendo cada vez mais a Copel.";

    } else {

        resultMessage.textContent =
            "Obrigado pela participação! Que tal conhecer um pouco mais sobre a Copel e tentar novamente?";

    }

}


/* =========================================================
   REVISÃO
========================================================= */

function showReview() {

    reviewContainer.innerHTML = "";


    questions.forEach(
        function (question, index) {

            const selected =
                userAnswers[index];

            const correct =
                question.correct;


            const item =
                document.createElement("div");


            item.className =
                "review-item " +
                (
                    selected === correct
                        ? "correct"
                        : "incorrect"
                );


            const selectedText =
                selected !== undefined
                    ? question.answers[selected]
                    : "Não respondida";


            const correctText =
                question.answers[correct];


            item.innerHTML = `
                <div class="review-question">
                    ${index + 1}. ${escapeHtml(question.question)}
                </div>

                <div class="review-answer">
                    Sua resposta:
                    <strong>${escapeHtml(selectedText)}</strong>
                </div>

                <div class="review-answer">
                    Resposta correta:
                    <strong>${escapeHtml(correctText)}</strong>
                </div>
            `;


            reviewContainer.appendChild(item);

        }
    );

}


/* =========================================================
   SALVAR NO SUPABASE
========================================================= */

async function saveResult() {

    const answersData =
        questions.map(
            function (question, index) {

                const selected =
                    userAnswers[index];


                return {

                    question:
                        question.question,

                    selected_index:
                        selected ?? null,

                    selected_text:
                        selected !== undefined
                            ? question.answers[selected]
                            : null,

                    correct_index:
                        question.correct,

                    correct_text:
                        question.answers[
                            question.correct
                        ],

                    is_correct:
                        selected === question.correct

                };

            }
        );


const {
    error
} = await supabaseClient
    .from("quiz_results")
    .insert({
        name: playerName,
        registration: playerRegistration,
        score: score,
        total_questions: questions.length,
        answers: answersData
    });


    if (error) {

        console.error(
            "Erro ao salvar resultado:",
            error
        );


        resultMessage.innerHTML += `
            <br><br>
            <span style="color:#ff6b00">
                O resultado foi calculado, mas houve
                um problema ao registrá-lo no sistema.
            </span>
        `;

        return;

    }


    console.log(
        "Resultado salvo com sucesso:",
        data
    );

}


/* =========================================================
   REINICIAR
========================================================= */

restartButton.addEventListener(
    "click",
    function () {

        currentQuestion = 0;

        score = 0;

        userAnswers = [];


        resultScreen.classList.add("hidden");

        registrationScreen.classList.remove("hidden");


        document
            .getElementById("playerName")
            .value = "";

        document
            .getElementById("registration")
            .value = "";

    }
);


/* =========================================================
   SEGURANÇA - HTML
========================================================= */

function escapeHtml(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   ANIMAÇÃO AO ROLAR
========================================================= */

const observer =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(
                function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


document
    .querySelectorAll(".reveal")
    .forEach(
        function (element) {

            observer.observe(element);

        }
    );

    // Função para revelar elementos ao rolar a página
function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("visible");
        } else {
            reveals[i].classList.remove("visible");
        }
    }
}

// Executa ao rolar
window.addEventListener("scroll", revealOnScroll);

// Executa ao carregar
window.addEventListener("load", revealOnScroll);
