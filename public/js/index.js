
function createDomElement(tagName){
    return document.createElement(tagName)
}
function findDom(identifier){
    return document.querySelector(identifier)
}

function makeList(){
    const li = createDomElement('li')
    li.className = "note-list-item"

    const div = createDomElement('div');
    div.className = 'note-list-item-header';

    const a = createDomElement('a')
    a.setAttribute("href" ,'./view/content/20221227.view')

    const h1 = createDomElement('h1');
    h1.textContent = "오오오오오"

    const userButton = createDomElement("div");
    userButton.className = 'user-button'

    const modifyButton = createDomElement("span")
    modifyButton.textContent = '수정'
    modifyButton.className = 'modify-btn';

    const deleteButton = createDomElement('span');
    deleteButton.textContent = '삭제'
    deleteButton.className = 'delete-btn';

    const p = createDomElement('p');
    p.textContent = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis excepturi laborum mollitia nobis placeat praesentium saepe, sunt voluptates! Aut molestias, ratione. Delectus deserunt ipsam laboriosam modi odio quam recusandae voluptas?';

    const h3 = createDomElement('h3')
    h3.textContent = '2022.12.27';

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
            window.location.href = "/note?mode=modify"
        }
    });
}


function init(){
    const element = findDom("#note-list-wrapper");
    for(let i = 0; i < 3; i++){
        element.appendChild(makeList())
    }

    modifyOrDeleteNote()
}





init()