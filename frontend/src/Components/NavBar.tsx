import React,{useState,useEffect} from "react";
import { Button } from "react-bootstrap";
import "./Style.css"
import { useNavigate } from "react-router-dom";


const NavBar =()=>{

    const navigate = useNavigate()
    const nav = ()=>{
 navigate("/")
    }
    
    return(
    <div className="d-flex justify-content-between p-2 bg-white " >
            <div>
            <img onClick={nav} src={require("../Images/logo-bg.png")} alt="" width={"200px"} height={"60px"}/>
            </div>
            <div>
                <Button className="p-3 rounded shadow purpleGradient font-weight-bold " onClick={()=>{
                    navigate("/profile");
                }}>
                    Profile
                </Button>
                
            </div>
        </div>
    )
}

export default NavBar;