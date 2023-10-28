import React, { useEffect, useState } from "react";
import DetailResult from "./DetailResult";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import http from "../Helpers/http";
import Loader from "./Loader";
import "./Style.css";

const Result = () => {
  const [resultData, setResultData] = useState<any>([]);
  const [answeredQuestions, setAnsweredQuestions] = useState<any>([]);
  const navigate = useNavigate();
  const { ResultId } = useParams();

  // console.log(ResultId)
  // console.log(answeredQuestions);

  const getResultQuestionsData = () => {
    let apiData: any = {
      Result_Id: ResultId,
    };
    http
      .post("/getResultQuestions", apiData)
      .then((res) => {
        // console.log(res.data.data);
        setAnsweredQuestions(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getResultData = () => {
    let apiData: any = {
      Result_Id: ResultId,
    };
    http
      .post("/getUserSingleResults", apiData)
      .then((res) => {
        // console.log(res.data.data[0]);
        setResultData(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getResultQuestionsData();
    getResultData();
  }, []);
  return (
    <div className="d-flex flex-column">
      {resultData ? (
        <div className="p-4">
          <h5>Attempted Questions : {resultData.attempted_questions}</h5>
          <h5>Correct Answers : {resultData.success_answers}</h5>
          <h5>Wrong Answers : {resultData.failed_answers}</h5>
          <h5>Unattempted Questions : {resultData.unattempted_questions}</h5>
          <h5>Percentage : {resultData.percentage}%</h5>
        </div>
      ) : null}

      <DetailResult answeredQuestions={answeredQuestions} />
      <div className="p-4">
        <Button
          className="p-4 w-25 rounded-lg shadow"
          variant="dark"
          onClick={() => {
            navigate("/profile");
          }}
        >
          Back
        </Button>
      </div>
    </div>
  );
};
export default Result;
