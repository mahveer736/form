





let todoscounter = document.getElementById("todoCount")
email = ""
let loadingdata = document.getElementById("data-loading")
let emptydata = document.getElementById("data-empty")
  let todosContainer = document.getElementById("todosContainer");
          
 firebase.auth().onAuthStateChanged((user) => {
  email= user.email
  console.log`${"login user:-",user}`
  firebase.firestore().collection("todos").where("email", "==", email).onSnapshot((querySnapshot) => {
    todoscounter.style.display = "none";
    loadingdata.style.display = "none";
    todosContainer.innerHTML = ""
    if(querySnapshot.empty){
       let dataEmpty = `<p id="data-empty" style="display: block">No todos found!</p>`;
       todosContainer.innerHTML = dataEmpty


    }else{
      todoscounter.style.display = "block";
        todoscounter.innerHTML = `${querySnapshot.size} ${
          querySnapshot.size === 1 ? "Todo" : "Todos"
        }`;
         console.log("querySnapshot", querySnapshot);

        let counttodos = 0
         //todo container loop box
         querySnapshot.forEach((doc) =>{

            counttodos++
                const card = document.createElement("div");
                card.className = "todo-card";

                card.innerHTML = `
    <div class="todo-header">
      <p class="todo-title">${doc.data().title}</p>
      <div class="todo-actions">
        <button class="btn-action btn-edit"onclick="editTodo('${doc.id}')" >Edit</button>
        <button class="btn-action btn-delete"onclick="deleteTodo('${doc.id}')">Delete</button>
      </div>
    </div>
    <div class="todo-meta">
        <span>Created: ${moment(doc.data().createdAt).format("MMM DD YYYY, h:mm:ss A")}</span>
      </div>
    `;
                  
                todosContainer.appendChild(card);
          
          
         }

        )
    }



 })
 })


 todomain = document.getElementById("todoTitle");
let addbtn = document.getElementById("addBtn")
let massage = document.getElementById("msg")

const mytodo = () => {
    addbtn.innerHTML = "Loading..."
    massage.style.display = "block"
    firebase.firestore().collection("todos").add({
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


//edit btn
const editTodo = (id) => {
    let editTitle = prompt("Enter new todo title")
    if(editTitle === null){
        return
    }
    
firebase.firestore().collection("todos").doc(id).update({      
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

const deleteTodo = (id) => {
      firebase.firestore().collection("todos").doc(id).delete()

    .then(() => {
        console.log("Todo deleted successfully");
         massage.innerHTML = "Todo deleted successfully"
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




    
















