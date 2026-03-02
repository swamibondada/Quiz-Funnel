// Diagnostic Scoring Engine for DVA 360° Bakery Performance Audit™

const ScoringEngine = {
    calculateResults(answers) {
        // 1. Calculate Dimension Scores (0-100)
        // Formula: (AvgScore - 1) / 2 * 100
        const dimensions = {};

        Object.keys(dimensionMapping).forEach(dim => {
            const questionIds = dimensionMapping[dim];
            const sum = questionIds.reduce((acc, qId) => {
                return acc + (answers[qId] || 1); // Default to 1 if not answered
            }, 0);

            const avg = sum / questionIds.length;
            const score = Math.round(((avg - 1) / 2) * 100);
            dimensions[dim] = Math.max(0, Math.min(100, score)); // Clamp 0-100
        });

        // 2. Indicators
        // LCI = Avg(LCL + WSS)
        const lci = Math.round((dimensions.LCL + dimensions.WSS) / 2);

        let overwhelmRisk = "Low";
        if (lci < 50) overwhelmRisk = "High (Overwhelm Risk)";
        else if (lci <= 70) overwhelmRisk = "Medium (Needs Structured Roadmap)";
        else overwhelmRisk = "Low (Ready for Accelerated Learning)";

        // MRI (Mindset Risk Indicator)
        let mriAlert = null;
        if (dimensions.MSI < 40) {
            mriAlert = "High self-doubt / Fear-based execution risk";
        } else if (dimensions.MSI < 50) {
            mriAlert = "Confidence & Identity Intervention Required";
        }

        // 3. Gap Detection Logic
        const sortedDims = Object.entries(dimensions)
            .map(([id, score]) => ({ id, name: dimensionNames[id], score }))
            .sort((a, b) => a.score - b.score);

        const primaryGap = sortedDims[0];
        const secondaryGap = sortedDims[1];
        const strengthLever = sortedDims[sortedDims.length - 1];

        // 4. Learning Pace & Roadmap Duration
        const overallAvg = Object.values(dimensions).reduce((a, b) => a + b, 0) / 8;

        let planDuration = 6;
        let paceLabel = "Average (Balanced Pace)";
        if (overallAvg > 75) {
            planDuration = 3;
            paceLabel = "High Performer (Accelerated Pace)";
        } else if (overallAvg < 60) {
            planDuration = 12;
            paceLabel = "Foundation Rebuilder (Steady Pace)";
        }

        // 5. Course Recommendations (Lowest 2)
        const recommendations = [primaryGap.id, secondaryGap.id].map(id => ({
            dim: dimensionNames[id],
            course: coursemapping[id]
        }));

        // 6. Generate Month-wise Roadmap
        const roadmap = this.generateRoadmap(primaryGap, secondaryGap, strengthLever, planDuration);

        return {
            dimensions,
            dimensionNames,
            primaryGap,
            secondaryGap,
            strengthLever,
            lci,
            overwhelmRisk,
            mriAlert,
            overallAvg: Math.round(overallAvg),
            planDuration,
            paceLabel,
            recommendations,
            roadmap,
            msiLowest: primaryGap.id === 'MSI'
        };
    },

    generateRoadmap(primary, secondary, strength, duration) {
        const phases = [];
        const interval = duration / 3;

        // Stability Phase
        phases.push({
            months: `Month 1–${Math.round(interval)}`,
            title: `${primary.name} Stabilisation`,
            focus: `Bridging your biggest gap: ${primary.name}`,
            recommendation: coursemapping[primary.id]
        });

        // Expansion Phase
        phases.push({
            months: `Month ${Math.round(interval) + 1}–${Math.round(interval * 2)}`,
            title: `${secondary.name} Focus`,
            focus: `Strengthening secondary foundations in ${secondary.name}`,
            recommendation: coursemapping[secondary.id]
        });

        // Leverage Phase
        phases.push({
            months: `Month ${Math.round(interval * 2) + 1}+`,
            title: `Specialisation & Scale (${strength.name})`,
            focus: `Leveraging your strength in ${strength.name} to scale`,
            recommendation: "Diamond Ecosystem Integration"
        });

        return phases;
    }
};
