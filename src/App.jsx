import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/login/Signup.jsx";
import "./styles/style.min.css";

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Private routes */}
      <Route path="/*" element={<Layout />} />
    </Routes>
  );
};

export default App;
