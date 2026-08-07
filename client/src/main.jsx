import React from 'react';
import { createRoot } from 'react-dom/client';
import router from '../router.jsx';
import { RouterProvider } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.jsx';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <AuthContextProvider>
   <RouterProvider router = {router} />
  </AuthContextProvider>
);

