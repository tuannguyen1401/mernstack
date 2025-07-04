import './App.css';
import User from './getUser/User';
import AddUser from './addUser/addUser';
import UpdateUser from './updateUser/updateUser';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <User />
    },
    {
      path: '/add',
      element: <AddUser />
    },
    {
      path: '/update/:id',
      element: <UpdateUser />
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
      <Toaster position='top-right' toastOptions={{
    // Style mặc định cho tất cả toast
    style: {
      background: '#333',
      color: '#fff',
      fontSize: '1.1rem',
      borderRadius: '8px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
      padding: '16px 24px',
    },
    // Style riêng cho toast success
    success: {
      style: {
        background: '#4caf50',
        color: '#fff',
      },
    },
    // Style riêng cho toast error
    error: {
      style: {
        background: '#f44336',
        color: '#fff',
      },
    },
  }} />
    </div>
  );
}

export default App;
