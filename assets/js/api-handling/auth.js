'use strict';

const redirect_uri = "https://strackifyer.tech/stats.html";
//const redirect_uri = "http://127.0.0.1:5500/stats.html";

document.addEventListener('DOMContentLoaded', authenticate);

function authenticate() {
    if(document.querySelector('#auth')){
        document.querySelector('#auth').addEventListener('click', requestAuthorization);
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