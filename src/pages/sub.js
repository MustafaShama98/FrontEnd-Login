import { useState, useEffect, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../design/sign.css';



function Sub() {
  const location = useLocation();
  const navigate = useNavigate();
  const { firstName, lastName, username, email,companyName, phoneNumber, password,passwordConfirm } = location.state;



  const [sub, setSub] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [isNavigatingBack, setIsNavigatingBack] = useState(false);

  useEffect(() => {
    if (isNavigatingBack) {
      console.log('Navigating back detected');
      navigate('/sub', { replace: true });
    }
  }, [isNavigatingBack]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      console.log('Before unload event fired');
      setIsNavigatingBack(true);
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  
  

  const handleSub = (e) => {
    setSub(e.target.value);
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sub === '') {
      setError('Please enter all the fields');
    } else {
      // Assuming you have a backend URL to send data
      const url = 'http://localhost:3001/signup'; // Replace with your actual backend URL
      const data = {
        firstName,
         lastName,
        username,
        email,
        phoneNumber,
        password,
        passwordConfirm,
       companyName,
        sub
      };

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((responseData) => {
          // Handle response from the backend if needed
          console.log(data)
        })
        .catch((error) => {
          // Handle error
          console.error('Error sending data to backend:', error);
        });
    }
  };

  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}
      >
        <h1>User {firstName} {lastName} successfully registered</h1>
      </div>
    );
  };

  const errorMessage = (message) => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}
      >
        <h1>{message}</h1>
      </div>
    );
  };
  
  console.log({ firstName});
  console.log({ lastName});
  console.log({ username});
  console.log({ phoneNumber});
  console.log({email});
  


  return (
    
    <div className="container">
      <center>
        <div>
          <h1>Buy Subscription</h1>
        </div>

        <div>
          {/* Information about the subscription */}
        </div>

        <div className="messages">
          {errorMessage()}
          {successMessage()}
        </div>

        <form>

          <label className="label">Choose a Subscription</label>
          <select onChange={handleSub} className="select">
            <option value="">Select Subscription</option>
            <option value="basic">Basic Subscription</option>
            <option value="standard">Standard Subscription</option>
            <option value="premium">Premium Subscription</option>
          </select>

          <button onClick={handleSubmit} className="btn" type="submit">
            Submit
          </button>
        </form>
      </center>
    </div>
  );
}

export default memo(Sub);
