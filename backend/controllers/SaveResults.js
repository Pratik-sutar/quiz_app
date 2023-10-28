const authConfig = require("../authConfiig/auth.config")
const conn  = require("../config/database")

exports.saveUserResult = (req,res)=>{
    let sql = "Insert into results set ?,attempted_date=CURRENT_TIMESTAMP()"
    var data = {
        UserId: req.decode.Id,
        failed_answers: req.body.failed_answers	,
        success_answers: req.body.success_answers,
        unattempted_questions:req.body.unattempted_questions,
        percentage:req.body.percentage,
        attempted_questions:req.body.attempted_questions,
    }
    conn.query(sql,data, (error, results) => {
        if (error) {
            res.status(500).send({ message: 'Error', data: error })
        } else {
            res.status(200).send({ message: 'Successfully Stored', ResultId: results.insertId })
        }
    }
    )
}
