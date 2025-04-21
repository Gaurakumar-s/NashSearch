import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaRobot } from 'react-icons/fa';

function Login() {
  const { login, signup, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isSignUp) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      navigate('/chat/new');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/chat/new');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <div className="logo-icon">
          <FaRobot className="robot-icon" />
        </div>
        <h1 className="app-title">NashSearch</h1>
      </div>
      <h2 className="auth-title">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="login-input"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="login-input"
            required
          />
        </div>
        <button type="submit" className="login-button">
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>
        <div className="separator">
          <span>or</span>
        </div>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="google-button"
        >
          <FaGoogle className="google-icon" /> Continue with Google
        </button>
        {error && <div className="error">{error}</div>}
      </form>
      <p className="auth-switch">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="toggle-auth"
        >
          {isSignUp ? 'Login' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
}

export default Login;