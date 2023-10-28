import { Navigate, Outlet } from "react-router-dom";



const UserProtectedRoutes = ()=>{
    let token = localStorage.getItem("access_token");
    
    return(
       <>
       {token?<Outlet/>:<Navigate to="./login"/>}
       </>
    )
}
export default UserProtectedRoutes