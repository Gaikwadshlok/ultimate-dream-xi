// src/App.jsx
import Navbar from "./components/Navbar";
import AppRoutes from "./router";
import stadiumBg from "./assets/stadium-bg.jpg";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const hideNavbarPaths = ['/', '/login', '/register', '/match'];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <div 
      style={{
        backgroundImage: `linear-gradient(to bottom right, rgba(15, 23, 42, 0.8), rgba(0, 0, 0, 0.8)), url(${stadiumBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
      className="h-screen w-full text-white overflow-hidden"
    >
      <div className="h-screen overflow-hidden flex flex-col">
        {!shouldHideNavbar && <Navbar />}
        <div className={`flex-1 ${!shouldHideNavbar ? 'px-6' : ''} overflow-hidden`}>
          <AppRoutes />
        </div>
      </div>
    </div>
  );
}

export default App;
