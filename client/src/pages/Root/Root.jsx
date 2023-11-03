import { Outlet } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";  
import {BiSolidMessageDetail} from "react-icons/bi";

const Root = () => {


  return (
    <div className="container m-0 p-0"> 
      <nav className="navbar navbar-light bg-light fixed-top px-4">
        <a className="navbar-brand" href="/home">
          <img src="../../public/vite.svg" width="30" height="30" alt="logo" className="mx-2" />
           People plus
        </a>
      </nav>
      <div className="row mt-5">
        <nav className="col-md-2 d-md-block bg-light position-fixed pt-4">
          <div className="sidebar-sticky"  style={{ height: '100vh' }}>
            <ul className="nav flex-column px-3">
              <li className="nav-item">
                <a className="nav-link active d-flex align-items-center" href="/home">
                  <AiFillHome />
                  <span className="px-2">Home</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active d-flex align-items-center" href="#">
                <BiSolidMessageDetail />
                  <span className="px-2">Messages</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active d-flex align-items-center" href="#">
                  <BsPersonFill />
                  <span className="px-2">Profile</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <main role="main" className="col-md-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Root;
