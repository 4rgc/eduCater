class Comment
{
    constructor(userName,comment,id, slide)
    {
        this.userName = userName;
        this.comment = comment;
        this.id = id;
        this.slide = slide;
        this.material_id = "udewqa2234gf123o8";
    }
    replyBtn(id)
    {
        var btn = document.createElement("BUTTON");
        btn.className = 'btn btn-primary';
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
        pfp.src = "http://www.imagie.com/img/photos/IMAGIE_057.jpg"; 
        pfp.classList.add('mr-3' ,'mt-3', 'rounded-circle');
        pfp.style.width = "45px";
        div1.appendChild(pfp); 
        var div2 = document.createElement("DIV");
        div2.className = 'media-body';
        div2.id = guidGenerator(); 
        div2.innerHTML = div2.id + '<h4>John Doe <small><i>Posted on November 15, 2020</i></small></h4>';
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
    var c = new Comment("obuya",text.value, comments.id);
    document.getElementById(comments.id).appendChild(c.createComment());
    document.getElementById('comment').setAttribute("disabled", null);
    text.value = '';
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
    } else {
        document.getElementById('comment').setAttribute("disabled", null);
        document.getElementById('comment').classList.add("disabled");
    }
});