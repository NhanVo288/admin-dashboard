import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "./components/layout/Layout.jsx";
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/login/Signup.jsx";
import Loader from './components/common/Loader.jsx'

import { checkAuth } from "./store/auth.thunk.js";

import "./styles/style.min.css";

const App = () => {
  const dispatch = useDispatch();
  const { authUser, isCheckingAuth } = useSelector(state => state.authentication);

  // check auth khi app load
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  
  if(isCheckingAuth) return <Loader />

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={!authUser ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/signup"
        element={!authUser ? <Signup /> : <Navigate to="/" />}
      />

      {/* Private routes */}
      <Route
        path="/*"
        element={authUser ? <Layout /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default App;
