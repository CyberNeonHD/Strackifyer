'use strict';

function selectedOption(e) {
    const navOptions = e.target.closest('a').innerHTML;
    document.querySelector('#api-data h2').innerHTML = `Your <span>${navOptions}</span>`;
}
