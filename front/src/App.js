import { Route, Routes } from "react-router-dom";
import "./assets/css/tStyle.css";
import Layout from "./layout/Layout";
import MainPage from "./layout/MainPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
