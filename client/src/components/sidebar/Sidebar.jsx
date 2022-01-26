// import core modules
import React from "react";
// import css module
import classes from "./sidebar.css";
// custome modules
import Class from "./Extractor.js";

const Sidebar = () => {
  // console.log(classNamees);
  return (
    <>
      <div className={Class(classes, "sidebar")}>
        <div className={Class(classes, "logo-details")}>
          <i className="bx bxl-c-plus-plus icon"></i>
          <div className={Class(classes, "logo_name")}>CodingLab</div>
          <i className="bx bx-menu" id="btn"></i>
        </div>
        <ul className={Class(classes, "nav-list")}>
          <li>
            <input type="text" placeholder="Search..." />
            <span className={Class(classes, "tooltip")}>Search</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-grid-alt"></i>
              <span className={Class(classes, "links_name")}>Dashboard</span>
            </a>
            <span className={Class(classes, "tooltip")}>Dashboard</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-user"></i>
              <span className={Class(classes, "links_name")}>User</span>
            </a>
            <span className={Class(classes, "tooltip")}>User</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-chat"></i>
              <span className={Class(classes, "links_name")}>Messages</span>
            </a>
            <span className={Class(classes, "tooltip")}>Messages</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-pie-chart-alt-2"></i>
              <span className={Class(classes, "links_name")}>Analytics</span>
            </a>
            <span className={Class(classes, "tooltip")}>Analytics</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-folder"></i>
              <span className={Class(classes, "links_name")}>File Manager</span>
            </a>
            <span className={Class(classes, "tooltip")}>Files</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-cart-alt"></i>
              <span className={Class(classes, "links_name")}>Order</span>
            </a>
            <span className={Class(classes, "tooltip")}>Order</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-heart"></i>
              <span className={Class(classes, "links_name")}>Saved</span>
            </a>
            <span className={Class(classes, "tooltip")}>Saved</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-cog"></i>
              <span className={Class(classes, "links_name")}>Setting</span>
            </a>
            <span className={Class(classes, "tooltip")}>Setting</span>
          </li>
          <li className={Class(classes, "profile")}>
            <div className={Class(classes, "profile-details")}>
              <img src="profile.jpg" alt="" />
              <div className={Class(classes, "name_job")}>
                <div className={Class(classes, "name")}>Prem Shahi</div>
                <div className={Class(classes, "job")}>Web designer</div>
              </div>
              <i className="bx bx-log-out" id="log_out"></i>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
