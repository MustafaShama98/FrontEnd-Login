import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from "react-router-dom";
import {useSignIn} from "react-auth-kit"

const LoginUser = ({ sendUserToApp }) => {
  const signIn = useSignIn();
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const handleSendUser = (data) => {
    const { ...newData } = data;
    const userToSend = {
      ...newData,
      displayName: newData.firstName + " " + newData.lastName,
    };
    sendUserToApp(userToSend);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to the login endpoint
      setError(username + " " + password);
      const response = await axios.post('/login',
          JSON.stringify({ "username": username, "password": password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true

        });
      const {username2, firstName, lastName, role,company,passwordChangedAt} = response.data.user
      console.log('login:' + response.data.user.firstName+ ' ' + response.data.user.role)
      signIn({
        token: response.data.token,
        expiresIn: 60* 15,//15 mins
        tokenType:"Bearer",
        authState: {username2,firstName, lastName, company, role,passwordChangedAt} //info about the user
      });
      // Do something with the successful response, e.g., store the token, navigate to a different route, etc.
      //var role = response?.data.user.role
    //  var passwordChangedAt = response?.data.user.passwordChangedAt
  
      localStorage.setItem("userID", response?.data.user?.id);
      setUser(response?.data.user)
      handleSendUser(response?.data.user)
      if (role === 'configurator') {
        if (passwordChangedAt !== undefined) {
          setUsername('')
          setPassword('')
          navigate('/home')
        }
        else {
          setUsername('')
          setPassword('')
          navigate(`/resetPassFirstLogin/${response?.data.user?.username}`)
        }
      }
      else if (role === 'viewer') {
        if (passwordChangedAt !== undefined) {
          setUsername('')
          setPassword('')
          navigate('/home')
        }
        else {
          setUsername('')
          setPassword('')
          navigate(`/resetPassFirstLogin/${response?.data.user?.username}`)
        }

      }


    } catch (error) {
      // Handle error
      console.log(error)

      setError('An error occurred');
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "10%" }}>
      <h1 >Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            className="form-control"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter Your Username'
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
        </div>
        <button className="btn btn-info" style={{ marginLeft: "30%" }} type="submit">Login</button>
      </form>
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default LoginUser;
