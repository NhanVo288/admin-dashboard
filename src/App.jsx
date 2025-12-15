import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "./components/layout/Layout";
import Login from "./pages/login/Login";
import Signup from "./pages/login/Signup";
import Loader from "./components/common/Loader";
import { selectAuthUser,selectIsCheckingAuth } from "./store/auth/auth.selector";
import routes from './components/layout/Routes';
import { checkAuth } from "./store/auth/auth.thunk";
import "./styles/style.min.css";

const App = () => {
  const dispatch = useDispatch();
  const authUser = useSelector(selectAuthUser)
  const isCheckingAuth = useSelector(selectIsCheckingAuth)

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isCheckingAuth) return <Loader />;

  //Chưa login → chỉ cho vào login / signup
  if (!authUser) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Đã login → toàn bộ app
  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
