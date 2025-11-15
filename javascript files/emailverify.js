let useremail = document.getElementById("email")


firebase.auth().onAuthStateChanged((user) => {
    if(user){
        if(user.providerData[0].providerId === "facebook.com"){
            window.location.assign("./../html pages/private-home.html")

        }else{

        if(user.emailVerified){
            window.location.assign("./../html pages/private-home.html")
        }else{
            useremail.value = user.email
        }
        }
        
    
    }
    else{
        window.location.assign("./../html pages/login.html")
    }
})



let massage = document.getElementById("massage")
let btn = document.getElementById("btn")
let email = document.getElementById("email")

const resendemail = () =>{
     btn.innerHTML = "loding..."
    firebase.auth().currentUser.sendEmailVerification()
        .then(() => { 
         
            btn.innerHTML = "loding..."
             massage.innerText = "sucess full new email verification code send"
            massage.style.color = "green"
            setTimeout(() => {
               window.location.assign("./../html pages/private-home.html")
            },2000)
        }).catch((error)=>{
            massage.innerHTML = error.massage;
            massage.style.color = "red"
            btn.innerHTML = "Resend verification email"
            
        })
        .finally(()=>{

            btn.innerHTML = "Resend verification email"


        })
}


const checkedemail = () => {
    window.location.reload()
    
}


