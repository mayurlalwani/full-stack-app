import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { Link } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div className="navbar">
      {userInfo ? (
        <>
          <span className="nav-item">Profile</span>
          <span className="nav-item">Seminar</span>
          <span className="nav-item" onClick={logoutHandler}>
            Logout
          </span>
        </>
      ) : (
        <Link to="/login">
          <span className="nav-item">Login</span>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
