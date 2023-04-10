import React from 'react';
import { Route, Routes as RouterRoutes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import IndexPage from '../pages/IndexPage';
import Main from '../pages/Main';

const Routes = () => (
  <RouterRoutes>
    <Route path="/" element={<IndexPage />} />
    <Route path="/main" element={<Main />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
  </RouterRoutes>
);

export default Routes;
