const authConfig = require("../authConfiig/auth.config");
const conn = require("../config/database");
const jsonwebtoken = require('jsonwebtoken')
exports.login = (req, res) => {
    let sql = "Select * from user where  Email=" + JSON.stringify(req.body.Email) + " and Password=" + JSON.stringify(req.body.Password)

    conn.query(sql, (error, results) => {
        if (error) {
            res.status(500).send({ message: 'Error', data: error })
        } else {
            // console.log(results[0])
            if (results.length == 0) {

                res.status(404).send({ message: 'Invalid User Email /Password', data: error })

            } else {
                var token = jsonwebtoken.sign({ Id: results[0].UserId }, authConfig.tokenConfig.secret, {
                    expiresIn: authConfig.tokenConfig.jwtExpriration
                })
                res.status(200).json({ message: "Logged Successfully", data:{access_token: token ,role:results[0].Role}})
                
            }

        }
    }
    )
}
