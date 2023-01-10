// var USERS_URL = "https://jsonplaceholder.typicode.com/photos"


// Kada se ucita stranica ucita se USER sa Firebase
// var request = new XMLHttpRequest();

load_user();

async function load_user(){

    let id = getParamValue2('id');

    const response = await request_user(id);
    //   ...
}

async function finish_user_rendering(id, user){
    // setTimeout(() => {
        makeUserCard(id, user);
        // alert("Successfully rendered!");
        // }, 2000);
}

async function request_user(id){

    let request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if(this.readyState == 4) {
            if(this.status == 200) {
                let user = JSON.parse(request.responseText);
                // console.log(user);
                makeUserCard(id, user); 
                return user;
            }else {
                console.error('Error loading the User.')
            }
        }
    }

    request.open('GET', "https://fitnessandusers-default-rtdb.europe-west1.firebasedatabase.app" + '/korisnici/' + id + '.json');
    request.send();
}

function makeUserCard(id, userObj){

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
    usernameInput.value = userObj.korisnickoIme;
    
    var birthInput = document.getElementById('birth-input');
    birthInput.value = userObj.datumRodjenja;

    var phoneInput = document.getElementById('phone-input');
    phoneInput.value = userObj.telefon;
    
    var emailInput = document.getElementById('email-input');
    emailInput.value = userObj.email;
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

function getParamValue2(name) {
    var location = decodeURI(window.location.toString());
    var index = location.indexOf("?") + 1;
    var subs = location.substring(index, location.length);
    var splitted = subs.split("&");

    for (i = 0; i < splitted.length; i++) {
        var s = splitted[i].split("=");
        var pName = s[0];
        var pValue = s[1];
        if (pName == name) {
            return pValue;
        }
    }
}