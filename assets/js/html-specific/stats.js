'use strict';

function selectedOption(e) {
    const navOptions = e.target.closest('a').innerHTML;
    if(navOptions === 'my top 10 artists'){
        fetchArtists();
    }
    else if(navOptions === 'my top 10 tracks'){
        fetchTracks();
    }
    else if(navOptions === 'my top 3 albums'){
        displayNotReady();
    }
}
