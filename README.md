# Wellness Tracker

A modern, responsive web application for tracking daily wellness metrics including steps, sleep, and mood. Built with React, Tailwind CSS, and featuring interactive charts and dark/light theme support.

![Wellness Tracker Dashboard](https://img.shields.io/badge/React-19.1.1-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.12-38B2AC) ![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF)

## ✨ Features

### 🔐 Authentication
- **User Registration**: Sign up with username, email, and password
- **User Login**: Secure authentication with email/password
- **Session Management**: Persistent login state with localStorage
- **Protected Routes**: Automatic redirection for unauthenticated users

### 📊 Dashboard & Analytics
- **Summary Cards**: Quick overview of latest steps, sleep hours, and mood
- **Interactive Charts**: 
  - Steps tracking with line chart and zoom functionality
  - Sleep monitoring with target reference line (8 hours)
  - Mood tracking with area chart and gradient visualization
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 📝 Entry Management
- **Add Entries**: Create new wellness records with date, steps, sleep, and mood
- **Edit Entries**: Modify existing entries
- **Delete Entries**: Remove unwanted records
- **Data Persistence**: All data stored locally with localStorage

### 🎨 User Experience
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Responsive Navigation**: Collapsible sidebar with smooth animations
- **User Profile**: Display username in navbar with avatar
- **Modern UI**: Clean, intuitive interface with Tailwind CSS

### 📤 Data Export
- **CSV Export**: Download wellness data in CSV format
- **PDF Export**: Generate PDF reports of wellness data

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wellness-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Tech Stack

### Frontend
- **React 19.1.1** - UI framework
- **Vite 7.1.2** - Build tool and dev server
- **React Router 7.8.2** - Client-side routing
- **Tailwind CSS 4.1.12** - Utility-first CSS framework

### Charts & Visualization
- **Recharts 3.1.2** - Interactive chart library
- **React Icons 5.5.0** - Icon library

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type checking (optional)

## 📁 Project Structure

```
wellness-tracker/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Login.jsx       # Authentication component
│   │   ├── Signup.jsx      # User registration
│   │   ├── Navbar.jsx      # Navigation header
│   │   ├── Sidebar.jsx     # Side navigation
│   │   └── ThemeToggle.jsx # Dark/light mode toggle
│   ├── pages/              # Page components
│   │   ├── Dashboard.jsx   # Main dashboard with charts
│   │   ├── AddEntry.jsx    # Entry creation/editing
│   │   └── Settings.jsx    # Application settings
│   ├── store/              # Data management
│   │   └── mockEntries.js  # Mock data and localStorage
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind configuration
└── vite.config.js          # Vite configuration
```

## 🎯 Usage Guide

### 1. Getting Started
1. Open the application in your browser
2. Click "Signup" to create a new account
3. Enter your username, email, and password
4. You'll be redirected to the dashboard

### 2. Adding Wellness Entries
1. Navigate to "Add Entry" from the sidebar
2. Fill in the form with:
   - Date (defaults to today)
   - Steps count
   - Sleep hours
   - Mood rating (1-5 scale)
3. Click "Add Entry" to save

### 3. Viewing Your Data
1. The dashboard shows your latest metrics
2. Interactive charts display trends over time
3. Use the brush tool to zoom into specific date ranges
4. Hover over chart elements for detailed information

### 4. Managing Entries
1. Edit entries by clicking the edit button
2. Delete entries using the delete button
3. Export data to CSV or PDF for external use

### 5. Theme Customization
1. Click the theme toggle button in the navbar
2. Choose between light and dark themes
3. Your preference is automatically saved

## 🎨 Features in Detail

### Authentication System
- **Mock Authentication**: Simulated login/signup for demonstration
- **Form Validation**: Email format and required field validation
- **Session Persistence**: Login state maintained across browser sessions
- **Route Protection**: Automatic redirection for unauthenticated users

### Chart Features
- **Responsive Charts**: Automatically resize with screen size
- **Interactive Elements**: Hover tooltips, zoom, and brush selection
- **Theme Integration**: Charts adapt to light/dark themes
- **Data Visualization**: Line charts for trends, area charts for mood

### Data Management
- **Local Storage**: All data persisted in browser localStorage
- **Mock Data**: Pre-populated with sample wellness data
- **CRUD Operations**: Create, read, update, delete functionality
- **Data Export**: CSV and PDF export capabilities

## 🔧 Configuration

### Tailwind CSS
The application uses Tailwind CSS v4 with class-based dark mode:

```javascript
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  // ... other config
};
```

### Theme System
Dark mode is implemented using CSS classes and localStorage:

```javascript
// Theme toggle functionality
const toggleTheme = () => {
  const html = document.documentElement;
  const body = document.body;
  
  if (darkMode) {
    html.classList.add("dark");
    body.classList.add("dark");
  } else {
    html.classList.remove("dark");
    body.classList.remove("dark");
  }
};
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px - Collapsible sidebar, stacked layout
- **Tablet**: 768px - 1024px - Adaptive grid layouts
- **Desktop**: > 1024px - Full sidebar, multi-column layouts

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel`

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Recharts](https://recharts.org/) - Chart library
- [Vite](https://vitejs.dev/) - Build tool
- [React Router](https://reactrouter.com/) - Routing library

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact: [your-email@example.com]

---

**Built with ❤️ using React and Tailwind CSS**
