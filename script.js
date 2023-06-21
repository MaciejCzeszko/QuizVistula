const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const tutorialContainer = document.querySelector('.tutorial');
const pointsContainer = document.querySelector('.points');
const pointsResult = document.querySelector('.result');
const passedResult = document.querySelector('.passed');

let shuffledQuestions, currentQuestionIndex, points;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})

function startGame() {
    clearStatusClass(document.body);
    console.log('Started');
    startButton.classList.add('hide');
    tutorialContainer.classList.add('hide');
    pointsContainer.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    points = 0;
    questionContainer.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() { 
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button)
    })
}

function resetState() {
    nextButton.classList.add('hide');
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if(selectedButton.dataset.correct){
        points++;
    }
    setStatusClass(document.body, correct);
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerHTML = "Restart";
        startButton.classList.remove('hide');
        showResult();
    }
}

function showResult() {
    pointsContainer.classList.remove('hide');
    pointsResult.innerHTML = (points/(shuffledQuestions.length))*100 + "%";
    if((points/(shuffledQuestions.length))*100 < 75){
        passedResult.innerHTML = "Nie zdałeś";
    }
    else {
        passedResult.innerHTML = "Zdałeś";
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'Ile to jest 2+2?',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false},
            { text: '2', correct: false},
            { text: '10', correct: false},
        ]
    },
    {
        question: 'Z iloma krajami graniczy Polska?',
        answers: [
            { text: '9', correct: false},
            { text: '7', correct: true},
            { text: '3', correct: false},
            { text: '10', correct: false},
        ]
    },
    {
        question: 'Pumba z filmu "Król Lew" był: ',
        answers: [
            { text: 'lwem', correct: false},
            { text: 'surykatką', correct: false},
            { text: 'lemurem', correct: false},
            { text: 'guźcem', correct: true},
        ]
    },
    {
        question: 'Ile złotych medali olimpijskich zdobył Adam Małysz?',
        answers: [
            { text: '2', correct: false},
            { text: '1', correct: false},
            { text: '0', correct: true},
            { text: '4', correct: false},
        ]
    },
    {
        question: 'Największy ocean na Ziemi to?',
        answers: [
            { text: 'Ocean Spokojny', correct: true},
            { text: 'Ocean Atlantycki', correct: false},
            { text: 'Ocean Indyjski', correct: false},
            { text: 'Ocean Arktyczny', correct: false},
        ]
    },
    {
        question: 'Stolicą Stanów Zjedonczonych Ameryki jest: ',
        answers: [
            { text: 'Waszyngton', correct: true},
            { text: 'Nowy Jork', correct: false},
            { text: 'Chicago', correct: false},
            { text: 'Los Angeles', correct: false},
        ]
    },
    {
        question: 'Michael Jordan zdobył tytuły mistrza NBA z drużyną: ',
        answers: [
            { text: 'Houston Rockets', correct: false},
            { text: 'Chicago Bulls', correct: true},
            { text: 'Boston Celtics', correct: false},
            { text: 'Lakers', correct: false},
        ]
    },
    {
        question: 'Religią dominującą w Japonii jest buddyzm oraz: ',
        answers: [
            { text: 'Szinto', correct: true},
            { text: 'Chrześcijaństwo', correct: false},
            { text: 'Islam', correct: false},
            { text: 'Judaizm', correct: false},
        ]
    },
    {
        question: 'Na tablicy Mendelejewa symbolem P oznaczony jest: ',
        answers: [
            { text: 'Węgiel', correct: false},
            { text: 'Azot', correct: false},
            { text: 'Fosfor', correct: true},
            { text: 'Potas', correct: false},
        ]
    },
    {
        question: 'Na jakim kontynencie leżą Malediwy?',
        answers: [
            { text: 'W Azji', correct: true},
            { text: 'W Afryce', correct: false},
            { text: 'W Europie', correct: false},
            { text: 'W Ameryce Północnej', correct: false},
        ]
    },
    {
        question: 'Wojna 30-letnia rozegrała się głównie na terenie: ',
        answers: [
            { text: 'Włoch', correct: false},
            { text: 'Francji', correct: false},
            { text: 'Polski', correct: false},
            { text: 'Niemiec', correct: true},
        ]
    },
    {
        question: 'W którym rozbiorze Polski nie brała udziału Austria?',
        answers: [
            { text: 'Pierwszym', correct: false},
            { text: 'Żadnym', correct: false},
            { text: 'Drugim', correct: true},
            { text: 'Trzecim', correct: false},
        ]
    },
    {
        question: 'Ilu graczy liczy drużyna hokeja na lodzie?',
        answers: [
            { text: '5', correct: false},
            { text: '6', correct: false},
            { text: '7', correct: true},
            { text: '8', correct: false},
        ]
    },
    {
        question: 'Słynny rajdowiec Niki Lauda był z pochodzenia: ',
        answers: [
            { text: 'Finem', correct: false},
            { text: 'Szwedem', correct: false},
            { text: 'Niemcem', correct: false},
            { text: 'Austriakiem', correct: true},
        ]
    },
    {
        question: 'Wilk szary to: ',
        answers: [
            { text: 'canis lupus', correct: true},
            { text: 'cricetulus griseus', correct: false},
            { text: 'equus caballus', correct: false},
            { text: 'vulpes vulpes', correct: false},
        ]
    },
    {
        question: 'Strój w islamie, który zakrywa całkowicie ciało i twarz kobiety, pozostawiając niewielką siatkę na oczach, to: ',
        answers: [
            { text: 'burka', correct: true},
            { text: 'nikab', correct: false},
            { text: 'czador', correct: false},
            { text: 'hidżab', correct: false},
        ]
    },
    {
        question: 'Freddie Mercury naprawdę nazywał się: ',
        answers: [
            { text: 'Farrokh Bulsara', correct: true},
            { text: 'Cordozer Calvin Broadus', correct: false},
            { text: 'Orhan Gencebay', correct: false},
            { text: 'Kenan Doğulu', correct: false},
        ]
    },
    {
        question: 'Na banknocie 20 zł widać profil: ',
        answers: [
            { text: 'Królowej Jadwigi', correct: false},
            { text: 'Bolesława I Chrobrego', correct: true},
            { text: 'Zygmunta III Wazy', correct: false},
            { text: 'Jana III Sobieskiego', correct: false},
        ]
    },
    {
        question: 'Z chorą wątrobą udasz się do: ',
        answers: [
            { text: 'hematologa', correct: false},
            { text: 'hepatologa', correct: true},
            { text: 'urologa', correct: false},
            { text: 'Zebrania AA', correct: false},
        ]
    },
    {
        question: 'Półtoraki, dwójniaki, trójniaki i czwórniaki to rodzaje: ',
        answers: [
            { text: 'piwa', correct: false},
            { text: 'miodu pitnego', correct: true},
            { text: 'wina', correct: false},
            { text: 'whisky', correct: false},
        ]
    },
    {
        question: 'Jak wiele wierzchołków ma sześcian?',
        answers: [
            { text: '6', correct: false},
            { text: '10', correct: false},
            { text: '12', correct: false},
            { text: '8', correct: true},
        ]
    },
    {
        question: 'Jaki ładunek elektryczny ma neutron?',
        answers: [
            { text: 'Nie ma', correct: false},
            { text: 'Dodatni', correct: false},
            { text: 'Ujemny', correct: false},
            { text: 'Neutralny', correct: true},
        ]
    },
    {
        question: 'Czym jest linux?',
        answers: [
            { text: 'Rodzajem komputera', correct: false},
            { text: 'Aplikacją internetową', correct: false},
            { text: 'Grą komputerową', correct: false},
            { text: 'Systemem operacyjnym', correct: true},
        ]
    },
    {
        question: 'W którym roku pojawił się pierwszy windows?',
        answers: [
            { text: '1980', correct: false},
            { text: '1985', correct: true},
            { text: '1990', correct: false},
            { text: '2015', correct: false},
        ]
    },
    {
        question: 'W którym morzu zatonął polski okręt podwodny "Orzeł"?',
        answers: [
            { text: 'Bałtyckim', correct: false},
            { text: 'Północnym', correct: true},
            { text: 'Śródziemnym', correct: false},
            { text: 'Czarnym', correct: false},
        ]
    },
]
