// Scoring Logic for Dipti Baking Skill Alignment Quiz
// Implements all scoring rules as specified in the framework

const ScoringEngine = {
    // Likert mapping: 1→20, 2→40, 3→60, 4→80, 5→100
    likertMap: {
        1: 20,
        2: 40,
        3: 60,
        4: 80,
        5: 100
    },

    // Reverse score: 120 - raw score
    reverseScore(score) {
        return 120 - score;
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
            if (question.negative) {
                score = this.reverseScore(rawScore);
            } else {
                score = rawScore;
            }
        } else {
            // Non-scored questions (single choice in Section 8)
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

    // Calculate all 7 dimension scores
    calculateAllDimensions(answers) {
        const dimensions = {};

        dimensions.BFS = this.calculateDimensionScore('section1', answers) || 0;
        dimensions.REX = this.calculateDimensionScore('section2', answers) || 0;
        dimensions.FDS = this.calculateDimensionScore('section3', answers) || 0;
        dimensions.ATS = this.calculateDimensionScore('section4', answers) || 0;
        dimensions.BPS = this.calculateDimensionScore('section5', answers) || 0;
        dimensions.WSS = this.calculateDimensionScore('section6', answers) || 0;
        dimensions.LCL = this.calculateDimensionScore('section7', answers) || 0;

        return dimensions;
    },

    // Calculate Composite Indices (LCI)
    calculateCompositeIndices(dimensions) {
        const indices = {};

        // Learning Clarity Index (LCI) = Avg(LCL, WSS)
        indices.LCI = (dimensions.LCL + dimensions.WSS) / 2;

        return indices;
    },

    // Evaluate Gaps and Strength
    calculateGapsAndStrength(dimensions) {
        // Exclude LCL from being a primary gap or strength as it's a meta-skill
        const coreDims = {
            BFS: dimensions.BFS,
            REX: dimensions.REX,
            FDS: dimensions.FDS,
            ATS: dimensions.ATS,
            BPS: dimensions.BPS,
            WSS: dimensions.WSS
        };

        // Convert to array and sort low to high
        const sorted = Object.entries(coreDims)
            .sort((a, b) => a[1] - b[1]);

        return {
            primaryGap: { key: sorted[0][0], score: sorted[0][1] },
            secondaryGap: { key: sorted[1][0], score: sorted[1][1] },
            strengthLever: { key: sorted[sorted.length - 1][0], score: sorted[sorted.length - 1][1] }
        };
    },

    // Calculate Final Overall Average Score
    calculateFinalScore(dimensions) {
        const values = Object.values(dimensions);
        const finalScore = values.reduce((sum, val) => sum + val, 0) / values.length;
        return Math.round(finalScore);
    },

    // Determine Archetype based on Final Score
    determineArchetype(score) {
        if (score <= 39) {
            return archetypes.needsStrengthening;
        } else if (score <= 59) {
            return archetypes.developing;
        } else if (score <= 79) {
            return archetypes.strong;
        } else {
            return archetypes.advanced;
        }
    },

    // Generate Roadmap Phase Mapping
    generateRoadmap(gaps) {
        return [
            {
                phase: 'Stability Phase',
                duration: 'First 30–40% of timeline',
                focusKey: gaps.primaryGap.key,
                focusName: dimensionInfo[gaps.primaryGap.key].name,
                focusScore: gaps.primaryGap.score,
                courses: dimensionInfo[gaps.primaryGap.key].courses,
                description: `Address your primary gap in ${dimensionInfo[gaps.primaryGap.key].name} to build a stable foundation.`
            },
            {
                phase: 'Expansion Phase',
                duration: 'Next 30–40% of timeline',
                focusKey: gaps.secondaryGap.key,
                focusName: dimensionInfo[gaps.secondaryGap.key].name,
                focusScore: gaps.secondaryGap.score,
                courses: dimensionInfo[gaps.secondaryGap.key].courses,
                description: `Expand your capabilities by tackling your secondary gap in ${dimensionInfo[gaps.secondaryGap.key].name}.`
            },
            {
                phase: 'Leverage Phase',
                duration: 'Final 20–30% of timeline',
                focusKey: gaps.strengthLever.key,
                focusName: dimensionInfo[gaps.strengthLever.key].name,
                focusScore: gaps.strengthLever.score,
                courses: dimensionInfo[gaps.strengthLever.key].courses,
                description: `Multiply your success by leaning heavily into your strongest asset: ${dimensionInfo[gaps.strengthLever.key].name}.`
            }
        ];
    },

    // Calculate recommended timeline based on time commitment vs goals
    calculateTimeline(timeCommitment, lci) {
        let baseMonths = 6;

        // Adjust based on time
        if (timeCommitment === 'less-than-2') baseMonths += 3;
        if (timeCommitment === '6-plus') baseMonths -= 2;

        // Adjust based on Learning Clarity Index
        if (lci < 50) baseMonths += 2; // Needs more time to focus
        if (lci >= 80) baseMonths -= 1; // High clarity speeds execution

        return Math.max(3, Math.min(12, Math.round(baseMonths))); // Clamp between 3-12 months
    },

    // Main function to calculate everything
    calculateResults(answers) {
        const dimensions = this.calculateAllDimensions(answers);
        const indices = this.calculateCompositeIndices(dimensions);
        const gaps = this.calculateGapsAndStrength(dimensions);
        const finalScore = this.calculateFinalScore(dimensions);
        const archetype = this.determineArchetype(finalScore);
        const roadmap = this.generateRoadmap(gaps);

        // Calculate timeline using Section 8 answers
        const timeCommitment = answers['Q26'] || '2-4';
        const primaryGoal = answers['Q27'] || 'improve-consistency';
        const recommendedTimelineMonths = this.calculateTimeline(timeCommitment, indices.LCI);

        // Round all dimensions for easy display
        const roundedDimensions = {};
        for (const [key, val] of Object.entries(dimensions)) {
            roundedDimensions[key] = Math.round(val);
        }

        return {
            dimensions: roundedDimensions,
            indices: {
                LCI: Math.round(indices.LCI)
            },
            gaps: {
                primary: gaps.primaryGap,
                secondary: gaps.secondaryGap,
                strength: gaps.strengthLever
            },
            finalScore: finalScore,
            archetype: archetype,
            roadmap: roadmap,
            meta: {
                recommendedMonths: recommendedTimelineMonths,
                primaryGoal: primaryGoal,
                timeCommitment: timeCommitment
            },
            userName: AppState.userName || 'Baker'
        };
    }
};
