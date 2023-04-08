import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/navbar';
import Sidenav from './components/Sidenav/sidenav';
import { AuthContextType } from './models/AuthContext';
import { User, UserAuth } from './models/user';
import Router from './router';
import { clearToken, decodeToken, getToken, setToken } from './services/auth';

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const App = () => {
  const [currentUser, setCurrentUser] = useState<UserAuth>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!['/login', '/register'].includes(location.pathname)) {
      initialLoad();
    }
  }, []);

  const initialLoad = async () => {
    const token = await getToken();
    if (!token) {
      navigate('/login');
    } else {
      login(token);
    }
  };

  const login = useCallback((token: string, redirect?: boolean) => {
    setCurrentUser(decodeToken(token));
    if (redirect) {
      navigate('/explore');
    }
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(undefined);
    clearToken();
    navigate('/login');
  }, []);

  const contextValue = useMemo(
    () => ({
      currentUser,
      login,
      logout
    }),
    [currentUser, login]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      <div className='App'>
        <Navbar />
        <div className='site-container'>
          {currentUser && <Sidenav />}
          <div className='content'>
            <Router />
          </div>
        </div>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
