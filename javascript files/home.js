// firebase.auth().onAuthStateChanged((user) => {
// if(user){
//     window.location.assign("../homepage/private-home.html")

// if(user.emailVerified){
//     window.location.assign("../homepage/private-home.html")
// }
//     else{
//         console.log("user not verified")
//         window.location.assign("../login/login.html")
//     }

// }else{
//     console.log("no user logged in")
//     window.location.assign("../login/login.html")
    
// }
// });



const logout = () => {
  firebase.auth().signOut()
    .then(() => {
      console.log("User signed out");
      window.location.assign("../login/login.html");
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
};



const addbtn = () =>{
   firebase
    .database().ref("user/" + "user2").set({
      name: "meer",
      gamil: "hemani@gamil.com",
      password:"hemani12345678",
      phone: "03322073076"
    }).then(() => alert("User registered successfully!"))
  .catch(error => console.error("Error:", error));
}


// 