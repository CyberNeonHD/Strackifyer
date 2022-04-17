'use strict';

const redirect_uri = "http://127.0.0.1:5500/stats.html";
const AUTHORIZE = "https://accounts.spotify.com/authorize";

function requestAuthorization(){
    let url = AUTHORIZE;
    url += "?client_id=" + process.env.clientId;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-top-read";
    window.location.href = url; // Show Spotify's authorization screen
}
