'use strict';

document.addEventListener('DOMContentLoaded',init);

function init(){
    if(document.querySelectorAll('.navMenu a')) {
        const navOptions = document.querySelectorAll('.navMenu a');
        navOptions.forEach(options => options.addEventListener('click', selectedOption));
    }
}
