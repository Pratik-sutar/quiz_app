import React, { useState, useEffect, useCallback } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";
import axios from "axios";
import http from "../Helpers/http";
import { error } from "console";
import Loader from "./Loader";

const Home = () => {
  const levelArray = [
    {title:"Easy",value:10},
    {title:"Normal",value:15},
    {title:"Hard",value:20}
  ] 

  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory]: any = useState([]);
  const [levelSelected, setLevelSelected]= useState(false)
  const [dataset, setDataSet] = useState(true);
  const [categories, setCategories] = useState<any>([]);
  const [questionLimit, setQuestionLimit] = useState(10)
  const [recievedData, setRecievedData] = useState(false)

  const access_token = localStorage.getItem("access_token");
  let headers = {
    "Content-Type": "application/json; charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "access_token": access_token,
  };

  const getCateData = () => {
    if (recievedData===false) {
      axios
      .get(`${process.env.REACT_APP_PORT}/getAllCategories`, { headers })
      .then((res) => {
        // console.log(res);
        setCategories(res.data.data);
        setDataSet(true);
        setRecievedData(true)
      })
      .catch((err) => {
        console.log(err);
      });
    }else{
      return  setRecievedData(true)
    }
    
  };

  const submithandler = ()=>{
    if (selectedCategory.length < 2) {
      toast.error("please select atleast 2 cat", { toastId: "te001" });
    } else if (selectedCategory.length > 5) {
      toast.error("please select upto 5 categories", {
        toastId: "te002",
      });
    } else if (levelSelected===false){
      toast.error("please select difficulty level", {
        toastId: "te003",
      });
    }
    else {
      localStorage.setItem(
        "selectedCategory",
        selectedCategory
      );
      navigate("/quiz");
      getCateData();
    }
  }
  useEffect(() => {
      getCateData();
  }, []);
  return (
    <div className="vh-100">
      <div className="d-flex flex-column justify-content-center align-items-start w-100">
        {dataset === true ? (
          <div className="d-flex flex-column ">
            <div>
              <img
                src={require("../Images/bannerIg.jpeg")}
                alt=""
                width={"100%"}
                height={"380px"}
                
              />
            </div>
            <div className="d-flex flex-column flex-wrap w-100">
              <div className=" p-3">
                <h2 className="italicFont">Categories</h2>
                <p>Please select any 2-5 categories</p>
              </div>
              <div className="d-flex flex-row justify-content-start h-50 flex-wrap">
                {categories.map((item: any) => {
                  return (
               
                      <div className="cat" key={item.CatId}>
                        <label>
                          <input
                            //  disabled={selectedCategory.length == 5 ? true : false}
                            type="checkBox"
                            className=""
                            value={item.CatId}
                            onChange={(e) => {
                              if (e.target.checked == true) {
                                selectedCategory.push(item.CatId);
                              } else {
                                selectedCategory.splice(
                                  selectedCategory.indexOf(item.CatId),
                                  1
                                );
                              }
                            }}
                          />
                          <span>{item.CategoryName}</span>
                        </label>
                      </div>
                    
                  );
                })}
              </div>



              <div className=" p-3">
                <h2 className="italicFont">Difficulty Level</h2>
              </div>
              <div className="d-flex flex-row justify-content-start h-50 flex-wrap">
                {levelArray.map((item: any) => {
                  return (
         
                      <div className="cat" key={item.value}>
                        <label>
                          <input
                            //  disabled={selectedCategory.length == 5 ? true : false}
                            type="radio"
                            className=""
                            name="question_limit"
                            value={item.value}
                            onChange={(e) => {
                             setQuestionLimit(item.value);
                             localStorage.setItem('limit',item.value)
                             setLevelSelected(true)
                             
                            }}
                          />
                          <span>{item.title}</span>
                        </label>
                      </div>
            
                  );
                })}
              </div>
              <div className="d-flex justify-content-start p-3">
                <Button
                  className="p-3 rounded shadow purpleGradient w10"
                  
                  onClick={submithandler}
                >
                  Submit
                </Button>
              </div>
            </div>
            {/* <div>
            <img src={require("../Images/Manthinking.png")} alt="" />
          </div> */}
          </div>
        ) : (
          <Loader />
        )}

     
      </div>
    </div>
  );
};

export default Home;
