import React from 'react';
import { Link } from 'react-router-dom';

const IndexPage = () => (
  <div>
    <h2>Welcome to Bad Translate</h2>
    <Link to="/login">
      <button>Login</button>
    </Link>
    <Link to="/register">
      <button>Register</button>
    </Link>
  </div>
);

export default IndexPage;
