let email = document.getElementById('email');
let password = document.getElementById('password');
let btn = document.getElementById('btn');
let massage = document.getElementById('massage');


const login = () => {
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





            }, 2000)
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
        .signInWithPopup(provider)
        .then((res) => {
            console.log(res.user)




            firebase.database()
                .ref("users/" + res.user.uid)
                .once("value")
                .then((userres) => {
                    if (userres.val()) {
                        massage.innerHTML = "User login successfully"
                        massage.style.color = "green"
                        console.log("sucess user login")
                        setTimeout(() => {

                          
                            // window.location.assign("../email_verify/emailverification.html")    
                            window.location.assign("../homepage/private-home.html")






                        }, 2000)
                    } else {
                        firebase.database().ref("users/" + res.user.uid).set({
                          fullname: res.user.displayName || "",

                            email: res.user.email,
                            age: "25",
                            gender: "Male",
                            profileImgURL: res.user.photoURL,

                        }).then(() => {
                            massage.innerHTML = "Successfully logged in";
                            massage.setAttribute("class", "success");
                            btn.value = "Log In";
                            setTimeout(() => {
                                window.location.assign("../homepage/private-home.html");
                            }, 2000);
                        });
                    }
                })
                .catch((error) => {
                    btn.innerHTML = "Log In"
                    massage.innerHTML = error.message
                    massage.style.color = "red"
                    console.log("not a user login")
                })
        })
}































// const goolesigin = () => {
//     var provider = new firebase.auth.GoogleAuthProvider();

//     firebase.auth()
//         .signInWithPopup(provider)
//         .then((res) => {
//             console.log("User data:", res.user);

//             const userRef = firebase.database().ref("users/" + res.user.uid);

//             userRef.once("value").then((userres) => {
//                 if (userres.val()) {
//                     massage.innerHTML = "User login successfully";
//                     massage.style.color = "green";
//                     console.log("Existing user login");

//                     setTimeout(() => {
//                         window.location.assign("../homepage/private-home.html");
//                     }, 2000);

//                 } else {
//                     userRef.set({
//                         fullname: res.user.displayName,
//                         email: res.user.email,
//                         age: "25",
//                         gender: "Male",
//                         profileImgURL: res.user.photoURL || "",
                        
//                     }).then(() => {
//                         massage.innerHTML = "Successfully logged in";
//                         massage.setAttribute("class", "success");
//                         btn.value = "Log In";
//                         setTimeout(() => {
//                             window.location.assign("../homepage/private-home.html");
//                         }, 2000);
//                     });
//                 }
//             }).catch((error) => {
//                 btn.value = "Log In";
//                 massage.innerHTML = error.message;
//                 massage.style.color = "red";
//                 console.error("Login error:", error);
//             });
//         });
// };
