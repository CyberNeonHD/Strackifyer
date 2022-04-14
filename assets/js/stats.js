'use strict';

function selectedOption(e) {
    document.querySelector('#card-data').classList.remove('hide');
    document.querySelector('#information').classList.add('hide');
    const navOptions = e.target.closest('a').innerHTML;
    document.querySelector('#api-data h2').innerHTML = `Your <span>${navOptions}</span>`;
}
