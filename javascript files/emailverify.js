// firebase.auth().onAuthStateChanged((user) => {
//     if(user){
//     if(user.emailverified){
//          console.log("user email is verified")
//        window.location.assign("../homepage/private-home.html")
//     }else{
//         console.log("user email is not verified")
//             window.location.assign("../email_verify/emailverification.html")
//     }
// }
// })


let massage = document.getElementById("massage")
let btn = document.getElementById("btn")
let email = document.getElementById("email")

const resendemail = () =>{
     btn.innerHTML = "loding..."
    firebase.auth().currentUser.sendEmailVerification()
        .then(() => { 
            btn.innerHTML = "loding..."
             massage.innerText = "sucess full new email verification code send"
            massage.style.color = ""
        }).catch((error)=>{
            massage.innerHTML = error.massage;
            massage.style.color = "red"
            btn.innerHTML = "Resend verification email"
            
        })
        .finally(()=>{
            btn.innerHTML = "Resend verification email"


        })
}

