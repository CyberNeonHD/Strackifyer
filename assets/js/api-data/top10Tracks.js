'use strict';
const TOPTRACKS = "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=0";

function fetchTracks(){
    callApi( "GET", TOPTRACKS, null, handleTracksResponse);
}

function handleTracksResponse(){
    if ( this.status ===  200 ){
        let data = JSON.parse(this.responseText);
        data = data.items;
        displayTopTracks(data);

    }
    else if ( this.status === 401 ){
        requestAuthorization();
    }
    else {
        console.log(this.responseText);
    }
}

function displayTopTracks(data){
    let trackDisplay ='';
    const $cardData = document.querySelector('#card-data');
    $cardData.innerHTML = '';
    $cardData.insertAdjacentHTML("afterbegin", `<h2>Your <span>top 10 tracks</span> of the last 4 weeks</h2>`);
    for(let tracks = 0; tracks < data.length; tracks++) {
        trackDisplay += `<div class="card-container">
            <span class="position">#${tracks + 1}</span>
            <img class="round" src="${data[tracks].album.images[1].url}" alt="user" />
            <a href="${data[tracks].external_urls.spotify}" target="_blank"><h3>${data[tracks].artists[0].name} - ${data[tracks].name}</h3></a>
            <h6>Length: ${(data[tracks].duration_ms/60000).toFixed(2)} mins</h6>
        </div>`;
    }
    $cardData.insertAdjacentHTML("beforeend", trackDisplay);
}
