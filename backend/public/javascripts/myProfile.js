function editProfile() {
    var unameInputBox = document.getElementById("uname");
    var myButton = document.getElementById("edit");
    unameInputBox.disabled = !unameInputBox.disabled;
    myButton.innerHTML = unameInputBox.disabled
        ? "Edit Profile"
        : "Save changes";
    // Something something changes get saved back to database
}

function changepfp() {
    // TODO: request image from user and replace their profile picture with that new image
}

function getUser() {
    var userTypeBox = document.getElementById("usertype");
    var usernameBox = document.getElementById("uname");
    var courseList = document.getElementById("courses");
    var profilePic = document.getElementById("pfp");
    firebase.auth().currentUser.getIdToken()
        .then((token) => {
            console.log("ihwfoiheihowfe");
            httpPostAsync(`/getUser?token=${token}`, (user) => {
                console.log("In the method");
                if (user) {
                    usernameBox.placeholder = user.name;
                    profilePic.setAttribute("src", user.profilePic);
                    if (user.role == "t") {
                        userTypeBox.innerHTML = "Teacher";
                        var addLectureButton = document.getElementById("info").appendChild("button");
                        addLectureButton.setAttribute("class", "btn-sm btn-primary");
                        addLectureButton.setAttribute("href", "addLecture.html");
                        addLectureButton.innerHTML = "Add Lecture";
                        
                    } else {
                        userTypeBox.innerHTML = "Student";
                    }
                    
                }
            });            
    });
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        user.getIdToken().then(function (idToken) {
            httpPostAsync(
                "/login",
                `token=${idToken}&email=${user.email}`,
                () => {}
            );
        });
        console.log("Welcome, " + user.email);
    }
});
