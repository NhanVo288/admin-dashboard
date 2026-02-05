import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Toaster} from "react-hot-toast";
import Layout from "./components/layout/Layout";
import Loader from "./components/common/Loader";
const Login = lazy(() => import("./pages/login/Login"));
const Signup = lazy(() => import("./pages/login/Signup"));

import {
  selectAuthUser,
  selectIsCheckingAuth,
} from "./store/auth/auth.selector";

import routes from "./components/layout/Routes";
import { checkAuth } from "./store/auth/auth.thunk";
import "./styles/style.min.css";

const App = () => {
  const dispatch = useDispatch();
  const authUser = useSelector(selectAuthUser);
  const roles = useSelector(state => state.auth.userData?.role)
  const isAdmin = roles?.includes('ROLE_ADMIN')
  const isCheckingAuth = useSelector(selectIsCheckingAuth);
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isCheckingAuth) return null;

  //chưa login
  if (!authUser && !isAdmin) {
    return (
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <>
    <Routes>
      <Route element={<Layout />}>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <Toaster />
  </>
  );
};

export default App;
