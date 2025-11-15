let dataimage = document.getElementById("dataimage")
let email = ""

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user)
    email = user.email;
  }
})

let todomain = document.getElementById("todotext");
let addbutton = document.getElementById("addsbutton");
let massage = document.getElementById("msg");

const addtodos = () => {
  addbutton.innerHTML = "Loading..."
  massage.style.display = "block"
  firebase.firestore().collection("todos").add({
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

firebase.firestore().collection("todos").onSnapshot((querySnapshot) => {
  dataLoading.style.display = "none";
  todoCount.style.display = "none";
  let counttodos = 0
  if (!querySnapshot.empty) {
    todosbox.innerHTML = ""
    todoCount.style.display = "block"
    querySnapshot.docs.forEach((snap) => {
      counttodos++

      // Create todo card
      let todoCard = document.createElement("todo-card");
      todoCard.setAttribute("class", "todo-card");

      // Create header section
      let todoHeader = document.createElement("todo-header");
      todoHeader.setAttribute("class", "todo-header");

      let todoHeading = document.createElement("p");
      todoHeading.setAttribute("class", "todo-title");
      todoHeading.innerHTML = snap.data().title

      // Create meta section
      let todoBoxMeta = document.createElement("div");
      todoBoxMeta.setAttribute("class", "todo-meta");

      let todoMetaInformation = document.createElement("div");
      todoMetaInformation.setAttribute("class", "todo-author");

      let spanAvatar = document.createElement("span");
      spanAvatar.setAttribute("class", "author-avatar");
      spanAvatar.innerHTML = snap.data().email.slice(0, 1).toUpperCase()

      let spanEmail = document.createElement("span");
      spanEmail.innerHTML = snap.data().email
      let spanCreatedAt = document.createElement("span");
      spanCreatedAt.innerHTML = moment(snap.data().createdAt).format("MMM DD YYYY, h:mm:ss A")
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
  } else {
    dataEmpty.style.display = "block"
  }
})
