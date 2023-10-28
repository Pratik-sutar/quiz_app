import { Navigate, Outlet } from "react-router-dom";



const AdminProtectedRoutes = ()=>{
    let token = localStorage.getItem("access_token");
    let role = localStorage.getItem("role");
    
    return(
       <>
       {token && role=="admin"?<Outlet/>:<Navigate to="./login"/>}
       </>
    )
}
export default AdminProtectedRoutes