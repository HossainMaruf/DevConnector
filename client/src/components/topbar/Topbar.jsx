// import core modules
import React from "react";
// import custom css module
import classes from "./topbar.css";

const Topbar = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
      <nav className={classes.topbar + " navbar navbar-expand-lg navbar-light bg-light"}>
        <a href="#" className="navbar-brand">
          <img src={PF+"pust.png"} alt="" className={classes.brandImage}/>
        </a>
        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          id="navbarCollapse"
          className="collapse navbar-collapse justify-content-start"
        >
          <div className="navbar-nav">
            <a href="#" className="nav-item nav-link">
              Home
            </a>
            <a href="#" className="nav-item nav-link">
              About
            </a>
            <div className="nav-item dropdown">
              <a
                href="#"
                data-toggle="dropdown"
                className="nav-item nav-link dropdown-toggle"
              >
                Services
              </a>
              <div className="dropdown-menu">
                <a href="#" className="dropdown-item">
                  Web Design
                </a>
                <a href="#" className="dropdown-item">
                  Web Development
                </a>
                <a href="#" className="dropdown-item">
                  Graphic Design
                </a>
                <a href="#" className="dropdown-item">
                  Digital Marketing
                </a>
              </div>
            </div>
            <a href="#" className="nav-item nav-link active">
              Pricing
            </a>
            <a href="#" className="nav-item nav-link">
              Blog
            </a>
            <a href="#" className="nav-item nav-link">
              Contact
            </a>
          </div>
          <form className="navbar-form form-inline">
            <div className="input-group search-box">
              <input
                type="text"
                id="search"
                className="form-control"
                placeholder="Search here..."
              />
              <div className="input-group-append">
                <span className="input-group-text">
                  <i className="material-icons">&#xE8B6;</i>
                </span>
              </div>
            </div>
          </form>
          <div className="navbar-nav action-buttons ml-auto nav-item dropdown">
            <a
              href="#"
              data-toggle="dropdown"
              className="nav-item nav-link dropdown-toggle mr-3"
            >
              Login
            </a>
            <div
              className="dropdown-menu login-form"
            >
              <form action="/examples/actions/confirmation.php" method="post">
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    required="required"
                  />
                </div>
                <div className="form-group">
                  <div className="clearfix">
                    <label>Password</label>
                    <a href="#" className="float-right text-muted">
                      <small>Forgot?</small>
                    </a>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    required="required"
                  />
                </div>
                <input
                  type="submit"
                  className="btn btn-primary btn-block"
                  value="Login"
                />
              </form>
            </div>
            <a href="#" className="btn btn-primary">
              Get Started
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Topbar;
