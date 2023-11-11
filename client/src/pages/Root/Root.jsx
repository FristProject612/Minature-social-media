import { Navigate, Outlet } from "react-router-dom";
import { useMemo } from "react";
import { getAccessToken, getRefreshToken, getUser } from "../../storageUtils";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";

const Root = () => {
  const userData = getUser();
  
  const refreshToken = getRefreshToken();
  const accessToken = getAccessToken();
  const isAuthenticated = (userData, refreshToken, accessToken) => {
  
    return userData && accessToken && refreshToken;
  };

  const isUserAuthenticated = useMemo(() => isAuthenticated(userData, refreshToken, accessToken), [userData, refreshToken, accessToken]);

  return (isUserAuthenticated) ? (
    <div> 
      <Navbar username={userData.username} />
        <Sidebar />
      <div>
        <main role="main">
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  )
};

export default Root;
