import React, { useState, useEffect, useCallback } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import http from "../Helpers/http";
import Loader from "./Loader";
import "./Style.css";
import { BsCheck2Square } from "react-icons/bs";
import DetailResult from "./DetailResult";
import { AES, enc } from "crypto-js";
import { toast } from "react-toastify";

const Quiz = () => {
  // this is to check if the user changed the tab suring the quiz
  document.addEventListener("visibilitychange", () => {
    let url = window.location.href;
    let comp = url.split("/")[3];
    // console.log(comp);

    if (document.hidden && comp == "quiz") {
      toast.warn("You switched tab", { toastId: "001" });
    }
  });

  const [success, setSuccess] = useState(0);
  const [fail, setFail] = useState(0);
  const [unAttempted, setUnAttempted] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [progressBar, setProgressBar] = useState(10);
  const [data, setData] = useState<any>([]);
  const [progressBarIncrement, setProgressBarIncrement] = useState<any>();
  const navigate = useNavigate();
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(60);
  const secretPass = process.env.REACT_APP_SECRETPASS;
  const [answeredQuestions, setAnsweredQuestions] = useState<any>([]);

  // Timer function
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds == 0) {
        clearInterval(intervalId);
        // console.log("int Clr");
      } else {
        setSeconds((prevTime) => prevTime - 1);
        // console.log("int runnin");
      }
    }, 1000);

    if (seconds === 0 && minutes > 0) {
      setMinutes(minutes - 1);
      setSeconds(59);
    } else if (seconds === 0 && minutes === 0) {
      // console.log("contest Ended");
      setShowResults(true);
    }
    return () => clearInterval(intervalId);
  }, [seconds]);

  // Insert anwers in the array
  const pushSelectedOption = () => {
    const answerObj = {
      QuestId: data[questionIndex].QuestId,
      Question: data[questionIndex].Question,
      Answer: data[questionIndex].Answer,
      Selected_Option: selectedOption,
    };
    const checkExistingObject = answeredQuestions.some((ele: any) => {
      return ele.QuestId === data[questionIndex].QuestId;
    });

    if (answeredQuestions.length !== 0) {
      if (checkExistingObject === true) {
        if (selectedOption !== "") {
          answeredQuestions[questionIndex].Selected_Option = selectedOption;
          nextQuestion();
        } else {
          nextQuestion();
        }
      } else {
        answeredQuestions.push(answerObj);
        nextQuestion();
        // console.log(answeredQuestions);
      }
    } else {
      answeredQuestions.push(answerObj);
      // console.log(answeredQuestions);
      nextQuestion();
    }
  };

  // Next Question
  const nextQuestion = () => {
    if (questionIndex + 1 == data.length) {
      setSelectedOption("");
      calculateScore();
    } else {
      setQuestionIndex(questionIndex + 1);
      setProgressBar(progressBar + progressBarIncrement);
      setSelectedOption("");
    }
    resetOption();
  };

  //  Previous Question
  const previousQuestion = () => {
    setQuestionIndex(questionIndex - 1);
    setProgressBar(progressBar - progressBarIncrement);
    setSelectedOption("");
    resetOption();
  };

  //  Reseting the checked radio buttons
  const resetOption = () => {
    let radio1: any = document.getElementById("radio_btn1");
    let radio2: any = document.getElementById("radio_btn2");
    let radio3: any = document.getElementById("radio_btn3");
    let radio4: any = document.getElementById("radio_btn4");

    radio1.checked = false;
    radio2.checked = false;
    radio3.checked = false;
    radio4.checked = false;
  };

  // calculate result
  const calculateScore = () => {
    // console.log("in calc");
    let correct = 0;
    let wrong = 0;
    let na = 0;
    answeredQuestions?.map((item: any) => {
      if (item.Selected_Option == "") {
        na += 1;
        // console.log(unAttempted, "un");
      } else if (item.Answer !== item.Selected_Option) {
        wrong += 1;
        // console.log(fail, "fail");
      } else {
        correct += 1;
        console.log(success, "success");
      }
    });

    // console.log(correct,"correct")
    // console.log(wrong,"wrong");
    // console.log(na,"na");
    setSuccess(correct);
    setFail(wrong);
    setUnAttempted(na);
    let res = Math.round((correct / data.length) * 100);
    // console.log(res);
    setScore(Number(res));
    setShowResults(true);

    // console.log(answeredQuestions);
  };

  const saveQuestionsApi = (Result_Id: any) => {
    let apiData = {
      Result_Id: Result_Id,
      ResultData: answeredQuestions,
    };
    http
      .post("/saveUserResultsQuestions", apiData)
      .then((res) => {
        // console.log(res);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveResultApi = () => {
    let apiData = {
      failed_answers: fail,
      success_answers: success,
      unattempted_questions: unAttempted,
      percentage: score,
      attempted_questions: data.length,
    };
    http
      .post("/saveUserResults", apiData)
      .then((res) => {
        // console.log(res.data.ResultId);
        // navigate("/");
        saveQuestionsApi(res.data.ResultId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Api Call for getting questions
  const getQuestionsData = () => {
    let selectedCategory: any = [];
    let catId = localStorage.getItem("selectedCategory");
    let limit = localStorage.getItem("limit");
    catId?.split(",").map((item) => {
      selectedCategory.push(Number(item));
    });

    let apiData = { Categories: selectedCategory, Limit: limit };

    http
      .post("/getCategoryBasedQuestion", apiData)
      .then((res) => {
        const bytes = AES.decrypt(res.data.data, `${secretPass}`);
        const decryptData = JSON.parse(bytes.toString(enc.Utf8));
        setData(decryptData);
        setProgressBar(100 / decryptData.length);
        setProgressBarIncrement(100 / decryptData.length);
        let sec = decryptData.length * 30;
        let min = Math.round(sec / 60);
        // console.log(min.toString().length, "length");
        // console.log(decryptData, "from api");

        setMinutes(min - 1);
        setSeconds(59);
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  useEffect(() => {
    getQuestionsData();
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 vh-100">
      {data.length ? (
        <>
          {showResults === false ? (
            <div className="d-flex flex-column w-100 ">
              <div className="d-flex flex-row justify-content-start w-100  p-2 m-3 rounded-lg h-25 align-items-center">
                <div className="d-flex justify-content-center align-items-center w-25 p-2">
                  <div>
                    <div className="timerCir1"></div>
                    <div className="innerCir">
                      <h3>
                        {minutes}:{seconds < 10 ? "0" : null}
                        {seconds}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="w-50 ">
                  <div className="d-flex flex-row w-100 progressBar rounded-lg ">
                    <div
                      className="h-100 bg-dark rounded-lg "
                      style={{ width: `${progressBar}%` }}
                    ></div>
                  </div>
                </div>
                <div className="p-2 font-weight-bold">
                  {questionIndex + 1}/{data.length}
                </div>
              </div>
              <div className="d-flex flex-column justify-content-between w-100  ml-4  p-2 opacity-25 ">
                <div className="d-flex flex-column justify-content-between h-75 my-5">
                  <div className=" p-2">
                    <h4>{data[questionIndex].Question}</h4>
                  </div>
                  <div className="d-flex flex-column justify-content-between p-2">
                    {data[questionIndex].Options?.map((item: any) => {
                      return (
                        <div className="d-flex flex-row" key={item.id}>
                          <div className="option">
                            <label>
                              <input
                                type="radio"
                                id={`radio_btn${item.id}`}
                                // checked={(answeredQuestions[questionIndex]?.Selected_Option===item.Option)}
                                name="option"
                                value={item.Option}
                                onChange={(e) => {
                                  setSelectedOption(e.target.value);
                                }}
                              />
                              <span>{item.Option}</span>
                            </label>
                          </div>
                          <div className="d-flex  p-2">
                            {answeredQuestions[questionIndex]
                              ?.Selected_Option === item.Option ? (
                              <div className="d-flex align-items-center p-2">
                                <h3 className="text-success">
                                  <BsCheck2Square />
                                </h3>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="d-flex flex-row justify-content-between p-3 w-75">
                    <Button
                      className="p-3 w-25 rounded-lg shadow"
                      variant="dark"
                      disabled={questionIndex === 0}
                      onClick={
                        previousQuestion
                      }
                    >
                      Pervious
                    </Button>

                    {questionIndex + 1 == data.length ? (
                      <Button
                        className="p-3 w-25 rounded-lg shadow"
                        variant="dark"
                        onClick={
                          // nextQuestion();
                          pushSelectedOption
                        }
                      >
                        Submit
                      </Button>
                    ) : (
                      <Button
                        className="p-3 w-25 rounded-lg shadow"
                        variant="dark"
                        onClick={
                          // nextQuestion();
                          pushSelectedOption
                        }
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="d-flex flex-column justify-content-between w-100 h-100 p-2 ">
              <div className="d-flex flex-column justify-content-between p-4 w-50 ">
                <div className="bottomGreen p-2">
                  <h2>You got {success} correct answers</h2>
                </div>
                <div className="bottomRed p-2">
                  <h2>You got {fail} wrong answers</h2>
                </div>
                <div className="bottomGery p-2">
                  <h2>You didnt attempt {unAttempted} answers</h2>
                </div>

                <div className="bottomBlack p-2">
                  <h2>You scored {score}%</h2>
                </div>
              </div>
              <DetailResult answeredQuestions={answeredQuestions} />

              <div className="d-flex flex-row justify-content-between p-4 w-100">
                <Button
                  className="p-3 w-25 rounded shadow"
                  variant="dark"
                  onClick={() => {
                    navigate("/");
                    // localStorage.removeItem("selectedCategory");
                  }}
                >
                  Exit
                </Button>
                <Button
                  className="p-3 w-25 rounded shadow"
                  variant="dark"
                  onClick={
                    saveResultApi
                    // localStorage.removeItem("selectedCategory");
                  }
                >
                  Save
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Quiz;
