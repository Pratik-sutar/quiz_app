const conn = require('../config/database')

exports.getResultQuestions=(req,res)=>{
    
    let sql ="Select * from result_questions where Result_Id="+JSON.stringify(req.body.Result_Id)
    
        conn.query(sql, (error, results) => {
            if(error)
            {
                res.status(500).send({message:'Error',data:error})
            }else{
        
                res.status(200).send({message:'Successfull',data:results})
    
            }
        }
        )
    }
    