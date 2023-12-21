import React from "react";
import logo from "../../images/logo.jpg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../redux/features/authSlice";
import { resetQuote } from "../../redux/features/quoteSlice";

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(setLogout());
    dispatch(resetQuote());
    navigate("/");
  };

  return (
    <div className="row nav-bottom">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top light-blue">
        <div className="container-fluid me-3 ms-3">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} height={30} width={45} />
            &nbsp;&nbsp;Insurance Services Hub
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="!#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Services
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to="/auto">
                      Automobile Insurance
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/life">
                      Life Insurance
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/home">
                      Home Insurance
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink className="nav-link" to="/support">
                  Support
                </NavLink>
              </li> */}
            </ul>
            {/* <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-info" type="submit">
                Search
              </button>
            </form> */}

            <span className="navbar-text pe-5">
              {!user ? (
                <span className="navbar-text">
                  <NavLink className="nav-link" aria-current="page" to="/login">
                    Log in
                  </NavLink>
                </span>
              ) : (
                <div className="dropdown">
                  <button
                    className="btn btn-dark dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.username}
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    {user.usertype === "CUSTOMER" && (
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to={`/profile/${user.username}`}
                        >
                          My Profile
                        </NavLink>
                      </li>
                    )}
                    {user.usertype === "ADMIN" && (
                      <li>
                        <NavLink className="dropdown-item" to={`/admin`}>
                          Admin Dashboard
                        </NavLink>
                      </li>
                    )}

                    <li>
                      <a className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
