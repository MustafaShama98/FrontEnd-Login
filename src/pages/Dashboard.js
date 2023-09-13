import { Navigate } from "react-router-dom";
import { useState, useEffect } from 'react'

const Dashboard = () => {
    const [authenticated, setauthenticated] = useState(null);
    useEffect(() => {
        const useffect = async () => {
            const loggedInUser = localStorage.getItem("authenticated");
            if (loggedInUser) {
                setauthenticated(loggedInUser);
                console.log(loggedInUser)
            }
            else{
                setauthenticated(false);
            }
          
        }
        useffect()

    }, []);
    if (authenticated != null) {
        if (!authenticated) {
            console.log("why")
            return <Navigate replace to="/login" />;
        } else {
            console.log("whynot")

            return (
                <div>
                    <p>Welcome to your Dashboard</p>
                </div>
            );
        }
    }

};
export default Dashboard;