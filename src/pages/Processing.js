import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import {useSignIn} from "react-auth-kit";

function Processing({ sendUserToApp }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const signIn = useSignIn();
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
          navigate("/unauthorized");
        })
        .then((responseData) => {

          setUser(responseData.user);
          localStorage.setItem("userID", responseData.user._id);
          localStorage.setItem("accessToken", responseData.accessToken);


          const {username, firstName, lastName, role,companyName,email} = responseData.user
          signIn({
            token:responseData.accessToken,
            expiresIn: 60* 15,//15 mins
            tokenType:"Bearer",
            authState: {username,firstName, lastName, email, companyName, role} //info about the user
          });

          handleSendUser(responseData.user);
          navigate(`/home`);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  const handleSendUser = (data) => {
    const { _id, ...newData } = data;
    const userToSend = { id: _id, ...newData };
    sendUserToApp(userToSend);
  };

  return (
    <div>
      <h1>Processing</h1>
    </div>
  );
}

export default Processing;
