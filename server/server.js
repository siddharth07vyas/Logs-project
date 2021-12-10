
var express = require("express")
var app = express();
var db = require("./database.js")
const cors = require('cors');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.options('*', cors());
// Server port
var HTTP_PORT = 8000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});
app.get("/api/logs", (req, res, next) => {
    var sql = "select * from logs"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        if(rows.length > 0){
            rows.sort(function(a,b){
                return dateToNum(a.startdate) - dateToNum(b.startdate);
            });
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});
app.post("/api/log/", (req, res, next) => {
    var errors=[]
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        startdate: req.body.log.startDate,
        enddate: req.body.log.endDate,
        description : req.body.log.description
    }
    var sql ='INSERT INTO logs (startdate, description, enddate) VALUES (?,?,?)'
    var params =[data.startdate, data.description, data.enddate]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});

function dateToNum(d) {
    d = d.split("/"); return Number(d[2]+d[1]+d[0]);
  }