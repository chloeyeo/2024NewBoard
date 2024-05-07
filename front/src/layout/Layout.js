import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ReactImageGallery from "react-image-gallery"; // to create slides
import "react-image-gallery/styles/css/image-gallery.css";

const Layout = () => {
  const slideImg = [
    {
      original: "./images/slide02.png",
      description: "image1",
    },
    {
      original: "./images/slide02.png",
      description: "image2",
    },
  ];
  return (
    <>
      <div className="container m-auto">
        <Navbar />
      </div>

      <div>
        {/* put image inside items */}
        <ReactImageGallery items={slideImg} showFullscreenButton={false} />
      </div>

      <div className="container m-auto">
        {/* Outlet for changing pages = outlet is where PostWrite body is */}
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
