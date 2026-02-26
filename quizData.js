// Quiz Data Structure
// Dipti Baking Skill Alignment Quiz

const quizData = {
    // Section 1 - Baking Foundations (BFS) - Likert 1-5 - SCORED
    section1: {
        id: 'baking-foundations',
        title: 'Baking Foundations',
        subtitle: 'Core understanding that affects consistency of results',
        icon: '🧁',
        scored: true,
        dimension: 'BFS',
        questions: [
            {
                id: 'Q1',
                type: 'likert',
                text: 'My cake sponges rise evenly without sinking or cracking.',
                negative: false
            },
            {
                id: 'Q2',
                type: 'likert',
                text: 'I understand how ingredients (fat, sugar, eggs, raising agents) affect texture.',
                negative: false
            },
            {
                id: 'Q3',
                type: 'likert',
                text: 'I can confidently troubleshoot common cake failures.',
                negative: false
            },
            {
                id: 'Q4',
                type: 'likert',
                text: 'I am comfortable using homemade premixes and storing baked products correctly.',
                negative: false
            }
        ]
    },

    // Section 2 - Recipe Execution & Consistency (REX) - Likert 1-5 - SCORED
    section2: {
        id: 'recipe-execution',
        title: 'Recipe Execution & Consistency',
        subtitle: 'Your ability to produce reliable, repeatable results',
        icon: '📋',
        scored: true,
        dimension: 'REX',
        questions: [
            {
                id: 'Q5',
                type: 'likert',
                text: 'I can follow a recipe and reproduce the same result every time.',
                negative: false
            },
            {
                id: 'Q6',
                type: 'likert',
                text: 'My baked products taste balanced and professional.',
                negative: false
            },
            {
                id: 'Q7',
                type: 'likert',
                text: 'I feel confident executing multiple recipes without confusion.',
                negative: false
            },
            {
                id: 'Q8',
                type: 'likert',
                text: 'I can execute recipes across cakes, cookies, brownies, or breads reliably.',
                negative: false
            }
        ]
    },

    // Section 3 - Frosting, Decoration & Finish (FDS) - Likert 1-5 - SCORED
    section3: {
        id: 'frosting-decoration',
        title: 'Frosting, Decoration & Finish',
        subtitle: 'The visual and textural quality of your finished products',
        icon: '🎨',
        scored: true,
        dimension: 'FDS',
        questions: [
            {
                id: 'Q9',
                type: 'likert',
                text: 'My frosting texture (whipped cream, ganache, buttercream) comes out right consistently.',
                negative: false
            },
            {
                id: 'Q10',
                type: 'likert',
                text: 'I can finish cakes neatly without cracks, air bubbles, or uneven edges.',
                negative: false
            },
            {
                id: 'Q11',
                type: 'likert',
                text: 'I feel confident attempting decorative or themed cakes.',
                negative: false
            },
            {
                id: 'Q12',
                type: 'likert',
                text: 'My final product looks premium and sell‑ready.',
                negative: false
            }
        ]
    },

    // Section 4 - Advanced Techniques & Specialisation (ATS) - Likert 1-5 - SCORED
    section4: {
        id: 'advanced-techniques',
        title: 'Advanced Techniques & Specialisation',
        subtitle: 'Your comfort with higher-level baking skills',
        icon: '🏆',
        scored: true,
        dimension: 'ATS',
        questions: [
            {
                id: 'Q13',
                type: 'likert',
                text: 'I am confident working with advanced techniques (theme cakes, fondant, sugar flowers, chocolates).',
                negative: false
            },
            {
                id: 'Q14',
                type: 'likert',
                text: 'I know which advanced skills suit my current level.',
                negative: false
            },
            {
                id: 'Q15',
                type: 'likert',
                text: 'I feel clear about which specialisations I should not focus on yet.',
                negative: false
            }
        ]
    },

    // Section 5 - Business & Profitability (BPS) - Likert 1-5 - SCORED
    section5: {
        id: 'business-profitability',
        title: 'Business & Profitability',
        subtitle: 'How well you manage the financial side of baking',
        icon: '💰',
        scored: true,
        dimension: 'BPS',
        questions: [
            {
                id: 'Q16',
                type: 'likert',
                text: 'I know my exact cost per product.',
                negative: false
            },
            {
                id: 'Q17',
                type: 'likert',
                text: 'I price my products confidently without second‑guessing.',
                negative: false
            },
            {
                id: 'Q18',
                type: 'likert',
                text: 'I track expenses, profits, and budgets consistently.',
                negative: false
            },
            {
                id: 'Q19',
                type: 'likert',
                text: 'My baking efforts feel financially worthwhile.',
                negative: false
            }
        ]
    },

    // Section 6 - Workflow, Speed & Capacity (WSS) - Likert 1-5 - SCORED
    section6: {
        id: 'workflow-speed',
        title: 'Workflow, Speed & Capacity',
        subtitle: 'How efficiently you manage your baking operations',
        icon: '⚡',
        scored: true,
        dimension: 'WSS',
        questions: [
            {
                id: 'Q20',
                type: 'likert',
                text: 'I can handle multiple orders without stress.',
                negative: false
            },
            {
                id: 'Q21',
                type: 'likert',
                text: 'My baking workflow is organised and efficient.',
                negative: false
            },
            {
                id: 'Q22',
                type: 'likert',
                text: 'I finish orders on time without last‑minute panic.',
                negative: false
            }
        ]
    },

    // Section 7 - Learning Clarity (LCL) - Likert 1-5 - SCORED (Q24, Q25 reverse scored)
    section7: {
        id: 'learning-clarity',
        title: 'Learning Clarity',
        subtitle: 'How focused and directed your learning journey is',
        icon: '🎯',
        scored: true,
        dimension: 'LCL',
        questions: [
            {
                id: 'Q23',
                type: 'likert',
                text: 'I know exactly which courses I should focus on right now.',
                negative: false
            },
            {
                id: 'Q24',
                type: 'likert',
                text: 'I often feel overwhelmed by the number of available courses.',
                negative: true
            },
            {
                id: 'Q25',
                type: 'likert',
                text: 'I jump between courses without completing them.',
                negative: true
            }
        ]
    },

    // Section 8 - Time & Commitment (TC) - Single Choice - NOT SCORED
    section8: {
        id: 'time-commitment',
        title: 'Time & Commitment',
        subtitle: 'Your available time and current goals',
        icon: '⏰',
        scored: false,
        questions: [
            {
                id: 'Q26',
                type: 'single',
                text: 'How much time can you realistically dedicate to learning per week?',
                options: [
                    { value: 'less-than-2', label: 'Less than 2 hours' },
                    { value: '2-4', label: '2–4 hours' },
                    { value: '4-6', label: '4–6 hours' },
                    { value: '6-plus', label: '6+ hours' }
                ]
            },
            {
                id: 'Q27',
                type: 'single',
                text: 'What is your current primary goal?',
                options: [
                    { value: 'improve-consistency', label: 'Improve consistency' },
                    { value: 'improve-confidence', label: 'Improve confidence' },
                    { value: 'increase-income', label: 'Increase income' },
                    { value: 'learn-advanced', label: 'Learn advanced skills' }
                ]
            }
        ]
    }
};

