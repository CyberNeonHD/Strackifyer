'use strict';

const redirect_uri = "https://strackifyer.tech/stats.html";
//const redirect_uri = "http://127.0.0.1:5500/stats.html";

const AUTHORIZE = "https://accounts.spotify.com/authorize";


document.addEventListener('DOMContentLoaded', authenticate);

function authenticate() {
    if(document.querySelector('#auth')){
        document.querySelector('#auth').addEventListener('click', requestAuthorization);
    }
}

function requestAuthorization(){
    let url = AUTHORIZE;
    url += "?client_id=" + process.env.SPOTIFY_CLIENT;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-top-read";
    window.location.href = url;
}
