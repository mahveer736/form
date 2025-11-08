let username = document.getElementById("username")
let userprofile = document.getElementById("usernameprofile")
let welcome = document.getElementById("welcome")



firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("user logged in",user)
    if (user.emailVerified) {
   console.log("user verified",user.emailVerified)
      firebase.database().ref("users/" + user.uid).on("value", (userres) => {
        welcome.innerHTML = `Welcome back , ${userres.val().fullname}! 👋`
         username.innerHTML = `${userres.val().fullname}`
          profileImage.src = userres.val().profile_picture;
    
        
        
      })

    }
    else {
      console.log("user not Verified")
      window.location.assign("../email_verify/emailverification.html")
    }

  } else {
    console.log("no user logged in")
    window.location.assign("../login/login.html")

  }
});



const logout = () => {
  firebase.auth().signOut()
    .then((res) => {
      console.log(res)
      console.log("User signed out");
      window.location.assign("../login/login.html");
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
};



















// const addbtn = () =>{
//    firebase
//     .database().ref("user/" + "user2").set({
//       name: "meer",
//       gamil: "hemani@gamil.com",
//       password:"hemani12345678",
//       phone: "03322073076"
//     }).then(() => alert("User registered successfully!"))
//   .catch(error => console.error("Error:", error));
// }


// 