import { useState, useEffect } from 'react';
import { getMe, login, register, logout } from './adapters/auth-adapters';
// REMIX: replaced AuthPage and TodoPage imports with AuthPage and Dashboard
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // On every page load, check the server for an active session cookie.
  // React state doesn't survive a refresh; session cookies do.
  // unchanged — same session rehydration pattern as the case study
  useEffect(() => {
    const checkForSession = async () => {
      const { data: user } = await getMe();
      setCurrentUser(user);
    };
    checkForSession();
  }, []);

  // Handlers that manage updating the current user.
  // Defined in App to ensure that child components only
  // update the current user in a controlled manner.
  // unchanged — same auth handler pattern as the case study
  const handleLogin = async (username, password) => {
    const { data: user, error } = await login(username, password);
    if (error) return error;
    setCurrentUser(user);
  };

  const handleRegister = async (username, password) => {
    const { data: user, error } = await register(username, password);
    if (error) return error;
    setCurrentUser(user);
  };

  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
  };

  return (
    // REMIX: removed <h1>Todo App</h1> — title is now inside Dashboard
    // REMIX: replaced TodoPage with Dashboard
    // REMIX: Dashboard receives same props as TodoPage did (currentUser, handleLogout)
    <main>
      {currentUser
        ? <Dashboard currentUser={currentUser} handleLogout={handleLogout} />
        : <AuthPage handleLogin={handleLogin} handleRegister={handleRegister} />
      }
    </main>
  );
}

export default App;