function getSlideNum() {
    // to implement!!
}




class Comment
{
    constructor(userName,comment,id)
    {
        this.userName = userName;
        this.comment = comment;
        this.id = id;
    }
    replyBtn(id)
    {
        var btn = document.createElement("BUTTON");
        btn.className = 'btn btn-primary';
        btn.textContent = "reply"; 
        btn.onclick = function(){test(id)}; 
        return btn; 
    }
    createComment()
    {
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
        div2.innerHTML = div2.id + '<h4>John Doe <small><i>Posted on February 19, 2016</i></small></h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>';
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


function test(id)
{
    var c = new Comment("obuya", "this is a test", id);
    document.getElementById(id).appendChild(c.createComment());
}