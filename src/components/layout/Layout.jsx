import Main from "./Main.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Sidebar from "./Sidebar.jsx";

const Layout = () => {

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
