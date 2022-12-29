import logo from './logo.svg';
import './App.css';
import Main from './components/layouts/Main';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/pages/Home';
import AddTask from './components/pages/AddTask';
import MyTasks from './components/pages/MyTasks';
import CompletedTasks from './components/pages/CompletedTasks';
import { Toaster } from 'react-hot-toast';
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
          element: <MyTasks></MyTasks>,
          loader: () => fetch('https://my-task-server-three.vercel.app/mytasks')

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
      <Toaster />
    </div>
  );
}

export default App;
