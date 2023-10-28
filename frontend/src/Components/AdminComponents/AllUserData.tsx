import React, { useEffect, useState } from "react";
import http from "../../Helpers/http";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AllUsersData = () => {
  const [profileData, setProfileData] = useState<any>([]);
  const [allUsersData, setAllUsersData] = useState<any>([]);
  const navigate = useNavigate()

  const logoutUser = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("role")
    navigate("/login")
  }
  const getUserData = () => {
    http
      .get("/getAllUsers")
      .then((res) => {
        // console.log(res.data.data);
        setAllUsersData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="vh-100 d-flex flex-column m-4 ">
      <div>
       <h2>Registered User </h2>
      </div>
      <div className="w-75">
        <Table striped bordered hover >
          <thead>
            <tr>
              <th>User Id</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>User Role</th>
           
            </tr>
          </thead>
          <tbody>
            {allUsersData &&
              allUsersData.map((item: any) => {
                return (
                  <tr key={item.UserId}>
                    
                  
                    <td>{item.UserId}</td>
                    <td>{item.Name}</td>
                    <td>{item.Email}</td>
                    <td>{item.Role}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
      <div>
        <Button 
         className="p-3 rounded shadow purpleGradient font-weight-bold w10"
        onClick={logoutUser}>Logout</Button>
      </div>
    </div>
  );
};

export default AllUsersData;
