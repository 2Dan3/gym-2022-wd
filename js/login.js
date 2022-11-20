var overlay = document.createElement('div');
overlay.setAttribute('id', 'overlay');
document.getElementById('content').appendChild(overlay);

var loginform = document.createElement('form');
loginform.setAttribute('id', 'login-form');
loginform.setAttribute('method', 'post');
overlay.appendChild(loginform);

var h1 = document.createElement('h1');
h1.textContent = 'Sign in with your credentials:';
loginform.appendChild(h1);

var username_field = document.createElement('input');
username_field.setAttribute('name', 'username');
username_field.setAttribute('type', 'text');
username_field.setAttribute('placeholder', 'Username');
loginform.appendChild(username_field);

var password_field = document.createElement('input');
password_field.setAttribute('name', 'password');
password_field.setAttribute('type', 'password');
password_field.setAttribute('placeholder', 'Password');
loginform.appendChild(password_field);

var login_btn = document.createElement('button');
login_btn.onclick = do_login;
login_btn.textContent = 'Sign in';
loginform.appendChild(login_btn);

var p_reg = document.createElement('p');
p_reg.classList.add('register-btn');
p_reg.textContent = 'Not a member yet?';
// p_reg.onclick = do_register;
loginform.appendChild(p_reg);

// *TODO: getElementsByClassName + map this event listener to each elem
document.getElementById('login-btn').addEventListener('click', (e) => { 
    e.stopPropagation();
    overlay.style.display = 'block';
 });

overlay.addEventListener('click', (e) => {
     overlay.style.display = 'none';
     document.getElementById('login-form').reset();
 });

loginform.addEventListener('click', (e) => { e.stopPropagation(); });

function do_login(){
    // *TODO: Form validity check - error if empty or invalid
    // *TODO: Store logged info inside localStorage
    alert("LOGIN request SENT");
}
// function show_login_form(){
//     console.log('login showed');
//     overlay.style.display = 'block';
//     setTimeout(() => {
//         document.body.addEventListener('click', (e) => { overlay.style.display = 'none'; });
//         overlay.addEventListener('click', (e) => { e.stopPropagation(); });

//     }, 1000);
    
// }