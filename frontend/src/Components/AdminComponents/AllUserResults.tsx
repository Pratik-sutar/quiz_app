import React, { useEffect, useState } from "react";
import http from "../../Helpers/http";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AllUsersResults = () => {
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
      .get("/getAllResults")
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
       <h2>User Quiz Results</h2>
      </div>
      <div className="w-75">
        <Table striped bordered hover >
          <thead>
            <tr>
              <th>User Id</th>
              <th>Attempted Questions</th>
              <th>Correct Answers</th>
              <th>Wrong Answers</th>
              <th>Percentage</th>
              <th>Attempted On</th>
            </tr>
          </thead>
          <tbody>
            {allUsersData &&
              allUsersData.map((item: any) => {
                return (
                  <tr key={item.UserId}>
                    <td>{item.UserId}</td>
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
      <div>
        <Button 
         className="p-3 rounded shadow purpleGradient font-weight-bold w10"
        onClick={logoutUser}>Logout</Button>
      </div>
    </div>
  );
};

export default AllUsersResults;
