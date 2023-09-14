import { useEffect, useState, useRef } from "react";
import {Link, useNavigate} from "react-router-dom";
import {useSignOut} from "react-auth-kit";
import axios from "../api/axios";

const Navbar = ({ user }) => {
  const [userID, setUserID] = useState(localStorage.getItem("userID"));
  const signOut = useSignOut()
  const navigate = useNavigate()
  // const count = useRef(localStorage.getItem("userID"));
  useEffect(() => {
    setUserID(localStorage.getItem("userID"))
  })
  // count.current = localStorage.getItem("userID");
  const logout = async () => {
  // const res = await axios.get("/logout",);
      window.open("http://localhost:3001/logout", "_self");
      signOut()
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userID");
      navigate("/");

    //  window.open("http://localhost:3001/logout", "_self");
  };
  return (
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">
          Dell Log Analayzer
        </Link>
      </span>
      {userID ? (
        <ul className="list">
          {/* <li className="listItem">{user.displayName}</li> */}
          <li className="listItem" onClick={logout}>
            Logout
          </li>
        </ul>
      ) : (
        <Link className="link" to="login">
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;