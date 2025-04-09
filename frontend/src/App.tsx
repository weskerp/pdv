import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import MenuLateral from './components/MenuLateral';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen">
        <div className="hidden md:block">
          <MenuLateral />
        </div>
        <div className="flex-1 p-4">
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
