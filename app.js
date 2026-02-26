// Dipti Baking Skill Alignment Quiz - Main Application Logic
// Exact Structural Clone of Premium Reference

// App State
const AppState = {
    currentScreen: 'welcome',
    currentQuestionIndex: 0,
    allQuestions: [],
    answers: {},
    results: null
};

// DOM Elements
const DOM = {
    screens: {
        welcome: document.getElementById('welcome-screen'),
        quiz: document.getElementById('quiz-screen'),
        results: document.getElementById('results-screen')
    },
    startBtn: document.getElementById('start-quiz'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    progressFill: document.getElementById('progress-fill'),
    progressText: document.getElementById('progress-text'),
    quizContent: document.getElementById('quiz-content'),
    resultsContainer: document.querySelector('.results-container')
};

// Initialize App
function init() {
    // Build flat question array
    AppState.allQuestions = getAllQuestions();

    DOM.startBtn.addEventListener('click', startQuiz);
    DOM.prevBtn.addEventListener('click', prevQuestion);
    DOM.nextBtn.addEventListener('click', nextQuestion);
}

// Flatten all questions from sections into single array
function getAllQuestions() {
    const questions = [];
    sectionOrder.forEach(sectionKey => {
        const section = quizData[sectionKey];
        section.questions.forEach(question => {
            questions.push({
                ...question,
                sectionKey: sectionKey,
                sectionTitle: section.title,
                sectionIcon: section.icon,
                sectionSubtitle: section.subtitle
            });
        });
    });
    return questions;
}

// Navigation Functions
function showScreen(screenName) {
    Object.values(DOM.screens).forEach(screen => {
        screen.classList.remove('active');
    });
    DOM.screens[screenName].classList.add('active');
    AppState.currentScreen = screenName;
    window.scrollTo(0, 0);
}

function startQuiz() {
    AppState.currentQuestionIndex = 0;
    AppState.answers = {};
    showScreen('quiz');
    renderQuestion();
}

function prevQuestion() {
    if (AppState.currentQuestionIndex > 0) {
        AppState.currentQuestionIndex--;
        renderQuestion('prev');
    }
}

function nextQuestion() {
    if (!validateCurrentQuestion()) return;

    if (AppState.currentQuestionIndex < AppState.allQuestions.length - 1) {
        AppState.currentQuestionIndex++;
        renderQuestion('next');
    } else {
        calculateAndShowResults();
    }
}

// Validation
function validateCurrentQuestion() {
    const question = AppState.allQuestions[AppState.currentQuestionIndex];
    const answer = AppState.answers[question.id];
    const questionCard = document.querySelector('.question-card');

    if (!answer) {
        if (questionCard) {
            questionCard.classList.add('shake');
            setTimeout(() => questionCard.classList.remove('shake'), 500);
        }
        return false;
    }
    return true;
}

// Render Functions
function renderQuestion(direction = 'none') {
    const question = AppState.allQuestions[AppState.currentQuestionIndex];
    const questionNumber = AppState.currentQuestionIndex + 1;
    const totalQuestions = AppState.allQuestions.length;

    updateProgress();
    updateNavigation();

    // Determine animation class
    let animationClass = 'fade-in';
    if (direction === 'next') animationClass = 'slide-in-right';
    if (direction === 'prev') animationClass = 'slide-in-left';

    const html = `
        <div class="question-wrapper ${animationClass}">
            <div class="section-indicator">
                <span class="section-icon">${question.sectionIcon}</span>
                <span class="section-name">${question.sectionTitle}</span>
            </div>
            <div class="question-card" data-question-id="${question.id}">
                <p class="question-text">
                    <span class="question-number">${questionNumber}.</span>
                    ${question.text}
                </p>
                ${renderQuestionInput(question)}
            </div>
        </div>
    `;

    DOM.quizContent.innerHTML = html;
    attachQuestionListeners(question);
    window.scrollTo(0, 0);
}

function renderQuestionInput(question) {
    const currentAnswer = AppState.answers[question.id];
    const selectedValue = parseInt(currentAnswer) || 0;

    return `
        <div class="personality-scale">
            <span class="scale-label scale-label-left">Disagree</span>
            <div class="scale-circles">
                ${[1, 2, 3, 4, 5].map(val => {
        const sizeClass = val === 1 || val === 5 ? 'size-lg' : val === 2 || val === 4 ? 'size-md' : 'size-sm';
        return `<div class="scale-circle ${sizeClass} ${selectedValue === val ? 'selected' : ''}" data-value="${val}"></div>`;
    }).join('')}
            </div>
            <span class="scale-label scale-label-right">Agree</span>
        </div>
    `;
}

function attachQuestionListeners(question) {
    const scaleCircles = document.querySelectorAll('.scale-circle');
    scaleCircles.forEach(circle => {
        circle.addEventListener('click', () => {
            const value = circle.dataset.value;
            AppState.answers[question.id] = value;

            scaleCircles.forEach(c => c.classList.remove('selected'));
            circle.classList.add('selected');

            setTimeout(() => nextQuestion(), 400);
        });
    });
}

function updateProgress() {
    const totalQuestions = AppState.allQuestions.length;
    const progress = ((AppState.currentQuestionIndex + 1) / totalQuestions) * 100;
    DOM.progressFill.style.width = `${progress}%`;
    DOM.progressText.textContent = `Question ${AppState.currentQuestionIndex + 1} of ${totalQuestions}`;
}

function updateNavigation() {
    DOM.prevBtn.disabled = AppState.currentQuestionIndex === 0;
    const isLastQuestion = AppState.currentQuestionIndex === AppState.allQuestions.length - 1;
    DOM.nextBtn.querySelector('span').textContent = isLastQuestion ? 'See My Results' : 'Next';
}

// Results Functions
function calculateAndShowResults() {
    AppState.results = ScoringEngine.calculateResults(AppState.answers);
    showScreen('results');
    renderResults();
}

function renderResults() {
    const { results } = AppState;
    const ringColor = results.archetype.color;

    const html = `
        <div class="blueprint-header">
            <div class="brand-badge" style="margin-bottom: var(--space-4);">PERSONALIZED ANALYSIS</div>
            <h1 class="blueprint-title">Your Baking Skill Blueprint</h1>
            <p class="welcome-description" style="margin: 0 auto; text-align: center;">
                This analysis reveals your current proficiency across core baking skills and business foundations.
            </p>
        </div>
        
        <div class="dimension-card">
            <div class="section-badge">Overall Readiness</div>
            <div class="score-section" style="display: flex; align-items: center; justify-content: space-between; padding: var(--space-6);">
                <div>
                    <h2 class="energy-score-label">ALIGNMENT SCORE</h2>
                    <div class="score-number" style="font-size: 4rem;">${results.finalScore}%</div>
                    <p class="archetype-title" style="color: ${ringColor}; margin-top: var(--space-2);">${results.archetype.name.toUpperCase()}</p>
                </div>
                <div class="score-ring" style="width: 120px; height: 120px; --ring-percent: ${results.finalScore}">
                    <svg viewBox="0 0 100 100">
                        <circle class="ring-bg" cx="50" cy="50" r="45" style="fill:none; stroke:#e2e8f0; stroke-width:8;"/>
                        <circle class="ring-fill" cx="50" cy="50" r="45" style="fill:none; stroke:${ringColor}; stroke-width:8; stroke-linecap:round; stroke-dasharray:283; stroke-dashoffset:calc(283 - (283 * ${results.finalScore} / 100));"/>
                    </svg>
                </div>
            </div>
            <p class="archetype-desc" style="padding: 0 var(--space-6);">${results.archetype.description}</p>
        </div>

        <div class="dimension-card">
            <h3 class="card-title">Skill Dimension Breakdown</h3>
            <div class="dimension-bars-v">
                ${Object.entries(results.dimensions).map(([key, score]) => `
                    <div class="dim-bar-item">
                        <div class="dim-bar-track">
                            <div class="dim-bar-fill" style="height: ${score}%"></div>
                        </div>
                        <span class="dim-bar-label">${key}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="dimension-card">
            <h3 class="card-title">Personalised Learning Roadmap</h3>
            <div style="display: flex; flex-direction: column; gap: var(--space-4); margin-top: var(--space-6);">
                ${results.roadmap.map((phase, i) => `
                    <div style="padding: var(--space-4); background: #fafafa; border-radius: var(--radius-lg); border-left: 4px solid var(--accent-mint);">
                        <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">Phase ${i + 1}: ${phase.phase}</div>
                        <div style="font-size: var(--text-sm); font-weight: 600; color: var(--accent-mint); margin-bottom: 8px;">Focus: ${phase.focusName}</div>
                        <p style="font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.6;">${phase.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="oto-section" style="border-color: ${ringColor}">
            <h2 class="oto-title">Scale Your Baking Business</h2>
            <p class="oto-subtitle">${results.archetype.otoMessage}</p>
            <button class="btn-primary" onclick="window.open('https://diptibaking.com/pathway', '_blank')">
                <span>Unlock Full Mastery Pathway</span>
            </button>
        </div>

        <div style="text-align: center; margin-top: var(--space-8);">
            <button class="btn-secondary" onclick="location.reload()">Retake Assessment</button>
        </div>
    `;

    DOM.resultsContainer.innerHTML = html;
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', init);
