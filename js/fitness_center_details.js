// var main_content = document.getElementById('content');
// main_content.style.display = 'block';

// var FC_URL = "https://jsonplaceholder.typicode.com/photos"
// var TRAINING_URL = "https://jsonplaceholder.typicode.com/photos"

// Kada se ucita stranica ucitaju se svi FC sa servera
// var request = new XMLHttpRequest();

load_fitness_center();

async function load_fitness_center(){
    
    const loaded_fc = await request_fitness_center(null);
    // alert("Loading chosen fitness center...");
    setTimeout(() => {
        finish_fitness_center_rendering(loaded_fc);
    }, 600);

}

async function finish_fitness_center_rendering(loaded_fc){
    // setTimeout(() => {
        makeFitCenterCard(loaded_fc);
        // alert("Successfully rendered!");
        // }, 2000);
}

async function request_fitness_center(fc_to_load){

    // *TODO: load from Firebase URL instead
    const response_fc =
    {"fc_id":1, "fc_name":"Pumpin' Iron", "fc_address":"Neka Tamo 58a, Novi Sad, 21000", "fc_est":2006, "fc_pic":"../assets/gympic.png", "fc_tr_num":3, "fc_memb_price":2490, "fc_ratings_avg":4.5, "fc_ratings_num":2};

    return response_fc;
}

// request.onreadystatechange = function() {
    // if(this.readyState == 4) {
    //     if(this.status == 200) {
            // var fc = JSON.parse(request.responseText);
            // finish_fitness_center_rendering(fc); 

        // }else {
        //     console.error('Error loading the Fitness Center.')
        // }
    // }
// }

// request.open('GET', FC_URL);
// request.send();

function makeFitCenterCard(fc){
    // setTimeout(()=>{}, 1000);
    var mainContentDiv = document.getElementById('content');
    
    var fitCentDiv = document.createElement('div');
    fitCentDiv.classList.add('fit-cent');
    fitCentDiv.style.width = '56vh';
    mainContentDiv.appendChild(fitCentDiv);
    
    // TRAINING LIST IS INITIALIZED ONCE
    var trainingsListDiv = document.createElement('div');
    trainingsListDiv.setAttribute('id', 'trainings-list');
    trainingsListDiv.style.display = 'none';
    mainContentDiv.appendChild(trainingsListDiv);

    var cardContentWrapper = document.createElement('div');
    cardContentWrapper.classList.add('card-content-wrapper');
    fitCentDiv.appendChild(cardContentWrapper);

    var cardTopDiv = document.createElement('div');
    cardTopDiv.classList.add('card-top');
    var cardTopLeftDiv = document.createElement('div');
    cardTopLeftDiv.classList.add('card-top-left');
    var aElement = document.createElement('a');
    aElement.setAttribute('id', 'see-more-link');
    // aElement.setAttribute('href', './fitcenter.html');
    // Alternatively (for older browsers) aElement.innerHtml
    aElement.textContent = fc.fc_name;
    cardTopLeftDiv.appendChild(aElement);
    cardTopDiv.appendChild(cardTopLeftDiv);
    var cardTopRightDiv = document.createElement('div');
    cardTopRightDiv.classList.add('card-top-right');
    cardTopRightDiv.textContent = "Est. " + fc.fc_est;
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
    cardBottomLeftDiv.textContent = fc.fc_ratings_num + " people rated this gym!";
    cardBottomDiv.appendChild(cardBottomLeftDiv);

    var cardBottomRightDiv = document.createElement('div');
    cardBottomRightDiv.classList.add('card-bottom-right');
    cardBottomRightDiv.textContent = fc.fc_ratings_avg.toFixed(1);
    // 
    var starRatingPic = document.createElement('img');
    starRatingPic.setAttribute('src', '../assets/star.jpg');
    starRatingPic.setAttribute('id', 'star-rating');
    cardBottomRightDiv.appendChild(starRatingPic);
    cardBottomDiv.appendChild(cardBottomRightDiv);

    var cardBottomThirdDiv = document.createElement('div');
    cardBottomThirdDiv.classList.add('card-bottom-third');
    cardBottomThirdDiv.textContent = fc.fc_address;
    cardBottomDiv.appendChild(cardBottomThirdDiv);
    var cardBottomFourthDiv = document.createElement('div');
    cardBottomFourthDiv.classList.add('card-bottom-fourth');
    cardBottomFourthDiv.textContent = fc.fc_tr_num + " trainings";
    // 
    cardBottomFourthDiv.onclick = () => { 
        cardBottomFourthDiv.style.display = 'none';
        trainingsListDiv.style.display = 'block';
        load_trainings(null);
        
        // fitCentDiv.style.position = 'fixed';
        // fitCentDiv.style.left = '5%'
    };
    cardBottomDiv.appendChild(cardBottomFourthDiv);

    cardContentWrapper.appendChild(cardBottomDiv);
}


