// var USERS_URL = "https://jsonplaceholder.typicode.com/photos"
// var FC_URL = "https://jsonplaceholder.typicode.com/photos"

// Kada se ucita stranica ucitaju se svi USERS sa servera
// var request = new XMLHttpRequest();
var topLvlContent = document.getElementById('content');
topLvlContent.style.display = 'block';
var usersContent = document.getElementById('users-content');
var fcsContent = document.getElementById('fitness-centers-content');

( function alignContent() {
    usersContent.style.display = 'flex';
    usersContent.style.flexWrap = 'wrap';
    fcsContent.style.display = 'flex';
    fcsContent.style.flexWrap = 'wrap';
}) ();

load_users();

async function load_users(){
    
    const response_array = await request_all_users()
    // alert("Loading all fitness centers...");
    // setTimeout(() => {
        finish_users_rendering(response_array);
    // }, 600);

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
    var mainContentDiv = usersContent;
    
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

function ban_user(username){
    if (confirm("Ban @"+ username + "?")){
        // *TODO: DELETE HTTP Req

        alert("@" + username + " has been successfully deleted.");
        location.reload();
    }
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

// LOAD FITNESS CENTERS for Administrator

// Kada se ucita stranica ucitaju se svi FC sa servera
// var request = new XMLHttpRequest();

load_fitness_centers();

async function load_fitness_centers(){
    
    const response_array = await request_all_fitness_centers()
    // alert("Loading all fitness centers...");
    // setTimeout(() => {
        finish_fitness_center_rendering(response_array);
    // }, 600);

}

async function finish_fitness_center_rendering(fc_array){
    // setTimeout(() => {
        fc_array.map(makeFitCenterCard);
        // alert("Successfully rendered!");
        // }, 2000);
}

async function request_all_fitness_centers(){

    const response_fitness_centers = [
    {"fc_id":1, "fc_name":"Pumpin' Iron", "fc_address":"Neka Tamo 58a, Novi Sad, 21000", "fc_est":2006, "fc_pic":"../assets/gympic.png", "fc_tr_num":3, "fc_memb_price":2490, "fc_ratings_avg":4.5, "fc_ratings_num":2},
    {"fc_id":2, "fc_name":"Leg-go!", "fc_address":"Trg Novih Ulica 11, Novi Sad, 21000", "fc_est":1998, "fc_pic":"../assets/gympic2.jpg", "fc_tr_num":2, "fc_memb_price":2099, "fc_ratings_avg":4.0, "fc_ratings_num":3},
    {"fc_id":3, "fc_name":"Load", "fc_address":"Nova Ulicica 11, Novi Sad, 21000", "fc_est":2001, "fc_pic":"../assets/gympic3.png", "fc_tr_num":2, "fc_memb_price":2690, "fc_ratings_avg":4.0, "fc_ratings_num":3},
    {"fc_id":4, "fc_name":"Armed&Ready", "fc_address":"Trg Novih Ulica 83, Novi Sad, 21000", "fc_est":2021, "fc_pic":"../assets/gympic4.png", "fc_tr_num":3, "fc_memb_price":2890, "fc_ratings_avg":5, "fc_ratings_num":1},
    {"fc_id":5, "fc_name":'Drop \'em!', "fc_address":"Ulica Nova 27b, Novi Sad, 21000", "fc_est":2011, "fc_pic":"../assets/gympic5.jpg", "fc_tr_num":1, "fc_memb_price":1990, "fc_ratings_avg":4.5, "fc_ratings_num":2},
    {"fc_id":6, "fc_name":"Walk the talk", "fc_address":"Ulica Stara 71, Novi Sad, 21000", "fc_est":2021, "fc_pic":"../assets/gympic6.png", "fc_tr_num":1, "fc_memb_price":1890, "fc_ratings_avg":3.67, "fc_ratings_num":3},
    {"fc_id":7, "fc_name":"Testosterone", "fc_address":"Ulicica Starija 19a, Novi Sad, 21000", "fc_est":2022, "fc_pic":"../assets/gympic7.jpg", "fc_tr_num":2, "fc_memb_price":2790, "fc_ratings_avg":4.0, "fc_ratings_num":1},
    {"fc_id":8, "fc_name":"Stronger than yesterday", "fc_address":"Ulicica Skorasnja 29, Novi Sad, 21000", "fc_est":2021, "fc_pic":"../assets/gympic8.png", "fc_tr_num":2, "fc_memb_price":2090, "fc_ratings_avg":4, "fc_ratings_num":1},
    ];

    return response_fitness_centers;
}

// request.onreadystatechange = function() {
    // if(this.readyState == 4) {
    //     if(this.status == 200) {
            // var fcs = JSON.parse(request.responseText);
            // finish_fitness_center_rendering(fcs); 

        // }else {
        //     console.error('Error loading Fitness Centers.')
        // }
    // }
// }

// request.open('GET', FC_URL);
// request.send();

function makeFitCenterCard(fc){
    // setTimeout(()=>{}, 1000);
    var mainContentDiv = fcsContent;
    
    var fitCentDiv = document.createElement('div');
    fitCentDiv.classList.add('fit-cent');
    mainContentDiv.appendChild(fitCentDiv);

    var cardContentWrapper = document.createElement('div');
    cardContentWrapper.classList.add('card-content-wrapper');
    fitCentDiv.appendChild(cardContentWrapper);

    var cardTopDiv = document.createElement('div');
    cardTopDiv.classList.add('card-top');
    // ban img test
    var cardTopDelDiv = document.createElement('div');
    cardTopDelDiv.classList.add('card-top-ban');
    var delImg = document.createElement('img');
    delImg.setAttribute('class', 'ban-img');
    delImg.setAttribute('src', '../assets/banuser.jpg');
    delImg.addEventListener('click', () => delete_fc(fc.fc_name));
    cardTopDelDiv.appendChild(delImg);
    cardTopDiv.appendChild(cardTopDelDiv);
    // 
    var cardTopLeftDiv = document.createElement('div');
    cardTopLeftDiv.classList.add('card-top-left');
    var aElement = document.createElement('a');
    aElement.setAttribute('id', 'see-more-link');
    aElement.setAttribute('href', './fitcenter.html');
    // Alternatively (for older browsers) aElement.innerHtml
    aElement.textContent = fc.fc_name;
    cardTopLeftDiv.appendChild(aElement);
    cardTopDiv.appendChild(cardTopLeftDiv);
    var cardTopRightDiv = document.createElement('div');
    cardTopRightDiv.classList.add('card-top-right');
    cardTopDiv.appendChild(cardTopRightDiv);
    cardContentWrapper.appendChild(cardTopDiv);

    var cardMiddleDiv = document.createElement('div');
    cardMiddleDiv.classList.add('card-middle');
    var cardMiddlePic = document.createElement('img');
    cardMiddlePic.setAttribute('src', fc.fc_pic);
    cardMiddleDiv.appendChild(cardMiddlePic);
    cardContentWrapper.appendChild(cardMiddleDiv);

    var cardBottomDiv = document.createElement('div');
    cardBottomDiv.classList.add('card-bottom');
    var cardBottomLeftDiv = document.createElement('div');
    cardBottomLeftDiv.classList.add('card-bottom-left');
// 
    var starRatingPic = document.createElement('img');
    starRatingPic.setAttribute('src', '../assets/star.jpg');
    starRatingPic.setAttribute('id', 'star-rating');
    cardBottomLeftDiv.appendChild(starRatingPic);
// 
    cardBottomDiv.appendChild(cardBottomLeftDiv);
    var cardBottomRightDiv = document.createElement('div');
    cardBottomRightDiv.classList.add('card-bottom-right');
    cardBottomRightDiv.textContent = fc.fc_ratings_avg.toFixed(1);
    cardBottomDiv.appendChild(cardBottomRightDiv);
    cardContentWrapper.appendChild(cardBottomDiv);
}

function delete_fc(name){
    if (confirm("Delete gym \""+ name + "\"?")){
        // *TODO: DELETE HTTP Req

        alert("Gym" + name + " has been successfully deleted.");
        location.reload();
    }
}

document.getElementById('user-scroll').onclick = () => {
    location.href = '#';
    location.href = '#users-content';
};
document.getElementById('gym-scroll').onclick = () => {
    location.href = '#';
    location.href = '#fitness-centers-content';
};