
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './Authentication/Signup.jsx'
import Login from './Authentication/Login.jsx'
import UserChat from './components/UserChat.jsx'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/auth/signup",
    element: <Signup />
  },
  {
    path: "/auth/login",
    element: <Login />
  },
  {
    path: "/api/userChat",
    element: <UserChat />
  }
])

createRoot(document.getElementById('root')).render(


  <RouterProvider router={appRouter} />

  ,
)
