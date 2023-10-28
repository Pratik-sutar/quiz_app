var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'quizapp',
  multipleStatements: true,
});
 
// conn.connect();
conn.connect(function(error){
      if(!!error){
        console.log(error);
      }else{
        console.log('Connected!:)');
      }
    });
 
module.exports=conn ;
      
