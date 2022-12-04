var overlay = document.getElementById('overlay');
if (overlay == null) {
overlay = document.createElement('div');
overlay.setAttribute('id', 'overlay');
document.body.appendChild(overlay);
    // console.log('does not exist')
} else {
    // console.log('exists');
    
}


var registerform = document.createElement('form');
registerform.setAttribute('id', 'register-form');
registerform.setAttribute('method', 'post');
overlay.appendChild(registerform);

var h1 = document.createElement('h1');
h1.textContent = 'Sign up:';
registerform.appendChild(h1);

var username_field = document.createElement('input');
username_field.setAttribute('name', 'username');
username_field.setAttribute('type', 'text');
username_field.setAttribute('placeholder', 'Username');
registerform.appendChild(username_field);

var password_field = document.createElement('input');
password_field.setAttribute('name', 'password');
password_field.setAttribute('type', 'password');
password_field.setAttribute('placeholder', 'Password');
registerform.appendChild(password_field);

var register_btn = document.createElement('button');
register_btn.onclick = do_register;
register_btn.textContent = 'Sign up';
registerform.appendChild(register_btn);

// var p_login = document.createElement('p');
// p_login.classList.add('login-btn');
// p_login.textContent = 'Already a member?';
//     // p_reg.onclick = do_login;
// registerform.appendChild(p_login);

// *TODO: getElementsByClassName + map this event listener to each elem
var register_buttons = document.getElementsByClassName('register-btn'); 
[].forEach.call(register_buttons, (register_button_found) => {
    register_button_found.addEventListener('click', (e) => { 
        e.stopPropagation();
        // +
        document.getElementById('login-form').style.display = 'none';
        overlay.style.display = 'block';
        registerform.style.display = 'block';
     });
    }
);

var closeHintText = document.createElement('div');
closeHintText.setAttribute('id', 'close-hint-text');
closeHintText.textContent = 'Hide'
overlay.appendChild(closeHintText);

overlay.addEventListener('click', (e) => {
     overlay.style.display = 'none';
     registerform.reset();
    //  +
     registerform.style.display = 'none';
 });

registerform.addEventListener('click', (e) => { e.stopPropagation(); });

function do_register(){
    // *TODO: Form validity check - error if empty or invalid
    // *TODO: Store logged info inside localStorage
    alert("register request SENT");
}
// function show_register_form(){
//     console.log('register showed');
//     overlay.style.display = 'block';
//     setTimeout(() => {
//         document.body.addEventListener('click', (e) => { overlay.style.display = 'none'; });
//         overlay.addEventListener('click', (e) => { e.stopPropagation(); });

//     }, 1000);
    
// }