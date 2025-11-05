let email = document.getElementById('email');
let password = document.getElementById('password');
let btn = document.getElementById('btn');
let massage = document.getElementById('massage');


const login = ()=> {
        btn.innerHTML = "loding..."
        //login user

    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
 
    .then((res) => {
        console.log(res)
        massage.innerHTML = "User login successfully"
        massage.style.color = "green"
        console.log("sucess user login")
        setTimeout(() => {
            email.value = ""
            password.value = ""
            // window.location.assign("../email_verify/emailverification.html")    
            window.location.assign("../homepage/private-home.html")    
            
            

                

        },2000)
    }).catch((error) => {
        btn.innerHTML = "Log In"
        massage.innerHTML = error.message
        massage.style.color = "red"
         console.log("not a user login")
    });
}

//login with google
const goolesigin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
     firebase
    .auth()
    .signInWithPopup(provider).then((res) => {
        
  massage.innerHTML = "User login successfully"
        massage.style.color = "green"
        console.log("sucess user login")



         setTimeout(() => {
            email.value = ""
            password.value = ""
            // window.location.assign("../email_verify/emailverification.html")    
            window.location.assign("../homepage/private-home.html")    
            
            

                

        },2000).catch((error) =>{
             btn.innerHTML = "Log In"
        massage.innerHTML = error.message
        massage.style.color = "red"
         console.log("not a user login")
        })
    })
}