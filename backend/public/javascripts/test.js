function addCourse() {
    let name, code;

    httpPostAsync("/api/addCourse", `name=${name}&code=${code}`, (res) => {
        console.log("got the response: " + res);
    });
}

function changePLink() {}

function getPLink() {
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
