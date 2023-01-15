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

        if ( !isUserFormValid() ) {
            alert("Not all fields were filled!");
            return;
        }

        if (window.confirm("Are you sure you want to save the changes?") == true) {
            
            let username = document.getElementById('see-more-link').value.trim();
            let birth = document.getElementById('birth-input').value.toString();
            let phone = document.getElementById('phone-input').value.toString();
            let email = document.getElementById('email-input').value;
            let address = document.getElementById('address-input').value.toString();
            let name = document.getElementById('name-input').value.trim();
            let surname = document.getElementById('surname-input').value.trim();
            user_edited = 
            {   
                "adresa":address,
                "datumRodjenja":birth,
                "email":email,
                "ime":name,
                "lozinka":userObj.lozinka,
                "prezime":surname,
                "telefon":phone,
                "korisnickoIme":username
            };

            var req = new XMLHttpRequest();

            req.onreadystatechange = function() {
                if(this.readyState == 4) {
                    if(this.status == 200) {
                        alert("Changes were saved!");
                    }else {
                        console.error('Error editing User.');
                        alert("An error occured while editing User.");
                    }
                    to_users_page();
                }
            }
            // console.log("form obj: " + JSON.stringify(user_edited));
            req.open('PUT',  'https://fitnessandusers-default-rtdb.europe-west1.firebasedatabase.app' + '/korisnici/' + id + '.json');
            req.send(JSON.stringify(user_edited));
        }else{
            alert("Changes were canceled.");
        }
    });
    userForm.style.width = "70%";
    userForm.style.maxWidth = "60vh";

    var usernameInput = document.getElementById('see-more-link');
    usernameInput.style.maxWidth = '60%';
    usernameInput.value = userObj.korisnickoIme;
    
    var birthInput = document.getElementById('birth-input');
    birthInput.setAttribute('class', 'edit-user-field');
    birthInput.value = userObj.datumRodjenja;

    var phoneInput = document.getElementById('phone-input');
    phoneInput.setAttribute('class', 'edit-user-field');
    phoneInput.value = userObj.telefon;
    
    var emailInput = document.getElementById('email-input');
    emailInput.setAttribute('class', 'edit-user-field');``
    emailInput.value = userObj.email;

    var nameInput = document.getElementById('name-input');
    // nameInput.style.maxWidth = '60%';
    nameInput.value = userObj.ime;

    var surnameInput = document.getElementById('surname-input');
    // surnameInput.style.maxWidth = '60%';
    surnameInput.value = userObj.prezime;

    var addressInput = document.getElementById('address-input');
    addressInput.value = userObj.adresa;
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
    }``
}

function isUserFormValid(){

    let fields = document.getElementsByClassName('edit-user-field');
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        if (field.value == undefined || field.value == null || field.value == "") {
            return false;
        }
    }
    return true;
}