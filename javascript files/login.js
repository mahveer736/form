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
                password.value = "";
                window.location.assign("./../html pages/private-home.html");
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
                            
                            window.location.assign("./../html pages/private-home.html");

                        }, 2000)
                    } else {
                        firebase.database().ref("users/" + res.user.uid).set({
                       
                           
                          
 fullname:res.user.displayName,
      Email: res.user.email,
      age: "25",
     gender: "Male",
      profileImage: res.user.photoURL
    //   bio: bio.value,

                            
                        }).then(() => {
                            massage.innerHTML = "Successfully logged in";
                            massage.setAttribute("class", "success");
                             massage.style.color = "green"
                            btn.value = "Log In";
                            setTimeout(() => {
                                window.location.assign("./../html pages/private-home.html");
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










//login with face book
const signInWithFacebook = () =>{
  var provider = new firebase.auth.FacebookAuthProvider();
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
                            
                            window.location.assign("./../html pages/private-home.html")

                        }, 2000)
                    } else {
                        firebase.database().ref("users/" + res.user.uid).set({
                       
                           
                          
 fullname:res.user.displayName,
      Email: res.user.email,
      age: "25",
     gender: "Male",
     profileImage: res.user.photoURL
    //   bio: bio.value,

                            
                        }).then(() => {
                            massage.innerHTML = "Successfully logged in";
                            massage.setAttribute("class", "success");
                             massage.style.color = "green"
                            btn.value = "Log In";
                            setTimeout(() => {
                                window.location.assign("./../html pages/private-home.html");
                            }, 2000);
                        });
                    }
                })
                .catch((error) => {

      var errormassage = error.message;
      console.log("Error massage ===>" , errormassage)
      btn.innerHTML = "Log In"
                    massage.innerHTML = error.message
                    massage.style.color = "red"
                    console.log("not a user login")
                })
    })
}