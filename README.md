# Anonymous Feedback Board

A full-stack application that allows users to submit anonymous feedback and provides an admin panel to view all feedback.

## 🛠️ Tech Stack

- **Frontend**: Astro (with static site generation)
- **Backend**: Express.js API
- **Database**: MySQL
- **Deployment**: Node.js runtime

## 📁 Project Structure

```
anonymous-feedback/
├── backend/
│   ├── server.js          # Express API server
│   └── db.js              # MySQL connection and setup
├── frontend/
│   ├── astro.config.mjs
│   ├── src/
│   │   ├── pages/
│   │   │   ├── index.astro      # Feedback form
│   │   │   └── admin.astro      # Admin dashboard
│   │   └── components/
│   │       └── FeedbackCard.astro
│   └── package.json
├── package.json           # Root package.json for running both frontend and backend
└── README.md
```

## 🔧 Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MySQL Server
- npm or yarn package manager

### Step-by-step Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd anonymous-feedback
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Configure MySQL Database**
   
   Create a `.env` file in the `backend` directory with your MySQL credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password_here
   DB_NAME=feedbackdb
   ```
   
   You can copy the example file as a starting point:
   ```bash
   cd backend
   cp .env.example .env
   # Then edit the .env file with your actual credentials
   ```

4. **Start the application**
   
   From the project root, run:
   ```bash
   npm run dev
   ```
   
   This will start both the frontend (on http://localhost:4321) and backend (on http://localhost:4000) servers simultaneously.

### Alternative: Start servers separately

- Start backend: `cd backend && npm start`
- Start frontend: `cd frontend && npm run dev`

## 🚀 Usage

### Submit Feedback

- Visit the main page at http://localhost:4321
- Fill out the feedback form with your message and optional category
- Click submit to add your anonymous feedback

### View Feedback (Admin)

- Visit the admin panel at http://localhost:4321/admin
- All submitted feedback will be displayed in reverse chronological order

## 🗄️ Database Schema

The application uses a MySQL database named `feedbackdb` with a single table:

```sql
CREATE TABLE feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  message TEXT NOT NULL,
  category VARCHAR(255) DEFAULT 'General',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 📞 API Endpoints

- `POST /api/feedback` - Submit new feedback
- `GET /api/feedback` - Retrieve all feedback (admin only)

## 🛠️ Development

To run the application for development:

```bash
npm run dev
```

This uses `concurrently` to run both frontend and backend development servers with hot reloading.

## 🏗️ Production Build

To create a production build:

```bash
npm run build
```

This will build the frontend for production deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request