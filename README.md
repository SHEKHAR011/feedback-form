# 📝 Anonymous Feedback Form

A modern, full-stack anonymous feedback collection system with an elegant UI and powerful admin dashboard. Built with Astro, Express, and MySQL.

## ✨ Features

### 🎯 For Users
- **Anonymous Submission** - Share feedback without revealing your identity
- **Categorized Feedback** - Choose from Suggestion, Complaint, Praise, or Others
- **Modern Glass Morphism UI** - Beautiful, responsive design with smooth animations
- **Real-time Validation** - Instant feedback on form submission

### 🛡️ For Administrators
- **Clerk Authentication** - Secure admin access with role-based permissions
- **Advanced Dashboard** - View, filter, and manage all feedback
- **Search & Filter** - Find feedback by category, read status, or keywords
- **Archive System** - Mark feedback as archived to keep dashboard organized
- **Read/Unread Tracking** - Track which feedback has been reviewed
- **Analytics Dashboard** - Visualize feedback trends with Chart.js
- **Bulk Actions** - Delete multiple feedback items at once

## 🏗️ Tech Stack

### Frontend
- **[Astro](https://astro.build/)** - Modern web framework
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Clerk](https://clerk.com/)** - User authentication and management
- **[Chart.js](https://www.chartjs.org/)** - Data visualization
- **[Lenis](https://lenis.darkroom.engineering/)** - Smooth scroll

### Backend
- **[Express.js](https://expressjs.com/)** - Web application framework
- **[MySQL](https://www.mysql.com/)** - Relational database
- **[CORS](https://www.npmjs.com/package/cors)** - Cross-origin resource sharing

### Development Tools
- **[Nodemon](https://nodemon.io/)** - Auto-restart server on changes
- **[Concurrently](https://www.npmjs.com/package/concurrently)** - Run multiple commands

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MySQL Server** (v8.0 or higher)
- **Clerk Account** (for admin authentication)

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/SHEKHAR011/feedback-form.git
cd feedback-form
```

### 2️⃣ Install Dependencies

Install root dependencies:
```bash
npm install
```

Install frontend dependencies:
```bash
cd frontend
npm install
cd ..
```

Install backend dependencies:
```bash
cd backend
npm install
cd ..
```

### 3️⃣ Database Setup

1. Start your MySQL server
2. The application will automatically create the `feedbackdb` database and necessary tables on first run
3. Update database credentials in `backend/db.js` if needed:

```javascript
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "your_password",
  database: process.env.DB_NAME || "feedbackdb",
};
```

### 4️⃣ Clerk Authentication Setup

1. Create a free account at [Clerk](https://clerk.com/)
2. Create a new application in Clerk dashboard
3. Get your API keys from the Clerk dashboard
4. Create a `.env` file in the `frontend` directory:

```env
PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
PUBLIC_CLERK_SIGN_IN_URL=/sign-in
PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

5. Set up admin roles in Clerk:
   - Go to your Clerk dashboard
   - Navigate to Users → Select a user
   - Add a role named `admin` to users who should have admin access

### 5️⃣ Run the Application

Run both frontend and backend concurrently:
```bash
npm run dev
```

Or run them separately:

**Backend only:**
```bash
npm run dev:backend
```

**Frontend only:**
```bash
npm run dev:frontend
```

### 6️⃣ Access the Application

- **User Feedback Form**: http://localhost:4321/
- **Admin Dashboard**: http://localhost:4321/admin
- **Analytics**: http://localhost:4321/analytics
- **Backend API**: http://localhost:4000/

## 📁 Project Structure

```
feedback-form/
├── backend/
│   ├── db.js              # Database configuration and setup
│   ├── server.js          # Express server and API routes
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── layouts/
│   │   │   ├── Layout.astro           # Main layout with auth
│   │   │   └── AnonymousLayout.astro  # Public layout
│   │   ├── pages/
│   │   │   ├── index.astro            # Feedback submission form
│   │   │   ├── admin.astro            # Admin dashboard
│   │   │   ├── analytics.astro        # Analytics page
│   │   │   ├── get-user-id.astro      # User ID utility
│   │   │   └── unauthorized.astro     # Access denied page
│   │   ├── middleware.ts              # Auth middleware
│   │   └── styles/
│   │       └── global.css             # Global styles
│   ├── public/                        # Static assets
│   ├── astro.config.mjs               # Astro configuration
│   ├── tailwind.config.js             # Tailwind configuration
│   └── package.json                   # Frontend dependencies
├── package.json                       # Root package with scripts
└── README.md                          # This file
```

## 🎨 Features in Detail

### Feedback Submission Form
- Clean, intuitive interface with glass morphism design
- Required category selection with placeholder
- Textarea for detailed feedback
- Real-time submission status
- Mobile-responsive design

### Admin Dashboard
- **Filter Options:**
  - Category (All, Suggestion, Complaint, Praise, Others)
  - Status (All, Unread, Read)
  - Archive status
- **Actions:**
  - Mark as read/unread
  - Archive/unarchive
  - Delete individual items
  - Bulk delete
- **Search:** Full-text search across feedback messages
- **Responsive:** Mobile-friendly design

### Analytics Dashboard
- Total feedback count
- Category distribution (pie chart)
- Feedback trends over time (line chart)
- Read vs unread statistics
- Archived feedback tracking

## 🔒 Security Features

- **Authentication:** Clerk-based authentication for admin routes
- **Role-Based Access:** Only users with `admin` role can access admin pages
- **CORS Protection:** Configured CORS for API security
- **SQL Injection Prevention:** Parameterized queries with MySQL2
- **Environment Variables:** Sensitive data stored in .env files

## 🛠️ Available Scripts

```bash
# Development (runs both frontend and backend)
npm run dev

# Run frontend only
npm run dev:frontend

# Run backend only
npm run dev:backend

# Build frontend for production
npm run build


## 🔧 Configuration

### Backend Port
Default: `4000`
Change in `backend/server.js`:
```javascript
const PORT = process.env.PORT || 4000;
```

### Frontend Port
Default: `4321`
Change in `frontend/package.json` or via Astro config

### Database Configuration
Update `backend/db.js` with your MySQL credentials

## 🐛 Troubleshooting

### MySQL Connection Issues
- Ensure MySQL server is running
- Verify credentials in `backend/db.js`
- Check if port 3306 is available

### Clerk Authentication Issues
- Verify API keys in `.env` file
- Ensure admin role is properly set in Clerk dashboard
- Check PUBLIC_CLERK keys are prefixed correctly

### Port Conflicts
- Backend: Change PORT in `backend/server.js`
- Frontend: Update Astro configuration