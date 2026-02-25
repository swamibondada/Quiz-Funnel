// Scoring Logic for Baking Personality Quiz
// Implements all scoring rules as specified in the framework

const ScoringEngine = {
    // Likert mapping: 1→0, 2→25, 3→50, 4→75, 5→100
    likertMap: {
        1: 0,
        2: 25,
        3: 50,
        4: 75,
        5: 100
    },

    // Reverse score: 100 - mapped value
    reverseScore(score) {
        return 100 - score;
    },

    // Map Likert value to score
    mapLikert(value) {
        return this.likertMap[value] || 0;
    },

    // Calculate score for a single question
    calculateQuestionScore(question, answer) {
        if (!answer) return null;

        let score;

        if (question.type === 'likert') {
            const rawScore = this.mapLikert(parseInt(answer));
            if (question.reverse) {
                score = this.reverseScore(rawScore);
            } else {
                score = rawScore;
            }
        } else if (question.type === 'categorical') {
            const option = question.options.find(opt => opt.value === answer);
            score = option ? option.score : 0;
        } else {
            // Non-scored questions (text, single without score)
            return null;
        }

        return score;
    },

    // Calculate dimension score (average of question scores)
    calculateDimensionScore(sectionKey, answers) {
        const section = quizData[sectionKey];
        if (!section || !section.scored) return null;

        const scores = [];

        section.questions.forEach(question => {
            const answer = answers[question.id];

            // Skip non-scored questions
            if (question.scored === false) return;

            const score = this.calculateQuestionScore(question, answer);
            if (score !== null) {
                scores.push(score);
            }
        });

        if (scores.length === 0) return null;

        return scores.reduce((sum, s) => sum + s, 0) / scores.length;
    },

    // Calculate all dimension scores
    calculateAllDimensions(answers) {
        const dimensions = {};

        // Section 1: Baking Personality (BP)
        dimensions.BP = this.calculateDimensionScore('section1', answers) || 0;

        // Section 3: Baking Skills (BS)
        dimensions.BS = this.calculateDimensionScore('section3', answers) || 0;

        // Section 5: Business & Creativity (BC)
        dimensions.BC = this.calculateDimensionScore('section5', answers) || 0;

        return dimensions;
    },

    // Calculate Composite Indices
    calculateCompositeIndices(dimensions) {
        const indices = {};

        // CSI (Creative Style Index) = 0.50*BP + 0.50*BC
        indices.CSI = (0.50 * dimensions.BP) + (0.50 * dimensions.BC);

        // BRI (Baking Readiness Index) = 0.40*BS + 0.30*BP + 0.30*BC
        indices.BRI = (0.40 * dimensions.BS) + (0.30 * dimensions.BP) + (0.30 * dimensions.BC);

        // BPI (Business Potential Index) = 0.50*BC + 0.30*BS + 0.20*BP
        indices.BPI = (0.50 * dimensions.BC) + (0.30 * dimensions.BS) + (0.20 * dimensions.BP);

        return indices;
    },

    // Calculate Final Baking Score
    calculateFinalScore(indices) {
        // Final Score = (CSI + BRI + BPI) / 3
        const finalScore = (indices.CSI + indices.BRI + indices.BPI) / 3;
        return Math.round(finalScore);
    },

    // Determine Archetype based on Final Score
    determineArchetype(score) {
        if (score <= 40) {
            return archetypes.noviceBaker;
        } else if (score <= 60) {
            return archetypes.homeBaker;
        } else if (score <= 80) {
            return archetypes.artisanBaker;
        } else {
            return archetypes.masterBaker;
        }
    },

    // Generate Key Insights based on scores
    generateInsights(dimensions, indices, archetype) {
        const insights = [];

        // Insight 1: Based on archetype
        insights.push({
            icon: archetype.icon,
            text: `As someone in <strong>${archetype.name}</strong>, ${this.getArchetypeInsight(archetype)}`
        });

        // Insight 2: Strongest dimension
        const dimensionAreas = {
            BP: dimensions.BP,
            BS: dimensions.BS,
            BC: dimensions.BC
        };
        const strongest = Object.entries(dimensionAreas)
            .sort((a, b) => b[1] - a[1])[0];

        insights.push({
            icon: dimensionInfo[strongest[0]].icon,
            text: `Your strongest area is <strong>${dimensionInfo[strongest[0]].name}</strong> (${Math.round(strongest[1])}%). This is where your baking passion truly shines.`
        });

        // Insight 3: Area with most growth potential
        const weakest = Object.entries(dimensionAreas)
            .sort((a, b) => a[1] - b[1])[0];

        if (weakest[1] < 60) {
            insights.push({
                icon: '🌱',
                text: `Your greatest growth opportunity is in <strong>${dimensionInfo[weakest[0]].name}</strong> (${Math.round(weakest[1])}%). Focused practice here will elevate your entire baking game.`
            });
        }

        // Insight 4: Creative Style
        if (indices.CSI >= 60) {
            insights.push({
                icon: '🎨',
                text: `Your <strong>Creative Style Index</strong> (${Math.round(indices.CSI)}%) shows a wonderful creative spark. You have a natural eye for innovation in the kitchen.`
            });
        } else {
            insights.push({
                icon: '🎨',
                text: `Your <strong>Creative Style Index</strong> (${Math.round(indices.CSI)}%) suggests room to explore your creative side. Try experimenting with new flavors and decorating styles.`
            });
        }

        // Insight 5: Business Potential
        if (indices.BPI >= 60) {
            insights.push({
                icon: '💼',
                text: `Your <strong>Business Potential</strong> (${Math.round(indices.BPI)}%) indicates real entrepreneurial promise. You have the mindset to turn your baking passion into a thriving business!`
            });
        }

        return insights;
    },

    getArchetypeInsight(archetype) {
        switch (archetype.name) {
            case 'The Novice Baker':
                return 'your baking journey is just beginning. Every great baker started with curiosity and a willingness to learn — and you have both in abundance.';
            case 'The Home Baker':
                return 'you\'ve built a solid baking foundation. With focused practice and exploration, you\'re ready to take your skills to exciting new heights.';
            case 'The Artisan Baker':
                return 'your skills and creativity are impressive. A few advanced techniques and business strategies can help you fully realize your baking potential.';
            case 'The Master Baker':
                return 'you\'ve achieved remarkable mastery. Your focus now is on innovation, mentorship, and sharing your exceptional craft with the world.';
            default:
                return 'your baking profile is unique and full of delicious potential.';
        }
    },

    // Main function to calculate everything
    calculateResults(answers) {
        const dimensions = this.calculateAllDimensions(answers);
        const indices = this.calculateCompositeIndices(dimensions);
        const finalScore = this.calculateFinalScore(indices);
        const archetype = this.determineArchetype(finalScore);
        const insights = this.generateInsights(dimensions, indices, archetype);

        return {
            dimensions: {
                BP: Math.round(dimensions.BP),
                BS: Math.round(dimensions.BS),
                BC: Math.round(dimensions.BC)
            },
            indices: {
                CSI: Math.round(indices.CSI),
                BRI: Math.round(indices.BRI),
                BPI: Math.round(indices.BPI)
            },
            finalScore: finalScore,
            archetype: archetype,
            insights: insights,
            userName: answers['S6Q1'] ? 'Baker' : 'Baker'
        };
    }
};
