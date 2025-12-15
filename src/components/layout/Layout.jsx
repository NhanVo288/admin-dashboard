import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Main from "./Main";
import Loader from "../common/Loader";

const Layout = () => {
  return (
    <>
      <Sidebar />

      <div className="admin_body">
        <Navbar />

        <Main>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </Main>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
