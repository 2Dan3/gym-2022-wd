const USERS_URL = "https://fitnessandusers-default-rtdb.europe-west1.firebasedatabase.app";
const FC_URL = "https://fitnessandusers-default-rtdb.europe-west1.firebasedatabase.app";

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

async function finish_users_rendering(response){
    // setTimeout(() => {
        // users_array.map(makeUserCard);
        for (let id_key in response) {
            let user_obj = response[id_key];
            // console.log(fc_obj);
            makeUserCard(id_key, user_obj);
        }
        // alert("Successfully rendered!");
        // }, 2000);
}

async function request_all_users(){

    // const response_users = [
    // {"us_name":"Mike", "us_surname":"Tyson", "us_address":"Neka Tamo 19, Novi Sad, 21000", "us_birth":"1966-06-30", "us_pic":"../assets/defaultuser.png", "us_phone":"+381612327879", "us_email":"mikey@gmail.com", "us_username":"mikesfury", "us_password":"MiK3*P4sS864"},
    // {"us_name":"Zyzz", "us_surname":"King", "us_address":"Nova Ulicica 23, Novi Sad, 21000", "us_birth":"1989-10-11", "us_pic":"../assets/defaultuser.png", "us_phone":"+38164987321", "us_email":"zyzzy@yahoo.com", "us_username":"YungZz", "us_password":"ZyZZy*P4sS975"},
    // {"us_name":"Arnold", "us_surname":"Schwarzenegger", "us_address":"Trg Novih Ulica 32, Novi Sad, 21000", "us_birth":"1947-06-30", "us_pic":"../assets/defaultuser.png", "us_phone":"+381659993332", "us_email":"arny@hotmail.com", "us_username":"ArnySchwarz1", "us_password":"ArNy*P4sS420"},
    // {"us_name":"Andrew", "us_surname":"Tate", "us_address":"Ulica Stara 8, Novi Sad, 21000", "us_birth":"1986-12-14", "us_pic":"../assets/defaultuser.png", "us_phone":"+381698887773", "us_email":"tate@yahoo.com", "us_username":"TaTe28", "us_password":"TaTe*P4sS4220"},
    // ];

    
    var response_users;

    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(this.readyState == 4) {
            if(this.status == 200) {
                response_users = JSON.parse(req.responseText);
                console.log(response_users);
                finish_users_rendering(response_users);
            }else {
                console.error('Error loading Users.')
                return null
            }
        }
    }

    req.open('GET',  USERS_URL+ '/korisnici.json');
    req.send();

    return response_users;
}


function makeUserCard(id, userObj){
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
    banImg.addEventListener('click', () => ban_user(userObj.korisnickoIme, id));
    cardTopBanDiv.appendChild(banImg);
    cardTopDiv.appendChild(cardTopBanDiv);
    // 
    var cardTopLeftDiv = document.createElement('div');
    cardTopLeftDiv.classList.add('card-top-left');
    var aElement = document.createElement('a');
    aElement.setAttribute('id', 'see-more-link');
    aElement.setAttribute('href', './user.html?id=' + id);
    // Alternatively (for older browsers) aElement.innerHtml
    aElement.textContent = "@".concat(userObj.korisnickoIme);
    cardTopLeftDiv.appendChild(aElement);
    cardTopDiv.appendChild(cardTopLeftDiv);
    var cardTopRightDiv = document.createElement('div');
    cardTopRightDiv.classList.add('card-top-right');
    // cardTopRightDiv.textContent = userObj.us_birth;
    cardTopDiv.appendChild(cardTopRightDiv);
    cardContentWrapper.appendChild(cardTopDiv);

    // var cardMiddleDiv = document.createElement('div');
    // cardMiddleDiv.classList.add('card-middle');
    // var cardMiddlePic = document.createElement('img');
    // cardMiddlePic.setAttribute('src', userObj.us_pic);
    // cardMiddleDiv.appendChild(cardMiddlePic);
    // cardContentWrapper.appendChild(cardMiddleDiv);

    var cardBottomDiv = document.createElement('div');
    cardBottomDiv.classList.add('card-bottom');
    // var cardBottomLeftDiv = document.createElement('div');
    // cardBottomLeftDiv.classList.add('card-bottom-left');
    // cardBottomLeftDiv.textContent = userObj.us_phone;
    // cardBottomDiv.appendChild(cardBottomLeftDiv);
    
    var cardBottomRightDiv = document.createElement('div');
    cardBottomRightDiv.classList.add('card-bottom-right');
    cardBottomRightDiv.textContent = userObj.email;
    cardBottomDiv.appendChild(cardBottomRightDiv);
    cardContentWrapper.appendChild(cardBottomDiv);
}

