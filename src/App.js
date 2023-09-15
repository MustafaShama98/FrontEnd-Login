import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UnauthenticatedAccess from "./pages/UnauthenticatedAccess";
import Signup from "./pages/Signup";
import Sign from "./pages/Signup";
import Sub from "./pages/sub";
import Dashboard from "./pages/Dashboard";
import Processing from "./pages/Processing";
import ForgotPassword from "./pages/ForgetPass";
import ResetPass from "./pages/resetPass";

import LoginUser from "./pages/userLogin"
import ChangePassword from "./pages/resetPassFirstLogin";
import {AuthProvider, RequireAuth} from "react-auth-kit"
import LandPage from "./pages/landpage";
import VerifyEmail from "./pages/verifyEmail"
import ProtectRoute from "./components/ProtectedRoutes";
import UnauthorizedAccess from "./pages/UnauthorizedAccess";
const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:3001/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  // Callback function to receive user from Login (Child Component)
  const receivedUserFromLogin = (user) => {
    setUser(user);
  };

  return (
      <AuthProvider
          authType={"cookie"}
          authName={"_auth"}
          cookieDomain={window.location.hostname}
          cookieSecure={false}
      >
      <div>
        <BrowserRouter>
        <Navbar user={user} />

        <Routes>
          <Route path="/" element={<LandPage />} />

          {/*<Route path="/" element={user ? <Home /> : <LoginUser sendUserToApp={receivedUserFromLogin} />} />*/}
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <LoginUser sendUserToApp={receivedUserFromLogin}/>}
          />
          <Route path="/admin/login" element={<Login sendUserToApp={receivedUserFromLogin}/>}  />
          <Route path="/verifyEmail" element={<VerifyEmail />} />

          <Route path="/signup" element={<Sign />} />
          <Route path="/sub" element={<Sub />} />

          <Route
            path="/processing"
            element={<Processing sendUserToApp={receivedUserFromLogin} />}
          />
    
          <Route
            path="/post/:id"
            element={user ? <Post /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<NoPage />} />


           <Route path="/unauthenticated" element={<UnauthenticatedAccess />} />
          <Route path="/noPermssion" element={<UnauthorizedAccess />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPass/:id/:token" element={<ResetPass />} />

          {/***************************************************************/}
          {/*protected routes childs - needs to be logged in */}
          {/*<Route path="/home" element={ <RequireAuth loginPath={"/unauthorized"}><Home/></RequireAuth>}/>*/}
          <Route path="/home" element={ <ProtectRoute allowedRoles={['admin','config']} PageComp ={Home} />   }/>
          <Route path="/dashboard" element={ <RequireAuth loginPath={"/unauthorized"}><Dashboard/>< /RequireAuth>}/>
            {/***************************************************************/}

          <Route path="/resetPassFirstLogin/:username" element={<ChangePassword />} />
         { /* <Route path="/dashboard/xx" element={<Signup />} /> */}



        </Routes>
        </BrowserRouter>
      </div>
        </AuthProvider>
  );
};

export default App;

/*
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Login from "./pages/Login";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgetPass";
import Sub from "./pages/sub";
import Sign from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import LoginUser from "./pages/userLogin";
import UnauthorizedAccess from "./pages/UnauthorizedAccess";
import Processing from "./pages/Processing";
import NoPage from "./pages/NoPage"

const App = () => {
  const [user, setUser] = useState({});

  // Callback function to receive user from Login (Child Component)
  const receivedUserFromLogin = (user) => {
    setUser(user);
  };

  return (
    <BrowserRouter>
      <div>
        <Navbar user={user} />

        <Routes>
        <Route path="/" element={user ? <Home /> : <LoginUser />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <LoginUser />}
          />

          <Route
            path="/processing"
            element={<Processing sendUserToApp={receivedUserFromLogin} />}
          />
          <Route path="/signup" element={<Sign />} />
          <Route path="/sub" element={<Sub />} />

          <Route
            path="/post/:id"
            element={user ? <Post /> : <Navigate to="/login" />}
          />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/unauthorized" element={<UnauthorizedAccess />} />
          <Route path="*" element={<NoPage />} />
          {/* <Route path="/dashboard/xx" element={<Signup />} /> */
        /*</Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;*/

