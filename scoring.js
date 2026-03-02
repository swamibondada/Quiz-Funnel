// Scoring Logic for Diamond Program Quiz Funnel

const ScoringEngine = {
    // Main function to calculate everything
    calculateResults(answers) {
        // 1. Determine Archetype based on Q1
        const levelKey = answers['Q1'] || 'beginner';
        const archetype = archetypes[levelKey];

        // 2. Calculate Dimension Scores (0-100)
        // Using Q2-Q4 for the 3 pillars
        const dimensions = {
            'Baking Mastery': this.mapOptionToScore(answers['Q2']),
            'Advanced Decoration': this.mapOptionToScore(answers['Q3']),
            'Business & Sales': this.mapOptionToScore(answers['Q4'])
        };

        // 3. Generate Roadmap Phases
        const roadmap = [
            {
                title: 'Phase 1: Stability Phase',
                focus: archetype.roadmap.start,
                action: archetype.roadmap.focus,
                description: archetype.roadmap.why,
                link: '#'
            },
            {
                title: 'Phase 2: Expansion Phase',
                focus: 'Skill Integration',
                action: 'Refining secondary pillars',
                description: 'Once your foundation is solid, we layer in the other pillars of the Diamond Program.',
                link: '#'
            },
            {
                title: 'Phase 3: Leverage Phase',
                focus: 'Complete Ecosystem',
                action: 'Scaling & Automation',
                description: archetype.roadmap.transition,
                link: '#'
            }
        ];

        return {
            archetype: archetype,
            dimensions: dimensions,
            roadmap: roadmap,
            diamondEcosystem: diamondEcosystem,
            userName: AppState.userName || 'Baker'
        };
    },

    // Map option index/value to a 0-100 score for visualization
    mapOptionToScore(answer) {
        if (!answer) return 20; // Default low

        // Simple mapping based on option values from quizData
        const scoreMap = {
            // Baking (Q2)
            'basics': 30,
            'consistency': 65,
            'efficiency': 95,

            // Decoration (Q3)
            'scared': 20,
            'basic': 55,
            'advanced_art': 95,

            // Business (Q4)
            'guess': 20,
            'market': 55,
            'system': 95
        };

        return scoreMap[answer] || 50;
    }
};
