import logo from './logo.svg';
import './App.css';
import Main from './components/layouts/Main';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/pages/Home';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        }
      ]
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