async function load_trainings(wanted_trainings){
    
    const response_array = await request_all_trainings(wanted_trainings)
    // alert("Loading the trainings...");
    setTimeout(() => {
        finish_training_rendering(response_array);
    }, 600);

}

async function finish_training_rendering(training_array){
    // setTimeout(() => {
        training_array.map(makeTrainingCard);
        // alert("Successfully rendered!");
        // }, 2000);
}

async function request_all_trainings(wanted_trainings){

    // *TODO: load wanted_trainings from firebase URL instead
    const response_trainings = [
    {"tr_id":1, "tr_name":"Training 1", "tr_short_description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit.", "tr_duration":25, "tr_type":"YOGA", "tr_max_capacity":18, "tr_long_description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem omnis quibusdam ipsam illum laborum."},
    {"tr_id":2, "tr_name":"Training 2", "tr_short_description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit.", "tr_duration":35, "tr_type":"BODY PUMP", "tr_max_capacity":24, "tr_long_description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem omnis quibusdam ipsam illum laborum."},
    {"tr_id":3, "tr_name":"Training 3", "tr_short_description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit.", "tr_duration":45, "tr_type":"AEROBIC", "tr_max_capacity":32, "tr_long_description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem omnis quibusdam ipsam illum laborum."},
    ];

    return response_trainings;
}

function makeTrainingCard(training){
    // TRAINING LIST IS FILLED HERE
    var trainingsListDiv = document.getElementById('trainings-list');
    
    var trainingDiv = document.createElement('div');
    trainingDiv.classList.add('training-card');
    trainingsListDiv.appendChild(trainingDiv);

    var cardContentWrapper = document.createElement('div');
    cardContentWrapper.classList.add('card-content-wrapper');
    trainingDiv.appendChild(cardContentWrapper);

    var cardTopDiv = document.createElement('div');
    cardTopDiv.classList.add('card-top');
    var cardTopLeftDiv = document.createElement('div');
    cardTopLeftDiv.classList.add('card-top-left');
    var aElement = document.createElement('a');
    aElement.setAttribute('id', 'see-more-link');
    aElement.setAttribute('href', './training.html');
    // Alternatively (for older browsers) aElement.innerHtml
    aElement.textContent = training.tr_name;
    cardTopLeftDiv.appendChild(aElement);
    cardTopDiv.appendChild(cardTopLeftDiv);
    var cardTopRightDiv = document.createElement('div');
    cardTopRightDiv.classList.add('card-top-right');
    cardTopRightDiv.textContent = "~" + training.tr_duration + "m";
    cardTopDiv.appendChild(cardTopRightDiv);
    cardContentWrapper.appendChild(cardTopDiv);

    var cardMiddleDiv = document.createElement('div');
    cardMiddleDiv.classList.add('card-middle');
    var cardMiddlePic = document.createElement('img');
    cardMiddlePic.setAttribute('src', '../assets/gympic4.jpg');
    cardMiddleDiv.appendChild(cardMiddlePic);
    cardContentWrapper.appendChild(cardMiddleDiv);

    var cardLongDescription = document.createElement('div');
    cardLongDescription.classList.add('card-long-description');
    cardLongDescription.textContent = training.tr_long_description;
    cardContentWrapper.appendChild(cardLongDescription);

    var cardBottomDiv = document.createElement('div');
    cardBottomDiv.classList.add('card-bottom');
    var cardBottomLeftDiv = document.createElement('div');
    cardBottomLeftDiv.classList.add('card-bottom-left');
    cardBottomLeftDiv.textContent = training.tr_type;
    cardBottomDiv.appendChild(cardBottomLeftDiv);
    var cardBottomRightDiv = document.createElement('div');
    cardBottomRightDiv.classList.add('card-bottom-right');
    cardBottomRightDiv.textContent = "Max. people: " + training.tr_max_capacity;
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
// all_fitness_centers.push(
//     )
// var fitness_center = {
//     fc_id,
//     fc_name,
//     fc_address,
//     fc_est,
//     fc_pic,
//     fc_tr_num,
//     fc_memb_price,
//     fc_ratings_avg,
//     fc_ratings_num
// }
// var newFitC = new fitness_center