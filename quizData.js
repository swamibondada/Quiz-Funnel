// Quiz Data Structure
// Baking Personality Quiz – Your Ultimate Baker Profile

const quizData = {
    // Section 1 - Baking Personality (Likert Scale – 1 to 5) - SCORED
    section1: {
        id: 'baking-personality',
        title: 'Baking Personality',
        subtitle: 'Discover your natural baking style',
        icon: '🧁',
        scored: true,
        dimension: 'BP',
        questions: [
            {
                id: 'S1Q1',
                type: 'likert',
                text: 'I enjoy experimenting with new cake flavors.',
                negative: false
            },
            {
                id: 'S1Q2',
                type: 'likert',
                text: 'I follow baking recipes very precisely.',
                negative: false
            },
            {
                id: 'S1Q3',
                type: 'likert',
                text: 'I prefer decorating cakes more than baking them.',
                negative: false
            },
            {
                id: 'S1Q4',
                type: 'likert',
                text: 'I enjoy baking for special occasions.',
                negative: false
            },
            {
                id: 'S1Q5',
                type: 'likert',
                text: 'I like trying international dessert styles.',
                negative: false
            },
            {
                id: 'S1Q6',
                type: 'likert',
                text: 'Presentation matters more than taste for me.',
                negative: false
            },
            {
                id: 'S1Q7',
                type: 'likert',
                text: 'I am confident in using baking tools and equipment.',
                negative: false
            },
            {
                id: 'S1Q8',
                type: 'likert',
                text: 'I prefer simple, classic cakes over trendy designs.',
                negative: false
            }
        ]
    },

    // Section 2 - Flavor Preferences (Single Choice) - NOT SCORED
    section2: {
        id: 'flavor-preferences',
        title: 'Flavor Preferences',
        subtitle: 'What excites your taste buds?',
        icon: '🎂',
        scored: false,
        questions: [
            {
                id: 'S2Q1',
                type: 'single',
                text: 'What\'s your favorite cake flavor?',
                options: [
                    { value: 'chocolate', label: 'Chocolate' },
                    { value: 'vanilla', label: 'Vanilla' },
                    { value: 'red-velvet', label: 'Red Velvet' },
                    { value: 'fruit-based', label: 'Fruit-based' }
                ]
            },
            {
                id: 'S2Q2',
                type: 'single',
                text: 'Which frosting do you prefer?',
                options: [
                    { value: 'buttercream', label: 'Buttercream' },
                    { value: 'whipped-cream', label: 'Whipped Cream' },
                    { value: 'cream-cheese', label: 'Cream Cheese' },
                    { value: 'ganache', label: 'Ganache' }
                ]
            },
            {
                id: 'S2Q3',
                type: 'single',
                text: 'What type of texture do you enjoy most?',
                options: [
                    { value: 'soft-fluffy', label: 'Soft & Fluffy' },
                    { value: 'dense-rich', label: 'Dense & Rich' },
                    { value: 'moist-creamy', label: 'Moist & Creamy' },
                    { value: 'light-airy', label: 'Light & Airy' }
                ]
            },
            {
                id: 'S2Q4',
                type: 'single',
                text: 'Which bakery item do you love most?',
                options: [
                    { value: 'cupcakes', label: 'Cupcakes' },
                    { value: 'pastries', label: 'Pastries' },
                    { value: 'brownies', label: 'Brownies' },
                    { value: 'cheesecake', label: 'Cheesecake' }
                ]
            },
            {
                id: 'S2Q5',
                type: 'single',
                text: 'What kind of sweetness level do you prefer?',
                options: [
                    { value: 'very-sweet', label: 'Very Sweet' },
                    { value: 'moderately-sweet', label: 'Moderately Sweet' },
                    { value: 'mild-sweet', label: 'Mild Sweet' },
                    { value: 'low-sugar', label: 'Low Sugar' }
                ]
            },
            {
                id: 'S2Q6',
                type: 'single',
                text: 'What inspires your baking style?',
                options: [
                    { value: 'family-traditions', label: 'Family traditions' },
                    { value: 'social-media', label: 'Social media trends' },
                    { value: 'professional-chefs', label: 'Professional chefs' },
                    { value: 'personal-creativity', label: 'Personal creativity' }
                ]
            },
            {
                id: 'S2Q7',
                type: 'single',
                text: 'Which occasion do you bake for most?',
                options: [
                    { value: 'birthdays', label: 'Birthdays' },
                    { value: 'weddings', label: 'Weddings' },
                    { value: 'festivals', label: 'Festivals' },
                    { value: 'casual-weekends', label: 'Casual weekends' }
                ]
            }
        ]
    },

    // Section 3 - Baking Skills (Categorical – Scored)
    section3: {
        id: 'baking-skills',
        title: 'Baking Skills',
        subtitle: 'Assess your baking expertise',
        icon: '🥐',
        scored: true,
        dimension: 'BS',
        questions: [
            {
                id: 'S3Q1',
                type: 'categorical',
                text: 'How comfortable are you with baking from scratch?',
                mapping: 'scratchComfort',
                options: [
                    { value: 'beginner', label: 'Beginner', score: 25 },
                    { value: 'intermediate', label: 'Intermediate', score: 50 },
                    { value: 'advanced', label: 'Advanced', score: 75 },
                    { value: 'expert', label: 'Expert', score: 100 }
                ]
            },
            {
                id: 'S3Q2',
                type: 'categorical',
                text: 'How well do you handle cake decorating tools?',
                mapping: 'decoratingTools',
                options: [
                    { value: 'not-confident', label: 'Not confident', score: 25 },
                    { value: 'learning', label: 'Learning', score: 50 },
                    { value: 'skilled', label: 'Skilled', score: 75 },
                    { value: 'professional', label: 'Professional', score: 100 }
                ]
            },
            {
                id: 'S3Q3',
                type: 'categorical',
                text: 'How often do you try new baking techniques?',
                mapping: 'newTechniques',
                options: [
                    { value: 'rarely', label: 'Rarely', score: 25 },
                    { value: 'occasionally', label: 'Occasionally', score: 50 },
                    { value: 'frequently', label: 'Frequently', score: 75 },
                    { value: 'very-often', label: 'Very often', score: 100 }
                ]
            },
            {
                id: 'S3Q4',
                type: 'categorical',
                text: 'How organized are you while baking?',
                mapping: 'organization',
                options: [
                    { value: 'messy', label: 'Messy', score: 25 },
                    { value: 'somewhat-organized', label: 'Somewhat organized', score: 50 },
                    { value: 'organized', label: 'Organized', score: 75 },
                    { value: 'extremely-organized', label: 'Extremely organized', score: 100 }
                ]
            },
            {
                id: 'S3Q5',
                type: 'categorical',
                text: 'How good are you at flavor pairing?',
                mapping: 'flavorPairing',
                options: [
                    { value: 'still-learning', label: 'Still learning', score: 25 },
                    { value: 'basic-understanding', label: 'Basic understanding', score: 50 },
                    { value: 'good-at-pairing', label: 'Good at pairing', score: 75 },
                    { value: 'excellent-sense', label: 'Excellent pairing sense', score: 100 }
                ]
            },
            {
                id: 'S3Q6',
                type: 'categorical',
                text: 'How do you handle baking failures?',
                mapping: 'failureHandling',
                options: [
                    { value: 'give-up', label: 'Give up', score: 25 },
                    { value: 'retry-once', label: 'Retry once', score: 50 },
                    { value: 'keep-experimenting', label: 'Keep experimenting', score: 75 },
                    { value: 'analyze-improve', label: 'Analyze & improve', score: 100 }
                ]
            }
        ]
    },

    // Section 4 - Bakery Preferences (Single Choice) - NOT SCORED
    section4: {
        id: 'bakery-preferences',
        title: 'Bakery Preferences',
        subtitle: 'Your bakery style and vision',
        icon: '🍩',
        scored: false,
        questions: [
            {
                id: 'S4Q1',
                type: 'single',
                text: 'Which cake style do you prefer?',
                options: [
                    { value: 'minimalist', label: 'Minimalist' },
                    { value: 'rustic', label: 'Rustic' },
                    { value: 'luxury-fondant', label: 'Luxury fondant' },
                    { value: 'modern-geometric', label: 'Modern geometric' }
                ]
            },
            {
                id: 'S4Q2',
                type: 'single',
                text: 'What is your ideal bakery vibe?',
                options: [
                    { value: 'cozy-homely', label: 'Cozy & Homely' },
                    { value: 'elegant-premium', label: 'Elegant & Premium' },
                    { value: 'fun-colorful', label: 'Fun & Colorful' },
                    { value: 'modern-chic', label: 'Modern & Chic' }
                ]
            },
            {
                id: 'S4Q3',
                type: 'single',
                text: 'Which dessert trend excites you?',
                options: [
                    { value: 'mirror-glaze', label: 'Mirror glaze cakes' },
                    { value: 'bento-cakes', label: 'Bento cakes' },
                    { value: 'drip-cakes', label: 'Drip cakes' },
                    { value: 'floral-cakes', label: 'Floral cakes' }
                ]
            },
            {
                id: 'S4Q4',
                type: 'single',
                text: 'What\'s your favorite filling?',
                options: [
                    { value: 'chocolate-mousse', label: 'Chocolate mousse' },
                    { value: 'fresh-fruits', label: 'Fresh fruits' },
                    { value: 'caramel', label: 'Caramel' },
                    { value: 'custard', label: 'Custard' }
                ]
            },
            {
                id: 'S4Q5',
                type: 'single',
                text: 'What bakery business model appeals to you?',
                options: [
                    { value: 'home-bakery', label: 'Home bakery' },
                    { value: 'cafe-bakery', label: 'Café bakery' },
                    { value: 'online-custom', label: 'Online custom orders' },
                    { value: 'large-retail', label: 'Large retail shop' }
                ]
            },
            {
                id: 'S4Q6',
                type: 'single',
                text: 'Which pastry do you enjoy most?',
                options: [
                    { value: 'croissants', label: 'Croissants' },
                    { value: 'danish-pastries', label: 'Danish pastries' },
                    { value: 'eclairs', label: 'Éclairs' },
                    { value: 'macarons', label: 'Macarons' }
                ]
            },
            {
                id: 'S4Q7',
                type: 'single',
                text: 'How do you prefer your cakes?',
                options: [
                    { value: 'egg-based', label: 'Egg-based' },
                    { value: 'eggless', label: 'Eggless' },
                    { value: 'vegan', label: 'Vegan' },
                    { value: 'gluten-free', label: 'Gluten-free' }
                ]
            }
        ]
    },

    // Section 5 - Business & Creativity (Likert Scale) - SCORED
    section5: {
        id: 'business-creativity',
        title: 'Business & Creativity',
        subtitle: 'Your entrepreneurial baking spirit',
        icon: '🍞',
        scored: true,
        dimension: 'BC',
        questions: [
            {
                id: 'S5Q1',
                type: 'likert',
                text: 'I would like to start my own bakery one day.',
                negative: false
            },
            {
                id: 'S5Q2',
                type: 'likert',
                text: 'I enjoy designing custom cakes for clients.',
                negative: false
            },
            {
                id: 'S5Q3',
                type: 'likert',
                text: 'I am confident in pricing my baked products.',
                negative: false
            },
            {
                id: 'S5Q4',
                type: 'likert',
                text: 'I enjoy promoting my baking on social media.',
                negative: false
            },
            {
                id: 'S5Q5',
                type: 'likert',
                text: 'I like learning about new baking tools.',
                negative: false
            },
            {
                id: 'S5Q6',
                type: 'likert',
                text: 'I focus on branding and packaging.',
                negative: false
            },
            {
                id: 'S5Q7',
                type: 'likert',
                text: 'I am open to attending baking workshops.',
                negative: false
            },
            {
                id: 'S5Q8',
                type: 'likert',
                text: 'I enjoy creating seasonal special menus.',
                negative: false
            }
        ]
    },

    // Section 6 - Open Reflection (Text Input) - NOT SCORED
    section6: {
        id: 'open-reflection',
        title: 'Open Reflection',
        subtitle: 'Share your baking story',
        icon: '🎂',
        scored: false,
        questions: [
            {
                id: 'S6Q1',
                type: 'text',
                text: 'What inspired you to start baking?',
                placeholder: 'Share your baking inspiration...'
            },
            {
                id: 'S6Q2',
                type: 'text',
                text: 'What is your signature cake or dessert?',
                placeholder: 'Describe your signature creation...'
            },
            {
                id: 'S6Q3',
                type: 'text',
                text: 'What is your biggest baking challenge?',
                placeholder: 'Tell us about your challenge...'
            },
            {
                id: 'S6Q4',
                type: 'text',
                text: 'What is your ultimate bakery dream?',
                placeholder: 'Describe your bakery dream...'
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
    'section6'
];

// Updated Archetype definitions for baking
const archetypes = {
    noviceBaker: {
        name: 'The Novice Baker',
        icon: '🌱',
        range: [0, 40],
        description: 'You\'re at the beginning of your baking journey — and what a beautiful place to be! Like a fresh batch of dough waiting to rise, you\'re full of untapped potential. Every great baker started exactly where you are. Your curiosity and willingness to learn will be your greatest ingredients. Embrace every experiment, every imperfect cake, and every lesson learned along the way.',
        color: '#6B7280',
        otoMessage: 'Your baking journey is just beginning, and the best time to build a strong foundation is now. The 21-Day Baking Mastery Program is designed to take you from curious beginner to confident baker with daily guided lessons.'
    },
    homeBaker: {
        name: 'The Home Baker',
        icon: '🏠',
        range: [41, 60],
        description: 'You\'ve developed a solid foundation in baking and your kitchen is your creative sanctuary. You can whip up family favorites with confidence and you\'re starting to explore beyond the basics. Your passion for baking is evident in every creation, and with focused practice, you\'re well on your way to taking your skills to the next level.',
        color: '#F59E0B',
        otoMessage: 'You\'ve got the basics down — now it\'s time to elevate your craft. The 21-Day Baking Mastery Program will introduce you to advanced techniques, presentation skills, and flavor combinations that will transform your home baking.'
    },
    artisanBaker: {
        name: 'The Artisan Baker',
        icon: '🎨',
        range: [61, 80],
        description: 'You are a skilled baker with a refined palate and impressive technique. Your creations showcase both artistry and expertise, blending flavors and designs that surprise and delight. You understand the science behind baking and you leverage that knowledge to push creative boundaries. People seek out your baked goods and admire your craft.',
        color: '#8B5CF6',
        otoMessage: 'Your artisan skills are impressive — now take them professional. The 21-Day Baking Mastery Program will help you refine your signature style, master advanced decorating, and build a brand around your unique baking identity.'
    },
    masterBaker: {
        name: 'The Master Baker',
        icon: '👨‍🍳',
        range: [81, 100],
        description: 'You are a true baking virtuoso! Your mastery spans technique, flavor, presentation, and creativity. You don\'t just follow recipes — you invent them. Your kitchen is your laboratory and your cakes are works of art. Whether it\'s a classic croissant or an avant-garde showpiece, you approach every bake with precision, passion, and a touch of magic.',
        color: '#10B981',
        otoMessage: 'Congratulations on your exceptional mastery! The 21-Day Baking Mastery Program will help you explore cutting-edge techniques, build your professional portfolio, and share your expertise with aspiring bakers worldwide.'
    }
};

// Dimension display names and icons
const dimensionInfo = {
    BP: { name: 'Baking Personality', icon: '🧁', interpretation: 'Higher is better' },
    BS: { name: 'Baking Skills', icon: '🥐', interpretation: 'Higher is better' },
    BC: { name: 'Business & Creativity', icon: '🍞', interpretation: 'Higher is better' },
    CSI: { name: 'Creative Style Index', icon: '🎨', interpretation: 'Higher is better' },
    BRI: { name: 'Baking Readiness Index', icon: '📊', interpretation: 'Higher is better' },
    BPI: { name: 'Business Potential Index', icon: '💼', interpretation: 'Higher is better' }
};
