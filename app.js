// Baking Personality Quiz - Main Application Logic
// Redesigned for one-question-at-a-time premium experience

// App State
const AppState = {
    currentScreen: 'welcome',
    currentQuestionIndex: 0,
    allQuestions: [],
    answers: {},
    results: null,
    userName: ''
};

// DOM Elements
const DOM = {
    screens: {
        welcome: document.getElementById('welcome-screen'),
        name: document.getElementById('name-screen'),
        quiz: document.getElementById('quiz-screen'),
        results: document.getElementById('results-screen')
    },
    startBtn: document.getElementById('start-quiz'),
    nameInput: document.getElementById('user-name'),
    continueBtn: document.getElementById('continue-to-quiz'),
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
    DOM.continueBtn.addEventListener('click', handleNameSubmission);
    DOM.prevBtn.addEventListener('click', prevQuestion);
    DOM.nextBtn.addEventListener('click', nextQuestion);

    // Allow Enter key in name input
    if (DOM.nameInput) {
        DOM.nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleNameSubmission();
        });
    }
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
    AppState.userName = '';
    if (DOM.nameInput) DOM.nameInput.value = '';
    showScreen('name');
}

function handleNameSubmission() {
    const name = DOM.nameInput.value.trim();
    if (name === '') {
        DOM.nameInput.style.borderColor = 'var(--accent-primary)';
        shakeElement(DOM.nameInput);
        return;
    }
    AppState.userName = name;
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
    // Validate current question
    if (!validateCurrentQuestion()) {
        return;
    }

    if (AppState.currentQuestionIndex < AppState.allQuestions.length - 1) {
        AppState.currentQuestionIndex++;
        renderQuestion('next');
    } else {
        // Calculate results and show
        calculateAndShowResults();
    }
}

// Validation
function validateCurrentQuestion() {
    const question = AppState.allQuestions[AppState.currentQuestionIndex];
    const answer = AppState.answers[question.id];
    const questionCard = document.querySelector('.question-card');

    if (!answer || (typeof answer === 'string' && answer.trim() === '')) {
        if (questionCard) {
            questionCard.classList.add('invalid');
            shakeElement(questionCard);
        }
        return false;
    }

    if (questionCard) {
        questionCard.classList.remove('invalid');
    }
    return true;
}

