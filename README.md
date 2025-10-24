# ⚽ Ultimate Dream XI

A full-stack web application that allows users to build their dream football team using a drag-and-drop interface. Choose from legendary players, select formations, pick famous coaches, and compete with other teams!

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen?logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-38B2AC?logo=tailwind-css)

## 🌟 Features

### 🎯 Team Building
- **Drag & Drop Interface**: Intuitive player selection with React DnD
- **Multiple Formations**: Choose from 4-3-3, 4-4-2, 3-5-2, 3-4-3, and 5-3-2
- **Legendary Players**: Build your team from football's greatest players
- **Coach Selection**: Pick from iconic coaches like Sir Alex Ferguson, Pep Guardiola, Zinedine Zidane, Carlo Ancelotti, and José Mourinho
- **AI Coach**: Let AI suggest the best formation for your squad

### 🔐 User Management
- **User Authentication**: Secure registration and login with JWT
- **Private Routes**: Protected pages for authenticated users
- **Persistent Teams**: Save and manage multiple teams

### 🎮 Interactive Pages
- **Home Page**: Welcome screen with app overview
- **Team Builder**: Create your dream team with drag-and-drop
- **My Team**: View and manage your saved teams
- **Battle Page**: Compare teams (coming soon)
- **Match Page**: Simulate matches (coming soon)

## 🛠️ Tech Stack

### Frontend
- **React 18.2**: Modern UI library with hooks
- **Vite**: Lightning-fast build tool and dev server
- **React Router DOM**: Client-side routing
- **React DnD**: Drag-and-drop functionality
- **TailwindCSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **React Icons**: Icon library

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing

## 📁 Project Structure

```
ultimate-dream-xi/
├── backend/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── controllers/
│   │   └── authController.js  # Authentication logic
│   ├── models/
│   │   ├── User.js           # User schema
│   │   └── Team.js           # Team schema
│   ├── routes/
│   │   ├── auth.js           # Auth routes
│   │   └── team.js           # Team routes
│   ├── server.js             # Express server
│   └── package.json
├── src/
│   ├── assets/               # Images and static files
│   ├── components/
│   │   ├── Hero.jsx         # Hero section
│   │   ├── Navbar.jsx       # Navigation bar
│   │   ├── PlayerCard.jsx   # Player card component
│   │   └── PrivateRoute.jsx # Protected route wrapper
│   ├── context/
│   │   └── Authcontext.jsx  # Authentication context
│   ├── data/
│   │   └── constants.js     # Formations, players data
│   ├── pages/
│   │   ├── Home.jsx         # Landing page
│   │   ├── Login.jsx        # Login page
│   │   ├── Register.jsx     # Registration page
│   │   ├── TeamBuilder.jsx  # Team building interface
│   │   ├── MyTeam.jsx       # View saved teams
│   │   ├── BattlePage.jsx   # Team comparison
│   │   └── MatchPage.jsx    # Match simulation
│   ├── App.jsx
│   ├── router.jsx           # Route configuration
│   └── main.jsx
├── package.json
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Gaikwadshlok/ultimate-dream-xi.git
   cd ultimate-dream-xi
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Configure environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

5. **Start the backend server**
   ```bash
   cd backend
   node server.js
   # or use nodemon for auto-restart
   npx nodemon server.js
   ```

6. **Start the frontend development server**
   
   Open a new terminal and run:
   ```bash
   npm run dev
   ```

7. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 🎮 Usage

1. **Register**: Create a new account on the registration page
2. **Login**: Sign in with your credentials
3. **Build Team**: 
   - Select a formation
   - Choose a coach (or let AI decide)
   - Drag and drop players onto the field
   - Save your team with a custom name
4. **View Teams**: Check out all your saved teams on the "My Team" page
5. **Battle**: Compare team strengths (feature in development)

## 🔧 Development Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend
```bash
node server.js              # Start server
npx nodemon server.js       # Start with auto-restart
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Teams
- `POST /api/team/save` - Save a new team (authenticated)
- `GET /api/team/user/:userId` - Get user's teams (authenticated)

## 🎨 Features in Detail

### Formations
The app supports multiple tactical formations:
- **4-3-3**: Attacking formation with 3 forwards
- **4-4-2**: Balanced classic formation
- **3-5-2**: Midfield-heavy formation
- **3-4-3**: Aggressive attacking setup
- **5-3-2**: Defensive formation

### Player Pool
Includes legendary players across all positions:
- Forwards: Messi, Ronaldo, Mbappé, Haaland, and more
- Midfielders: Modrić, De Bruyne, Pogba, and more
- Defenders: Van Dijk, Ramos, Maldini, and more
- Goalkeepers: Neuer, Buffon, Casillas, and more

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Gaikwadshlok**
- GitHub: [@Gaikwadshlok](https://github.com/Gaikwadshlok)

## 🙏 Acknowledgments

- Player data inspired by real football legends
- UI design inspired by modern football management games
- Built with ❤️ for football fans worldwide

---

**Note**: This is a portfolio/learning project. Player names and likenesses are used for educational purposes only.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
