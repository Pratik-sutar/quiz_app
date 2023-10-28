import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import http from "../Helpers/http";
import "./Style.css";
import { RiLockPasswordFill, RiUser3Fill } from "react-icons/ri";
import {BsShieldLockFill,BsFillEyeFill} from "react-icons/bs"
import {GrMail} from "react-icons/gr"
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [textType,setTextType] = useState("password")
  const navigate = useNavigate();
  let emailValidator =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  let access_token = localStorage.getItem("access_token");
  const toggleText =()=>{
    if (textType === "password") {
      setTextType("text")
    }else{
      setTextType("password")
    }
  }
  useEffect(() => {
    if (access_token) {
      navigate("/");
    }
  }, []);
  const submitHandler = () => {
    if (email == "") {
      toast.error("Please enter your email", { toastId: "001" });
    } else if (!emailValidator.test(email)) {
      toast.error("Please enter valid email address", { toastId: "002" });
    } else if (password == "") {
      toast.error("Please enter your password", { toastId: "003" });
    } else if (password.length < 8) {
      toast.error("Password must be at least 8 characters long", {
        toastId: "004",
      });
    } else {
      let data = {
        Email: email,
        Password: password,
      };
      http
        .post("/Login", data)
        .then((res) => {
          // console.log(res.data.data.access_token);
          localStorage.setItem("access_token", res.data.data.access_token);
          localStorage.setItem("role", res.data.data.role);
          if (localStorage.getItem("access_token")!==null) {
            navigate("/");
            // console.log(localStorage.getItem("access_token"));
            
          }
        })
        .catch((err) => {
          console.log(err);
          
          toast.error(err.response.data.message);
        });
    }
  };

  return (
    <div className="d-flex flex-column mt-10 align-items-center w-100 vh-100">
      <div className="d-flex flex-column w-50 justify-content-center align-items-center shadow p-3 rounded">
        <h1 className="italicFont">Login</h1>
        <div className="d-flex flex-column p-2 w-75">
          <label className="font-weight-bold ">Email</label>
          <div className="d-flex flex-row">
            <h3>
              <GrMail className="p-1 bg-purple" />
            </h3>
            <input
              className="p-2 w-100"
              type="email"
              name=""
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            
          </div>
        </div>
        <div className="d-flex flex-column p-2 w-75">
          <label className="font-weight-bold ">Password</label>
          <div className="d-flex flex-row">
            <h3>
            <BsShieldLockFill className="p-1 bg-purple" />
            </h3>
            <input
              className="p-2 w-100"
              type={textType}
              name=""
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
           
          </div>
        </div>
        <div className="d-flex flex-column justify-content-end align-items-end w-75 p-2">         
            {(textType=="password")?<>
            <h6 className="corsorPoint p-2" onClick={toggleText}>Show Password <AiOutlineEye/></h6>
            </>:<>
            <h6 className="corsorPoint p-2" onClick={toggleText}>Hide Password <AiOutlineEyeInvisible/></h6>
            </>}
      
          <div className="w-75 p-2">
            <Button
              className="p-3 font-weight-bold rounded shadow purpleGradient w-100"
              onClick={submitHandler}
            >
              Login
            </Button>
          </div>
          <h6 className="p-2"> Not yet registered?, <span className="corsorPoint" onClick={() => {
                navigate("/register");
              }}><u> Register</u></span></h6>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
