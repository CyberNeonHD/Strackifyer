'use strict';

document.addEventListener('DOMContentLoaded',initIndex);

function initIndex(){
    const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
	const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
	if(hamburger){
		hamburger.addEventListener('click', toggleActive);
	}
	if(menu_item){
		menu_item.forEach((item) => {
			item.addEventListener('click', toggleActive);
		});
	}
	navBarScrollingChanges();
}
