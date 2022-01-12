import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import "../styles/register.scss";

const ProfilePage = ({ history }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user) {
        dispatch(getUserDetails("profile"));
      } else {
        setFirstName(userInfo.firstName);
        setLastName(userInfo.lastName);
        setEmail(userInfo.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user.id, firstName, email, password }));
    }
  };

  return (
    <div className="signup-container">
      <h2>User Profile</h2>
      <form onSubmit={submitHandler} className="signup-form">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" variant="primary" className="login-btn">
          Update
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
