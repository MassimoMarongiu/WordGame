import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PlayGame from './pages/PlayGame.jsx';
import Users from './pages/Users.jsx';
import Login_Register from './pages/Login_Register.jsx';
import UserProfile from './pages/UserProfile.jsx';
import Logout from './components/Logout.jsx';
import store from './redux/store.js'; 
import { Provider } from 'react-redux';  

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/usersList', element: <Users /> },
  { path: "/playGame", element: <PlayGame /> },
  { path: "/login_register", element: <Login_Register /> },
  { path: "/userProfile", element: <UserProfile /> },
  { path: "/logout", element: <Logout /> }
])
createRoot(document.getElementById('root')).render(
    <StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
