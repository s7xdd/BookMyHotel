import { useState } from "react";

const AdminSidebar = () => {
    const [active, setActive] = useState('')
    
  return (
    <div>
      <nav>
        <div className="logo">
          <div className="logo-image">
            <img src="logo.png" alt="" />
          </div>
        </div>
        <div className="menu-items">
          <ul className="navLinks">
            <li className="navList active">
              <a href="#">
                <span className="links">Dashboard</span>
              </a>
            </li>
            <li className="navList">
              <a href="#">
                <span className="links">Analytics</span>
              </a>
            </li>
            <li className="navList">
              <a href="#">
                <span className="links">Analytics</span>
              </a>
            </li>
            <li className="navList">
              <a href="#">
                <span className="links">Likes</span>
              </a>
            </li>
            <li className="navList">
              <a href="#">
                <span className="links">Comments</span>
              </a>
            </li>
          </ul>
          <ul className="bottom-link">
            <li>
              <a href="#">
                <span className="links">Profile</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="links">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;
