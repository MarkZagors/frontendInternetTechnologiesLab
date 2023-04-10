import React, { useDeferredValue, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCurrentLogin } from '../globals';
import { loginUser } from '../api/UserAPI';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  //testUsername
  //testPass
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Login form submitted:', { username, password });
    try {
      const { status, data } = await loginUser(username, password);
      if (status == 200) {
        navigate('/main');
        setCurrentLogin(username);
      } else {
        setErrorMessage(data["result"]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>{errorMessage}</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
