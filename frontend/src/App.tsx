import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import MenuLateral from './components/MenuLateral';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen">
        <div className="hidden md:block">
          <MenuLateral />
        </div>
        <div className="flex-1 p-4">
          <Header />
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
