import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './app/router';
import { useAuth } from './store/useAuth';

export function App() {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return <RouterProvider router={router} />;
}

export default App;
