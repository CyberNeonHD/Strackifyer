'use strict';
const TOPTRACKS = "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=0";

function fetchTracks(){
    callApi( "GET", TOPTRACKS, null, handleTracksResponse );
}

function handleTracksResponse(){
    if ( this.status ===  200 ){
        let data = JSON.parse(this.responseText);
        data = data.items;
        displayTopTracks(data);

    }
    else if ( this.status === 401 ){
        refreshAccessToken();
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

function displayTopTracks(data){
    console.log(data);
    const $cardData = document.querySelector('#card-data');
    $cardData.innerHTML = '';
    $cardData.insertAdjacentHTML("afterbegin", `<h2>Your <span>top 10 tracks</span></h2>`);
    for(let tracks = 0; tracks < data.length; tracks++) {
        console.log(data[tracks].name);
    }
}
