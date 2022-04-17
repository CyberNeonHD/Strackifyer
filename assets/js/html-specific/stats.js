'use strict';

function selectedOption(e) {
    const navOptions = e.target.closest('a').innerHTML;
    if(navOptions === 'top 10 artists'){
        fetchArtists();
    }
    else if(navOptions === 'top 10 tracks'){
        fetchTracks();
    }
    else if(navOptions === 'top 3 albums'){
        displayNotReady();
    }
}
