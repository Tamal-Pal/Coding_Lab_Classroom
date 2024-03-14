import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Unauthorized from "./Unauthorized/Unauthorized"

const RequireAuth = ({ allowedRoleREGEX }) => {
    const { auth } = useAuth()
    const location = useLocation()

    return (
        allowedRoleREGEX.test(auth?.user_id)
            ? <Outlet />
            : auth?.user_id
                ? <Unauthorized />
                : <Navigate to="/login" state={{ from: location }} replace />
            //the state attribute has a deep meaning
            //reference: https://www.youtube.com/watch?v=oUZjO00NkhY&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd&index=3
            //section: manage browser history
    )
}

export default RequireAuth