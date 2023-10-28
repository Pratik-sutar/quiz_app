
const conn = require("../config/database");
const CryptoJS = require("crypto-js");

exports.getCategoriesBasedQuestion=(req,res)=>{
    const secretPass = process.env.secretPass;
    let sql= 'SELECT QuestId, CatId, Question, Option1, Option2, Option3, Option4, Answer FROM questions WHERE CatId IN ('+req.body.Categories.toString()+') ORDER BY RAND() LIMIT '+req.body.Limit.toString()+'';
// console.log(req.body.Categories,sql)
    conn.query(sql, (error, results) => {
        if(error)
        {
            res.status(500).send({message:'Error',data:error})
        }else{
            let resultsArray = []
            // console.log(results)
            results?.map((item)=>{
                resultsArray.push({
                    QuestId:item.QuestId,
                    CatId:item.CatId,
                    Question:item.Question,
                    Answer:item.Answer,
                    Options:[
                        {
                            id:1,
                            Option:item.Option1
                        },
                        {
                            id:2,
                            Option:item.Option2
                        },
                        {
                            id:3,
                            Option:item.Option3
                        },
                        {
                            id:4,
                            Option:item.Option4
                        }
                    ]
                })
            })
        
                const result = CryptoJS.AES.encrypt(
                  JSON.stringify(resultsArray),
                  secretPass
                ).toString();
            
            
          
            //   encryptData()
            res.status(200).send({message:'Question',data:result})
        }
    }
    )
}
