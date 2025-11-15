let dataimage = document.getElementById("dataimage")
email = ""

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user)
    email = user.email;
    
    
    
  }


})

todomain = document.getElementById("todotext");
addbutton = document.getElementById("addsbutton");
massage = document.getElementById("msg");


const addtodos = () => {
    addbutton.innerHTML = "Loading..."
    massage.style.display = "block"
    firebase.database().ref("todos/").push({
        title: todomain.value,
        email: email,
        createdAt: moment().format(),
    }).then(() => {
      todomain.value = ""
        massage.innerHTML = "Todo added successfully"
        massage.style.color = "green"
        addbutton.innerHTML = "Add Todo"
        
    }).catch((error) => {
        massage.innerHTML = error.message
        massage.style.color = "red"
        addbutton.innerHTML = "Add Todo"
    }).finally(() => {
        addbutton.innerHTML = "Add Todo"
        setTimeout(() => {
            massage.style.display = "none"
        }, 2000)
    })

}

//data todo data get
let dataLoading = document.getElementById("data-loading");
let dataEmpty = document.getElementById("data-empty");
let todoCount = document.getElementById("todoCount");
let todosbox = document.getElementById("todosContainer");









firebase.database().ref("todos/").on("value",(todores)=>{
  dataLoading.style.display = "none";
  todoCount.style.display = "none";
  let counttodos = 0
if(todores.val()){
  todosbox.innerHTML = ""
  todoCount.style.display = "block"
  todores.forEach((todo)=>{
    counttodos++

    

// Create todo card
let todoCard = document.createElement("todo-card");
todoCard.setAttribute("class", "todo-card");

// Create header section
let todoHeader = document.createElement("todo-header");
todoHeader.setAttribute("class", "todo-header");

let todoHeading = document.createElement("p");
todoHeading.setAttribute("class", "todo-title");
todoHeading.innerHTML = todo.val().title

// Create meta section
let todoBoxMeta = document.createElement("div");
todoBoxMeta.setAttribute("class", "todo-meta");

let todoMetaInformation = document.createElement("div");
todoMetaInformation.setAttribute("class", "todo-author");

let spanAvatar = document.createElement("span");
spanAvatar.setAttribute("class", "author-avatar");
spanAvatar.innerHTML = todo.val().email.slice(0,1).toUpperCase()


let spanEmail = document.createElement("span");
spanEmail.innerHTML = todo.val().email
let spanCreatedAt = document.createElement("span");
spanCreatedAt.innerHTML = moment(todo.val().createdAt).format("MMM DD YYYY, h:mm:ss A")
// Build structure
todosbox.appendChild(todoCard);
todoCard.appendChild(todoHeader);
todoHeader.appendChild(todoHeading);
todoCard.appendChild(todoBoxMeta);
todoBoxMeta.appendChild(todoMetaInformation);
todoMetaInformation.appendChild(spanAvatar);
todoMetaInformation.appendChild(spanEmail);
todoBoxMeta.appendChild(spanCreatedAt);


    
  })
  todoCount.innerHTML = `${counttodos} ${counttodos === 1 ? "Todo" : "Todos"}`
}else{
  dataEmpty.style.display = "block"
}
})



































