function getModeAndId(){
   const url = window.location;
   const params = url.search
   const split = params.split('&')
   const mode = split[0].split("=")[1]
   if(mode === "modify"){
      const id = split[1].split("=")[1]
      return {mode,id}
   }
   return {mode}
}

function displayData(data){
   const title = document.querySelector(".title")
   const description = document.querySelector(".description")
   const content = document.querySelector(".content")

   title.value = data.title;
   description.value = data.description;
   content.textContent = data.content
}

function setAction(mode){
   const form = document.querySelector(".form");
   if(mode === "modify"){
      form.action = "/modify"
   }else{
      form.action = "/create"
   }
}

function displayButton(mode){
   const createButton = document.querySelector(".create")
   const modifyButton = document.querySelector(".modify")

   if(mode === "modify"){
      modifyButton.style.display = "block";
      createButton.style.display = "none"
   }else{
      modifyButton.style.display = "none"
      createButton.style.display = "block"
   }
}

function init(){
   const information = getModeAndId()
   displayButton(information.mode);
   setAction(information.mode)

   if(information.mode === 'modify'){
      fetch("http://localhost:3000/list/" + information.id, {
         method:"get",
         headers:{
            "Content-type" : "application/json"
         },
      }).then(function(result){
         result.json().then(function(data){
            const hiddenInput = document.querySelector(".list-id");
            hiddenInput.value = data[0].id
            displayData(data[0])
         })
      }).catch(function(err){
         console.log(err)
      })
   }
}


init()
