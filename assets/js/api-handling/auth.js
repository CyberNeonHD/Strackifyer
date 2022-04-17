'use strict';

const redirect_uri = "http://127.0.0.1:5500/stats.html";
const AUTHORIZE = "https://accounts.spotify.com/authorize";

function requestAuthorization(){
    localStorage.setItem('client_id', "4ace47269fd943eea3258d51e7940aaf");
    localStorage.setItem('client_secret', "f4ee9d37a18841f6b78158b8c50aead3"); // In a real app you should not expose your client_secret to the user

    let url = AUTHORIZE;
    url += "?client_id=" + "4ace47269fd943eea3258d51e7940aaf";
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-top-read";
    window.location.href = url; // Show Spotify's authorization screen
}
