import { RequireAuth,useAuthUser,useIsAuthenticated} from "react-auth-kit"
import {Navigate, Outlet, Route} from "react-router-dom";
import Home from "../pages/Home";



const ProtectRoute = ({allowedRoles, PageComp }) =>{
    const auth = useAuthUser()
    const isAuthenticated = useIsAuthenticated()
  // const userRole = auth().role
        console.log( auth()?.role)
    return (
        auth()?.role === {allowedRoles} ?
            <RequireAuth loginPath={"/unauthenticated"}><PageComp/></RequireAuth>
            : auth() ?
                <Navigate to="/noPermssion"/>  //logged in but dont have access
            : <Navigate to="/unauthenticated"/> //not logged at all


     )
};

export default  ProtectRoute