const express = require("express");

const app = express();
const http = require("http").createServer(app);
const cors = require("cors");

const user  = require("./userModels/user.model.js")

app.use(cors());
app.use(express.json());

const connectDB = require("./userUtils/db.js")

const {success, error}  = require("./userUtils/response.js")
const router  = require('./userRoutes/user.routes.js');
const errorHandler = require("./userMiddleware/errorHandler.js");

connectDB();


app.get("/",(req,res)=>{
    res.json({
        "name":"Supratik Ghatak",
        "messege":"hellow brother",
        "age":"9"
    });
})

app.post("/user",async (req,res)=>{
    const {firstname,lastname,email,password} = req.body;
    try{const user1 = await user.create({
        first_name: firstname,
        last_name:lastname,
        email: email,
        password: password
    })
    return(success(res,user,"user registered successsfully", 201))
    } catch(error){
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.use("/api/user", router)
app.use(errorHandler)

// app.listen(3000,()=>{
//     console.log("Server started on port 3000");
// })

http.listen(3000,()=>{
    console.log("Server started on port 3000");
})