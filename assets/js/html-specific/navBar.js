'use strict';

function navBarScrollingChanges() {
    const header = document.querySelector('.header.container');
    document.addEventListener('scroll', () => {
        const scroll_position = window.scrollY;
        if (scroll_position > 250) {
            header.style.backgroundColor = '#000000';
        } else {
            header.style.backgroundColor = 'transparent';
        }
    });
}