'use strict';
const TOPARTISTS = "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10&offset=0";

function fetchArtists(){
    callApi( "GET",TOPARTISTS ,null ,handleArtistsResponse);
}

function handleArtistsResponse(){
    if ( this.status === 200 ){
        let data = JSON.parse(this.responseText);
        data = data.items;
        displayTopArtists(data);

    }
    else if (this.status === 401){
        refreshAccessToken();
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

function displayTopArtists(data){
    let artistsDisplay = '';
    const $cardData = document.querySelector('#card-data');
    $cardData.innerHTML = '';
    $cardData.insertAdjacentHTML("afterbegin", `<h2>Your <span>top 10 artists</span></h2>`);
    for(let artists = 0; artists < data.length; artists++) {
        artistsDisplay += `<div class="card-container">
            <span class="position">#${artists + 1}</span>
            <img class="round" src="${data[artists].images[1].url}" alt="user" />
            <h3>${data[artists].name}</h3>
            <h6>Followers: ${data[artists].followers.total}</h6>
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
    for (let genre = 0; genre < genreArray.length && genre < 3; genre++) { //Capping the length on 3 due to CSS related issue in design
        genreLiForm += `<li>${genreArray[genre]}</li>`;
    }
    return genreLiForm;
}