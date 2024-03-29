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
import Feed from './pages/Feed/Feed.jsx'
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import './assets/global.css';
import MyProfile from './pages/ViewProfile/myprofile.jsx';
import AddPost from './pages/addPost/addPost.jsx';

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
    path: "/home",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/feed",
        element: <Feed />,
      },
      {
        path: "/myprofile",
        element: <MyProfile />
      },
      {
        path: "/addpost",
        element: <AddPost/>,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
