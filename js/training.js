// var TRAINING_URL = "https://jsonplaceholder.typicode.com/photos"


// Kada se ucita stranica ucitaja se Trening sa servera
// var request = new XMLHttpRequest();

var single_tr_id = getParamValue0('id');
var tr_group_id = getParamValue0('group');

load_training(single_tr_id, tr_group_id);

async function load_training(wanted_training_id, tr_group_id){
    
    const response_training = await request_training(wanted_training_id, tr_group_id)
    // alert("Loading the training...");
    // setTimeout(() => {
        // finish_training_rendering(response_training);
    // }, 600);

}

async function finish_training_rendering(loaded_training){
    // setTimeout(() => {
        makeTrainingCard(loaded_training);
        // alert("Successfully rendered!");
        // }, 2000);
}

async function request_training(chosen_training_id, tr_group_id){
    
    let request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if(this.readyState == 4) {
            if(this.status == 200) {
                let training = JSON.parse(request.responseText);
                // console.log(training);
                finish_training_rendering(training); 
                return training;
            }else {
                console.error('Error loading chosen Training.')
            }
        }
    }

    request.open('GET', "https://fitnessandusers-default-rtdb.europe-west1.firebasedatabase.app" + '/treninzi/' + tr_group_id +'/' + chosen_training_id + '.json');
    request.send();
}

function makeTrainingCard(training){
    // setTimeout(()=>{}, 1000);
    var mainContentDiv = document.getElementById('content');
    
    var trainingDiv = document.createElement('div');
    trainingDiv.classList.add('training-card');
    trainingDiv.style.width = '60vh';
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
    aElement.textContent = training.naziv;
    cardTopLeftDiv.appendChild(aElement);
    cardTopDiv.appendChild(cardTopLeftDiv);
    var cardTopRightDiv = document.createElement('div');
    cardTopRightDiv.classList.add('card-top-right');
    cardTopRightDiv.textContent = "~" + training.trajanje + "m";
    cardTopDiv.appendChild(cardTopRightDiv);
    cardContentWrapper.appendChild(cardTopDiv);

    var cardMiddleDiv = document.createElement('div');
    cardMiddleDiv.classList.add('card-middle');
    var cardMiddlePic = document.createElement('img');
    cardMiddlePic.setAttribute('src', '../assets/training.jpg');
    cardMiddleDiv.appendChild(cardMiddlePic);
    cardContentWrapper.appendChild(cardMiddleDiv);

    // *TODO: Uncomment & css style cardLongDescription:

    var cardLongDescription = document.createElement('div');
    cardLongDescription.classList.add('card-long-description');
    cardLongDescription.textContent = training.opis;
    cardContentWrapper.appendChild(cardLongDescription);

    var cardBottomDiv = document.createElement('div');
    cardBottomDiv.classList.add('card-bottom');
    var cardBottomLeftDiv = document.createElement('div');
    cardBottomLeftDiv.classList.add('card-bottom-left');
    cardBottomLeftDiv.textContent = training.zanr;
    cardBottomDiv.appendChild(cardBottomLeftDiv);
    var cardBottomRightDiv = document.createElement('div');
    cardBottomRightDiv.classList.add('card-bottom-right');
    cardBottomRightDiv.textContent = "Max. people: " + training.maxOsobe;
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

function getParamValue0(name) {
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