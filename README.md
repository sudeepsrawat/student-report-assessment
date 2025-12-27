# Student Speaking Assessment Report System

A full-stack web application for displaying and managing student speaking assessment reports with dynamic feedback generation.

## 🚀 Features

- **Clean, responsive UI** with modern design
- **Overall score display** (out of 9 band scale)
- **Skill-wise breakdown** with progress bars
- **Interactive radar chart** for visual representation
- **Dynamic feedback generation** based on score ranges
- **Live score adjustment** for testing different scenarios
- **Fully functional backend API** with data persistence

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-link>
   cd student-assessment-report
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start the backend server**
   ```bash
   npm start
   ```
4. **Open the application**
   Navigate to ```bash http://localhost:3000 ``` in your browser

## 📁 Project Structure
```bash
student-assessment-report/
├── server/
│   ├── server.js          # Backend API server
│   └── data.json          # Student data storage
├── client/
│   ├── index.html         # Main HTML file
│   ├── style.css          # CSS styles
│   └── script.js          # Frontend logic
├── package.json           # Dependencies
└── README.md              # Readme
```
## 🔧 How It Works
### Data Storage
* Student data is stored in server/data.json
* The backend API serves this data to the frontend
* Updates are saved back to the JSON file

### Backend API Endpoints
* ``` GET /api/student-report ``` - Fetch student report data
* ``` PUT /api/update-scores ``` - Update scores and regenerate feedback

### Feedback Logic
Feedback is automatically generated based on score ranges:

| Score Range | Feedback Level     | Description                                   |
|------------|--------------------|-----------------------------------------------|
| 8–9        | Excellent          | Strong control of language features           |
| 6–7        | Good               | Effective command with minor issues           |
| 1–5        | Needs Improvement  | Basic competence with frequent issues         |

### Score Updates
1. Adjust sliders in the "Test Different Scores" section
2. Click "Update Scores" button
3. The system will:
   - Send updated scores to backend
   - Save to data.json
   - Regenerate feedback
   - Update all UI components

## 🎨 UI Components
1. **Header:** Student information and test details
2. **Overall Score:** Large circular display with band score
3. **Skill Assessment:** Four skill cards with progress bars
4. **Radar Chart:** Visual representation of skill scores
5. **Descriptive Feedback:** Dynamic feedback with suggestions
6. **Score Controls:** Interactive sliders for testing

## 📱 Responsive Design
The application is fully responsive and works on:
* Desktop computers
* Tablets
* Mobile devices

## 🔄 Data Flow
```bash
Frontend (UI) ← HTTP Requests → Backend (Node.js/Express)
                        ↓
                  data.json (Storage)
```

## 🧪 Testing Different Scenarios
Use the sliders in the control panel to test:
* High scores (8-9) → Excellent feedback
* Medium scores (6-7) → Good feedback
* Low scores (1-5) → Needs improvement feedback

## 📊 Tech Stack
### Frontend
* HTML5, CSS3, Vanilla JavaScript
* Chart.js for data visualization
* Font Awesome for icons
* Google Fonts (Poppins)

### Backend
* Node.js with Express
* CORS middleware
* File system for data persistence

## Screenshots
<img width="1320" height="825" alt="Screenshot 2025-12-27 143049" src="https://github.com/user-attachments/assets/cca04595-e082-47d2-a7ef-0e07926c1907" />

<img width="1234" height="884" alt="Screenshot 2025-12-27 143112" src="https://github.com/user-attachments/assets/d1387960-15fd-4d4c-8dd6-80ada8803171" />

<img width="1255" height="382" alt="Screenshot 2025-12-27 143122" src="https://github.com/user-attachments/assets/f80a296f-7b9b-4172-8c07-23147520332e" />


