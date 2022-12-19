'use strict';
const TOPARTISTS = "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10&offset=0";

function fetchArtists(){
    callApi( "GET",TOPARTISTS, null, handleArtistsResponse);
}

function handleArtistsResponse(){
    if ( this.status === 200 ){
        let data = JSON.parse(this.responseText);
        data = data.items;
        displayTopArtists(data);

    }
    else if (this.status === 401){
        requestAuthorization();
    }
    else {
        console.log(this.responseText);
    }
}

function displayTopArtists(data){
    let artistsDisplay = '';
    const numberFormatter = Intl.NumberFormat('en-US');
    const $cardData = document.querySelector('#card-data');
    $cardData.innerHTML = '';
    $cardData.insertAdjacentHTML("afterbegin", `<h2>Your <span>top 10 artists</span> of the last 4 weeks</h2>`);
    for(let artists = 0; artists < data.length; artists++) {
        artistsDisplay += `<div class="card-container">
            <span class="position">#${artists + 1}</span>
            <div class="image">
            <img class="round" src="${convertRightSize(data[artists].images)}" alt="user" />
            </div>
            <a href="${data[artists].external_urls.spotify}" target="_blank"><h3>${data[artists].name}</h3></a>
            <h6>Followers: ${numberFormatter.format(data[artists].followers.total)}</h6>
            <div class="skills">
                <h6>Genre</h6>
                <ul>
                    ${convertGenresToLi(data[artists].genres)}
                </ul>
            </div>
        </div>`;
    }
    $cardData.insertAdjacentHTML("beforeend", artistsDisplay);
}

function convertGenresToLi(genreArray){
    let genreLiForm = '';
    for (let genre = 0; genre < genreArray.length; genre++) {
        genreLiForm += `<li>${genreArray[genre]}</li>`;
    }
    return genreLiForm;
}

function convertRightSize(imgaesData){
    let holdCounter = 0;
    for (let counter = 0; counter < imgaesData.length; counter++){
        if(imgaesData[counter].width <= 320){
            holdCounter = counter;
            break;
        }
    }
    return imgaesData[holdCounter].url;
}
