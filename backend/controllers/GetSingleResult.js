const conn = require('../config/database')

exports.getUserSingleResult=(req,res)=>{
    let sql =`Select * from results where UserId=${JSON.stringify(req.decode.Id)} And id=${(req.body.Result_Id)}`
    
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
    