import React, { useCallback, useEffect, useState } from "react";
import http from "../Helpers/http";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profileData, setProfileData] = useState<any>([]);
  const [resultsData, setResultsData] = useState<any>([]);
  const navigate = useNavigate();

  const getUserData = () => {
    http
      .get("/getProfile")
      .then((res) => {
        // console.log(res.data.data[0]);
        setProfileData(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });

    http
      .get("/getUserResults")
      .then((res) => {
        // console.log(res.data.data);
        setResultsData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = useCallback(()=>{
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    navigate("/login");
  },[])

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="vh-100 d-flex flex-column m-4 ">

      {
        localStorage.getItem("role")=="admin"? <div className="d-flex flex-row justify-content-end">
        <Button className="p-3 rounded shadow purpleGradient font-weight-bold w10" onClick={()=>{navigate('/dashboard')}}> Dashboard </Button>
      </div>:null
      }
     
     {(resultsData.length !== 0)? 
     <div>
     <div>
        <h3>Hello {profileData.Name},</h3>
        <p>This is your past record of quiz attempts</p>
      </div>
      <div className="w-75">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Attempted Questions</th>
              <th>Correct Answers</th>
              <th>Wrong Answers</th>
              <th>Percentage</th>
              <th>Attempted On</th>
            </tr>
          </thead>
          <tbody>
            {resultsData &&
              resultsData.map((item: any) => {
                return (
                  <tr key={item.id} onClick={()=>{navigate(`/result/${item.id}`)}}>
                    <td>{item.attempted_questions}</td>
                    <td>{item.success_answers}</td>
                    <td>{item.failed_answers}</td>
                    <td>{item.percentage}%</td>
                    <td>
                      {item.attempted_date.split(".")[0].split("T").join(" ")}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
      </div>
      :<div>
      <h3>Hello {profileData.Name},</h3>
      <p>You haven't attempted any quiz yet</p>
      <p><span className="corsorPoint" onClick={()=>{navigate("/")}}><u> Click here</u></span> to attempt one</p>
    </div>}
      
      <div>
        <Button
          className="p-3 rounded shadow purpleGradient font-weight-bold w10"
            onClick={logout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;
