import express from "express"
import dotenv from  "dotenv"
import {MongoDb} from "./src/config/mongodb.js"
import routing from "./src/routes/routing.js"
import { errorHandling } from "./src/middlewares/errorHandling-middleware.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import bodyParser from "body-parser"
import fileUpload from "express-fileupload"
import fs from "fs"
import { fileURLToPath } from "url"
import path from "path"


/* Express */
const app = express()

/* Dotenv */
if(process.env.NODE_ENV !== 'PRODUCTION'){
    dotenv.config()
}

/* Default body parser */
// app.use(express.json())

/* Cookie Parser */
app.use(cookieParser())

/* Body Parser*/
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

/* File Upload*/
app.use(fileUpload())

/* MONGODB */
MongoDb()

/* Cors */
app.use(cors())

/* Routing */
app.use("/api/v1", routing)

/* Linking frontend with backend */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, "../frontend/build")))

app.get("*", (req,res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
})

/* Error handling middleware */
app.use(errorHandling)

export default app