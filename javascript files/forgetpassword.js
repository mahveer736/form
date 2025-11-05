let email = document.getElementById("email");
let btn = document.getElementById("btn");
let massage = document.getElementById("massage");

const forgetpassword = ()  => {
    btn.innerHTML = "Loding..."
    firebase
    .auth()
    .sendPasswordResetEmail(email.value)
    .then(() =>{
       
        massage.innerHTML = "sent link ent your new password"
        massage.style.color = "green"
        console.log("link sucess send")
        btn.innerHTML = "Send Reset Link"


    }).catch((error) =>{
        console.log("errormassage" + error)
        massage.innerHTML = error.massage;
        massage.style.color = "red"
         btn.innerHTML = "Send Reset Link"
          console.log("not sucess send")

    })
} 





