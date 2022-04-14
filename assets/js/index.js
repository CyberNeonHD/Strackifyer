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

function toggleActive() {
    const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
    const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
    hamburger.classList.toggle('active');
    mobile_menu.classList.toggle('active');
}
