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