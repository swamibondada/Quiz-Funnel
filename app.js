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

    if (question.type === 'likert') {
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
    } else if (question.type === 'single') {
        // Render vertical choice buttons for Section 8
        return `
            <div class="choice-options">
                ${question.options.map(option => `
                    <div class="choice-item ${currentAnswer === option.value ? 'selected' : ''}" data-value="${option.value}">
                        <div class="choice-radio"></div>
                        <span class="choice-label">${option.label}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }
    return '';
}

function attachQuestionListeners(question) {
    if (question.type === 'likert') {
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
    } else if (question.type === 'single') {
        const choiceItems = document.querySelectorAll('.choice-item');
        choiceItems.forEach(item => {
            item.addEventListener('click', () => {
                const value = item.dataset.value;
                AppState.answers[question.id] = value;

                choiceItems.forEach(c => c.classList.remove('selected'));
                item.classList.add('selected');

                setTimeout(() => nextQuestion(), 400);
            });
        });
    }
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

function calculateAndShowResults() {
    AppState.results = ScoringEngine.calculateResults(AppState.answers);
    showScreen('results');
    renderResults();
}

function renderResults() {
    const { results } = AppState;
    const { archetype, dimensions, roadmap, diamondEcosystem } = results;

    const html = `
        <div class="result-header fade-in">
            <div class="brand-badge">YOUR PERSONALIZED ROADMAP</div>
            <div class="archetype-banner" style="background: ${archetype.color}15; border: 1px solid ${archetype.color}30;">
                <span class="archetype-icon">${archetype.icon}</span>
                <h1 class="archetype-name" style="color: ${archetype.color};">${archetype.name}</h1>
            </div>
            <p class="validation-text">${archetype.validation}</p>
        </div>

        <div class="dimension-card fade-in" style="animation-delay: 0.2s;">
            <h3 class="card-title">Your Current Skill Pillars</h3>
            <div class="dimension-bars-v">
                ${Object.entries(dimensions).map(([name, score]) => `
                    <div class="dim-bar-item">
                        <div class="dim-bar-track">
                            <div class="dim-bar-fill" style="height: ${score}%; background: ${archetype.color};"></div>
                        </div>
                        <span class="dim-bar-label">${name.split(' ')[0]}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="dimension-card fade-in" style="animation-delay: 0.4s;">
            <h3 class="card-title">Success Mountain Roadmap</h3>
            <div class="mountain-container">
                <svg viewBox="0 0 400 200" class="mountain-svg">
                    <!-- Path Background -->
                    <path d="M50,180 Q100,160 150,140 T250,100 T350,40" class="mountain-path-bg" />
                    <!-- Animated Path -->
                    <path d="M50,180 Q100,160 150,140 T250,100 T350,40" class="mountain-path-animated" style="stroke: ${archetype.color};" />
                    
                    <!-- Checkpoints -->
                    <g class="checkpoint" transform="translate(50, 180)">
                        <circle r="6" fill="${archetype.color}" />
                        <text y="20" text-anchor="middle" class="checkpoint-label">Start</text>
                    </g>
                    <g class="checkpoint" transform="translate(150, 140)">
                        <circle r="6" fill="#cbd5e1" class="checkpoint-dot" />
                        <text y="-15" text-anchor="middle" class="checkpoint-label">Growth</text>
                    </g>
                    <g class="checkpoint" transform="translate(350, 40)">
                        <circle r="6" fill="#cbd5e1" class="checkpoint-dot" />
                        <text y="-15" text-anchor="middle" class="checkpoint-label">Mastery</text>
                    </g>
                </svg>
            </div>
            
            <div class="roadmap-phases">
                ${roadmap.map((phase, i) => `
                    <div class="roadmap-phase-item ${i === 0 ? 'active' : ''}">
                        <div class="phase-number" style="background: ${i === 0 ? archetype.color : '#e2e8f0'}; text-decoration: none;">${i + 1}</div>
                        <div class="phase-content">
                            <h4 class="phase-title">${phase.title}</h4>
                            <div class="phase-focus">Focus: <strong>${phase.focus}</strong></div>
                            <p class="phase-desc">${phase.description}</p>
                            <a href="${phase.link}" class="session-link" style="color: ${archetype.color};">Go to Session →</a>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="ecosystem-section fade-in" style="animation-delay: 0.6s;">
            <h2 class="ecosystem-title">${diamondEcosystem.title}</h2>
            <p class="ecosystem-desc">${diamondEcosystem.description}</p>
            
            <div class="pillar-grid">
                ${diamondEcosystem.pillars.map(pillar => `
                    <div class="pillar-card">
                        <span class="pillar-icon">${pillar.icon}</span>
                        <h4 class="pillar-title">${pillar.title}</h4>
                        <p class="pillar-desc">${pillar.desc}</p>
                    </div>
                `).join('')}
            </div>
            
            <div class="ecosystem-closing">
                <p>${diamondEcosystem.closing}</p>
                <button class="btn-primary btn-large" onclick="window.open('https://diptibaking.com/diamond', '_blank')">
                    <span>${diamondEcosystem.ctaText}</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>

        <div style="text-align: center; margin-top: var(--space-8); padding-bottom: var(--space-8);">
            <button class="btn-secondary" onclick="location.reload()">Retake Quiz</button>
        </div>
    `;

    DOM.resultsContainer.innerHTML = html;

    // Animate the path drawing
    setTimeout(() => {
        const animatedPath = document.querySelector('.mountain-path-animated');
        if (animatedPath) {
            animatedPath.style.strokeDashoffset = '0';
        }
    }, 100);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', init);
