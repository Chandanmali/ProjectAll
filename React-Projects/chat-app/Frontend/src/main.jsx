
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx'
import Chat from './components/Chat.jsx'
import Signup from './Authentication/Signup.jsx'
import Login from './Authentication/Login.jsx'
import UserChat from './components/UserChat.jsx'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/chat",
    element: <Chat />
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
