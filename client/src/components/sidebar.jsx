import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BiSolidMessageDetail } from "react-icons/bi";
import { BsPersonFill } from "react-icons/bs";

const Sidebar = () => {
  return (
    <nav className="col-md-2 d-md-block bg-light position-fixed pt-4">
    <div className="sidebar-sticky"  style={{ height: '100vh' }}>
      <ul className="nav flex-column px-3">
        <li className="nav-item">
          <Link className="nav-link active d-flex align-items-center" to="/feed">
            <AiFillHome />
            <span className="px-2">Feeds</span>
          </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link active d-flex align-items-center" href="#">
          <BiSolidMessageDetail />
            <span className="px-2">Messages</span>
          </a>
        </li>
        <li className="nav-item">
          <Link className="nav-link active d-flex align-items-center" to="/myprofile">
            <BsPersonFill />
            <span className="px-2">Profile</span>
          </Link>
        </li>
        <li className="nav-item">
          <button className="btn btn-primary">
            <Link className="text-light nav-link active d-flex align-items-center" to="/addpost">
              +
              <span className="px-2 ">post</span>
            </Link>
          </button>
        </li>
      </ul>
    </div>
  </nav>
  );
};

export default Sidebar;
