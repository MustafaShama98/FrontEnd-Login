import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userID");
    window.open("http://localhost:3001/auth/logout", "_self");
  };
  return (
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">
          Dell Log Analayzer
        </Link>
      </span>
      {localStorage.getItem("userID") ? (
        <ul className="list">
          <li className="listItem">{user.displayName}</li>
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