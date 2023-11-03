import React from 'react'
import ReactDOM from 'react-dom/client'
import { 
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Signup from './pages/Signup/Signup.jsx';
import ErrorPage from './error-page.jsx';
import Login from './pages/Login/Login.jsx';
import Home from './pages/Home/Home.jsx'
import Root from './pages/Root/Root.jsx';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home />,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
