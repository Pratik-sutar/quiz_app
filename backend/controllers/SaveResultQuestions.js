const authConfig = require("../authConfiig/auth.config")
const conn  = require("../config/database")

exports.saveResultQuestion = (req,res)=>{
    let questionArray = req.body.ResultData
    let Result_Id = req.body.Result_Id
    let sql = `Insert into result_questions (Result_Id,Question,Answer,Selected_Option) Values ? `

console.log(sql);
    conn.query(sql,[questionArray.map((item)=>[Result_Id,item.Question,item.Answer,item.Selected_Option])], (error, results) => {
        if (error) {
            res.status(500).send({ message: 'Error', data: error })
        } else {
            res.status(200).send({ message: 'Successfully Stored', data: [] })
        }
    }
    )
}
