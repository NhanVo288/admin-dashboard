import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Main = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/panel" || location.pathname === "/admin") {
      navigate("/");
    }
  }, [location, navigate]);

  return <div className="main">{children}</div>;
};

export default Main;
