// var main_content = document.getElementById('content');
// main_content.style.display = 'block';

// var FC_URL = "https://jsonplaceholder.typicode.com/photos"
// var TRAINING_URL = "https://jsonplaceholder.typicode.com/photos"

// Kada se ucita stranica ucita se FC sa Firebase-a
// var request = new XMLHttpRequest();

load_fitness_center();

async function load_fitness_center(){
    
    let id = getParamValue4('id');

    const loaded_fc = await request_fitness_center(id);
    // alert("Loading chosen fitness center...");
}

async function finish_fitness_center_rendering(id, loaded_fc){
    // setTimeout(() => {
        makeFitCenterCard(id, loaded_fc);
        // alert("Successfully rendered!");
        // }, 2000);
}

async function request_fitness_center(id){
    
    let request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if(this.readyState == 4) {
            if(this.status == 200) {
                let fc = JSON.parse(request.responseText);
                // console.log(fc);
                finish_fitness_center_rendering(id, fc); 
                return fc;
            }else {
                console.error('Error loading the Fitness Center.')
            }
        }
    }

    request.open('GET', "https://fitnessandusers-default-rtdb.europe-west1.firebasedatabase.app" + '/fitnesCentri/' + id + '.json');
    request.send();
}

function makeFitCenterCard(id, fc){
    
    var fitCentForm = document.getElementById('edit-form');
    fitCentForm.style.width = '56vh';
    fitCentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if ( !isFCFormValid() ) {
            alert("Not all fields were filled!");
            return;
        }

        if (window.confirm("Are you sure you want to save the changes?") == true) {
            alert("Changes are saved!");
            // TODO: call save func
        }else{
            alert("Changes are not saved!");
        }
        to_homepage();
    });

    var nameFCinput = document.getElementById('see-more-link');
    nameFCinput.setAttribute('class', 'edit-fc-field');
    nameFCinput.value = fc.naziv;

    var inputEst = document.getElementById('est');
    inputEst.setAttribute('class', 'edit-fc-field');
    inputEst.value = fc.godinaOtvaranja;

    var cardMiddlePic = document.getElementById('mid-img');
    cardMiddlePic.setAttribute('src', fc.slika);

    var cardBottomThirdDiv = document.getElementById('address');
    cardBottomThirdDiv.setAttribute('class', 'edit-fc-field');
    cardBottomThirdDiv.value = fc.adresa;
    var cardBottomFourthDiv = document.getElementById('price');
    cardBottomFourthDiv.value = fc.mesecnaClanarina;
    cardBottomFourthDiv.setAttribute('class', 'edit-fc-field');
    cardBottomFourthDiv.style.marginTop = '10px';

    // var submitBtn = document.getElementById('submit-edit');
    // submitBtn.onclick = () => {
        
    //     alert("Changes are saved!");
    //     to_homepage();
    // }
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

function getParamValue4(name) {
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

function isFCFormValid(){

    let fields = document.getElementsByClassName('edit-fc-field');
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        if (field.value == undefined || field.value == null || field.value == "") {
            return false;
        }
    }
    return true;
}