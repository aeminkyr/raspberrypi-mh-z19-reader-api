const express = require('express');
var mysql = require('mysql');
const app = express();
const path = require('path');

const apiPassword = "123456";
const port = 3000;


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "co2"
  });
  
con.connect(function(err) {
    if (err) throw err;
});


app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});



app.get('/save/:apipass/:co2', (req, res) => {
 const apipass = req.params.apipass;
 const co2 = req.params.co2;

 if(apipass!=apiPassword)
    throw "Out of service.";
 
    console.log("Connected!");
    var sql = "INSERT INTO records (co2_data) VALUES (?)";
    con.query(sql,[co2], function (err, result) {
      if (result.warningCount>0){
       // throw err;
       console.log(result);
       res.json({ 'conf': false, 'data': `${co2}`,'info': 'Can not insert string. Use integer.'});
      } else {
        console.log("1 record inserted");
        console.log(result);

        res.json({ 'conf': true, 'data': `${co2}`,'insertId':`${result.insertId}`});
      }
    });
  
});

app.get('/get/co2/:apipass', (req, res) => {
    const apipass = req.params.apipass;
   
    if(apipass!=apiPassword)
       throw "Out of service.";
    
       console.log("Connected!");

       var sql = "SELECT * FROM `records` order by id desc limit 1";
       con.query(sql, function (err, result) {
         console.log(result[0]);  
         res.json(result[0]);
       });
     
   });
   

app.listen(port, () => {
 console.log('App running...');
});