import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between h-[50px] bg-slate-400">
        <h1 className="flex justify-center items-center bg-sb-100 w-[100px]">
          <Link to="/">logo</Link>
        </h1>
        <div className="flex h-[100%]">
          <ul className="flex justify-center items-center px-5">
            <li className="flex justify-center items-center px-5">
              <Link to="/">list</Link>
            </li>
            <li className="flex justify-center items-center px-5">
              <Link to="/postwrite">write post</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
