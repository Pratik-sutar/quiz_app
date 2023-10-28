const conn = require("../config/database");

exports.getProfile=(req,res)=>{
let sql ="Select * from user where UserId="+JSON.stringify(req.decode.Id)

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
