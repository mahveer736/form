email = ""

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user)
    email = user.email;
    
    
    
  }


})


todomain = document.getElementById("todoTitle");
let addbtn = document.getElementById("addBtn")
let massage = document.getElementById("msg")
let todoscounter = document.getElementById("todoCount")

const mytodos = () => {
    addbtn.innerHTML = "Loading..."
    massage.style.display = "block"
    firebase.database().ref("todos/").push({
        title: todomain.value,
        email: email,
        createdAt: moment().format(),
    }).then(() => {
      todomain.value = ""
        massage.innerHTML = "Todo added successfully"
        massage.style.color = "green"
        addbtn.innerHTML = "Add Todo"
        
    }).catch((error) => {
        massage.innerHTML = error.message
        massage.style.color = "red"
        addbtn.innerHTML = "Add Todo"
    }).finally(() => {
        addbtn.innerHTML = "Add Todo"
        setTimeout(() => {
            massage.style.display = "none"
        }, 2000)
    })

}

    






let loadingdata = document.getElementById("data-loading")
let emptydata = document.getElementById("data-empty")
  let todosContainer = document.getElementById("todosContainer");
          
firebase.database().ref("todos/").on("value",(todores)=>{
    let counttodos = 0

    if(todores.val()){
        todosContainer.innerHTML = ""
        todoscounter.style.display = "block"
        todores.forEach((todo)=>{
             if (todo.val().email === email) {
                counttodos++
                const card = document.createElement("div");
                card.className = "todo-card";

                card.innerHTML = `
    <div class="todo-header">
      <p class="todo-title">${todo.val().title}</p>
      <div class="todo-actions">
        <button class="btn-action btn-edit"onclick="editTodo('${todo.key}')" >Edit</button>
        <button class="btn-action btn-delete"onclick="deleteTodo('${todo.key}')">Delete</button>
      </div>
    </div>
    <div class="todo-meta">
      <span>Created: ${moment(todo.val().createdAt).format("MMM DD YYYY, h:mm:ss A")}</span>
    </div>
  `;
                
                todosContainer.appendChild(card);
              }
         });
         todoscounter.innerHTML = `${counttodos} ${counttodos === 1 ? "Todo" : "Todos"}`
     }else{
       emptydata.style.display = "block"
     }
 })

const deleteTodo = (key) => {
    firebase.database().ref("todos/" + key).remove().then(() => {
        console.log("Todo deleted successfully");
    }).catch((error) => {
        console.error("Error deleting todo:", error);
    });
}

const editTodo = (key) => {
    let editTitle = prompt("Enter new todo title")
    if(editTitle === null){
        return
    }
    
    firebase.database().ref("todos/" + key).update({
        title: editTitle
    }).then(() => {
      massage.innerHTML = "Todo updated successfully"
      massage.style.color = "green"
    }).catch((error) => {
      massage.innerHTML = error.message
      massage.style.color = "red"
    }).finally(() => {
        setTimeout(() => {
            massage.style.display = "none"
        }, 2000)
    });
}

