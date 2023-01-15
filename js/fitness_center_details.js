// var main_content = document.getElementById('content');
// main_content.style.display = 'block';

const FC_URL = "https://fitnessandusers-default-rtdb.europe-west1.firebasedatabase.app"
// var TRAINING_URL = "https://jsonplaceholder.typicode.com/photos"

load_fitness_center();

async function load_fitness_center(){
    let id_fc = getParamValue('id');

    const loaded_fc = await request_fitness_center(id_fc);
    // alert("Loading chosen fitness center...");
    // setTimeout(() => {
        // finish_fitness_center_rendering(loaded_fc);
    // }, 600);

}

async function finish_fitness_center_rendering(id_key, loaded_fc){
    
    makeFitCenterCard(id_key, loaded_fc);
    makeRatingCard(id_key, loaded_fc);
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

// get_each_grade_count([10, 10, 9, 10, 1, 3, 10 , 5, 2, 3]);

// function get_all_instances(current_rating) { console.log(current_rating +" "+this);current_rating === this };

function get_each_grade_count(all_ratings){

//     let count = {};
//     // let rating_appearances = all_ratings.map()
//     for (const rating of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] ) {
//         console.log(rating);
//         count[rating] = all_ratings.filter( get_all_instances, rating ).length;
//     }

    // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(  )

    // all_ratings.filter( (current_grade) => { current_grade === 10 } )
    let count = {};

    for (const rating of all_ratings) {
        if (count[rating]) {
          count[rating] += 1;
        } else {
          count[rating] = 1;
        }
    }
    console.log(count);
    return count;
}

async function rate(id, fc_obj, rating) {

    // function sum_ratings(total, num) {
    //     return total + num;
    // }

    let ratings_num = fc_obj.ocene.push(rating);
    let ratings_sum = fc_obj.ocene.reduce( (total, num) => {return total + num;} );
    fc_obj.prosecnaOcena = ratings_sum / ratings_num;

    fc_rated = 
            {   
                "naziv":fc_obj.naziv,
                "adresa":fc_obj.adresa,
                "godinaOtvaranja":fc_obj.godinaOtvaranja,
                "slika":fc_obj.slika,
                "brojDostupnihTreninga":fc_obj.brojDostupnihTreninga,
                "mesecnaClanarina":fc_obj.mesecnaClanarina,
                "idTreninga":fc_obj.idTreninga,
                "prosecnaOcena":fc_obj.prosecnaOcena,
                "ocene":fc_obj.ocene
            };

            var req = new XMLHttpRequest();

            req.onreadystatechange = function() {
                if(this.readyState == 4) {
                    if(this.status == 200) {
                        console.log("Rated '"+ fc_obj.naziv + "' with " + rating + " stars.");
                        updateData(fc_obj.prosecnaOcena, fc_obj.ocene, rating);
                    }else {
                        console.error('Error rating the Gym.');
                        alert("An error occured while rating gym.");
                    }
                    // location.reload();
                }
            }
            // console.log("form obj: " + JSON.stringify(fc_rated));
            req.open('PUT',  'https://fitnessandusers-default-rtdb.europe-west1.firebasedatabase.app' + '/fitnesCentri/' + id + '.json');
            req.send(JSON.stringify(fc_rated));
}

function makeFitCenterCard(id, fc){
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

    var cardTopEditDiv = document.createElement('div');
    cardTopEditDiv.classList.add('card-top-edit');
    var editImg = document.createElement('img');
    editImg.setAttribute('class', 'edit-img');
    editImg.setAttribute('src', '../assets/edit.jpg');
    editImg.addEventListener('click', () => { window.location.href = "editfitnesscenter.html?id=" + id;});
    cardTopEditDiv.appendChild(editImg);
    cardTopDiv.appendChild(cardTopEditDiv);

    var cardTopLeftDiv = document.createElement('div');
    cardTopLeftDiv.classList.add('card-top-left');
    var aElement = document.createElement('a');
    aElement.setAttribute('id', 'see-more-link');
    // aElement.setAttribute('href', './fitcenter.html');
    // Alternatively (for older browsers) aElement.innerHtml
    aElement.textContent = fc.naziv;
    cardTopLeftDiv.appendChild(aElement);
    cardTopDiv.appendChild(cardTopLeftDiv);
    var cardTopRightDiv = document.createElement('div');
    cardTopRightDiv.classList.add('card-top-right');
    cardTopRightDiv.textContent = "Est. " + fc.godinaOtvaranja;
    cardTopDiv.appendChild(cardTopRightDiv);
    cardContentWrapper.appendChild(cardTopDiv);

    var cardMiddleDiv = document.createElement('div');
    cardMiddleDiv.classList.add('card-middle');
    var cardMiddlePic = document.createElement('img');
    cardMiddlePic.setAttribute('src', fc.slika);
    cardMiddleDiv.appendChild(cardMiddlePic);
    cardContentWrapper.appendChild(cardMiddleDiv);

    var cardBottomDiv = document.createElement('div');
    cardBottomDiv.classList.add('card-bottom');
    var cardBottomLeftDiv = document.createElement('div');
    cardBottomLeftDiv.classList.add('card-bottom-left');
    cardBottomLeftDiv.textContent = fc.ocene.length + " people rated this gym!";
    cardBottomDiv.appendChild(cardBottomLeftDiv);

    var cardBottomRightDiv = document.createElement('div');
    cardBottomRightDiv.classList.add('card-bottom-right');
    cardBottomRightDiv.textContent = fc.prosecnaOcena.toFixed(2);
    // 
    var starRatingPic = document.createElement('img');
    starRatingPic.setAttribute('src', '../assets/star.jpg');
    starRatingPic.setAttribute('id', 'star-rating');
    cardBottomRightDiv.appendChild(starRatingPic);
    cardBottomDiv.appendChild(cardBottomRightDiv);

    var cardBottomThirdDiv = document.createElement('div');
    cardBottomThirdDiv.classList.add('card-bottom-third');
    cardBottomThirdDiv.textContent = fc.adresa;
    cardBottomDiv.appendChild(cardBottomThirdDiv);
    var cardBottomPriceDiv = document.createElement('div');
    cardBottomPriceDiv.classList.add('card-bottom-price');
    cardBottomPriceDiv.textContent = "Membership price: " + fc.mesecnaClanarina;
    cardBottomDiv.appendChild(cardBottomPriceDiv);
    var cardBottomFourthDiv = document.createElement('div');
    cardBottomFourthDiv.classList.add('card-bottom-fourth');
    cardBottomFourthDiv.textContent = "< " + fc.brojDostupnihTreninga + " trainings >";
    // 
    cardBottomFourthDiv.onclick = () => { 
        cardBottomFourthDiv.style.display = 'none';
        trainingsListDiv.style.display = 'block';
        load_trainings(fc.idTreninga);
        
        // fitCentDiv.style.position = 'fixed';
        // fitCentDiv.style.left = '5%'
    };
    cardBottomDiv.appendChild(cardBottomFourthDiv);

    cardContentWrapper.appendChild(cardBottomDiv);
}

function updateData(avg_rating, all_ratings, given_rating) {
    let avg_rating_div = document.getElementsByClassName('card-bottom-right')[0]
    avg_rating_div.textContent = avg_rating.toFixed(2);

    // Bug solve (recreate & reappend the disappeared star img):
    let starRatingPic = document.createElement('img');
    starRatingPic.setAttribute('src', '../assets/star.jpg');
    starRatingPic.setAttribute('id', 'star-rating');
    avg_rating_div.appendChild(starRatingPic);
    // 

    let reviews_num_div = document.getElementsByClassName('card-bottom-left')[0];
    reviews_num_div.textContent = all_ratings.length + " people rated this gym!";

    let given_rating_reviews_div = document.getElementsByName(given_rating.toString())[0];
    
    let filtered_ratings = all_ratings.filter( (current_rating) => { return current_rating == given_rating; } );
    given_rating_reviews_div.textContent = filtered_ratings.length + ' reviews.'
}

function makeRatingCard(id_key, loaded_fc){
    let grades_appearance_num = get_each_grade_count(loaded_fc.ocene);
    
    
    let rating_div = document.createElement('div');
    rating_div.setAttribute('class', 'rating');

    for (let i = 10; i >= 1; i--) {
        let star_input = document.createElement('input');
        star_input.setAttribute('type', 'radio');
        star_input.setAttribute('name', 'rating');
        star_input.setAttribute('value', i);

        let star_label = document.createElement('label');
        star_label.setAttribute('for', i);
        star_label.setAttribute('class', 'rating-star-label');
        // star_label.setAttribute('name', i);
        star_label.textContent = '☆';
        star_label.onclick = () => 
        {
            rate(id_key, loaded_fc, i);
            disable_rating();
        };

        rating_div.appendChild(star_input);
        rating_div.appendChild(star_label);
    }
    
    let content_wrapper = document.getElementsByClassName('card-content-wrapper')[0];
    content_wrapper.appendChild(rating_div);

    // *TODO:
    // make review cards
    //   ...

    let reviews_div = document.createElement('div');
    reviews_div.setAttribute('id', 'reviews-wrapper');
    content_wrapper.appendChild(reviews_div);

    for (let i = 10; i >= 1; i--) {
        let review_row = document.createElement('div');
        review_row.setAttribute('class', 'review-row');
        reviews_div.appendChild(review_row);

        let left_review_column = document.createElement('div');
        left_review_column.setAttribute('class', 'left-review-column');

        let right_review_column = document.createElement('div');
        right_review_column.setAttribute('class', 'right-review-column');
        right_review_column.setAttribute('name', i);

        let num_of_specified_grades = 0;

        if (grades_appearance_num[i]) {
            num_of_specified_grades = grades_appearance_num[i];
        }

        left_review_column.textContent = i + ' star';
        right_review_column.textContent = num_of_specified_grades + ' reviews.';

        review_row.appendChild(left_review_column);
        review_row.appendChild(right_review_column);
    }

    content_wrapper.appendChild(reviews_div);
}

function disable_rating() {
    [].forEach.call(document.getElementsByClassName('rating-star-label'), (star) => { star.onclick = () => {alert("You have already rated this gym!");} } );
}

async function load_trainings(group_id){
    
    const response_array = await request_all_trainings(group_id)
    // alert("Loading the trainings...");
}

async function finish_training_rendering(group_id, response){
    for (const id_key in response) {
        makeTrainingCard(group_id, id_key, response[id_key]);
    }
}

async function request_all_trainings(wanted_trainings_group_id){
    
    let request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if(this.readyState == 4) {
            if(this.status == 200) {
                let trainings = JSON.parse(request.responseText);
                // console.log(tr);
                finish_training_rendering(wanted_trainings_group_id ,trainings); 
                return trainings;
            }else {
                console.error('Error loading Trainings for the Fitness Center.')
            }
        }
    }

    request.open('GET', "https://fitnessandusers-default-rtdb.europe-west1.firebasedatabase.app" + '/treninzi/' + wanted_trainings_group_id + '.json');
    request.send();
}

function makeTrainingCard(group_id, id, training){
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
    aElement.setAttribute('href', './training.html?group=' + group_id + '&id=' + id);
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

    var cardLongDescription = document.createElement('div');
    cardLongDescription.classList.add('card-long-description');
    cardLongDescription.textContent = training.kratakOpis;
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

function getParamValue(name) {
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