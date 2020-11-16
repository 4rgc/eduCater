function addNav() {
    // Make the page
    // Check the page
    var page = window.location.href;
    page = page.includes("main.html") ? "main.html" : page.includes("myCourses.html") ? "myCourses.html" : "myProfile.html";
    // Make left side of nav
    var links = ["main.html", "myCourses.html", "myProfile.html"];
    var texts = ["Course", "Selection", "Profile"];
    var tags = [];
    // Link tags
    for (i=0; i<links.length; i++) {
        var newTag = document.createElement("a");
        newTag.href = links[i];
        newTag.innerHTML = texts[i];
        if (links[i] == page) newTag.setAttribute("class", "nav-text-selected");
        tags.push(newTag); 
    }
    var bigTag = document.createElement("div")
    bigTag.setAttribute("class", "left-side");
    // Div and bigger div tag
    for (i=0; i<tags.length; i++) {
        var newTag = document.createElement("div")
        if (links[i] == page) newTag.setAttribute("class", "nav-link-wrapper nav-option-selected");
        else newTag.setAttribute("class", "nav-link-wrapper nav-option");
        tags[i] = newTag.appendChild(tags[i]);
        bigTag.appendChild(newTag);
    }
    // Right side
    var newTag = document.createElement("img")
    newTag.setAttribute("src", "./images/logo-transparent.png");
    var newTag2 = document.createElement("div");
    newTag2.setAttribute("class", "imgContainer");
    newTag2.appendChild(newTag);
    headTag = document.createElement("h4");
    headTag.setAttribute("id", "user-greeting");
    headTag.innerHTML = "Welcome";
    otherDiv = document.createElement("div");
    otherDiv.setAttribute("class", "col");
    otherDiv.setAttribute("style", "color: white; vertical-align: baseline;")
    otherDiv.appendChild(headTag);
    newTag = document.createElement("div");
    newTag.setAttribute("class", "row");
    newTag.appendChild(otherDiv);
    newTag.appendChild(newTag2);
    newTag2 = document.createElement("div");
    newTag2.setAttribute("class", "right-side");
    newTag2.appendChild(newTag);
    // B I G   A P P E N D
    newTag = document.createElement("div");
    newTag.setAttribute("class", "nav-wrapper");
    newTag.appendChild(bigTag);
    newTag.appendChild(newTag2);
    bigTag = document.createElement("div");
    bigTag.setAttribute("class", "nav-container");
    bigTag.appendChild(newTag);
    var myBody = document.getElementsByTagName("body")[0];
    myBody.prepend(bigTag);
    // Alter page based on if user is there
    var user = firebase.auth().currentUser
    if (user) {
        user.getIdToken()
        .then((token) => {
            httpPostAsync(
                `/getUser?token=${token}`,
                (myUser) => {
                    if (myUser.success) {
                        var userGreet = document.getElementById("user-greeting");
                        userGreet.innerHTML = `Hello, ${myUser.name}`;

                    }
                }
            );
        });
    } else {
        // No user signed in
        
    }
}