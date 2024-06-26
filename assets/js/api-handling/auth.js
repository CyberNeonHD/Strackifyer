'use strict';

const redirect_uri = "https://strackifyer.co.uk/stats.html";
//const redirect_uri = "http://127.0.0.1:5500/stats.html";

document.addEventListener('DOMContentLoaded', authenticate);
function authenticate() {
    if(document.querySelector('#authNav')){
        document.querySelector('#authNav').addEventListener('click', requestAuthorization);
    }
    if(document.querySelector('#authSubmenu')){
        document.querySelector('#authSubmenu').addEventListener('click', requestAuthorization);
    }
    if(document.querySelector('#logout')){
        document.querySelector('#logout').addEventListener('click', logout);
    }
}

function requestAuthorization(){
    var client_id = '4ace47269fd943eea3258d51e7940aaf';
    var state = generateRandomString(16);
    localStorage.setItem("stateKey", state);
    var scope = 'user-top-read';
    
    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);
    window.location.href = url;
}

function generateRandomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function logout(){
    localStorage.removeItem("stateKey");
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_in");
    location.href = "https://strackifyer.co.uk"; 
}
