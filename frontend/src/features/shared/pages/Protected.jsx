import { useContext } from "react";
import { AuthContext } from "../../auth/auth.context.jsx";
import { Navigate } from "react-router";

const Protected = ({children}) => {
    const context = useContext(AuthContext);
    const {user} = context;

    if(!user) {
        return <Navigate to='/login-page' />
    }

    return children;
}

export default Protected;