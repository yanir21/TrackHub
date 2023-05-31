import { Route, Routes } from 'react-router-dom';
import LoginPage from './views/loginPage/loginPage';
import RegisterPage from './views/registerPage/registerPage';
import ExplorePage from './views/explorePage/explorePage';
import ProfilePage from './views/profilePage/profilePage';
import NewProjectPage from './views/newProjectPage/newProjectPage';
import ProjectPage from './views/projectPage/projectPage';

const Router = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/explore' element={<ExplorePage />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/newProject' element={<NewProjectPage />} />
      <Route path='/song/:id' element={<ProjectPage />} />
    </Routes>
  );
};

export default Router;
