let fullname = document.getElementById("fullname");
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
let profileImage = document.getElementById("profileImage");
navpriofile = document.getElementById("navprofile")


firebase.auth().onAuthStateChanged((user) => {

  if (user) {
    uid = user.uid;
    console.log(user)
    firebase
      .database()
      .ref("users/" + user.uid).on("value", (userRes) => {
        useruid.innerText = user.uid;
        useremailverified.innerText = user.emailVerified;
        createaccounttime.innerText = user.metadata.creationTime;
        lastsigin.innerText = user.metadata.lastSignInTime;
      
        console.log("profile page => ", userRes.val());

        fullname.value = userRes.val().fullname;
        email.value = userRes.val().Email;
        age.value = userRes.val().age;
      bio.value = userRes.val().bio ? userRes.val().bio : "";
      if(userRes.val().profile_picture){
      profileImage.src = userRes.val().profile_picture;
      navpriofile.src = userRes.val().profile_picture
      }
     
        for (let i = 1; i < genderInputs.length; i++) {
          if (genderInputs[i].value == userRes.val().genderInputs) {
            genderInputs[i].checked = true;
          }
        }
          genderInputs.value = userRes.val().gender;

      })
  }
})








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
  updatebtn.innerText = "Loading...";

  // Get selected age (if it's a dropdown)
  let selectedAge = age.options ? age.options[age.selectedIndex].value : age.value;

  // Update the Firebase database
  firebase
    .database()
    .ref("users/" + uid)
    .update({
     
      fullname: fullname.value,
      Email: email.value,
      age: selectedAge,
      gender: selectedGender,
      bio: bio.value,
    })
    .then(() => {
      updatebtn.innerText = "Loading...";
      massage.innerText = "Profile updated successfully!";
      massage.style.color = "green";
    })
    .catch((error) => {
      updatebtn.innerText = "Update Profile";
      massage.innerText = error.message;
      massage.style.color = "red";
    });
};