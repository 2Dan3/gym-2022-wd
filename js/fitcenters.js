// var FC_URL = "https://jsonplaceholder.typicode.com/photos"


// Kada se ucita stranica ucitaju se svi FC sa servera
// var request = new XMLHttpRequest();

load_fitness_centers();

async function load_fitness_centers(){
    
    const response_array = await request_all_fitness_centers()
    // alert("Loading all fitness centers...");
    setTimeout(() => {
        finish_fitness_center_rendering(response_array);
    }, 600);

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
    {"fc_id":3, "fc_name":"Loading...", "fc_address":"Nova Ulicica 11, Novi Sad, 21000", "fc_est":2001, "fc_pic":"../assets/gympic3.png", "fc_tr_num":2, "fc_memb_price":2690, "fc_ratings_avg":4.0, "fc_ratings_num":3},
    {"fc_id":4, "fc_name":"Armed&Ready", "fc_address":"Trg Novih Ulica 83, Novi Sad, 21000", "fc_est":2021, "fc_pic":"../assets/gympic4.jpg", "fc_tr_num":3, "fc_memb_price":2890, "fc_ratings_avg":5, "fc_ratings_num":1},
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
    var mainContentDiv = document.getElementById('content');
    
    var fitCentDiv = document.createElement('div');
    fitCentDiv.classList.add('fit-cent');
    mainContentDiv.appendChild(fitCentDiv);

    var cardContentWrapper = document.createElement('div');
    cardContentWrapper.classList.add('card-content-wrapper');
    fitCentDiv.appendChild(cardContentWrapper);

    var cardTopDiv = document.createElement('div');
    cardTopDiv.classList.add('card-top');
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
    // cardBottomLeftDiv.textContent = '4.5';
    cardBottomDiv.appendChild(cardBottomLeftDiv);
    var cardBottomRightDiv = document.createElement('div');
    cardBottomRightDiv.classList.add('card-bottom-right');
    cardBottomRightDiv.textContent = fc.fc_ratings_avg.toFixed(1);
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