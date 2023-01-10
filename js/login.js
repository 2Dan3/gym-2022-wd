var overlay = document.getElementById('overlay');
if (overlay == null) {
overlay = document.createElement('div');
overlay.setAttribute('id', 'overlay');
document.body.appendChild(overlay);
    // console.log('does not exist')
} else {
    // console.log('exists');
    
}


var loginform = document.createElement('form');
loginform.setAttribute('id', 'login-form');
loginform.setAttribute('method', 'post');
// 
loginform.onsubmit = (event) => {
    event.preventDefault();
    do_login();
}
overlay.appendChild(loginform);

var h1 = document.createElement('h1');
h1.textContent = 'Sign in with your credentials:';
loginform.appendChild(h1);

var username_field = document.createElement('input');
username_field.setAttribute('name', 'username');
username_field.setAttribute('type', 'text');
username_field.setAttribute('id', 'username-login-field');
username_field.setAttribute('placeholder', 'Username');
loginform.appendChild(username_field);

var password_field = document.createElement('input');
password_field.setAttribute('name', 'password');
password_field.setAttribute('type', 'password');
password_field.setAttribute('id', 'password-login-field');
password_field.setAttribute('placeholder', 'Password');
loginform.appendChild(password_field);

var login_btn = document.createElement('button');
login_btn.setAttribute("type", "submit");
// login_btn.onclick = do_login;
login_btn.textContent = 'Sign in';
loginform.appendChild(login_btn);

var p_reg = document.createElement('p');
p_reg.classList.add('register-btn');
p_reg.textContent = 'Not a member yet?';
// p_reg.onclick = do_register;
loginform.appendChild(p_reg);

var login_buttons = document.getElementsByClassName('login-btn');
[].forEach.call(login_buttons, (login_button_found) => {
    login_button_found.addEventListener('click', (e) => { 
        e.stopPropagation();
        // +
        document.getElementById('register-form').style.display = 'none';
        overlay.style.display = 'block';
        loginform.style.display = 'block';
     });
    }
);


overlay.addEventListener('click', (e) => {
    resetAndHideLogin();
 });

loginform.addEventListener('click', (e) => { e.stopPropagation(); });

async function do_login(){

    let username_input = document.getElementById("username-login-field").value;
    let password_input = document.getElementById("password-login-field").value;
    // *TODO: Form validity check - error if empty or invalid

    let response_users;

    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(this.readyState == 4) {
            if(this.status == 200) {
                response_users = JSON.parse(req.responseText);
                console.log(response_users);
                checkCredentials(response_users, username_input, password_input);
            }else {
                console.error('Error logging in.')
                // return null
            }
        }
    }

    console.log("LOGIN requested");

    req.open('GET',  "https://fitnessandusers-default-rtdb.europe-west1.firebasedatabase.app" + '/korisnici.json');
    req.send();
}

function checkCredentials(response_users, username, password){
    for (const id_key in response_users) {

        let user = response_users[id_key];
        if (user.korisnickoIme === username && user.lozinka === password) {
            
            createSession(user);
            resetAndHideLogin();
            location.reload();

            return
        }
    }
    alert("Invalid credentials!");
    loginform.reset();
    return
}
function createSession(user){
    localStorage.setItem("logged", true);
}

function resetAndHideLogin(){
    overlay.style.display = 'none';
    loginform.reset();
    //  +
    loginform.style.display = 'none';
}
// function show_login_form(){
//     console.log('login showed');
//     overlay.style.display = 'block';
//     setTimeout(() => {
//         document.body.addEventListener('click', (e) => { overlay.style.display = 'none'; });
//         overlay.addEventListener('click', (e) => { e.stopPropagation(); });

//     }, 1000);
    
// }