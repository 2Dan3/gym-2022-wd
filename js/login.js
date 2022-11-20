var overlay = document.getElementById('overlay');

document.getElementById('login-btn').addEventListener('click', (e) => { 
    e.stopPropagation();
    overlay.style.display = 'block';
 });

document.body.addEventListener('click', (e) => {
     overlay.style.display = 'none';
     document.getElementById('login-form').reset();
 });

overlay.addEventListener('click', (e) => { e.stopPropagation(); });

function do_login(){
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