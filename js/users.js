// var USERS_URL = "https://jsonplaceholder.typicode.com/photos"


// Kada se ucita stranica ucitaju se svi USERS sa servera
// var request = new XMLHttpRequest();

load_users();

async function load_users(){
    
    const response_array = await request_all_users()
    // alert("Loading all fitness centers...");
    setTimeout(() => {
        finish_users_rendering(response_array);
    }, 600);

}

async function finish_users_rendering(users_array){
    // setTimeout(() => {
        users_array.map(makeUserCard);
        // alert("Successfully rendered!");
        // }, 2000);
}

async function request_all_users(){

    const response_users = [
    {"us_name":"Mike", "us_surname":"Tyson", "us_address":"Neka Tamo 19, Novi Sad, 21000", "us_birth":"1966-06-30", "us_pic":"../assets/defaultuser.png", "us_phone":"+381612327879", "us_email":"mikey@gmail.com", "us_username":"mikesfury", "us_password":"MiK3*P4sS864"},
    {"us_name":"Zyzz", "us_surname":"King", "us_address":"Nova Ulicica 23, Novi Sad, 21000", "us_birth":"1989-10-11", "us_pic":"../assets/defaultuser.png", "us_phone":"+38164987321", "us_email":"zyzzy@yahoo.com", "us_username":"YungZz", "us_password":"ZyZZy*P4sS975"},
    {"us_name":"Arnold", "us_surname":"Schwarzenegger", "us_address":"Trg Novih Ulica 32, Novi Sad, 21000", "us_birth":"1947-06-30", "us_pic":"../assets/defaultuser.png", "us_phone":"+381659993332", "us_email":"arny@hotmail.com", "us_username":"ArnySchwarz1", "us_password":"ArNy*P4sS420"},
    {"us_name":"Andrew", "us_surname":"Tate", "us_address":"Ulica Stara 8, Novi Sad, 21000", "us_birth":"1986-12-14", "us_pic":"../assets/defaultuser.png", "us_phone":"+381698887773", "us_email":"tate@yahoo.com", "us_username":"TaTe28", "us_password":"TaTe*P4sS4220"},
    ];

    return response_users;
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
    // setTimeout(()=>{}, 1000);
    var mainContentDiv = document.getElementById('content');
    
    var userDiv = document.createElement('div');
    userDiv.classList.add('user-card');
    mainContentDiv.appendChild(userDiv);

    var cardContentWrapper = document.createElement('div');
    cardContentWrapper.classList.add('card-content-wrapper');
    userDiv.appendChild(cardContentWrapper);

    var cardTopDiv = document.createElement('div');
    cardTopDiv.classList.add('card-top');
    // ban img test
    var cardTopBanDiv = document.createElement('div');
    cardTopBanDiv.classList.add('card-top-ban');
    var banImg = document.createElement('img');
    banImg.setAttribute('class', 'ban-img');
    banImg.setAttribute('src', '../assets/banuser.jpg');
    banImg.addEventListener('click', () => ban_user(userObj.us_username));
    cardTopBanDiv.appendChild(banImg);
    cardTopDiv.appendChild(cardTopBanDiv);
    // 
    var cardTopLeftDiv = document.createElement('div');
    cardTopLeftDiv.classList.add('card-top-left');
    var aElement = document.createElement('a');
    aElement.setAttribute('id', 'see-more-link');
    aElement.setAttribute('href', './user.html');
    // Alternatively (for older browsers) aElement.innerHtml
    aElement.textContent = "@".concat(userObj.us_username);
    cardTopLeftDiv.appendChild(aElement);
    cardTopDiv.appendChild(cardTopLeftDiv);
    var cardTopRightDiv = document.createElement('div');
    cardTopRightDiv.classList.add('card-top-right');
    // cardTopRightDiv.textContent = userObj.us_birth;
    cardTopDiv.appendChild(cardTopRightDiv);
    cardContentWrapper.appendChild(cardTopDiv);

    var cardMiddleDiv = document.createElement('div');
    cardMiddleDiv.classList.add('card-middle');
    var cardMiddlePic = document.createElement('img');
    cardMiddlePic.setAttribute('src', userObj.us_pic);
    cardMiddleDiv.appendChild(cardMiddlePic);
    cardContentWrapper.appendChild(cardMiddleDiv);

    var cardBottomDiv = document.createElement('div');
    cardBottomDiv.classList.add('card-bottom');
    // var cardBottomLeftDiv = document.createElement('div');
    // cardBottomLeftDiv.classList.add('card-bottom-left');
    // cardBottomLeftDiv.textContent = userObj.us_phone;
    // cardBottomDiv.appendChild(cardBottomLeftDiv);
    
    var cardBottomRightDiv = document.createElement('div');
    cardBottomRightDiv.classList.add('card-bottom-right');
    cardBottomRightDiv.textContent = userObj.us_email;
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
    window.location.href = "homepage.html";
}

function ban_user(username){
    if (confirm("Ban @"+ username + "?")){
        // *TODO: DELETE HTTP Req

        alert("@" + username + " has been successfully deleted.");
        location.reload();
    }
}