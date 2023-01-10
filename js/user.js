// var USERS_URL = "https://jsonplaceholder.typicode.com/photos"


// Kada se ucita stranica ucitaju se svi USERS sa servera
// var request = new XMLHttpRequest();

load_users();

async function load_users(){
    
    let user_id = getParamValue1('id');

    const response_array = await request_user(user_id)
    // alert("Loading all fitness centers...");
    // setTimeout(() => {
    //     finish_users_rendering(response_array);
    // }, 600);

}

async function finish_users_rendering(id, user){
    makeUserCard(id, user);
}

async function request_user(id) {

    let request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if(this.readyState == 4) {
            if(this.status == 200) {
                let user = JSON.parse(request.responseText);
                // console.log(user);
                finish_users_rendering(id, user); 
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
    // setTimeout(()=>{}, 1000);
    var mainContentDiv = document.getElementById('content');
    
    var userDiv = document.createElement('div');
    userDiv.classList.add('user-card');
    userDiv.style.width = "70%";
    userDiv.style.maxWidth = "60vh";
    mainContentDiv.appendChild(userDiv);

    var cardContentWrapper = document.createElement('div');
    cardContentWrapper.classList.add('card-content-wrapper');
    userDiv.appendChild(cardContentWrapper);

    var cardTopDiv = document.createElement('div');
    cardTopDiv.classList.add('card-top');
    
    var cardTopEditDiv = document.createElement('div');
    cardTopEditDiv.classList.add('card-top-edit');
    var editImg = document.createElement('img');
    editImg.setAttribute('class', 'edit-img');
    editImg.setAttribute('src', '../assets/edit.jpg');
    editImg.addEventListener('click', () => { window.location.href = "edituser.html?id=" + id;});
    cardTopEditDiv.appendChild(editImg);
    cardTopDiv.appendChild(cardTopEditDiv);
    
    var cardTopLeftDiv = document.createElement('div');
    cardTopLeftDiv.classList.add('card-top-left');
    var aElement = document.createElement('a');
    aElement.setAttribute('id', 'see-more-link');
    // aElement.setAttribute('href', './user.html');
    // Alternatively (for older browsers) aElement.innerHtml
    aElement.textContent = "@".concat(userObj.korisnickoIme);
    cardTopLeftDiv.appendChild(aElement);
    cardTopDiv.appendChild(cardTopLeftDiv);
    var cardTopRightDiv = document.createElement('div');
    cardTopRightDiv.classList.add('card-top-right');
    cardTopRightDiv.textContent = userObj.datumRodjenja;
    cardTopDiv.appendChild(cardTopRightDiv);
    cardContentWrapper.appendChild(cardTopDiv);

    var cardMiddleDiv = document.createElement('div');
    cardMiddleDiv.classList.add('card-middle');
    var cardMiddlePic = document.createElement('img');
    cardMiddlePic.setAttribute('src', '../assets/defaultuser.png');
    cardMiddleDiv.appendChild(cardMiddlePic);
    cardContentWrapper.appendChild(cardMiddleDiv);

    var cardBottomDiv = document.createElement('div');
    cardBottomDiv.classList.add('card-bottom');
    var cardBottomLeftDiv = document.createElement('div');
    cardBottomLeftDiv.classList.add('card-bottom-left');
    cardBottomLeftDiv.textContent = userObj.telefon;
    
    cardBottomDiv.appendChild(cardBottomLeftDiv);
    var cardBottomRightDiv = document.createElement('div');
    cardBottomRightDiv.classList.add('card-bottom-right');
    cardBottomRightDiv.textContent = userObj.email;
    cardBottomDiv.appendChild(cardBottomRightDiv);
    cardContentWrapper.appendChild(cardBottomDiv);
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

function ban_user(username){
    if (confirm("Ban @"+ username + "?")){
        // *TODO: DELETE HTTP Req

        alert("@" + username + " has been successfully deleted.");
        location.reload();
    }
}

function getParamValue1(name) {
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