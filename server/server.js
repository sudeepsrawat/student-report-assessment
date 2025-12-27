const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// Load student data
const studentData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));

// API endpoint to get student report
app.get('/api/student-report', (req, res) => {
    res.json(studentData);
});

// API endpoint to update scores (for testing)
app.put('/api/update-scores', (req, res) => {
    const { overall, pronunciation, fluency, vocabulary, grammar } = req.body;
    
    if (overall !== undefined) studentData.overallScore = overall;
    if (pronunciation !== undefined) studentData.skills.pronunciation = pronunciation;
    if (fluency !== undefined) studentData.skills.fluency = fluency;
    if (vocabulary !== undefined) studentData.skills.vocabulary = vocabulary;
    if (grammar !== undefined) studentData.skills.grammar = grammar;
    
    // Update feedback based on new scores
    studentData.feedback = generateFeedback(studentData.overallScore);
    
    fs.writeFileSync(
        path.join(__dirname, 'data.json'),
        JSON.stringify(studentData, null, 2)
    );
    
    res.json({ message: 'Scores updated successfully', data: studentData });
});

// Feedback generation logic
function generateFeedback(score) {
    if (score >= 8) {
        return {
            title: "Excellent Performance",
            description: "Strong control of language features. Speaks fluently with only rare repetition or self-correction.",
            suggestions: ["Continue practicing advanced vocabulary", "Focus on accent reduction for native-like speech"]
        };
    } else if (score >= 6 && score <= 7) {
        return {
            title: "Good Performance",
            description: "Generally effective command of the language despite some inaccuracies. Can handle complex situations fairly well.",
            suggestions: ["Work on grammatical accuracy", "Practice speaking on unfamiliar topics"]
        };
    } else {
        return {
            title: "Needs Improvement",
            description: "Basic competence is limited. Frequent problems with understanding and making meaning clear.",
            suggestions: ["Focus on basic sentence structures", "Build essential vocabulary", "Practice pronunciation daily"]
        };
    }
}

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});