let firstname = document.getElementById("firstname");
let lastname = document.getElementById("lastname")
let email = document.getElementById("email")
let age = document.getElementById("age")
let updatebtn = document.getElementById("updateBtn")
let genderInputs = document.getElementsByName("gender");

let btn = document.getElementById("btn")
let bio = document.getElementById("bio");
let massage = document.getElementById("massage")
let uid = ""
useruid = document.getElementById("userId");
useremailverified = document.getElementById("emailVerified");
lastsigin = document.getElementById("lastSignIn");
createaccounttime = document.getElementById("createdDate");




firebase.auth().onAuthStateChanged((user) => {

  if (user) {
    uid = user.uid;
    console.log(user)
    firebase
      .database()
      .ref("users/" + user.uid).on("value", (userRes) => {
        useruid.innerHTML = user.uid;
        useremailverified.innerHTML = user.emailVerified;

        createaccounttime.innerHTML = user.metadata.creationTime;
        lastsigin.innerHTML = user.metadata.lastSignInTime;




        console.log("profile page => ", userRes.val());

        firstName.value = userRes.val().firstname;
        lastName.value = userRes.val().lastname;
        email.value = userRes.val().Email;
        age.value = userRes.val().age;
      bio.value = userRes.val().bio ? userRes.val().bio : "";

     
        for (let i = 1; i < genderInputs.length; i++) {
          if (genderInputs[i].value == userRes.val().genderInputs) {
            genderInputs[i].checked = true;
          }
        }
          genderInputs.value = userRes.val().gender;

      })
  }
})







color = "red";
//   });


const updateProfile = () => {

  let selectedGender = "";

  // Find selected gender
  for (let i = 0; i < genderInputs.length; i++) {
    if (genderInputs[i].checked) {
      selectedGender = genderInputs[i].value;
      break;
    }
  }

  // Disable button while loading
  updatebtn.innerHTML = "Loading...";

  // Get selected age (if it's a dropdown)
  let selectedAge = age.options ? age.options[age.selectedIndex].value : age.value;

  // Update the Firebase database
  firebase
    .database()
    .ref("users/" + uid)
    .update({
      firstname: firstName.value,
      lastname: lastName.value,
      Email: email.value,
      age: selectedAge,
      gender: selectedGender,
      bio: bio.value,
    })
    .then(() => {
      updatebtn.innerHTML = "Loading...";
      message.innerHTML = "Profile updated successfully!";
      message.style.color = "green";
    })
    .catch((error) => {
      updatebtn.innerHTML = "Update Profile";
      message.innerText = error.message;
      message.style.color = "red";
    });
};
