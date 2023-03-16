'use strict';
const topTracksShort = "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=0";
const topTracksLong = "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10&offset=0";
const topTracksLifeTime = "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10&offset=0";

function initLoadTracks() {
    const $cardData = document.querySelector('#card-data');
    $cardData.innerHTML = '';
    $cardData.insertAdjacentHTML("afterbegin", 
    `<h2>Your <span>top 10 tracks</span> of the last 
        <select id="periodTracks" style="width: 11rem;">
            <option value="1">4 weeks</option>
            <option value="2">6 months</option>
            <option value="3">All time</option>
        </select>
    </h2>`);

    callApi( "GET", topTracksShort, null, handleTracksResponse); // fetches the top 10 tracks of the last 4 weeks (default)

    $cardData.removeEventListener('change', timePeriodArtists) // remove event listener from artists
    $cardData.addEventListener('change', timePeriodTracks) // after data loaded, change event listener is added to the select element
}

function timePeriodTracks(event){
    const $cardData = document.querySelector('#card-data');
    if (event && event.target && event.target.matches('#periodTracks')) {
        if (event.target.value == 1) {
            $cardData.innerHTML = 
            `<h2>Your <span>top 10 tracks</span> of the last
                <select id="periodTracks" style="width: 11rem;">
                    <option value="1" selected>4 weeks</option>
                    <option value="2">6 months</option>
                    <option value="3">All time</option>
                </select>
            </h2>`;
            callApi( "GET", topTracksShort, null, handleTracksResponse);
        } else if (event.target.value == 2) {
            $cardData.innerHTML = 
            `<h2>Your <span>top 10 tracks</span> of the last
                <select id="periodTracks"  style="width: 12rem;">
                    <option value="1">4 weeks</option>
                    <option value="2" selected>6 months</option>
                    <option value="3">All time</option>
                </select>
            </h2>`;
            callApi( "GET", topTracksLong, null, handleTracksResponse);
        } else if (event.target.value == 3) {
            $cardData.innerHTML = `
            <h2>Your <span>top 10 tracks</span> of
                <select id="periodTracks" style="width: 10rem;">
                    <option value="1">4 weeks</option>
                    <option value="2">6 months</option>
                    <option value="3"selected>All time</option>
                </select>
            </h2>`;
            callApi( "GET", topTracksLifeTime, null, handleTracksResponse);
        }
    }
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
