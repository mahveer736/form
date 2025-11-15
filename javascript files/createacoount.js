let fullname = document.getElementById('Fullname');

let email = document.getElementById('email');
let password = document.getElementById('password');
let confirmpass = document.getElementById('confirm');
let btn = document.getElementById('btn');
let massage = document.getElementById('massage');
 

 const sigin = () => {
    let age = document.getElementById("age")
    let gender = document.getElementsByName("gender")

    let selectedgender = ""
    for (let index in gender) {
        if (gender[index].checked) {
            selectedgender = gender[index].value
        }
    }

    let selectedAge  = age.options[age.selectedIndex].value
    
    
    btn.innerHTML = "loding..."
    if (password.value !== confirmpass.value) {
        massage.innerHTML = "Passwords do not match!";
        massage.style.color = "red";
        btn.innerHTML = "Sign Up";

    }
   


    //send data to firebase
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)

        .then((res) => {

            firebase.auth().currentUser.sendEmailVerification()
                .then(() => {
                   
                    massage.innerHTML = "Account created successfully"
                    massage.style.color = "green"


                    //data data store ----------------------a----------------------------
                     firebase.database().ref("users/" + res.user.uid).set({
                    fullname: fullname.value,
                        age: selectedAge,
                        gender: selectedgender,
                        Email: email.value,
                        Password: password.value,
                        Confrompassword: confirmpass.value
                    }).then(() => {
                        fullname.value = ""
                        email.value = ""
                        password.value = ""
                        confirmpass.value = ""
                        age.selectedIndex = 0;
                        gender.forEach((gender) => {
                            gender.checked = false
                                 window.location.assign("../html pages/emailverification.html")
                        })

                    })
                     
                   
                }).catch((error) => {
                   console.error("Email not sent:", error);
                })


        }).catch((error) => {
            btn.innerHTML = "Sign Up"
            massage.innerHTML = error.message
            massage.style.color = "red"
            console.log("not a user login")
        });
}


















