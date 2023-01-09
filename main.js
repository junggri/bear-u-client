const express =require("express")
const app = express()
const path = require('path')
const axios = require("axios")


require("dotenv").config();

app.use(express.static(path.join(__dirname , '/public')))
   .use(express.json())
   .use(express.urlencoded({extended: true}));


app.get("/", function (request,response){
    response.sendFile("/index.html");
})

app.get("/note", function(request,response){
    response.sendFile(__dirname + '/public/view/note.html');
})

app.get("/note:id", function(request,response){
})

app.get("/lists", function(request,response){
    axios.get(process.env.REQUEST_URL + "/lists",{
        method:'get',
        headers:{
            "Content-type":"application/json"
        }
    }).then(function(result){
        response.status(200).json(result.data)
    }).catch(function(err){
        console.log(err);
        response.status(500).json({message: "not exist"})
    })
})

app.post("/create",function(request,response){
    axios({
        url: process.env.REQUEST_URL + "/create",
        method:'post',
        headers:{
            "Content-type":"application/json"
        },
        data : request.body
    })
    .then(function (result){
        if(result.data.status === "success"){
            response.redirect("/")
        }
        // response.end()
    })
    .catch(function(err){
        console.log(err)
    })
})
//
app.listen(3000,function(){
    console.log(3000)
})
