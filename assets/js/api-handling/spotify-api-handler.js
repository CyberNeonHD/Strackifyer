'use strict';

const redirect_uri = "https://strackifyer.tech/stats.html";
//const redirect_uri = "http://127.0.0.1:5500/stats.html";

let access_token = null;
let refresh_token = null;

const TOKEN = "https://accounts.spotify.com/api/token";

function onPageLoad(){
    if ( window.location.search.length > 0 ){
        handleRedirect();
    }
}

function handleRedirect(){
    const code = getCode();
    fetchAccessToken(code);
    window.history.pushState("", "", redirect_uri);
}

function getCode(){
    let code = null;
    const queryString = window.location.search;
    if ( queryString.length > 0 ){
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code');
    }
    return code;
}

function fetchAccessToken( code ){
    let body = "grant_type=authorization_code";
    body += "&code=" + code; 
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + process.env.SPOTIFY_CLIENT;
    body += "&client_secret=" + process.env.SPOTIFY_SECRET;
    callAuthorizationApi(body);
}

function refreshAccessToken(){
    refresh_token = localStorage.getItem("refresh_token");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    body += "&client_id=" + process.env.SPOTIFY_CLIENT;
    callAuthorizationApi(body);
}

function callAuthorizationApi(body){
    const xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(process.env.SPOTIFY_CLIENT+":"+process.env.SPOTIFY_SECRET));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}

function handleAuthorizationResponse(){
    if ( this.status === 200 ){
        const data = JSON.parse(this.responseText);
        if ( data.access_token !== undefined ){
            access_token = data.access_token;
            localStorage.setItem("access_token", access_token);
        }
        if ( data.refresh_token  !== undefined ){
            refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);
        }
    }
    else {
        console.log(this.responseText);
    }
}

function callApi(method, url, body, callback){
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.send(body);
    xhr.onload = callback;
}