// Likert scale labels
const likertLabels = {
    1: 'Strongly Disagree',
    2: 'Disagree',
    3: 'Neutral',
    4: 'Agree',
    5: 'Strongly Agree'
};

// Section order for navigation
const sectionOrder = [
    'section1',
    'section2',
    'section3',
    'section4',
    'section5',
    'section6',
    'section7',
    'section8'
];

// Archetype definitions based on overall score bands
const archetypes = {
    needsStrengthening: {
        name: 'Needs Strengthening',
        icon: '🌱',
        range: [0, 39],
        description: 'You are at the early stages of your baking journey — and that is perfectly fine. Every accomplished baker began exactly where you are. With the right guidance and consistent practice, your skills will grow rapidly. This assessment will help you identify precisely where to start for the fastest improvement.',
        color: '#ef5350',
        otoMessage: 'Your journey is just beginning, and the Dipti Academy is designed to take you from where you are to where you want to be. Start with the foundational courses and build confidence step by step.'
    },
    developing: {
        name: 'Developing',
        icon: '📈',
        range: [40, 59],
        description: 'You have built a solid foundation and are well on your way. Some areas are coming together nicely while others need more focused attention. This is the most exciting stage — where deliberate practice and targeted learning yield the biggest leaps forward.',
        color: '#FFA726',
        otoMessage: 'You have the foundation — now it is time to fill the gaps and accelerate your growth. The Dipti Academy courses recommended below are tailored to your specific needs.'
    },
    strong: {
        name: 'Strong',
        icon: '⭐',
        range: [60, 79],
        description: 'You demonstrate strong skills across most areas. Your baking is consistent, your products look professional, and you are developing a clear sense of direction. Now is the time to sharpen your specialisation and optimise your workflow and business approach.',
        color: '#66BB6A',
        otoMessage: 'Your skills are impressive. The next step is to refine your specialisation and turn your baking into a truly profitable venture with the advanced Dipti Academy courses.'
    },
    advanced: {
        name: 'Advanced',
        icon: '👨‍🍳',
        range: [80, 100],
        description: 'You are performing at an advanced level. Your technical skills, business acumen, and learning clarity are all well-developed. Continue refining your craft, mentoring others, and pushing into new specialisations to stay at the top of your game.',
        color: '#42A5F5',
        otoMessage: 'Congratulations on your exceptional mastery. The Dipti Academy advanced specialisation tracks will keep your skills sharp and open doors to new opportunities.'
    }
};

// Dimension display names, icons, and course clusters
const dimensionInfo = {
    BFS: {
        name: 'Baking Foundations',
        icon: '🧁',
        courses: ['Super Baker Foundation', 'Baking Premixes']
    },
    REX: {
        name: 'Recipe Execution',
        icon: '📋',
        courses: ['Cake Baking & Icing', 'Recipes', 'Cookies', 'Breads']
    },
    FDS: {
        name: 'Frosting & Decoration',
        icon: '🎨',
        courses: ['Frosting Mastery', 'Theme Cakes', 'Fondant']
    },
    ATS: {
        name: 'Advanced Techniques',
        icon: '🏆',
        courses: ['Sugar Flowers', 'Chocolates', 'Ice Cream Cakes']
    },
    BPS: {
        name: 'Business & Profitability',
        icon: '💰',
        courses: ['Home Bakery Profitability']
    },
    WSS: {
        name: 'Workflow & Speed',
        icon: '⚡',
        courses: ['Business Setup', 'Bake‑a‑thon']
    },
    LCL: {
        name: 'Learning Clarity',
        icon: '🎯',
        courses: ['Academy Orientation', 'Goal Setting']
    }
};
