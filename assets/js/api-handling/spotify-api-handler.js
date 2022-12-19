'use strict';

const TOKEN = "https://accounts.spotify.com/api/token";

function onPageLoad(){
    if ( window.location.href.length > 0 ){
        handleRedirect();
    }
}

function handleRedirect(){
    configureData();
    window.history.pushState("", "", redirect_uri);
}

function configureData(){
    const params = new Proxy(new URLSearchParams(window.location.hash.substring(1, window.location.hash.length)), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    let access_token = params.access_token;
    let expires_in = params.expires_in;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("expires_in", expires_in);
}

function callApi(method, url, body, callback){
    let Bearer = localStorage.getItem("access_token");

    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + Bearer);
    xhr.send(body);
    xhr.onload = callback;
}
