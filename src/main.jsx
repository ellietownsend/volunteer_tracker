import Login from './components/LoginPage.jsx';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import router from '../router.jsx';
import { RouterProvider } from 'react-router-dom';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <React.StrictMode>
   <RouterProvider router = {router} />
  </React.StrictMode>
);