async function ban_user(username, id){
    if (confirm("Remove @"+ username + "?")){
        var req = new XMLHttpRequest();
        
        req.onreadystatechange = function() {
            if(this.readyState == 4) {
                if(this.status == 200) {
                    alert("@" + username + " has been successfully removed.");
                    location.reload();
                }else {
                    console.error('Error deleting User.');
                    alert("An error occured while removing User.");
                }
            }
        }

        req.open('DELETE',  USERS_URL+ '/korisnici/' + id + '.json');
        req.send();
    }
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

// LOAD FITNESS CENTERS for Administrator

// Kada se ucita stranica ucitaju se svi FC sa servera
// var request = new XMLHttpRequest();

load_fitness_centers();

async function load_fitness_centers(){
    
    const response_array = await request_all_fitness_centers()
    // alert("Loading all fitness centers...");
    // setTimeout(() => {
        // finish_fitness_center_rendering(response_array);
    // }, 600);

}

async function finish_fitness_center_rendering(response){
    // setTimeout(() => {
        // fc_array.map(makeFitCenterCard);
        for (let id_key in response) {
            let fc_obj = response[id_key];
            // console.log(fc_obj);
            makeFitCenterCard(id_key, fc_obj);
        }
        // alert("Successfully rendered!");
        // }, 2000);
}

async function request_all_fitness_centers(){

    var response_fitness_centers;

    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(this.readyState == 4) {
            if(this.status == 200) {
                response_fitness_centers = JSON.parse(req.responseText);
                console.log(response_fitness_centers);
                finish_fitness_center_rendering(response_fitness_centers);
            }else {
                console.error('Error loading Fitness Centers.')
                return null
            }
        }
    }

    req.open('GET', FC_URL + '/fitnesCentri.json');
    req.send();

    return response_fitness_centers;
}


function makeFitCenterCard(id, fc){
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
    delImg.addEventListener('click', () => delete_fc(fc.naziv, id));
    cardTopDelDiv.appendChild(delImg);
    cardTopDiv.appendChild(cardTopDelDiv);
    // 
    var cardTopLeftDiv = document.createElement('div');
    cardTopLeftDiv.classList.add('card-top-left');
    var aElement = document.createElement('a');
    aElement.setAttribute('id', 'see-more-link');
    aElement.setAttribute('href', './fitcenter.html?id=' + id);
    // Alternatively (for older browsers) aElement.innerHtml
    aElement.textContent = fc.naziv;
    cardTopLeftDiv.appendChild(aElement);
    cardTopDiv.appendChild(cardTopLeftDiv);
    var cardTopRightDiv = document.createElement('div');
    cardTopRightDiv.classList.add('card-top-right');
    cardTopDiv.appendChild(cardTopRightDiv);
    cardContentWrapper.appendChild(cardTopDiv);

    // var cardMiddleDiv = document.createElement('div');
    // cardMiddleDiv.classList.add('card-middle');
    // var cardMiddlePic = document.createElement('img');
    // cardMiddlePic.setAttribute('src', fc.fc_pic);
    // cardMiddleDiv.appendChild(cardMiddlePic);
    // cardContentWrapper.appendChild(cardMiddleDiv);

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
    cardBottomRightDiv.textContent = fc.prosecnaOcena.toFixed(2);
    cardBottomDiv.appendChild(cardBottomRightDiv);
    cardContentWrapper.appendChild(cardBottomDiv);
}

async function delete_fc(name, id){
    if (confirm("Remove gym \""+ name + "\"?")){

        var req = new XMLHttpRequest();

        req.onreadystatechange = function() {
            if(this.readyState == 4) {
                if(this.status == 200) {
                    alert("Gym " + name + " has been successfully removed.");
                    location.reload();
                }else {
                    console.error('Error deleting Gym.');
                    alert("An error occured while deleting gym.");
                }
            }
        }

        req.open('DELETE',  FC_URL+ '/fitnesCentri/' + id + '.json');
        req.send();
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