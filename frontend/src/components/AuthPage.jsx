import { useState } from 'react';

function LoginForm({ handleLogin, onSwitch }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = await handleLogin(username, password);
    if (error) setErrorMessage('Invalid username or password.');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log In</h2>
      <input type="text" placeholder="Username" value={username}
        onChange={(e) => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password}
        onChange={(e) => setPassword(e.target.value)} required />
      {errorMessage && <p className="error">{errorMessage}</p>}
      <button type="submit">Log In</button>
      <p className="auth-toggle">
        Don't have an account?{' '}
        <button type="button" className="toggle-btn" onClick={onSwitch}>Register</button>
      </p>
    </form>
  );
}

function RegisterForm({ handleRegister, onSwitch }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = await handleRegister(username, password);
    if (error) setErrorMessage('Could not register. Username may already be taken.');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input type="text" placeholder="Username" value={username}
        onChange={(e) => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password}
        onChange={(e) => setPassword(e.target.value)} required />
      {errorMessage && <p className="error">{errorMessage}</p>}
      <button type="submit">Register</button>
      <p className="auth-toggle">
        Already have an account?{' '}
        <button type="button" className="toggle-btn" onClick={onSwitch}>Log In</button>
      </p>
    </form>
  );
}

function AuthPage({ handleLogin, handleRegister }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div id="auth-section">
      {showLogin
        ? <LoginForm handleLogin={handleLogin} onSwitch={() => setShowLogin(false)} />
        : <RegisterForm handleRegister={handleRegister} onSwitch={() => setShowLogin(true)} />
      }
    </div>
  );
}

export default AuthPage;