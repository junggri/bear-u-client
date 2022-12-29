const express =require("express")
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname , '/public')));

app.get("/",function (request,response){
    response.sendFile("/index.html")
})

app.get("/note", function(request,response){
    response.sendFile(__dirname + '/public/view/note.html')
})

app.get("/note:id", function(request,response){
})


app.listen(3000,function(){
    console.log(3000)
})