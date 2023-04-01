import { Route, Routes } from "react-router-dom";
import LoginPage from "./views/loginPage/loginPage";
import RegisterPage from "./views/registerPage/registerPage";
import ExplorePage from "./views/explorePage/explorePage";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default Router;
