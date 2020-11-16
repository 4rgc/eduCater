class Comment
{
    constructor(userName,comment,id,datePosted,slide)
    {
        this.userName = userName;
        this.comment = comment;
        this.datePosted = datePosted;
        this.slide = slide;
        this.id = id;
        this.material_id = "udewqa2234gf123o8";
    }
    replyBtn(id)
    {
        var btn = document.createElement("BUTTON");
        btn.className = 'btn-sm btn-primary float-right';
        btn.textContent = "reply"; 
        btn.onclick = function(){repy(id)}; 
        return btn; 
    }
    createComment()
    {
        this.comment = document.createTextNode(this.comment);
        var div1 = document.createElement("DIV");
        div1.className = 'media p-3';
        div1.id = guidGenerator(); 
        var pfp = document.createElement("IMG");
        pfp.src = "https://www.retailx.com/wp-content/uploads/2019/12/iStock-476085198-300x300.jpg"; 
        pfp.classList.add('mr-3' ,'mt-3', 'rounded-circle');
        pfp.style.width = "45px";
        div1.appendChild(pfp); 
        var div2 = document.createElement("DIV");
        div2.className = 'media-body';
        div2.id = guidGenerator(); 
        div2.innerHTML = '<h4>'+this.userName + ' <small><i>Posted on '+ new Date().toISOString().split("T")[0];+'</i></small></h4>';
        var par = document.createElement('p'); 
        par.appendChild(this.comment);
        div2.appendChild(par); 
        div2.appendChild(this.replyBtn(div2.id));
        div1.appendChild(div2);
        return div1; 
    }
}
function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}


function submitComment()
{
    var comments = document.getElementById('comments');
    var text = document.getElementById('comment_block');
    var c = new Comment("obuya",text.value, comments.id, new Date().toISOString());
    document.getElementById(comments.id).appendChild(c.createComment());
    document.getElementById('comment').setAttribute("disabled", null);
    text.value = '';
    onPostComment(c.userName, c.slide, c.comment); 
}
function  repy(id)
{
    var c = new Comment("obuya", "this is a test", id);
    document.getElementById(id).appendChild(c.createComment());
}

document.getElementById("comment_block").addEventListener("input", function() {
    var nameInput = document.getElementById('comment_block').value;
    if (nameInput != "") { 
        document.getElementById('comment').classList.remove("disabled");
        document.getElementById('comment').removeAttribute("disabled");
        console.log("Hello world!");
    } else {
        document.getElementById('comment').setAttribute("disabled", null);
        document.getElementById('comment').classList.add("disabled");
    }
});

document.getElementById("go_previous").addEventListener("click", (e) => {
    
    getpageComments();

});

document.getElementById("go_next").addEventListener("click", (e) => {
    getpageComments();
});


function getManyComments() {
    return new Promise((resolve, reject) => {
        firebase
            .auth()
            .currentUser.getIdToken()
            .then((token) => {
                httpGetAsync(
                    `/api/getMaterialComments?token=${token}&material_id=5fb12e415c07648e7d026230`,
                    (res) => {
                        resolve(res);
                    }
                );
            });
        })
    }


    function onPostComment(userName, slide,com) {
        firebase
            .auth()
            .currentUser.getIdToken()
            .then((token) => {
                httpPostAsync(
                    "/api/postComment",
                    `token=${token}&material_id=5fb12e415c07648e7d026230&user_id=${userName}&contents=${com}&datePosted=${JSON.stringify(
                        new Date()
                    )}&slideNumber=${slide}`,
                    (res) => {
                        console.log("got the response: " + res);
                    }
                );
            });
    }

function getpageComments()
{
    document.getElementById('comments').innerHTML = "";
    var comment_div = document.getElementById('comments');
    getManyComments().then((res) => {
        var obj = JSON.parse(res); 
        var c = obj.comments; 
        console.log(c[0].contents);
        for(var i = 0; i < c.length; i++)
        {
           if(c[i].slideNumber == myState.currentPage)
            {
                var newC = new Comment(c[i].name, c[i].contents,c[i]._id); 
                console.log(c[i].contents);
               document.getElementById(comment_div.id).appendChild(newC.createComment());
            }    
        }
    })
    
}

