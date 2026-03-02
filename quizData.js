// Quiz Data Structure for Diamond Program Quiz Funnel

const quizData = {
    // Section 1 - Core Identification & Skills
    section1: {
        id: 'skill-assessment',
        title: 'Baking & Business Assessment',
        subtitle: 'Identify your current level and goals',
        icon: '📋',
        scored: true,
        questions: [
            {
                id: 'Q1',
                type: 'single',
                text: 'Which best describes you?',
                options: [
                    { value: 'beginner', label: 'I am a beginner and don’t know much about baking or recipes' },
                    { value: 'intermediate', label: 'I am an intermediate baker but want to improve' },
                    { value: 'advanced', label: 'I am an advanced baker and confident in baking & decoration' },
                    { value: 'business', label: 'I know baking well and only want to learn business' }
                ]
            },
            {
                id: 'Q2',
                type: 'single',
                text: 'When it comes to following recipes, what is your biggest challenge?',
                options: [
                    { value: 'basics', label: 'I struggle with why cakes sink or rise unevenly' },
                    { value: 'consistency', label: 'I can follow a recipe but results aren\'t consistent' },
                    { value: 'scaling', label: 'I want to scale my product line and save time' },
                    { value: 'efficiency', label: 'My workflow is slow and I need better systems' }
                ]
            },
            {
                id: 'Q3',
                type: 'single',
                text: 'How do you feel about your cake decoration skills?',
                options: [
                    { value: 'scared', label: 'I am scared to even pick up a piping bag' },
                    { value: 'basic', label: 'I do basic icing but it lacks a professional finish' },
                    { value: 'confident', label: 'I can handle sharp edges but want to master themes' },
                    { value: 'advanced_art', label: 'I want to master high-end sugar flowers and artistry' }
                ]
            },
            {
                id: 'Q4',
                type: 'single',
                text: 'How do you currently handle pricing for your orders?',
                options: [
                    { value: 'guess', label: 'I don\'t know my costs and guestimate prices' },
                    { value: 'market', label: 'I price based on what others charge localy' },
                    { value: 'guilt', label: 'I know my costs but feel guilty charging premium' },
                    { value: 'system', label: 'I have a system but want to increase profitability' }
                ]
            },
            {
                id: 'Q5',
                type: 'single',
                text: 'What would 3 months of expert coaching change for you?',
                options: [
                    { value: 'perfect_sponge', label: 'I\'d bake a perfect sponge for my family/friends' },
                    { value: 'paid_orders', label: 'I\'d start taking paid orders with confidence' },
                    { value: 'scale_business', label: 'I\'d scale my hobby into a 5-figure business' },
                    { value: 'master_artistry', label: 'I\'d become the most sought-after artist in town' }
                ]
            },
            {
                id: 'Q6',
                type: 'single',
                text: 'What is your biggest dream for your baking journey?',
                options: [
                    { value: 'hobby_to_venture', label: 'Turning my creative hobby into a small venture' },
                    { value: 'go_to_baker', label: 'Becoming the go-to baker in my local area' },
                    { value: 'premium_brand', label: 'Building a premium brand with professional recognition' },
                    { value: 'financial_freedom', label: 'Financial freedom through a structured business' }
                ]
            },
            {
                id: 'Q7',
                type: 'single',
                text: 'How much time can you dedicate to growing your skills?',
                options: [
                    { value: 'few_hours', label: 'A few hours on weekends' },
                    { value: 'daily_consistency', label: '1-2 hours of daily consistent practice' },
                    { value: 'full_time', label: 'I am ready to go all-in full time' }
                ]
            }
        ]
    }
};

// Section order for navigation
const sectionOrder = ['section1'];

// Archetype definitions based on Q1 selection
const archetypes = {
    beginner: {
        id: 'beginner',
        name: 'Beginner Baker',
        icon: '🌱',
        color: '#6366f1',
        validation: 'It is so brave to start something new! Every master baker you admire once stood right where you are. Your passion is the perfect foundation, and with the right steps, you\'ll be baking professional-grade cakes sooner than you think.',
        roadmap: {
            start: 'Beginner Baking Modules',
            focus: 'Mastering the Perfect Sponge & Basic Science',
            why: 'Building a fail-proof foundation prevents frustration and wasted ingredients, giving you the confidence to grow.',
            transition: 'Once you master the basics, you\'ll naturally unlock Advanced Decoration and Business Systems.'
        }
    },
    intermediate: {
        id: 'intermediate',
        name: 'Intermediate Baker',
        icon: '📈',
        color: '#10b981',
        validation: 'You\'ve moved past the basics and already have some wins under your belt! That\'s incredible. Now is the time to bridge the gap between "good" and "professional" by refining your techniques and consistency.',
        roadmap: {
            start: 'Intermediate + Skill Upgrade Modules',
            focus: 'Precision Baking & Professional Finishing',
            why: 'Refining your execution ensures every cake is a masterpiece, allowing you to charge what you\'re truly worth.',
            transition: 'As your skills sharpen, we\'ll integrate the Business & Sales systems to turn your talent into profit.'
        }
    },
    advanced: {
        id: 'advanced',
        name: 'Advanced Baker',
        icon: '🏆',
        color: '#f59e0b',
        validation: 'Your dedication to your craft is evident. You have the technical skills, and now you\'re ready to reach the pinnacle of baking artistry and professional branding. You\'re playing a big game now!',
        roadmap: {
            start: 'Advanced Baking + Decoration Mastery',
            focus: 'High-End Artistry & Signature Style',
            why: 'Mastering advanced decoration sets you apart in the market, making you the obvious choice for premium clients.',
            transition: 'With your artistry solidified, the Business Growth modules will help you scale and automate your success.'
        }
    },
    business: {
        id: 'business',
        name: 'Business-Focused Baker',
        icon: '💰',
        color: '#ec4899',
        validation: 'You\'re a talented baker who understands that a successful business needs more than just great recipes. You have the heart of an entrepreneur, and you\'re ready to build a system that works for you.',
        roadmap: {
            start: 'Business & Sales Modules First',
            focus: 'Pricing Strategy, Marketing & Sales Systems',
            why: 'Focusing on the business side first ensures your hard work translates into real profit and a sustainable lifestyle.',
            transition: 'While we scale your business, you\'ll have full access to refine any technical skills through our advanced modules.'
        }
    }
};

const diamondEcosystem = {
    title: 'The Diamond Program Ecosystem',
    description: 'The Diamond Program is more than just a course; it\'s a complete ecosystem designed to take you from hobbyist to high-earning professional baker.',
    pillars: [
        {
            title: 'Baking Mastery',
            desc: 'From beginner foundations to advanced, fail-proof recipes that keep customers coming back.',
            icon: '🧁'
        },
        {
            title: 'Advanced Decoration',
            desc: 'Master the art of high-end decoration, theme cakes, and professional finishing that WOWs every time.',
            icon: '🎨'
        },
        {
            title: 'Business & Sales',
            desc: 'The complete system for pricing, marketing, and scaling your home bakery into a profitable brand.',
            icon: '📊'
        }
    ],
    closing: 'Diamond contains everything you need to succeed, but your path inside it will be customized to YOUR current level and goals. You don\'t have to figure it out alone.',
    ctaText: 'Start My Personalized Diamond Journey'
};
