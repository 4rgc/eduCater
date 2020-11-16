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
    // TODO: gets user JSON object and displays proper information about them
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
