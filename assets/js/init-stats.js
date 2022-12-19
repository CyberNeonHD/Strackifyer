'use strict';

document.addEventListener('DOMContentLoaded',initStats);

function initStats(){
    onPageLoad();
    navBarScrollingChanges();

    if(document.querySelectorAll('.navMenu a')) {
        const navOptions = document.querySelectorAll('.navMenu a');
        navOptions.forEach(options => options.addEventListener('click', selectedOption));
    }
}
