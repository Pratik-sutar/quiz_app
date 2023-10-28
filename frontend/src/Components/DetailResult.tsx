import React,{useEffect,useState} from "react";
import "./Style.css"

const DetailResult = (props:any)=>{
    const answeredQuestions = props?.answeredQuestions

    return (
        <div className="p-4">
            <div className="d-flex flex-column p-2">
                <h3>Your Answers</h3>
            </div>
            <div className="d-flex flex-column ">
                {answeredQuestions.map((item:any)=>{
                    return(
                        <div className="p-2">
                    <div className={`d-flex flex-column justify-content-center align-items-start p-3 w-100 ${(item.Selected_Option==item.Answer)?"bg-correct":(item.Selected_Option=="")?"bg-blank":"bg-wrong"}`}>
                    <div >
                        <h5>{item.Question}</h5>
                    </div>
                    <div className="d-flex flex-row justify-content-between w-100">
                        <h5>Selected Option : {item.Selected_Option==''?"Not Attempted":item.Selected_Option}</h5>
                        <h5>Answer : {item.Answer}</h5>
                    </div>
                </div>
                </div>
                    )
                })}
                
            </div>
        </div>
    )
}
export default DetailResult;