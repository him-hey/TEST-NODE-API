const { json } = require("body-parser");
const express = require("express");
var cors = require('cors');


// mysql connection
const MYSQL =  require("mysql");
let con = MYSQL.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database:"test"
})
const app = express();
// use it before all route definitions
app.use(cors({origin: '*'}));
const TEST_PORT = 8000;
const HOST_PORT = process.env.PORT;
app.use(express.static("FRONTEND"));
app.use(express.json());
app.listen(TEST_PORT, (res)=>{
    console.log("Server is running...");
});
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get("/login", (req, res)=>{
    con.query("select * from users", function(error, results){
        if(error){
            res.writeHead(400, {"Content-Type": "text/plain"});
            res.write("Erorr in database operation");
            res.end();
        }else{
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(results));
        }
    })
    
})