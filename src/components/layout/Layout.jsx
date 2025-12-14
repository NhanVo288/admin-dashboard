import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../../store/auth.thunk";

const Layout = () => {
  const dispatch = useDispatch();
  const { userAuth, isCheckingAuth } = useSelector(
    state => state.authentication
  );

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isCheckingAuth) return null;

  if (!userAuth) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Sidebar />
      <div className="admin_body">
        <Navbar />
        <Main />
        <Footer />
      </div>
    </>
  );
};

export default Layout;
