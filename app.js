// DVA 360° Bakery Performance Audit™ - Main Application Logic

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

    // Update Welcome Screen content for DVA Audit
    updateWelcomeScreen();

    DOM.startBtn.addEventListener('click', startQuiz);
    DOM.prevBtn.addEventListener('click', prevQuestion);
    DOM.nextBtn.addEventListener('click', nextQuestion);
}

function updateWelcomeScreen() {
    const welcomeTitle = document.querySelector('#welcome-screen h1');
    const welcomeDesc = document.querySelector('#welcome-screen .welcome-desc');

    if (welcomeTitle) welcomeTitle.innerText = quizData.auditInfo.title;
    if (welcomeDesc) {
        welcomeDesc.innerHTML = `
            <div class="audit-instructions">
                ${quizData.auditInfo.instructions.map(inst => `<p>• ${inst}</p>`).join('')}
            </div>
        `;
    }
}

// Flatten all questions from sections into single array
function getAllQuestions() {
    const questions = [];
    auditQuestionOrder.forEach(qId => {
        // Find which section this question belongs to
        let foundSection = null;
        for (const [secId, secData] of Object.entries(quizData.sections)) {
            const qData = secData.questions.find(q => q.id === qId);
            if (qData) {
                foundSection = { secId, ...secData, qData };
                break;
            }
        }

        if (foundSection) {
            questions.push({
                ...foundSection.qData,
                sectionId: foundSection.secId,
                sectionTitle: foundSection.title
            });
        }
    });
    return questions;
}

