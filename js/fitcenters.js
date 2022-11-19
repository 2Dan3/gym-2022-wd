// Pamtimo trenutni div sa slikom na koji je kliknuto zbog listanja
// var currentImg;
// Web adresa sa koje ucitavamo slike
// var photosURL = "https://jsonplaceholder.typicode.com/photos"
// Spremicemo referencu na 'overlay' div jer ce nam trebati nekoliko puta
// var overlay = document.getElementById('overlay');

// Kada se ucita stranica ucitaju se sve slike sa servera
var request = new XMLHttpRequest();

// request.onreadystatechange = function() {
    // if(this.readyState == 4) {
    //     if(this.status == 200) {
            // var slike = JSON.parse(request.responseText);
            // Prikazacemo samo prvih 100 slika, umesto svih 1000
            for(var i=0; i<=10; i++) {
                // var slika = slike[i];
                // ucitajSliku(slika);
                makeFitCenterCard();
            }
        // }else {
        //     console.error('Error loading Fitness Centers.')
        // }
    // }
// }

// request.open('GET', photosURL);
// request.send();

// Kada se klikne bilo gde, ugasimo overlay sa slikom
// document.body.addEventListener('click', function(e) {
//     overlay.style.display = 'none';
// });

// Da se overlay ne bi zatvarao kada se klikne na njega, zaustavimo porpagaciju klikova na njemu
// overlay.addEventListener('click', function(e) {
//     e.stopPropagation();
// });

// Listanje slika ulevo
// var leftArrow = document.getElementById('leftArrow');
// leftArrow.addEventListener('click', function(e) {
//     e.stopPropagation();
//     listaj('levo');
// });

// Listanje slika udesno
// var rightArrow = document.getElementById('rightArrow');
// rightArrow.addEventListener('click', function(e) {
//     e.stopPropagation();
//     listaj('desno');
// });

/*************************************************************************************
																	POMOCNE FUNKCIJE
**************************************************************************************/
// Kreira novi div sa ucitanom slikom sa servera:
function ucitajSliku(slika) {
    var newDiv = document.createElement('div');
    newDiv.classList.add('previewDiv');
    // Upisemo u atribut 'data-imageURL' putanju do velike slike, a u 'imageDescription' opis slike
    newDiv.setAttribute('data-imageURL', slika.url);
    newDiv.setAttribute('data-imageDescription', slika.title);
    // Postavimo sliku kao pozadinu
    newDiv.style.backgroundImage = 'url("' + slika.thumbnailUrl + '")';

    // Odmah cemo povezati i click listener za divove sa slikama
    // Kada se klikne na njih, treba da prikazemo 'overlay' div sa velikom verzijom slike i naslovom:
    // newDiv.addEventListener('click', function(e) {
    //     //Zaustavimo propagaciju klika da se ne bi propagirao do body-a (da ne nestane overlay)
    //     e.stopPropagation();
    //     // Postavimo kliknuti div kao trenutni
    //     currentImg = this;

    //     prikaziVelikuSliku();

    //     overlay.style.display = 'block';
    // });

    // Novokreirani div ubacimo u div koji ima id 'content'
    var contentDiv = document.getElementById('content');
    contentDiv.appendChild(newDiv);
}

function makeFitCenterCard(){
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
    aElement.textContent = "Pumpin' iron";
    cardTopLeftDiv.appendChild(aElement);
    cardTopDiv.appendChild(cardTopLeftDiv);
    var cardTopRightDiv = document.createElement('div');
    cardTopRightDiv.classList.add('card-top-right');
    cardTopDiv.appendChild(cardTopRightDiv);
    cardContentWrapper.appendChild(cardTopDiv);

    var cardMiddleDiv = document.createElement('div');
    cardMiddleDiv.classList.add('card-middle');
    var cardMiddlePic = document.createElement('img');
    cardMiddlePic.setAttribute('src', '../assets/gympic.png');
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
    cardBottomRightDiv.textContent = '4.5';
    cardBottomDiv.appendChild(cardBottomRightDiv);
    cardContentWrapper.appendChild(cardBottomDiv);
}

// Otvara overlay sa prikazom verlike verzije slike i opisa
// function prikaziVelikuSliku() {
//     // Postavimo src atribut img taga na overlayu koji sadrzi veliku sliku
//     var imageEl = document.getElementById('imagePlaceholder');
//     imageEl.setAttribute('src', currentImg.getAttribute('data-imageURL'));

//     // Postavimo naslov slike u paragraf koji sluzi za to
//     var titleEl = document.getElementById('titlePlaceholder');
//     titleEl.innerText = currentImg.getAttribute('data-imageDescription');
// }

// function listaj(smer) {
//     var sledeci = currentImg.nextElementSibling;
//     if(smer == 'levo') {
//         sledeci = currentImg.previousElementSibling;
//     }

//     if(sledeci != null) {
//         currentImg = sledeci;
//         prikaziVelikuSliku();
//     }
// }

function scrollToTop(){
    window.scrollTo({ top: 0, behavior: "smooth" });
}