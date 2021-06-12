/*require('dotenv').config();*/

const client_id = "9be3b1c519e34feb9ca5d28880c83176";
const client_secret = "74c1c33207774c178036dde57d4f7198";
const authorize = "https://accounts.spotify.com/authorize"
const redirect_uri = "http://127.0.0.1:5500/popup.html";

const scope = 'user-read-currently-playing';

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("click-this").addEventListener("click", onPageLoad);
  });

function requestAuthorization(){

    let url = "https://accounts.spotify.com/authorize";
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-currently-playing";
    window.location.href = url; // Show Spotify's authorization screen
}


function onPageLoad(){
    if ( window.location.search.length > 0 ){
        handleRedirect();
    }
    else {
        requestAuthorization();
    }
}

function handleRedirect(){
    let code = getCode();
    fetchAccessToken( code );
    window.history.pushState("", "", redirect_uri); // remove param from url
}

function getCode(){
    let code = null;
    const queryString = window.location.search;
    if ( queryString.length > 0 ){
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code')
    }
    return code;
}

function fetchAccessToken( code ){
    let body = "grant_type=authorization_code";
    body += "&code=" + code; 
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    callAuthorizationApi(body);
}

function callAuthorizationApi(body){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}