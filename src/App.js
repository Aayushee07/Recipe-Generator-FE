import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import Error404 from "./pages/Error404";
import Preferences from "./pages/Preferences";
import TrendingRecipes from "./pages/TrendingRecipes";
import Ask from "./pages/Ask";
import RecipeInfo from './pages/RecipeInfo';
import UploadImage from './pages/UploadImage';
import Cart from './pages/Cart';
import { useContext } from "react";
import { AuthContext } from "./context/UserContext";
import { Outlet, Navigate } from 'react-router-dom';

const Privateroute = () => {
  const auth = localStorage.getItem("token");
  const { userAuth } = useContext(AuthContext);
  return <>{userAuth || auth ? <Outlet /> : <Navigate replace to={"/"} />}</>;
};

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/recipeinfo" element={<RecipeInfo/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/uploadimage" element={<UploadImage/>} />
        <Route path="/register" element={<Register />} />
        <Route element={<Privateroute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/trending" element={<TrendingRecipes/>} />
          <Route path="/preference" element={<Preferences/>} />
          <Route path="/cart" element={<Cart/>} />
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