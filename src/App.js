import "./App.css";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

// PAGES
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import { useContext } from "react";
import { AuthContext } from "./context/UserContext";
import Error404 from "./pages/Error404";
import Preferences from "./pages/Preferences";
import TrendingRecipes from "./pages/TrendingRecipes";
import Navbar from "./components/Navbar"
import Ask from "./pages/Ask";
import RecipeInfo from './pages/RecipeInfo';


const Privateroute = () => {
  const auth = localStorage.getItem("token");
  const { userAuth } = useContext(AuthContext);
  return <>{userAuth || auth ? <Outlet /> : <Navigate replace to={"/"} />}</>;
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/recipeinfo" element={<RecipeInfo/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route element={<Privateroute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/trending" element={<TrendingRecipes/>} />
          <Route path="/preference" element={<Preferences/>} />
          <Route path="/ask" element={<Ask />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
