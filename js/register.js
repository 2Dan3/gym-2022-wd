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

var email_field = document.createElement('input');
email_field.setAttribute('name', 'email');
email_field.setAttribute('type', 'email');
email_field.setAttribute('placeholder', 'Email');
registerform.appendChild(email_field);

var first_name_field = document.createElement('input');
first_name_field.setAttribute('name', 'name');
first_name_field.setAttribute('type', 'text');
first_name_field.setAttribute('placeholder', 'Name');
registerform.appendChild(first_name_field);

var last_name_field = document.createElement('input');
last_name_field.setAttribute('name', 'surname');
last_name_field.setAttribute('type', 'text');
last_name_field.setAttribute('placeholder', 'Surname');
registerform.appendChild(first_name_field);

var address_field = document.createElement('input');
address_field.setAttribute('name', 'address');
address_field.setAttribute('type', 'text');
address_field.setAttribute('placeholder', 'Address');
registerform.appendChild(address_field);

var phone_field = document.createElement('input');
phone_field.setAttribute('name', 'phone');
phone_field.setAttribute('type', 'phone');
phone_field.setAttribute('placeholder', 'Phone Num.');
registerform.appendChild(phone_field);

var birth_field = document.createElement('input');
birth_field.setAttribute('name', 'birth');
birth_field.setAttribute('type', 'date');
birth_field.setAttribute('placeholder', 'Date of birth');
registerform.appendChild(birth_field);

var register_btn = document.createElement('button');
register_btn.onclick = do_register;
register_btn.textContent = 'Sign up';
registerform.appendChild(register_btn);


// getElementsByClassName + map this event listener to each elem
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
closeHintText.textContent = 'X'
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