const express = require('express')
const app = express()
const cors = require('cors')

const db = require("../src/productUtils/db.js")
const router = require("../src/productRouters/product.router.js")
const cookieParser = require('cookie-parser');

db()
app.use(express.json());
app.use(cookieParser())


app.use("/api/product",router)
app.listen(8001,()=>{
    console.log('server is running on port 8001')
})