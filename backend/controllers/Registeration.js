const conn = require("../config/database");
const jsonwebtoken = require('jsonwebtoken')
exports.Register = (req, res, next) => {
    let sql = "Select * from user where  Email=" + JSON.stringify(req.body.Email)

    conn.query(sql, (error, results) => {
        if (error) {
            res.status(500).send({ message: 'Error', data: error })
        } else {

            if (results.length != 0) {
                res.status(409).json({ message: "User Exists Same Email Address,Please Try to Login" })
            }
            else {
                let sql = "Insert into user set ? "
                var data = {
                    Name: req.body.Name,
                    Email: req.body.Email,
                    Password: req.body.Password,
                    Role:"user"
                }
                conn.query(sql, data, (error, results => {
                    if (error) {
                        res.status(500).send({ message: 'Error', data: error })
                    } else {
                        next();
                        // res.status(200).send({ message: 'Successfully Registered', data: [] })
                    }
                }))
            }
        }
    }
    )
}
