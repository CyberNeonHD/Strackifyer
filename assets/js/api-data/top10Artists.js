'use strict';
const topArtistsShort = "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10&offset=0";
const topArtistsLong = "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10&offset=0";
const topArtistsLifeTime = "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=10&offset=0";


function initLoadArtists() {
    const $cardData = document.querySelector('#card-data');
    $cardData.innerHTML = '';
    $cardData.insertAdjacentHTML("afterbegin", 
    `<h2>Your <span>top 10 artists</span> of the last 
        <select id="periodArtists" style="width: 11rem;">
            <option value="1">4 weeks</option>
            <option value="2">6 months</option>
            <option value="3">All time</option>
        </select>
    </h2>`);

    callApi( "GET", topArtistsShort, null, handleArtistsResponse); // fetches the top 10 artists of the last 4 weeks (default)
    
    $cardData.removeEventListener('change', timePeriodTracks) // remove event listener from tracks
    $cardData.addEventListener('change', timePeriodArtists) // after data loaded, change event listener is added to the select element
}

function timePeriodArtists(event) {
    const $cardData = document.querySelector('#card-data');
    if (event && event.target && event.target.matches('#periodArtists')) {
        if (event.target.value == 1) {
            $cardData.innerHTML = 
            `<h2>Your <span>top 10 artists</span> of the last
                <select id="periodArtists" style="width: 11rem;">
                    <option value="1" selected>4 weeks</option>
                    <option value="2">6 months</option>
                    <option value="3">All time</option>
                </select>
            </h2>`;
            callApi( "GET", topArtistsShort, null, handleArtistsResponse);
        } else if (event.target.value == 2) {
            $cardData.innerHTML = 
            `<h2>Your <span>top 10 artists</span> of the last
                <select id="periodArtists"  style="width: 12rem;">
                    <option value="1">4 weeks</option>
                    <option value="2" selected>6 months</option>
                    <option value="3">All time</option>
                </select>
            </h2>`;
            callApi( "GET", topArtistsLong, null, handleArtistsResponse);
        } else if (event.target.value == 3) {
            $cardData.innerHTML = 
            `<h2>Your <span>top 10 artists</span> of
                <select id="periodArtists" style="width: 10rem;">
                    <option value="1">4 weeks</option>
                    <option value="2">6 months</option>
                    <option value="3"selected>All time</option>
                </select>
            </h2>`;
            callApi( "GET", topArtistsLifeTime, null, handleArtistsResponse);
        }
    }
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
    const $cardData = document.querySelector('#card-data');
    let artistsDisplay = '';
    //const numberFormatter = Intl.NumberFormat('en-US');
    for(let artists = 0; artists < data.length; artists++) {
        artistsDisplay += `<div class="card-container">
            <span class="position">#${artists + 1}</span>
            <div class="image">
            <img class="round" src="${convertRightSize(data[artists].images)}" alt="user" />
            </div>
            <a href="${data[artists].external_urls.spotify}" target="_blank"><h3>${data[artists].name}</h3></a>
            <h6>Popularity Rating: ${data[artists].popularity}</h6>
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