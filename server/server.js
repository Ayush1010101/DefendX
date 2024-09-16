import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended : true }))
app.use(cors());

const data = {message : "Server is connected"} 

app.get("/", (req,res) => {
    res.json(data)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`) 
})