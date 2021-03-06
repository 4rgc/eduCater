function signUp(){


    var email = document.getElementById('email');

    var subutton = document.getElementById('signup');

    var displaysetting = email.style.display;

    if(subutton.innerHTML == 'Already have an account? Click here to sign in!'){

        subutton.innerHTML = 'Dont have an account? Click here to sign up!';

        email.style.display = 'none';
    }else{

        email.style.display = 'inline-block'

        subutton.innerHTML = 'Already have an account? Click here to sign in!'
        
    }

    


}

function addCourse() {
    let name, code;

    httpPostAsync("/api/addCourse", `name=${name}&code=${code}`, (res) => {
        console.log("got the response: " + res);
    });
}

function changePLink() {}

function getMaterialLink() {
    let id = 0;

    httpGetAsync(`/api/getPLink?id=${id}`, (res) => {
        console.log("got the response: " + res);

        let obj = JSON.parse(res);
        if (!obj["success"]) throw new Error("Wrong id");

        let iframe = document.createElement("iframe");
        iframe.src = obj.link;
        iframe.type = "application/pdf";
        document.getElementById("container").appendChild(iframe);
    });
}

function addTeacher() {
    firebase
        .auth()
        .currentUser.getIdToken()
        .then((token) => {
            let name = "Bro Broski";

            httpPostAsync(
                "/api/addTeacher",
                `name=${name}&token=${token}`,
                (res) => {
                    console.log("got the response: " + res);
                }
            );
        });
}

function onLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.error(errorCode + ": " + errorMessage);
        });
}

function onLogout() {
    let currentUser = firebase.auth().currentUser;

    if (currentUser) {
        currentUser.getIdToken().then((idToken) => {
            httpPostAsync("/logout", "token=" + idToken, () => {});
        });
    }
    firebase
        .auth()
        .signOut()
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.error(errorCode + ": " + errorMessage);
        });
}

function onRegister() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((cred) => {
            if (!cred.user) console.error("Could not register");
            cred.user.getIdToken().then((token) => {
                httpPostAsync(
                    "/register",
                    `name=${name}&email=${email}&token=${token}`,
                    (res) => {
                        console.log(res);
                    }
                );
            });
        });
}

function getCoursesTeaching() {
    firebase
        .auth()
        .currentUser.getIdToken()
        .then((token) => {
            httpGetAsync(`/api/getCoursesTeaching?token=${token}`, (res) => {
                console.log("got the response: " + res);
            });
        });
}

function getCoursesEnrolled() {
    firebase
        .auth()
        .currentUser.getIdToken()
        .then((token) => {
            httpGetAsync(`/api/getCoursesEnrolled?token=${token}`, (res) => {
                console.log("got the response: " + res);
            });
        });
}

function onPostComment(course_id, user_id, slide) {
    let topLeft = {
        x: 0.1,
        y: 0.1,
    };

    let bottomRight = { x: 0.6, y: 0.6 };
    firebase
        .auth()
        .currentUser.getIdToken()
        .then((token) => {
            httpPostAsync(
                "/api/postComment",
                `token=${token}&material_id=${course_id}&user_id=${user_id}&datePosted=${JSON.stringify(
                    new Date()
                )}&slideNumber=${slide}&topLeft=${JSON.stringify(
                    topLeft
                )}&bottomRight=${JSON.stringify(bottomRight)}`,
                (res) => {
                    console.log("got the response: " + res);
                }
            );
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
        // document.getElementById("message").innerHTML = "Welcome, " + user.email;
        console.log("Welcome, " + user.email);
    } else {
        // document.getElementById("message").innerHTML = "No user signed in.";
        console.log("User logged out");
    }
});
