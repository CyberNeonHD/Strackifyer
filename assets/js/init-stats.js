'use strict';

document.addEventListener('DOMContentLoaded', initStats);

function initStats(){
    onPageLoad();
    navBarScrollingChanges();
    if(document.querySelectorAll('.navMenu a')) {
        const navOptions = document.querySelectorAll('.navMenu a');
        navOptions.forEach(options => options.addEventListener('click', selectedMenuOption));
    }
}

function selectedMenuOption(e) {
    e.preventDefault();
    const navOptions = e.target.closest('a').innerHTML;
    if(navOptions === 'my top 10 artists'){
        initLoadArtists();
    }
    else if(navOptions === 'my top 10 tracks'){
        initLoadTracks();
        
    }
    else if(navOptions === 'my top 3 albums'){
        displayNotReady();
    }
}

function navBarScrollingChanges() {
    const header = document.querySelector('#header .container');
    document.addEventListener('scroll', () => {
        const scroll_position = window.scrollY;
        if (scroll_position > 250) {
            header.style.backgroundColor = '#000000';
        } else {
            header.style.backgroundColor = 'transparent';
        }
    });
}
