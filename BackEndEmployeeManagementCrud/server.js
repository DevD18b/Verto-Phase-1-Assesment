const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = 5000;

// middlewares.
app.use(cors());
app.use(express.json());


// db setup.

const db =  new sqlite3.Database("./employee.db" , (err)=>{
    if(err){
       console.log("Error opening  database :",err.message);
    }
    else{
     db.run(`CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        position TEXT NOT NULL
      )`,(err)=>{
        if(err){
            console.log("Table creation error", err.message);
        }
        else{
            console.log("Employee Table ready...");
        }
      });
    }
});


// create Employee.
app.post("/api/employees", (req,res)=>{
    const {name , email , position} = req.body
   // validation.
    if(!name || !email || !position){
        return res.status(400).json({error : "All Feilds are required  "})
    }

    const query =  `INSERT INTO employees (name, email, position) VALUES (?, ?, ?)`;
    db.run(query, [name,email,position], function(err){
        if(err){
            return res.status(500).json({error : err.message});
        }
        res.status(201).json({id : this.lastID , name , email , position})
    });
});

app.get("/api/employees", (req, res)=>{
    const query = `select * from employees`;
    db.all(query , [] , (err, rows)=>{
        if(err){
            return res.status(500).json({error : err.message});
        }
        res.json(rows);
    });
});

app.get("/api/employees/:id", (req, res)=>{
    const {id}  = req.params;
    const query =  `SELECT * FROM  employees where id =?`;
    db.get(query , [id] , (err,row)=>{
        if(err) return res.status(500).json({error : err.message});
        if(!row) return res.status(404).json({error : "Employee not found"});
        res.json(row);
    })
});

// update employee
app.put("/api/employees/:id", (req, res)=>{
    const {id} = req.params;
    const {name , email , position} = req.body;
    if(!name || !email || !position){
        return res.status(400).json({error:"All feilds are required"});
    }

    const query =  `Update employees SET name = ? , email=? , position = ? WHERE id=?`;
    db.run(query , [name, email, position , id] , function(err){
        if(err) return res.status(500).json({error : err.message});
        if(this.changes==0){
        return res.status(404).json({error : "Employee not found"});
        }
        res.json({id , name, email , position});
    });
});

// delete employee

app.delete("/api/employees/:id",(req, res)=>{
    const {id} = req.params;
    const query = `DELETE FROM employees WHERE id =?`;
    db.run(query, [id] , function(err){
        if(err) return res.status(500).json({error : err.message});
        if(this.changes===0){
            return res.status(404).json({error : "Employee not found"});
        }
        res.json({message : "Employee Deleted Successfully"});
    })
})


app.get("/",(req, res)=>{
    res.send("Employee API is running...");
});

app.listen(PORT , ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
})
