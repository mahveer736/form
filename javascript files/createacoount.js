let firstname = document.getElementById('fname');
let lastname = document.getElementById('lname');
let email = document.getElementById('email');
let password = document.getElementById('password');
let confirmpass = document.getElementById('confirm');
let btn = document.getElementById('btn');
let massage = document.getElementById('massage');
let = gender = document.getElementsByName("gender")



 const sigin = () => {
    let age = document.getElementById("age")


 let selectedgender = ""
    for (let index in gender) {
        if (gender[index].checked) {
            selectedgender = gender[index].value
        }
    }

    let selectedAge  = age.options[age.selectedIndex].value
    
    
    btn.innerHTML = "loding..."

    //send data to firebase
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)

        .then((res) => {

            firebase.auth().currentUser.sendEmailVerification()
                .then(() => {
                   
                    massage.innerHTML = "Account created successfully"
                    massage.style.color = "green"


                    //data data store ----------------------a----------------------------
                     firebase.database().ref("users/" +  res.user.uid).set({
                        firstname: firstname.value,
                        lastname: lastname.value,
                        age: selectedAge,
                        gender: selectedgender,
                        Email: email.value,
                        Password: password.value,
                        Confrompassword: confirmpass.value


                    }).then(() => {
                        lastname.value = ""
                       firstname.value = ""
                        email.value = ""
                        password.value = ""
                        confirmpass.value = ""
                        window.location.assign("./email_verify/emailverification.html")
                    })
                     
                   
                }).catch((error) => {
                    console.log("email not sent")

                })



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




















