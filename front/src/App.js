import { Route, Routes } from "react-router-dom";
import "./assets/css/tStyle.css";
import Layout from "./layout/Layout";
import MainPage from "./layout/MainPage";
import PostWrite from "./pages/PostWrite";

function App() {
  return (
    <Routes>
      {/* element is where Outlet is */}
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />}></Route>
        <Route path="/postwrite" element={<PostWrite />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
