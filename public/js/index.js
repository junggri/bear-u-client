
function createDomElement(tagName){
    return document.createElement(tagName)
}
function findDom(identifier){
    return document.querySelector(identifier)
}

function makeList(list){
    const li = createDomElement('li')
    li.className = "note-list-item"

    const div = createDomElement('div');
    div.className = 'note-list-item-header';

    const a = createDomElement('a')
    a.setAttribute("href" ,'/view/content/'+list.id)

    const h1 = createDomElement('h1');
    h1.textContent = list.title

    const userButton = createDomElement("div");
    userButton.className = 'user-button'

    const modifyButton = createDomElement("span")
    modifyButton.textContent = '수정'
    modifyButton.className = 'modify-btn';
    modifyButton.id = list.id

    const deleteButton = createDomElement('span');
    deleteButton.textContent = '삭제'
    deleteButton.className = 'delete-btn';
    deleteButton.id = list.id;

    const p = createDomElement('p');
    p.textContent = list.content

    const h3 = createDomElement('h3')
    h3.textContent = list.createdAt;

    li.appendChild(div)
    div.appendChild(a)
    a.appendChild(h1)
    div.appendChild(userButton)
    userButton.appendChild(modifyButton)
    userButton.appendChild(deleteButton)
    li.appendChild(p);
    li.appendChild(h3)

    return li;
}

function modifyOrDeleteNote(){
    const element = findDom("#note-list-wrapper");
    element.addEventListener("click",function(event){
        if(event.target.className === "modify-btn"){
            window.location.href = "/note?mode=modify&id=" + event.target.id
        }
        if(event.target.className === "delete-btn"){
            fetch('http://localhost:3000/delete',{
                method:"post",
                headers:{
                    "Content-type":"application/json"
                },
                body: JSON.stringify({id : event.target.id})
            })
               .then(function(result){
                    result.json().then(function(data){
                        if(data.status === 200){
                            init()
                        }
                    })
               })
               .catch(function(err){
                   console.log(err)
            })
        }
    });
}

function getNotes(){
    fetch('http://localhost:3000/list',{
        method:"get",
        headers:{
            "Content-type":"application/json"
        }
    })
    .then(function(result){

        result.json().then(function(lists){

            const element = findDom("#note-list-wrapper");

            for(let i = 0; i < lists.length; i++){
                element.appendChild(makeList(lists[i]))
            }

        })
    }).catch(function(err){
        console.log(err)
    })
}


function init(){
    getNotes();
    modifyOrDeleteNote()
}





init()