function shakeElement(element) {
    element.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    .question-card.invalid {
        border-color: var(--error) !important;
    }
`;
document.head.appendChild(style);

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

    switch (question.type) {
        case 'text':
            return `
                <input type="text" 
                    class="text-input" 
                    id="${question.id}"
                    placeholder="${question.placeholder || ''}"
                    value="${currentAnswer || ''}">
            `;

        case 'single':
        case 'categorical':
            return `
                <div class="options-grid">
                    ${question.options.map(opt => `
                        <label class="option-label ${currentAnswer === opt.value ? 'selected' : ''}" data-value="${opt.value}">
                            <input type="radio" class="option-radio" name="${question.id}" value="${opt.value}" ${currentAnswer === opt.value ? 'checked' : ''}>
                            <span class="option-indicator"></span>
                            <span class="option-text">${opt.label}</span>
                        </label>
                    `).join('')}
                </div>
            `;

        case 'likert':
            // Personality test style circles (no slider, varying sizes)
            const selectedValue = parseInt(currentAnswer) || 0;
            return `
                <div class="personality-scale">
                    <span class="scale-label scale-label-left">Disagree</span>
                    <div class="scale-circles">
                        ${[1, 2, 3, 4, 5].map(val => {
                // Size classes: ends are larger, middle is smaller
                const sizeClass = val === 1 || val === 5 ? 'size-lg' :
                    val === 2 || val === 4 ? 'size-md' : 'size-sm';
                // Color classes: left side teal, right side green, middle neutral
                const colorClass = val <= 2 ? 'color-disagree' :
                    val >= 4 ? 'color-agree' : 'color-neutral';
                return `
                                <div class="scale-circle ${sizeClass} ${colorClass} ${selectedValue === val ? 'selected' : ''}" 
                                     data-value="${val}">
                                </div>
                            `;
            }).join('')}
                    </div>
                    <span class="scale-label scale-label-right">Agree</span>
                </div>
            `;

        default:
            return '';
    }
}

function getLikertLabel(value) {
    const labels = {
        1: 'Strongly Disagree',
        2: 'Disagree',
        3: 'Neutral',
        4: 'Agree',
        5: 'Strongly Agree'
    };
    return labels[value] || '';
}

function attachQuestionListeners(question) {
    // Text inputs
    const textInput = document.querySelector('.text-input');
    if (textInput) {
        textInput.addEventListener('input', (e) => {
            AppState.answers[e.target.id] = e.target.value;
            removeInvalidState();
        });
        textInput.focus();
    }

    // Radio options (single, categorical)
    document.querySelectorAll('.option-label').forEach(label => {
        label.addEventListener('click', (e) => {
            const radio = label.querySelector('.option-radio');
            const questionId = radio.name;
            const value = radio.value;

            // Update state
            AppState.answers[questionId] = value;

            // Update UI
            const siblings = label.parentElement.querySelectorAll('.option-label');
            siblings.forEach(sib => sib.classList.remove('selected'));
            label.classList.add('selected');

            removeInvalidState();

            // Auto-advance
            setTimeout(() => {
                nextQuestion();
            }, 600);
        });
    });

    // Personality scale circles (likert)
    const scaleCircles = document.querySelectorAll('.scale-circle');
    if (scaleCircles.length > 0) {
        scaleCircles.forEach(circle => {
            circle.addEventListener('click', () => {
                const value = circle.dataset.value;

                // Update state
                AppState.answers[question.id] = value;

                // Update UI - remove selected from all, add to clicked
                scaleCircles.forEach(c => c.classList.remove('selected'));
                circle.classList.add('selected');

                removeInvalidState();

                // Auto-advance
                setTimeout(() => {
                    nextQuestion();
                }, 600);
            });
        });
    }
}

function removeInvalidState() {
    const card = document.querySelector('.question-card');
    if (card) card.classList.remove('invalid');
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
    DOM.nextBtn.innerHTML = isLastQuestion
        ? `<span>See My Results</span>
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M5 12h14M12 5l7 7-7 7"/>
           </svg>`
        : `<span>Next</span>
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M5 12h14M12 5l7 7-7 7"/>
           </svg>`;
}

// Results Functions
function calculateAndShowResults() {
    AppState.results = ScoringEngine.calculateResults(AppState.answers);
    showScreen('results');
    renderResults();
}

function renderResults() {
    const { results } = AppState;

    // Helper to determine status level
    const getStatusLevel = (score) => {
        if (score <= 40) return { label: 'Beginner', class: 'depleted' };
        if (score <= 70) return { label: 'Developing', class: 'transitioning' };
        return { label: 'Expert', class: 'flowing' };
    };

    // Create dimension scores for radar and bars
    const dimensionScores = [
        { name: 'Personality', key: 'BP', score: results.dimensions.BP },
        { name: 'Skills', key: 'BS', score: results.dimensions.BS },
        { name: 'Creativity', key: 'BC', score: results.dimensions.BC }
    ];

    const sorted = [...dimensionScores].sort((a, b) => a.score - b.score);
    const weakest = sorted.slice(0, 1);
    const strongest = sorted[sorted.length - 1];

    // Calculate ring percentage
    const ringPercent = results.finalScore;
    const ringColor = results.finalScore <= 40 ? '#f06292' : results.finalScore <= 70 ? '#e91e63' : '#d5a021';

    // Generate 7-day baking challenge based on archetype
    const bakingChallenge = generate7DayBakingChallenge(results.archetype.name);

    // Generate core pattern narrative
    const corePattern = generateCorePattern(results, weakest, strongest);

    const html = `
        <!-- Report Header -->
        <div class="blueprint-header">
            <div class="blueprint-badge">
                <span class="badge-dot"></span>
                PERSONALIZED BAKING PROFILE REPORT
            </div>
            <h1 class="blueprint-title">${AppState.userName}'s Baker Profile</h1>
            <p class="blueprint-subtitle">
                ${AppState.userName}, this report is a thoughtful reflection of your baking personality, skills, and creative potential — 
                and a clear path to elevate your craft to the next level.
            </p>
        </div>
        
        <!-- Status Banner -->
        <div class="status-banner status-${getStatusLevel(results.finalScore).class}">
            <span class="status-dot"></span>
            ${getStatusMessage(results.finalScore)}
        </div>
        
        <!-- Main Score Section -->
        <div class="score-section">
            <div class="score-left">
                <div class="section-badge">
                    <span class="badge-dot"></span>
                    Overall Profile
                </div>
                <h2 class="energy-score-label">BAKING MASTERY SCORE</h2>
                <div class="score-number">${results.finalScore}</div>
                <div class="score-legend">
                    <span><strong>0–40:</strong> Novice</span>
                    <span><strong>41–70:</strong> Developing</span>
                    <span><strong>71–100:</strong> Master</span>
                </div>
                <p class="archetype-intro">You are currently in the</p>
                <h3 class="archetype-title" style="color: ${ringColor}">${results.archetype.name.toUpperCase()}</h3>
                <p class="archetype-desc">${results.archetype.description}</p>
            </div>
            <div class="score-right">
                <div class="score-ring" style="--ring-color: ${ringColor}; --ring-percent: ${ringPercent}">
                    <svg viewBox="0 0 100 100">
                        <circle class="ring-bg" cx="50" cy="50" r="45"/>
                        <circle class="ring-fill" cx="50" cy="50" r="45"/>
                    </svg>
                </div>
            </div>
        </div>
        
        <!-- Quick Snapshot -->
        <div class="snapshot-section">
            <h3 class="snapshot-title">Quick Snapshot</h3>
            <p class="snapshot-subtitle">A closer look at how your baking abilities are distributed across key areas.</p>
            <div class="snapshot-tags">
                <span class="snapshot-tag tag-${getStatusLevel(results.indices.CSI).class}">
                    Creative Style: ${getStatusLevel(results.indices.CSI).label}
                </span>
                <span class="snapshot-tag tag-${getStatusLevel(results.indices.BRI).class}">
                    Baking Readiness: ${getStatusLevel(results.indices.BRI).label}
                </span>
                <span class="snapshot-tag tag-${getStatusLevel(results.indices.BPI).class}">
                    Business Potential: ${getStatusLevel(results.indices.BPI).label}
                </span>
            </div>
            <div class="composite-bars">
                ${renderCompositeBar('Creative Style', results.indices.CSI)}
                ${renderCompositeBar('Baking Readiness', results.indices.BRI)}
                ${renderCompositeBar('Business Potential', results.indices.BPI)}
            </div>
        </div>
        
        <!-- Baking Dimensions Grid -->
        <div class="dimensions-grid-section">
            <div class="dimension-card">
                <h3 class="card-title">Your Baking Wheel</h3>
                <p class="card-subtitle">This radar shows how evenly your abilities are distributed across the three core baking dimensions.</p>
                <div class="radar-chart">
                    <canvas id="radarChart"></canvas>
                </div>
            </div>
            <div class="dimension-card">
                <h3 class="card-title">Dimension Scores</h3>
                <p class="card-subtitle">Each bar is a 0–100 score based on your answers. Lower scores indicate areas with the most growth potential.</p>
                <div class="dimension-bars">
                    ${dimensionScores.map(d => renderDimensionBar(d.name, d.score)).join('')}
                </div>
                <p class="strongest-note">
                    Your strongest area is <strong>${strongest.name}</strong>. Continue nurturing this strength — it serves as the foundation that will support growth across other dimensions.
                </p>
            </div>
        </div>
        
        <!-- Growth Areas Section -->
        <div class="leaks-section">
            <p class="leaks-text">
                The area with the most growth potential is <strong>${weakest[0].name}</strong>. 
                Focused practice and learning in this area will yield the most meaningful improvements to your overall baking profile.
            </p>
        </div>
        
        <!-- Core Baking Pattern -->
        <div class="pattern-section">
            <div class="section-badge">
                <span class="badge-dot"></span>
                YOUR BAKING IDENTITY
            </div>
            <h3 class="pattern-title">Your Core Baking Pattern</h3>
            <p class="pattern-narrative">${corePattern.narrative}</p>
            
            <h4 class="pattern-subtitle">How this shows up in your baking</h4>
            <ul class="pattern-list">
                ${corePattern.behaviors.map(b => `<li>${b}</li>`).join('')}
            </ul>
        </div>
        
        <!-- Baker's Insight -->
        <div class="root-section">
            <h4 class="root-title">Your baker's edge</h4>
            <p class="root-text">${corePattern.rootCause}</p>
        </div>
        
        <!-- 7-Day Baking Challenge -->
        <div class="reset-section">
            <div class="section-badge">
                <span class="badge-dot"></span>
                YOUR NEXT 7 DAYS
            </div>
            <h3 class="reset-title">7-Day Baking Challenge</h3>
            <p class="reset-subtitle">
                This structured 7-day programme is designed to help you build daily baking habits — 
                simple, enjoyable practices that steadily sharpen your skills and unlock your creative potential.
            </p>
            <div class="reset-days">
                ${bakingChallenge.map((day, i) => `
                    <div class="reset-day">
                        <span class="day-dot day-${day.category.toLowerCase()}"></span>
                        <div class="day-content">
                            <span class="day-label">DAY ${i + 1}</span>
                            <p class="day-practice"><strong>${day.category}:</strong> ${day.practice}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <!-- Personal Note -->
        <div class="note-from-ritu">
            <div class="ritu-avatar">🧁</div>
            <div class="ritu-content">
                <span class="ritu-label">A Note from Your Baking Coach</span>
                <p class="ritu-message">
                    Every amazing baker started exactly where you are right now. Whether you're just discovering the magic of measuring flour or you're perfecting your ganache technique, remember that baking is as much about the journey as it is about the destination. Take even one step from this report today, and you'll already be on the path to becoming the baker you've always dreamed of being.
                </p>
                <p class="ritu-signature">Happy Baking! 🎂</p>
            </div>
        </div>
        
        <!-- Disclaimer -->
        <p class="report-disclaimer">
            This report is a reflective assessment designed to illuminate your baking strengths and growth areas. Results are based on your self-reported answers.
        </p>
        
        <!-- OTO Section -->
        <div class="oto-section">
            <div class="oto-content">
                <span class="oto-badge">Special Offer for You</span>
                <h2 class="oto-title">21-Day Baking Mastery Program</h2>
                <p class="oto-subtitle">${results.archetype.otoMessage}</p>
                
                <div class="oto-benefits">
                    <div class="oto-benefit">
                        <span class="benefit-icon">🎯</span>
                        <div class="benefit-text">
                            <strong>Daily Baking Lessons</strong>
                            Step-by-step guided techniques
                        </div>
                    </div>
                    <div class="oto-benefit">
                        <span class="benefit-icon">📖</span>
                        <div class="benefit-text">
                            <strong>50+ Exclusive Recipes</strong>
                            From basics to advanced creations
                        </div>
                    </div>
                    <div class="oto-benefit">
                        <span class="benefit-icon">🎥</span>
                        <div class="benefit-text">
                            <strong>Video Masterclasses</strong>
                            Watch and learn from experts
                        </div>
                    </div>
                    <div class="oto-benefit">
                        <span class="benefit-icon">💬</span>
                        <div class="benefit-text">
                            <strong>Community Access</strong>
                            Connect with fellow bakers
                        </div>
                    </div>
                </div>
                
                <button class="oto-cta" onclick="handleOTOClick()">
                    <span>Yes! I Want to Master Baking</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </button>
                
                <p class="oto-guarantee">100% Satisfaction Guarantee | Start your baking transformation today</p>
            </div>
        </div>
        
        <!-- Retake Quiz -->
        <div style="text-align: center; margin-top: var(--space-10);">
            <button class="btn-secondary" onclick="retakeQuiz()">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 4v6h6M23 20v-6h-6"/>
                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                </svg>
                <span>Retake Quiz</span>
            </button>
        </div>
    `;

    DOM.resultsContainer.innerHTML = html;

    // Initialize radar chart after DOM is ready
    setTimeout(() => {
        initRadarChart(dimensionScores);
        animateBars();
    }, 100);
}

// Helper functions for report generation
function getStatusMessage(score) {
    if (score <= 40) {
        return "YOU'RE AT THE START OF AN EXCITING BAKING JOURNEY. EVERY MASTER BAKER BEGAN WITH CURIOSITY AND A FIRST RECIPE.";
    } else if (score <= 70) {
        return "YOUR BAKING SKILLS ARE DEVELOPING BEAUTIFULLY. FOCUSED PRACTICE WILL TAKE YOU TO THE NEXT LEVEL.";
    } else {
        return "YOUR BAKING MASTERY IS IMPRESSIVE. CONTINUE REFINING YOUR CRAFT AND INSPIRING OTHERS.";
    }
}

function renderCompositeBar(label, value, isInverse = false) {
    const displayValue = isInverse ? value : value;
    const color = isInverse
        ? (value > 60 ? '#d5a021' : value > 30 ? '#e91e63' : '#f06292')
        : (value > 60 ? '#d5a021' : value > 30 ? '#e91e63' : '#f06292');

    return `
        <div class="composite-bar-item">
            <span class="composite-label">${label}</span>
            <div class="composite-track">
                <div class="composite-fill" data-width="${displayValue}" style="width: 0%; background: ${color}"></div>
            </div>
            <span class="composite-value">${displayValue}</span>
        </div>
    `;
}

function renderDimensionBar(name, score) {
    return `
        <div class="dim-bar-item">
            <div class="dim-bar-track">
                <div class="dim-bar-fill" data-height="${score}%"></div>
            </div>
            <span class="dim-bar-label">${name}</span>
        </div>
    `;
}

function generateCorePattern(results, weakest, strongest) {
    const patterns = {
        'The Novice Baker': {
            narrative: `You're at the <span class="highlight">dawn of your baking adventure</span> — full of curiosity, ready to explore, and eager to discover the magic that happens when flour, butter, and creativity come together.`,
            behaviors: [
                'You enjoy watching baking shows and tutorials but haven\'t yet built confidence to try everything yourself.',
                'You tend to stick with simple, familiar recipes and may feel intimidated by complex techniques.',
                'You appreciate beautifully decorated cakes but are still learning the tools and methods behind them.',
                'You have a genuine passion for baking that, with the right guidance, can blossom into real skill.'
            ],
            rootCause: `Your potential is enormous. The gap between where you are and where you want to be is simply a matter of practice, patience, and finding the right mentors. Every expert was once a beginner.`
        },
        'The Home Baker': {
            narrative: `You've built a <span class="highlight">comfortable baking foundation</span> and your kitchen is where you feel most creative. You can handle the classics and you're starting to push into new territory.`,
            behaviors: [
                'You confidently bake family favorites and receive compliments on your creations.',
                'You experiment occasionally but may retreat to familiar recipes when time is short.',
                'You understand basic techniques but sometimes struggle with consistency or advanced methods.',
                'You\'re building an intuition for flavors and are increasingly curious about professional techniques.'
            ],
            rootCause: `You have the foundation and the passion — what you need now is structured practice and exposure to advanced techniques. The leap from good to great often comes down to deliberate, focused improvement.`
        },
        'The Artisan Baker': {
            narrative: `You bring <span class="highlight">artistry and expertise</span> to every creation. Your baking reflects both technical skill and creative vision, and people notice the difference in everything you make.`,
            behaviors: [
                'You confidently tackle complex recipes and enjoy the challenge of mastering new techniques.',
                'Your flavor combinations are thoughtful and creative — you go beyond the expected.',
                'You invest in quality tools and ingredients because you understand their impact on the final product.',
                'People seek out your baked goods for special occasions and trust your creative judgment.'
            ],
            rootCause: `Your artisan-level skills set you apart. The next frontier is developing your unique signature style and potentially turning your passion into a profession. Your creativity combined with your technique creates something truly special.`
        },
        'The Master Baker': {
            narrative: `You have achieved <span class="highlight">true baking mastery</span> — a rare combination of technical precision, creative innovation, and deep culinary understanding that sets your work apart.`,
            behaviors: [
                'You don\'t just follow recipes — you create them. Your kitchen is your laboratory for innovation.',
                'You mentor others naturally, sharing techniques and knowledge with generosity.',
                'Your presentation is impeccable and your flavor profiles are sophisticated and balanced.',
                'You\'re always pushing boundaries, whether experimenting with new ingredients or perfecting timeless classics.'
            ],
            rootCause: `Your mastery is the result of years of dedication, experimentation, and a genuine love for the craft. You have the power to inspire the next generation of bakers and leave a lasting impact on the baking world.`
        }
    };

    return patterns[results.archetype.name] || patterns['The Home Baker'];
}

function generate7DayBakingChallenge(archetypeName) {
    const challenges = {
        'The Novice Baker': [
            { category: 'BASICS', practice: 'Master the art of measuring ingredients precisely. Practice measuring flour using the spoon-and-level method.' },
            { category: 'SKILLS', practice: 'Bake a simple vanilla sponge cake from scratch. Focus on proper mixing technique.' },
            { category: 'FLAVORS', practice: 'Experiment with adding one new flavor to a familiar recipe — try cinnamon, cardamom, or citrus zest.' },
            { category: 'TOOLS', practice: 'Learn to use a piping bag. Practice making rosettes and borders with buttercream on parchment paper.' },
            { category: 'CREATIVITY', practice: 'Decorate a cupcake batch with 3 different styles. Take photos to track your progress.' },
            { category: 'KNOWLEDGE', practice: 'Research the science behind leavening agents. Understand when to use baking soda vs baking powder.' },
            { category: 'INTEGRATION', practice: 'Bake something for someone you love. Reflect on your week and journal about what you learned.' }
        ],
        'The Home Baker': [
            { category: 'TECHNIQUE', practice: 'Perfect your creaming method. Cream butter and sugar for a full 3-5 minutes for the lightest texture.' },
            { category: 'FLAVORS', practice: 'Create a flavor pairing chart. Combine 3 unexpected ingredients and taste-test the results.' },
            { category: 'SKILLS', practice: 'Attempt a multi-layer cake with even layers. Practice the art of level, even baking.' },
            { category: 'DECORATION', practice: 'Master a crumb coat. Apply a thin layer of frosting, chill, then add the final coat for a polished look.' },
            { category: 'INTERNATIONAL', practice: 'Try an international recipe you\'ve never made before — French macarons, Japanese cheesecake, or Italian tiramisu.' },
            { category: 'BUSINESS', practice: 'Calculate the cost of your signature recipe. Practice pricing it for a potential customer.' },
            { category: 'INTEGRATION', practice: 'Host a mini tasting party. Present 3 of your best creations and collect honest feedback.' }
        ],
        'The Artisan Baker': [
            { category: 'MASTERY', practice: 'Perfect a mirror glaze technique. Focus on temperature control and achieving a flawless finish.' },
            { category: 'INNOVATION', practice: 'Create an original flavor combination that reflects your unique style. Document the recipe.' },
            { category: 'TECHNIQUE', practice: 'Master sugar work — attempt pulled sugar or a caramel cage for cake decoration.' },
            { category: 'BRANDING', practice: 'Design your bakery brand identity. Create a logo concept, choose your color palette, and define your style.' },
            { category: 'SKILLS', practice: 'Work with a new pastry type — pâte à choux, puff pastry, or croissant dough from scratch.' },
            { category: 'PRESENTATION', practice: 'Style and photograph your best creation. Practice food photography techniques for social media.' },
            { category: 'INTEGRATION', practice: 'Write down your top 5 signature recipes. Begin creating your personal recipe collection.' }
        ],
        'The Master Baker': [
            { category: 'INNOVATION', practice: 'Develop a completely original recipe using at least one unconventional ingredient. Document your process.' },
            { category: 'MENTORSHIP', practice: 'Teach someone a baking technique today. Share one skill that transformed your own baking.' },
            { category: 'MASTERY', practice: 'Perfect a showpiece dessert — entremets, croquembouche, or a sculpted cake that pushes your limits.' },
            { category: 'BUSINESS', practice: 'Draft a business plan for your dream bakery. Define your niche, target audience, and unique value proposition.' },
            { category: 'CREATIVITY', practice: 'Create a seasonal 5-item menu with cohesive flavors and a unified aesthetic theme.' },
            { category: 'EXPANSION', practice: 'Research baking trends from 3 countries. Adapt one technique into your style.' },
            { category: 'INTEGRATION', practice: 'Reflect on your baking journey. Write a letter to your past self about what you\'ve learned and achieved.' }
        ]
    };

    return challenges[archetypeName] || challenges['The Home Baker'];
}

function initRadarChart(dimensionScores) {
    const canvas = document.getElementById('radarChart');
    if (!canvas) return;

    // Use container width for responsive sizing
    const container = canvas.parentElement;
    const containerWidth = container ? container.clientWidth : 500;
    const size = Math.min(containerWidth - 32, 500);
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = (size / 2) - 50;
    const labels = dimensionScores.map(d => d.name);
    const values = dimensionScores.map(d => d.score);
    const numPoints = values.length;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid circles
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (radius * i) / 4, 0, Math.PI * 2);
        ctx.stroke();
    }

    // Draw grid lines
    for (let i = 0; i < numPoints; i++) {
        const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
            centerX + Math.cos(angle) * radius,
            centerY + Math.sin(angle) * radius
        );
        ctx.stroke();
    }

    // Draw data polygon
    ctx.fillStyle = 'rgba(233, 30, 99, 0.2)';
    ctx.strokeStyle = '#e91e63';
    ctx.lineWidth = 2;
    ctx.beginPath();

    values.forEach((value, i) => {
        const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
        const distance = (value / 100) * radius;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw data points
    ctx.fillStyle = '#d5a021';
    values.forEach((value, i) => {
        const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
        const distance = (value / 100) * radius;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw labels
    ctx.fillStyle = 'rgba(30, 41, 59, 0.85)';
    ctx.font = '14px Inter, sans-serif';
    ctx.textAlign = 'center';

    labels.forEach((label, i) => {
        const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
        const x = centerX + Math.cos(angle) * (radius + 20);
        const y = centerY + Math.sin(angle) * (radius + 20);
        ctx.fillText(label, x, y + 4);
    });
}

function animateBars() {
    // Animate dimension bars (vertical - use height)
    document.querySelectorAll('.dim-bar-fill').forEach(fill => {
        const height = fill.getAttribute('data-height'); // data-height contains the percentage
        setTimeout(() => {
            fill.style.height = height;
        }, 100);
    });

    // Animate composite bars (horizontal - use width)
    document.querySelectorAll('.composite-fill').forEach(fill => {
        const targetWidth = fill.getAttribute('data-width'); // data-width contains the numeric value
        setTimeout(() => {
            fill.style.width = targetWidth + '%';
        }, 100);
    });
}

// Action Handlers
function handleOTOClick() {
    // TODO: Replace this with the actual payment link
    const PAYMENT_URL = 'https://buy.stripe.com/test_placeholder';
    window.open(PAYMENT_URL, '_blank');
}

function retakeQuiz() {
    AppState.currentQuestionIndex = 0;
    AppState.answers = {};
    AppState.results = null;
    showScreen('welcome');
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', init);
