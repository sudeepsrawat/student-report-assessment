document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const skillsContainer = document.querySelector('.skills-container');
    const suggestionsList = document.getElementById('suggestionsList');
    const overallScoreElement = document.getElementById('overallScore');
    const feedbackTitleElement = document.getElementById('feedbackTitle');
    const feedbackDescElement = document.getElementById('feedbackDescription');
    const feedbackBadgeElement = document.getElementById('feedbackBadge');
    
    // Chart element
    let skillsChart;
    
    // Initialize the application
    initApp();
    
    async function initApp() {
        try {
            // Fetch student data from backend
            const response = await fetch('http://localhost:3000/api/student-report');
            const data = await response.json();
            
            // Update UI with fetched data
            updateStudentInfo(data);
            updateOverallScore(data.overallScore);
            updateSkills(data.skills);
            updateFeedback(data.feedback);
            updateChart(data.skills);
            setupControls(data);
            
            // Set current date in footer
            document.getElementById('currentDate').textContent = 
                new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
                
        } catch (error) {
            console.error('Error loading student data:', error);
            // Fallback to default data if API fails
            loadFallbackData();
        }
    }
    
    function updateStudentInfo(data) {
        document.getElementById('studentName').textContent = data.student.name;
        document.getElementById('testDate').textContent = 
            new Date(data.student.testDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        document.getElementById('testType').textContent = data.student.testType;
    }
    
    function updateOverallScore(score) {
        overallScoreElement.textContent = score;
        
        // Update slider value
        document.getElementById('overallControl').value = score;
        document.getElementById('overallValue').textContent = score;
    }
    
    function updateSkills(skills) {
        skillsContainer.innerHTML = '';
        
        const skillData = [
            { 
                name: 'Pronunciation', 
                score: skills.pronunciation, 
                icon: 'fas fa-volume-up',
                description: 'Clarity and accuracy of speech sounds'
            },
            { 
                name: 'Fluency', 
                score: skills.fluency, 
                icon: 'fas fa-tachometer-alt',
                description: 'Smoothness and flow of speech'
            },
            { 
                name: 'Vocabulary', 
                score: skills.vocabulary, 
                icon: 'fas fa-book',
                description: 'Range and appropriateness of word choice'
            },
            { 
                name: 'Grammar', 
                score: skills.grammar, 
                icon: 'fas fa-code',
                description: 'Accuracy of sentence structures'
            }
        ];
        
        skillData.forEach(skill => {
            const skillCard = document.createElement('div');
            skillCard.className = 'skill-card';
            
            const progressPercentage = (skill.score / 9) * 100;
            const level = getSkillLevel(skill.score);
            
            skillCard.innerHTML = `
                <div class="skill-header">
                    <div class="skill-name">
                        <i class="${skill.icon}"></i>
                        ${skill.name}
                    </div>
                    <div class="skill-score">${skill.score} / 9</div>
                </div>
                <p class="skill-description">${skill.description}</p>
                <div class="skill-bar">
                    <div class="skill-progress" style="width: ${progressPercentage}%"></div>
                </div>
                <div class="skill-level">${level}</div>
            `;
            
            skillsContainer.appendChild(skillCard);
            
            // Update sliders with current values
            if (skill.name === 'Pronunciation') {
                document.getElementById('pronunciationControl').value = skill.score;
                document.getElementById('pronunciationValue').textContent = skill.score;
            }
            if (skill.name === 'Fluency') {
                document.getElementById('fluencyControl').value = skill.score;
                document.getElementById('fluencyValue').textContent = skill.score;
            }
        });
    }
    
    function getSkillLevel(score) {
        if (score >= 8) return 'Excellent';
        if (score >= 6) return 'Good';
        if (score >= 4) return 'Fair';
        return 'Needs Practice';
    }
    
    function updateFeedback(feedback) {
        feedbackTitleElement.textContent = feedback.title;
        feedbackDescElement.textContent = feedback.description;
        
        // Update badge based on overall score
        const overallScore = parseInt(overallScoreElement.textContent);
        feedbackBadgeElement.textContent = `Band ${overallScore}`;
        
        // Update suggestions
        suggestionsList.innerHTML = '';
        feedback.suggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion;
            suggestionsList.appendChild(li);
        });
    }
    
    function updateChart(skills) {
        const ctx = document.getElementById('skillsChart').getContext('2d');
        
        // Destroy existing chart if it exists
        if (skillsChart) {
            skillsChart.destroy();
        }
        
        // Create new chart
        skillsChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Pronunciation', 'Fluency', 'Vocabulary', 'Grammar'],
                datasets: [{
                    label: 'Skill Scores',
                    data: [
                        skills.pronunciation,
                        skills.fluency,
                        skills.vocabulary,
                        skills.grammar
                    ],
                    backgroundColor: 'rgba(67, 97, 238, 0.2)',
                    borderColor: '#4361ee',
                    borderWidth: 2,
                    pointBackgroundColor: '#4361ee',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 9,
                        ticks: {
                            stepSize: 1
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        angleLines: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        pointLabels: {
                            font: {
                                size: 14,
                                family: "'Poppins', sans-serif"
                            },
                            color: '#2b2d42'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}/9`;
                            }
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
    
    function setupControls(data) {
        const updateButton = document.getElementById('updateScores');
        
        // Add event listeners to sliders
        document.getElementById('overallControl').addEventListener('input', function() {
            document.getElementById('overallValue').textContent = this.value;
        });
        
        document.getElementById('pronunciationControl').addEventListener('input', function() {
            document.getElementById('pronunciationValue').textContent = this.value;
        });
        
        document.getElementById('fluencyControl').addEventListener('input', function() {
            document.getElementById('fluencyValue').textContent = this.value;
        });
        
        // Update scores when button is clicked
        updateButton.addEventListener('click', async function() {
            const overallScore = parseInt(document.getElementById('overallControl').value);
            const pronunciationScore = parseInt(document.getElementById('pronunciationControl').value);
            const fluencyScore = parseInt(document.getElementById('fluencyControl').value);
            
            try {
                // Send updated scores to backend
                const response = await fetch('http://localhost:3000/api/update-scores', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        overall: overallScore,
                        pronunciation: pronunciationScore,
                        fluency: fluencyScore
                    })
                });
                
                const updatedData = await response.json();
                
                // Update UI with new data
                updateOverallScore(updatedData.data.overallScore);
                updateSkills(updatedData.data.skills);
                updateFeedback(updatedData.data.feedback);
                updateChart(updatedData.data.skills);
                
                // Show success message
                showNotification('Scores updated successfully!');
                
            } catch (error) {
                console.error('Error updating scores:', error);
                showNotification('Failed to update scores. Please try again.', 'error');
            }
        });
    }
    
    function showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'success' ? '#4caf50' : '#f44336'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            font-weight: 500;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    function loadFallbackData() {
        // Fallback data in case API fails
        const fallbackData = {
            student: {
                name: "Alex Johnson",
                testDate: "2024-01-15",
                testType: "Speaking Assessment"
            },
            overallScore: 7,
            skills: {
                pronunciation: 7,
                fluency: 6,
                vocabulary: 8,
                grammar: 6
            },
            feedback: {
                title: "Good Performance",
                description: "Generally effective command of the language despite some inaccuracies. Can handle complex situations fairly well.",
                suggestions: [
                    "Work on grammatical accuracy",
                    "Practice speaking on unfamiliar topics",
                    "Expand vocabulary in specific topic areas"
                ]
            }
        };
        
        updateStudentInfo(fallbackData);
        updateOverallScore(fallbackData.overallScore);
        updateSkills(fallbackData.skills);
        updateFeedback(fallbackData.feedback);
        updateChart(fallbackData.skills);
        setupControls(fallbackData);
        
        showNotification('Using demo data. Backend may not be running.', 'error');
    }
});