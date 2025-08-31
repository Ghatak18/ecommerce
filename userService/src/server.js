const express = require("express");
const dotenv = require("dotenv")
dotenv.config();
const app = express();
const http = require("http").createServer(app);
const cors = require("cors");
const helmet = require("helmet")
app.use(cors());
app.use(helmet());
app.use(express.json());
const connectDB = require("./userUtils/db.js")
const router  = require('./userRoutes/user.routes.js');
const errorHandler = require("./userMiddleware/errorHandler.js");
const cookieParser = require('cookie-parser');

app.use(cookieParser());


connectDB();
app.use("/api/user", router)
app.use(errorHandler)

// app.listen(3000,()=>{
//     console.log("Server started on port 3000");
// })

http.listen(3000,()=>{
    console.log("Server started on port 3000");
})