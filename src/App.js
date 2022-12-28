import logo from './logo.svg';
import './App.css';
import Main from './components/layouts/Main';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/pages/Home';
import AddTask from './components/pages/AddTask';
import MyTasks from './components/pages/MyTasks';
import CompletedTasks from './components/pages/CompletedTasks';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/Add Task',
          element: <AddTask></AddTask>
        },
        {
          path: '/My Tasks',
          element: <MyTasks></MyTasks>
        },
        {
          path: '/Completed Tasks',
          element: <CompletedTasks></CompletedTasks>
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
