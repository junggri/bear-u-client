const express =require("express")
const app = express()
const path = require('path')
const axios = require("axios")


require("dotenv").config();

app.use(express.static(path.join(__dirname , '/public'))) // 정적파일을 public디렉토리에서 찾겠다
   .use(express.json())
   .use(express.urlencoded({extended: true}));


app.get("/", function (request,response){
    response.sendFile("/index.html");
})

app.get("/note", function(request,response){
    response.sendFile(__dirname + '/public/view/note.html');
})

app.get("/content/:id", function(request,response){
    response.sendFile(__dirname + '/public/view/content.html');
})


app.get("/list", function(request,response){
    axios.get(process.env.REQUEST_URL + "/list",{
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


app.get("/list/:id", function(request,response){
    axios.get(process.env.REQUEST_URL + "/list/" + request.params.id,{
        method:'get',
        headers:{
            "Content-type":"application/json"
        }
    }).then(function(result){
        response.status(200).json(result.data)
    }).catch(function(err){
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
    })
    .catch(function(err){
        response.status(500).json(err)
    })
})

app.post("/modify",function(request, response){
    axios({
        url: process.env.REQUEST_URL + "/modify",
        method: "put",
        headers:{
            "Content-type":"application/json"
        },
        data: request.body
    })
       .then(function(result){
            console.log(result)
           if(result.data.status === "success"){
               response.redirect("/note?mode")
           }
       })
       .catch(function(err){
           response.status(500).json(err)
       })
})

app.post("/delete", function(request,response){
    axios({
        url: process.env.REQUEST_URL + "/delete",
        method:"delete",
        headers:{
            "Content-type":"application/json"
        },
        data: request.body
    })
       .then(function (result){
           response.status(200).json(result.data)
    })
       .catch(function(err){
           response.status(500).json(err)
    })
})

//
app.listen(3000,function(){
    console.log(3000)
})
