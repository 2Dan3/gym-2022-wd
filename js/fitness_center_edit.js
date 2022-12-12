// var main_content = document.getElementById('content');
// main_content.style.display = 'block';

// var FC_URL = "https://jsonplaceholder.typicode.com/photos"
// var TRAINING_URL = "https://jsonplaceholder.typicode.com/photos"

// Kada se ucita stranica ucita se FC sa Firebase-a
// var request = new XMLHttpRequest();

load_fitness_center();

async function load_fitness_center(){
    
    const loaded_fc = await request_fitness_center(null);
    // alert("Loading chosen fitness center...");
    
        finish_fitness_center_rendering(loaded_fc);
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
    
    var fitCentForm = document.getElementById('edit-form');
    fitCentForm.style.width = '56vh';
    fitCentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to save the changes?") == true) {
            alert("Changes are saved!");
            // TODO: call save func
        }else{
            alert("Changes are not saved!");
        }
        to_homepage();
    });

    var nameFCinput = document.getElementById('see-more-link');
    nameFCinput.value = fc.fc_name;

    var inputEst = document.getElementById('est');
    inputEst.value = fc.fc_est;

    var cardMiddlePic = document.getElementById('mid-img');
    cardMiddlePic.setAttribute('src', fc.fc_pic);

    var cardBottomThirdDiv = document.getElementById('address');
    cardBottomThirdDiv.value = fc.fc_address;
    var cardBottomFourthDiv = document.getElementById('price');
    cardBottomFourthDiv.value = fc.fc_memb_price;
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