// Navigation Functions
function showScreen(screenName) {
    Object.values(DOM.screens).forEach(screen => {
        if (screen) screen.classList.remove('active');
    });
    if (DOM.screens[screenName]) DOM.screens[screenName].classList.add('active');
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

    if (answer === undefined) {
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
                <span class="section-name">${question.sectionTitle}</span>
            </div>
            <div class="question-card" data-question-id="${question.id}">
                <p class="question-text">
                    <span class="question-number">${questionNumber}.</span>
                    ${question.text}
                </p>
                <div class="choice-options">
                    ${question.options.map(option => `
                        <div class="choice-item ${AppState.answers[question.id] === option.val ? 'selected' : ''}" data-value="${option.val}">
                            <div class="choice-radio"></div>
                            <span class="choice-label">${option.label}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    DOM.quizContent.innerHTML = html;
    attachQuestionListeners(question);
    window.scrollTo(0, 0);
}

function attachQuestionListeners(question) {
    const choiceItems = document.querySelectorAll('.choice-item');
    choiceItems.forEach(item => {
        item.addEventListener('click', () => {
            const value = parseInt(item.dataset.value);
            AppState.answers[question.id] = value;

            choiceItems.forEach(c => c.classList.remove('selected'));
            item.classList.add('selected');

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
    DOM.nextBtn.querySelector('span').textContent = isLastQuestion ? 'Generate Audit Report' : 'Next';
}

function calculateAndShowResults() {
    AppState.results = ScoringEngine.calculateResults(AppState.answers);
    showScreen('results');
    renderResults();
}

function renderResults() {
    const { results } = AppState;
    if (!results) return;

    const {
        dimensions, dimensionNames, primaryGap, secondaryGap, strengthLever,
        lci, overwhelmRisk, mriAlert, overallAvg, paceLabel, recommendations, roadmap, msiLowest
    } = results;

    const html = `
        <div class="result-header fade-in">
            <div class="brand-badge">Bakery Performance Audit™ Report</div>
            <h1 class="archetype-name" style="color: #6366f1;">Audit Results: ${overallAvg}% Performance</h1>
            <p class="validation-text">Your diagnostic breakdown across 8 key baking and business dimensions.</p>
        </div>

        <!-- Metric Cards Row -->
        <div class="metric-grid fade-in">
            <div class="metric-card">
                <span class="metric-label">Overwhelm Risk</span>
                <span class="metric-value ${overwhelmRisk.includes('High') ? 'text-red' : overwhelmRisk.includes('Medium') ? 'text-amber' : 'text-emerald'}">${overwhelmRisk}</span>
            </div>
            <div class="metric-card">
                <span class="metric-label">Learning Pace</span>
                <span class="metric-value text-indigo">${paceLabel}</span>
            </div>
        </div>

        ${mriAlert ? `
            <div class="alert-box alert-warning fade-in">
                <div class="alert-icon">⚠️</div>
                <div class="alert-content">
                    <h4 class="alert-title">Mindset Stability Alert</h4>
                    <p>${mriAlert}</p>
                    ${msiLowest ? '<strong>Recommend: Address mindset before business scaling.</strong>' : ''}
                </div>
            </div>
        ` : ''}

        <!-- Skill Bars Section -->
        <div class="dimension-card fade-in" style="animation-delay: 0.2s;">
            <h3 class="card-title">Dimension Performance Analysis</h3>
            <div class="dimension-bars-v">
                ${Object.entries(dimensions).map(([id, score]) => {
        let color = '#10b981'; // Strong
        if (score < 40) color = '#ef4444'; // Critical
        else if (score < 60) color = '#f59e0b'; // Developing

        return `
                        <div class="dim-bar-item">
                            <div class="dim-bar-track">
                                <div class="dim-bar-fill" style="height: ${score}%; background: ${color};"></div>
                            </div>
                            <span class="dim-bar-label" title="${dimensionNames[id]}">${id}</span>
                            <span class="dim-bar-score">${score}%</span>
                        </div>
                    `;
    }).join('')}
            </div>
            <div class="bars-legend">
                <span class="legend-item"><i style="background: #ef4444;"></i> Critical</span>
                <span class="legend-item"><i style="background: #f59e0b;"></i> Developing</span>
                <span class="legend-item"><i style="background: #10b981;"></i> Strong</span>
            </div>
        </div>

        <!-- Gap Analysis Section -->
        <div class="gap-analysis-section">
            <div class="gap-card primary-gap-card fade-in" style="animation-delay: 0.3s;">
                <div class="gap-badge">PRIMARY GAP</div>
                <h4 class="gap-title">${primaryGap.name}</h4>
                <p class="gap-desc">Immediate attention required to stabilize your foundation.</p>
            </div>
            <div class="gap-card secondary-gap-card fade-in" style="animation-delay: 0.4s;">
                <div class="gap-badge">SECONDARY GAP</div>
                <h4 class="gap-title">${secondaryGap.name}</h4>
                <p class="gap-desc">Growth area for structured improvement.</p>
            </div>
            <div class="gap-card strength-lever-card fade-in" style="animation-delay: 0.5s;">
                <div class="gap-badge badge-strength">STRENGTH LEVER</div>
                <h4 class="gap-title">${strengthLever.name}</h4>
                <p class="gap-desc">Your competitive advantage to leverage for scaling.</p>
            </div>
        </div>

        <!-- Personalized Roadmap -->
        <div class="dimension-card fade-in" style="animation-delay: 0.6s;">
            <h3 class="card-title">${results.planDuration}-Month Personalized Roadmap</h3>
            <div class="roadmap-phases">
                ${roadmap.map((phase, i) => `
                    <div class="roadmap-phase-item ${i === 0 ? 'active' : ''}">
                        <div class="phase-number" style="background: ${i === 0 ? '#6366f1' : '#e2e8f0'}">${phase.months}</div>
                        <div class="phase-content">
                            <h4 class="phase-title">${phase.title}</h4>
                            <p class="phase-desc"><strong>Main Focus:</strong> ${phase.focus}</p>
                            <div class="phase-recommendation">
                                <strong>Recommended Program:</strong><br>
                                <span>${phase.recommendation}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Final CTA -->
        <div class="ecosystem-section fade-in" style="animation-delay: 0.7s;">
            <div class="ecosystem-closing">
                <h2 class="ecosystem-title">Unlock Full Accelerated Growth</h2>
                <p>Based on your Audit Results, we have pre-selected the optimal path for you inside the Diamond Ecosystem.</p>
                <button class="btn-primary btn-large" onclick="window.open('https://diptibaking.com/diamond', '_blank')">
                    <span>Unlock My Custom Roadmap</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>

        <div style="text-align: center; margin-top: var(--space-8); padding-bottom: var(--space-8);">
            <button class="btn-secondary" onclick="location.reload()">Reset & Restart Audit</button>
        </div>
    `;

    DOM.resultsContainer.innerHTML = html;
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', init);
