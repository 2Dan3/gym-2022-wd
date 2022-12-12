// var USERS_URL = "https://jsonplaceholder.typicode.com/photos"


// Kada se ucita stranica ucita se USER sa Firebase
// var request = new XMLHttpRequest();

load_user();

async function load_user(){
    
    const response = await request_user()
        finish_user_rendering(response);
}

async function finish_user_rendering(user){
    // setTimeout(() => {
        makeUserCard(user);
        // alert("Successfully rendered!");
        // }, 2000);
}

async function request_user(){

    const response_user =
    {"us_name":"Mike", "us_surname":"Tyson", "us_address":"Neka Tamo 19, Novi Sad, 21000", "us_birth":"1966-06-30", "us_pic":"../assets/defaultuser.png", "us_phone":"+381612327879", "us_email":"mikey@gmail.com", "us_username":"mikesfury", "us_password":"MiK3*P4sS864"};

    return response_user;
}

// request.onreadystatechange = function() {
    // if(this.readyState == 4) {
    //     if(this.status == 200) {
            // var users = JSON.parse(request.responseText);
            // finish_users_rendering(users); 

        // }else {
        //     console.error('Error loading Users.')
        // }
    // }
// }

// request.open('GET', USERS_URL);
// request.send();

function makeUserCard(userObj){

    var userForm = document.getElementById('edit-form');
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to save the changes?") == true) {
            alert("Changes are saved!");
            // TODO: call save func
        }else{
            alert("Changes are not saved!");
        }
        to_users_page();
    });
    userForm.style.width = "70%";
    userForm.style.maxWidth = "60vh";

    var usernameInput = document.getElementById('see-more-link');
    usernameInput.style.maxWidth = '60%';
    usernameInput.value = userObj.us_username;
    
    var birthInput = document.getElementById('birth-input');
    birthInput.value = userObj.us_birth;

    var phoneInput = document.getElementById('phone-input');
    phoneInput.value = userObj.us_phone;
    
    var emailInput = document.getElementById('email-input');
    emailInput.value = userObj.us_email;
}


function scrollToTop(){
    window.scrollTo({ top: 0, behavior: "smooth" });
}


function to_users_page(){
    window.location.href = "users.html";
}
function to_homepage(){
    window.location.href = "index.html";
}