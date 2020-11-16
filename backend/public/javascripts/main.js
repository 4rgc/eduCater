const url = "./images/recursion.pdf";

var myState = {
    pdf: null,
    currentPage: 1,
    zoom: 1,
};

pdfjsLib.getDocument(url).promise.then((pdf) => {
    myState.pdf = pdf;
    render();
});

function render() {
    myState.pdf.getPage(myState.currentPage).then((page) => {
        var canvas = document.getElementById("pdf_render");
        var ctx = canvas.getContext("2d");
        var viewport = page.getViewport(myState.zoom);
        var parent = document.getElementById("pdf");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.height = "50%";
        canvas.style.width = "80%";
        parent.style.padding = "2%";

        page.render({
            canvasContext: ctx,
            viewport: viewport,
        });
    });
}

document.getElementById("go_previous").addEventListener("click", (e) => {
    if (myState.pdf == null || myState.currentPage == 1) return;
    myState.currentPage -= 1;
    document.getElementById("current_page").value = myState.currentPage;
    render();
});

document.getElementById("go_next").addEventListener("click", (e) => {
    if (
        myState.pdf == null ||
        myState.currentPage > myState.pdf._pdfInfo.numPages
    )
        return;

    myState.currentPage += 1;
    document.getElementById("current_page").value = myState.currentPage;
    render();
});

document.getElementById("current_page").addEventListener("keypress", (e) => {
    if (myState.pdf == null) return;

    // Get key code
    var code = e.keyCode ? e.keyCode : e.which;

    // If key code matches that of the Enter key
    if (code == 13) {
        var desiredPage = document.getElementById("current_page").valueAsNumber;

        if (desiredPage >= 1 && desiredPage <= myState.pdf._pdfInfo.numPages) {
            myState.currentPage = desiredPage;
            document.getElementById("current_page").value = desiredPage;
            render();
        }
    }
});

function onPostComment(material_id, user_id, slide) {
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
                `token=${token}&material_id=${material_id}&user_id=${user_id}&datePosted=${JSON.stringify(
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
        console.log("Welcome, " + user.email);
    }
});
