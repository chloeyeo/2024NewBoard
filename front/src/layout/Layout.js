import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <div className="container m-auto">
        <Navbar />
      </div>

      <div className="container m-auto">
        {/* Outlet for changing pages */}
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
