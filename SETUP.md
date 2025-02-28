# Hostel Pantry Billing & Payment System

## Download and Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps to Download and Run

1. Clone the repository using a personal access token (PAT):
```bash
git clone https://[YOUR_USERNAME]:[YOUR_PERSONAL_ACCESS_TOKEN]@github.com/yourusername/hostel-pantry-system.git
cd hostel-pantry-system
```

Alternatively, you can download the ZIP file directly from GitHub.

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to http://localhost:5173

### Login Credentials
- Student: Mobile: 9876543210 / Password: student123
- Admin: Mobile: 1234567890 / Password: admin123

### Project Structure
- `/src/components` - UI components
- `/src/pages` - Page components
- `/src/lib` - Utility functions

### Technologies Used
- React
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- React Router
- React Hook Form
- Zod

### Note on GitHub Authentication
GitHub no longer supports password authentication for git operations. You need to use a Personal Access Token (PAT) instead:

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Generate new token
2. Select the necessary scopes (at minimum: repo)
3. Generate the token and copy it
4. Use the token as your password when cloning the repository

