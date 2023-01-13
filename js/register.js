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
registerform.addEventListener('submit', (e) => {
    e.preventDefault();
    do_register();
})
overlay.appendChild(registerform);

var h1 = document.createElement('h1');
h1.textContent = 'Sign up:';
registerform.appendChild(h1);

var username_field = document.createElement('input');
username_field.setAttribute('name', 'username');
username_field.setAttribute('type', 'text');
username_field.setAttribute('class', 'register-field');
username_field.setAttribute('placeholder', 'Username');
username_field.setAttribute('id', 'reg-username-input');
registerform.appendChild(username_field);

var password_field = document.createElement('input');
password_field.setAttribute('name', 'password');
password_field.setAttribute('type', 'password');
password_field.setAttribute('class', 'register-field');
password_field.setAttribute('placeholder', 'Password');
password_field.setAttribute('id', 'reg-password-input');
registerform.appendChild(password_field);

var email_field = document.createElement('input');
email_field.setAttribute('name', 'email');
email_field.setAttribute('type', 'email');
email_field.setAttribute('class', 'register-field');
email_field.setAttribute('placeholder', 'Email');
email_field.setAttribute('id', 'reg-email-input');
registerform.appendChild(email_field);

var first_name_field = document.createElement('input');
first_name_field.setAttribute('name', 'name');
first_name_field.setAttribute('type', 'text');
first_name_field.setAttribute('class', 'register-field');
first_name_field.setAttribute('placeholder', 'Name');
first_name_field.setAttribute('id', 'reg-name-input');
registerform.appendChild(first_name_field);

var last_name_field = document.createElement('input');
last_name_field.setAttribute('name', 'surname');
last_name_field.setAttribute('type', 'text');
last_name_field.setAttribute('class', 'register-field');
last_name_field.setAttribute('placeholder', 'Surname');
last_name_field.setAttribute('id', 'reg-surname-input');
registerform.appendChild(last_name_field);

var address_field = document.createElement('input');
address_field.setAttribute('name', 'address');
address_field.setAttribute('type', 'text');
address_field.setAttribute('class', 'register-field');
address_field.setAttribute('placeholder', 'Address');
address_field.setAttribute('id', 'reg-address-input');
registerform.appendChild(address_field);

var phone_field = document.createElement('input');
phone_field.setAttribute('name', 'phone');
phone_field.setAttribute('type', 'phone');
phone_field.setAttribute('class', 'register-field');
phone_field.setAttribute('placeholder', 'Phone Num.');
phone_field.setAttribute('id', 'reg-phone-input');
registerform.appendChild(phone_field);

var birth_field = document.createElement('input');
birth_field.setAttribute('name', 'birth');
birth_field.setAttribute('type', 'date');
birth_field.setAttribute('class', 'register-field');
birth_field.setAttribute('placeholder', 'Date of birth');
birth_field.setAttribute('id', 'reg-birth-input');
registerform.appendChild(birth_field);

var register_btn = document.createElement('button');
register_btn.setAttribute('type', 'submit');
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
    if ( !isRegFormValid() ) {
        alert("Not all fields were filled!");
        return;
    }

    let address = document.getElementById('reg-address-input').value.trim();
    let birth = document.getElementById('reg-birth-input').value.toString();
    let email = document.getElementById('reg-email-input').value;
    let name = document.getElementById('reg-name-input').value.trim();
    let pass = document.getElementById('reg-password-input').value;
    let surname = document.getElementById('reg-surname-input').value.trim();
    let phone = document.getElementById('reg-phone-input').value.toString();
    let username = document.getElementById('reg-username-input').value.trim();
    
    new_user = 
    {   
        "adresa":address,
        "datumRodjenja":birth,
        "email":email,
        "ime":name,
        "lozinka":pass,
        "prezime":surname,
        "telefon":phone,
        "korisnickoIme":username
    };

    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if(this.readyState == 4) {
            if(this.status == 200) {
                alert("Successfully registered!");
            }else {
                console.error('Error creating User.');
                alert("An error occured while registering User.");
            }
            alert("check console & network...");
            to_users_page();
        }
    }
    // console.log("form obj: " + JSON.stringify(new_user));
    console.log("register requested");
    req.open('POST',  'https://fitnessandusers-default-rtdb.europe-west1.firebasedatabase.app' + '/korisnici/.json');
    req.send(JSON.stringify(new_user));

    
}

function isRegFormValid(){
    let register_fields = document.getElementsByClassName('register-field');
    for (let i = 0; i < register_fields.length; i++) {
        const field = register_fields[i];
        if (field.value == undefined || field.value == null || field.value == "") {
            return false;
        }
    }
    return true;
}
// function show_register_form(){
//     console.log('register showed');
//     overlay.style.display = 'block';
//     setTimeout(() => {
//         document.body.addEventListener('click', (e) => { overlay.style.display = 'none'; });
//         overlay.addEventListener('click', (e) => { e.stopPropagation(); });

//     }, 1000);
    
// }