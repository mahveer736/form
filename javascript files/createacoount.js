let name = document.getElementById('name');
let email = document.getElementById('email');
let password = document.getElementById('password');
let confirmpass = document.getElementById('confirm');
let btn = document.getElementById('btn');
let massage = document.getElementById('massage');



const sigin = ()=> {

if (password.value !== confirmpass.value) {
    message.innerHTML = "Passwords do not match!";
    message.style.color = "red";
    btn.innerHTML = "Sign Up";
   
  }

     btn.innerHTML = "loding..."
      
        //send data to firebase
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
   
    .then((res) => {

        firebase.auth().currentUser.sendEmailVerification()
        .then(() => { 
            massage.innerHTML = "Account created successfully"
            massage.style.color = "green"

        }).catch((error) => {
            console.log("email not sent")

        })
        window.location.assign("./email_verify/emailverification.html")
        

        setTimeout(() => {
        name.value = ""
            email.value = ""
        password.value = ""
        confirmpass.value = ""
            console.log("email sent")
           
            

           
        }, 2000)
        console.log("sucess user login")
        

    }).catch((error) => {
        btn.innerHTML = "Sign Up"
        massage.innerHTML = error.message
        massage.style.color = "red"
         console.log("not a user login")
    });

}


















        

