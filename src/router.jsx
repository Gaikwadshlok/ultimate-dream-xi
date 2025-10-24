import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TeamBuilder from "./pages/TeamBuilder";
import MyTeam from "./pages/MyTeam";
import BattlePage from "./pages/BattlePage";
import MatchPage from "./pages/MatchPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/team-builder" element={<TeamBuilder />} />
    <Route path="/my-team" element={<MyTeam />} />
    <Route path="/battle" element={<BattlePage />} />
    <Route path="/match" element={<MatchPage />} />
  </Routes>
);

export default AppRoutes;
