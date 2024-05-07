const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between h-[50px] bg-slate-400">
        <h1>logo</h1>
        <div className="flex h-[100%]">
          <ul className="flex justify-center items-center px-5">
            <li>list</li>
            <li>write post</li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
