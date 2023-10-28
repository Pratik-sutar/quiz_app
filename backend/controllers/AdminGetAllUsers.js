const conn = require("../config/database");

exports.getAllUsers=(req,res)=>{
let sql ="Select UserId, Name, Email, Role from user"

    conn.query(sql, (error, results) => {
        if(error)
        {
            res.status(500).send({message:'Error',data:error})
        }else{
            // console.log(results)
            res.status(200).send({message:'Successfull',data:results})
        }
    }
    )
}
