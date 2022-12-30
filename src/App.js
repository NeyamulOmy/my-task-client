import logo from './logo.svg';
import './App.css';
import Main from './components/layouts/Main';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/pages/Home';
import AddTask from './components/pages/AddTask';
import MyTasks from './components/pages/MyTasks';
import CompletedTasks from './components/pages/CompletedTasks';
import { Toaster } from 'react-hot-toast';
import Signup from './components/pages/SignUp';
import Login from './components/pages/Login';
import PrivateRoute from './routes/PrivateRoute';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <PrivateRoute><Home></Home></PrivateRoute>
        },
        {
          path: '/Add Task',
          element: <PrivateRoute><AddTask></AddTask></PrivateRoute>
        },
        {
          path: '/My Tasks',
          element: <PrivateRoute><MyTasks></MyTasks></PrivateRoute>,
          // loader: () => fetch('https://my-task-server-three.vercel.app/mytasks')

        },
        {
          path: '/Completed Tasks',
          element: <PrivateRoute><CompletedTasks></CompletedTasks></PrivateRoute>
        },
        {
          path: '/signup',
          element: <Signup></Signup>
        },
        {
          path: '/login',
          element: <Login></Login>
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
