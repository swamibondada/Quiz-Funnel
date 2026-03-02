// DVA 360° Bakery Performance Audit™ Data Structure

const quizData = {
    // Instructions & Setup
    auditInfo: {
        title: "DVA 360° Bakery Performance Audit™",
        instructions: [
            "There are no right or wrong answers.",
            "Answer based on your current consistency, not one-time success.",
            "Choose the option that reflects what is true for you most of the time."
        ]
    },

    // 8 Audit Sections
    sections: {
        BFS: {
            id: 'BFS',
            title: 'Baking Foundations',
            questions: [
                {
                    id: 'Q1',
                    text: 'When baking sponge cakes, my texture consistency is:',
                    options: [
                        { val: 1, label: 'A) Sometimes perfect, sometimes dense or uneven' },
                        { val: 2, label: 'B) Mostly consistent with small variations' },
                        { val: 3, label: 'C) Consistently soft, even, and reliable' }
                    ]
                },
                {
                    id: 'Q2',
                    text: 'I understand ingredient functions (flour, fat, sugar, leavening) and how they affect results:',
                    options: [
                        { val: 1, label: 'A) Not clearly — I mostly follow recipes blindly' },
                        { val: 2, label: 'B) I understand basic concepts' },
                        { val: 3, label: 'C) I clearly understand and can troubleshoot' }
                    ]
                },
                {
                    id: 'Q3',
                    text: 'When something fails, I can identify the cause:',
                    options: [
                        { val: 1, label: 'A) I feel confused and retry randomly' },
                        { val: 2, label: 'B) I guess the reason' },
                        { val: 3, label: 'C) I know exactly what likely went wrong' }
                    ]
                },
                {
                    id: 'Q4',
                    text: 'I can bake multiple core products (cakes, cookies, brownies, breads) confidently:',
                    options: [
                        { val: 1, label: 'A) Only 1–2 items confidently' },
                        { val: 2, label: 'B) 3–4 categories with moderate confidence' },
                        { val: 3, label: 'C) 5+ categories confidently' }
                    ]
                }
            ]
        },
        REX: {
            id: 'REX',
            title: 'Recipe Execution & Consistency',
            questions: [
                {
                    id: 'Q5',
                    text: 'When I repeat the same recipe, results are:',
                    options: [
                        { val: 1, label: 'A) Inconsistent' },
                        { val: 2, label: 'B) Mostly consistent' },
                        { val: 3, label: 'C) Highly consistent' }
                    ]
                },
                {
                    id: 'Q6',
                    text: 'I measure ingredients accurately and follow process discipline:',
                    options: [
                        { val: 1, label: 'A) Sometimes approximate' },
                        { val: 2, label: 'B) Mostly accurate' },
                        { val: 3, label: 'C) Always precise' }
                    ]
                },
                {
                    id: 'Q7',
                    text: 'I can execute bulk quantities without stress:',
                    options: [
                        { val: 1, label: 'A) I feel overwhelmed' },
                        { val: 2, label: 'B) I manage but feel pressure' },
                        { val: 3, label: 'C) I execute calmly with system' }
                    ]
                },
                {
                    id: 'Q8',
                    text: 'I maintain hygiene and professional standards consistently:',
                    options: [
                        { val: 1, label: 'A) Informally managed' },
                        { val: 2, label: 'B) Mostly maintained' },
                        { val: 3, label: 'C) Professionally maintained' }
                    ]
                }
            ]
        },
        FDS: {
            id: 'FDS',
            title: 'Frosting, Decoration & Finish',
            questions: [
                {
                    id: 'Q9',
                    text: 'My frosting consistency is:',
                    options: [
                        { val: 1, label: 'A) Unpredictable' },
                        { val: 2, label: 'B) Mostly stable' },
                        { val: 3, label: 'C) Reliable and smooth' }
                    ]
                },
                {
                    id: 'Q10',
                    text: 'My cake finishing looks:',
                    options: [
                        { val: 1, label: 'A) Homemade' },
                        { val: 2, label: 'B) Neat but simple' },
                        { val: 3, label: 'C) Premium and professional' }
                    ]
                },
                {
                    id: 'Q11',
                    text: 'I can execute theme/custom cakes confidently:',
                    options: [
                        { val: 1, label: 'A) Rarely' },
                        { val: 2, label: 'B) Sometimes' },
                        { val: 3, label: 'C) Yes, comfortably' }
                    ]
                },
                {
                    id: 'Q12',
                    text: 'I charge confidently for decoration effort:',
                    options: [
                        { val: 1, label: 'A) I undercharge' },
                        { val: 2, label: 'B) I estimate roughly' },
                        { val: 3, label: 'C) I price strategically' }
                    ]
                }
            ]
        },
        ATS: {
            id: 'ATS',
            title: 'Advanced Techniques & Specialisation',
            questions: [
                {
                    id: 'Q13',
                    text: 'I have at least one strong specialisation (e.g., fondant, chocolates, sugar flowers):',
                    options: [
                        { val: 1, label: 'A) No clear specialisation' },
                        { val: 2, label: 'B) Learning one area' },
                        { val: 3, label: 'C) Yes, strong skill depth' }
                    ]
                },
                {
                    id: 'Q14',
                    text: 'I can create premium, high-value products:',
                    options: [
                        { val: 1, label: 'A) Not yet' },
                        { val: 2, label: 'B) With guidance' },
                        { val: 3, label: 'C) Independently' }
                    ]
                },
                {
                    id: 'Q15',
                    text: 'I actively experiment and innovate:',
                    options: [
                        { val: 1, label: 'A) Rarely' },
                        { val: 2, label: 'B) Occasionally' },
                        { val: 3, label: 'C) Regularly' }
                    ]
                }
            ]
        },
        BPS: {
            id: 'BPS',
            title: 'Business & Profitability',
            questions: [
                {
                    id: 'Q16',
                    text: 'I calculate cost per product including overheads:',
                    options: [
                        { val: 1, label: 'A) No clear costing' },
                        { val: 2, label: 'B) Basic costing' },
                        { val: 3, label: 'C) Detailed profit calculation' }
                    ]
                },
                {
                    id: 'Q17',
                    text: 'I track monthly revenue & expenses:',
                    options: [
                        { val: 1, label: 'A) No tracking' },
                        { val: 2, label: 'B) Rough tracking' },
                        { val: 3, label: 'C) Structured tracking' }
                    ]
                },
                {
                    id: 'Q18',
                    text: 'I have a clear monthly revenue target:',
                    options: [
                        { val: 1, label: 'A) No fixed number' },
                        { val: 2, label: 'B) General idea' },
                        { val: 3, label: 'C) Specific target' }
                    ]
                },
                {
                    id: 'Q19',
                    text: 'I know how to market & generate consistent orders:',
                    options: [
                        { val: 1, label: 'A) I depend on referrals' },
                        { val: 2, label: 'B) I try social media sometimes' },
                        { val: 3, label: 'C) I have structured marketing approach' }
                    ]
                }
            ]
        },
        WSS: {
            id: 'WSS',
            title: 'Workflow, Speed & Capacity',
            questions: [
                {
                    id: 'Q20',
                    text: 'I can manage multiple orders simultaneously:',
                    options: [
                        { val: 1, label: 'A) I feel stressed' },
                        { val: 2, label: 'B) I manage but feel stretched' },
                        { val: 3, label: 'C) I manage confidently' }
                    ]
                },
                {
                    id: 'Q21',
                    text: 'My time management for baking is:',
                    options: [
                        { val: 1, label: 'A) Mood-based' },
                        { val: 2, label: 'B) Semi-structured' },
                        { val: 3, label: 'C) Scheduled and disciplined' }
                    ]
                },
                {
                    id: 'Q22',
                    text: 'Delivery and logistics are:',
                    options: [
                        { val: 1, label: 'A) Stressful' },
                        { val: 2, label: 'B) Manageable' },
                        { val: 3, label: 'C) System-driven' }
                    ]
                }
            ]
        },
        LCL: {
            id: 'LCL',
            title: 'Learning Clarity',
            questions: [
                {
                    id: 'Q23',
                    text: 'I know exactly what skill I need to improve next:',
                    options: [
                        { val: 1, label: 'A) I feel confused' },
                        { val: 2, label: 'B) I have some clarity' },
                        { val: 3, label: 'C) I am very clear' }
                    ]
                },
                {
                    id: 'Q24',
                    text: 'I often feel overwhelmed by too many recipes or learning options:',
                    options: [
                        { val: 1, label: 'A) Very often' },
                        { val: 2, label: 'B) Sometimes' },
                        { val: 3, label: 'C) Rarely' }
                    ]
                },
                {
                    id: 'Q25',
                    text: 'I jump from one course/video to another without finishing:',
                    options: [
                        { val: 1, label: 'A) Frequently' },
                        { val: 2, label: 'B) Occasionally' },
                        { val: 3, label: 'C) Rarely' }
                    ]
                }
            ]
        },
        MSI: {
            id: 'MSI',
            title: 'Mindset Stability Index',
            questions: [
                {
                    id: 'Q26',
                    text: 'I quote prices confidently without fear:',
                    options: [
                        { val: 1, label: 'A) I hesitate' },
                        { val: 2, label: 'B) I try but feel nervous' },
                        { val: 3, label: 'C) I quote calmly' }
                    ]
                },
                {
                    id: 'Q27',
                    text: 'Rejections reduce my motivation:',
                    options: [
                        { val: 1, label: 'A) Yes, significantly' },
                        { val: 2, label: 'B) Slightly' },
                        { val: 3, label: 'C) No, I stay focused' }
                    ]
                },
                {
                    id: 'Q28',
                    text: 'I take action even when I feel self-doubt:',
                    options: [
                        { val: 1, label: 'A) Rarely' },
                        { val: 2, label: 'B) Sometimes' },
                        { val: 3, label: 'C) Consistently' }
                    ]
                },
                {
                    id: 'Q29',
                    text: 'I believe I can build a ₹1 Lakh/month baking business:',
                    options: [
                        { val: 1, label: 'A) I doubt it' },
                        { val: 2, label: 'B) I hope so' },
                        { val: 3, label: 'C) I believe it is possible' }
                    ]
                },
                {
                    id: 'Q30',
                    text: 'When it comes to investing time, effort, or money in improving my baking business:',
                    options: [
                        { val: 1, label: 'A) I hesitate and overthink' },
                        { val: 2, label: 'B) I invest only when I feel fully ready' },
                        { val: 3, label: 'C) I decide based on growth potential and long-term ROI' }
                    ]
                }
            ]
        }
    }
};

