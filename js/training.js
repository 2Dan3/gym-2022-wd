// var TRAINING_URL = "https://jsonplaceholder.typicode.com/photos"


// Kada se ucita stranica ucitaja se Trening sa servera
// var request = new XMLHttpRequest();

load_training(null);

async function load_training(wanted_training){
    
    const response_training = await request_training(wanted_training)
    // alert("Loading the training...");
    setTimeout(() => {
        finish_training_rendering(response_training);
    }, 600);

}

async function finish_training_rendering(loaded_training){
    // setTimeout(() => {
        makeTrainingCard(loaded_training);
        // alert("Successfully rendered!");
        // }, 2000);
}

async function request_training(wanted_training){

    // *TODO: load wanted_training from Firebase URL instead
    const response_training =
    {"tr_id":1, "tr_name":"Training 1", "tr_short_description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit.", "tr_duration":25, "tr_type":"YOGA", "tr_max_capacity":18, "tr_long_description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem omnis quibusdam ipsam illum laborum, aperiam inventore perspiciatis voluptatibus necessitatibus aliquid modi eius, voluptas unde laboriosam nisi itaque architecto aspernatur ipsa! Lorem ipsum dolor sit amet, consectetur adipisicing elit."};

    return response_training;
}

// request.onreadystatechange = function() {
    // if(this.readyState == 4) {
    //     if(this.status == 200) {
            // var trainings = JSON.parse(request.responseText);
            // finish_training_rendering(trainings); 

        // }else {
        //     console.error('Error loading Trainings.')
        // }
    // }
// }

// request.open('GET', TRAINING_URL);
// request.send();

function makeTrainingCard(training){
    // setTimeout(()=>{}, 1000);
    var mainContentDiv = document.getElementById('content');
    
    var trainingDiv = document.createElement('div');
    trainingDiv.classList.add('training-card');
    mainContentDiv.appendChild(trainingDiv);

    var cardContentWrapper = document.createElement('div');
    cardContentWrapper.classList.add('card-content-wrapper');
    trainingDiv.appendChild(cardContentWrapper);

    var cardTopDiv = document.createElement('div');
    cardTopDiv.classList.add('card-top');
    var cardTopLeftDiv = document.createElement('div');
    cardTopLeftDiv.classList.add('card-top-left');
    var aElement = document.createElement('a');
    aElement.setAttribute('id', 'see-more-link');
    // aElement.setAttribute('href', './training.html');
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

    // *TODO: Uncomment & css style cardLongDescription:

    // var cardLongDescription = document.createElement('div');
    // cardLongDescription.classList.add('card-long-description');
    // cardLongDescription.textContent = training.tr_long_description;
    // cardContentWrapper.appendChild(cardLongDescription);

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