// Flattened question list for logic
const auditQuestionOrder = [
    'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10',
    'Q11', 'Q12', 'Q13', 'Q14', 'Q15', 'Q16', 'Q17', 'Q18', 'Q19', 'Q20',
    'Q21', 'Q22', 'Q23', 'Q24', 'Q25', 'Q26', 'Q27', 'Q28', 'Q29', 'Q30'
];

// Mapping questions to dimensions
const dimensionMapping = {
    BFS: ['Q1', 'Q2', 'Q3', 'Q4'],
    REX: ['Q5', 'Q6', 'Q7', 'Q8'],
    FDS: ['Q9', 'Q10', 'Q11', 'Q12'],
    ATS: ['Q13', 'Q14', 'Q15'],
    BPS: ['Q16', 'Q17', 'Q18', 'Q19'],
    WSS: ['Q20', 'Q21', 'Q22'],
    LCL: ['Q23', 'Q24', 'Q25'],
    MSI: ['Q26', 'Q27', 'Q28', 'Q29', 'Q30']
};

const dimensionNames = {
    BFS: 'Baking Foundations',
    REX: 'Recipe Execution & Consistency',
    FDS: 'Frosting, Decoration & Finish',
    ATS: 'Advanced Techniques & Specialisation',
    BPS: 'Business & Profitability',
    WSS: 'Workflow, Speed & Capacity',
    LCL: 'Learning Clarity',
    MSI: 'Mindset Stability Index'
};

const coursemapping = {
    BFS: 'Super Baker Foundation',
    REX: 'Cake Baking & Icing / Core Recipes',
    FDS: 'Frosting Mastery / Theme Cakes',
    ATS: 'Chocolates / Ice Cream Cakes / Specialisation',
    BPS: 'Home Bakery Profitability',
    WSS: 'Bake-a-thon / Business Setup',
    MSI: 'Millionaire Morning Program / Identity Work'
};
