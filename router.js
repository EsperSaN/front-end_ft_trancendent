// router.js

import { renderNullPage } from './pages/NullPage.js';
import { renderLoginPage } from './pages/login/LoginPage.js';
import { renderRegisterPage } from './pages/register/register.js';
import { renderGameMenu } from './pages/gameMenu/gameMenu.js';
import { renderLoginAsGuest } from './pages/loginAsGuest/loginAsGuest.js';
import { renderProfileConfig } from './pages/profileConfig/profileConfig.js';

const pageRoutes = 
{
    'Login'                 :   renderLoginPage,
    'register'              :   renderRegisterPage,
    'gameMenu'              :   renderGameMenu,
    'guestLogin'            :   renderLoginAsGuest,
    'editProfile'           :   renderProfileConfig
}

export async function navigateTo(page, isHistoryPush = true) 
{
    const renderFunction = pageRoutes[page] || renderNullPage;
    await renderFunction();
    const content = document.getElementById("DynamicContent").innerHTML;
    const style = document.getElementById("dynamicStyle").href;
    if (isHistoryPush) {
        history.pushState({content: content, style: style}, page, `#${page}`);
    }
}


// Handle back and forward button navigation
window.onpopstate = function(event) 
{
    event.preventDefault();
    if (event.state) {
        window.document.getElementById("DynamicContent").innerHTML = event.state.content;
        window.document.getElementById("dynamicStyle").href = event.state.style;
    }
};

// oauth and initial page load handling

document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const oauthCode = urlParams.get('code');

    if (sessionStorage.getItem('isInitialLoadPage') === null) {
        sessionStorage.setItem('isInitialLoadPage', true);
    }
    if (sessionStorage.getItem('isInitialLoadPage')) {
        console.log("initialDownLoad");
        console.log(sessionStorage.getItem('isInitialLoadPage'));
        navigateTo("Login");
    }
    if (sessionStorage.getItem('oauthRedirectInProgress')) {
        // sessionStorage.setItem('isInitialLoadPage', false);
        if (oauthCode) {
            console.log('OAuth code detected:', oauthCode);
            sessionStorage.removeItem('oauthRedirectInProgress');
            await setCookie("42OauthCode", 365, oauthCode).then(async () => {
                const page = 'Loading';
                navigateTo(page, false).then(() => {
                    let url = window.location.href.split('?')[0];
                    history.replaceState({ page: page }, page, url + `#${page}`);
                });
            const jsonResponse = await sendOauthCodeToBackEnd(oauthCode);
            const jwt = jsonResponse.jwt;
            await setCookie("jwt_token", 365, jwt);
            const token = await getCookie("jwt_token");
            console.log("token = " + token);
            let requestHeader ={
                method : 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            try {
                const profileData = await fetch("http://localhost:9000/auth/user", requestHeader);
                if (profileData.ok) {
                  const profileDataJson = await profileData.json();
                  if (profileDataJson) {
                    localStorage.setItem('profileData', JSON.stringify(profileDataJson));
                  } 
                  else {
                    console.log("Don't get any data from server");
                  }
                }
                else {
                  console.log('Error: Response status', profileData.status);
                }
              } catch (error) {
                console.log('Error:', error);
              }
            navigateTo("gameMenu");
            });
        } else {
            console.log("there is some error with oauthCode");
        }
    }
    else if (sessionStorage.getItem('isInitialLoadPage') === null) {
        console.log("InitialLoadPage");
        sessionStorage.setItem('isInitialLoadPage', true);
        if (localStorage.getItem('profileData')) {
            navigateTo("gameMenu");
        } else {
            navigateTo("Login");
        }
    }
});

async function sendOauthCodeToBackEnd(oauthCode) {
    const oauthToBackEndPath = `http://localhost:9000/auth/callback?code=${oauthCode}`;
    try {
        const response = await fetch(oauthToBackEndPath);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error sending OAuth code to backend:', error);
        throw error;
    }
}

// Onclick Handling
document.addEventListener('click', function(event) {
    event.preventDefault();
    const page = event.target.getAttribute('href').replace('#', '');
     if (page !== 'Back'){
        navigateTo(page);
    }
    else {
        history.go(-1);
        let state = history.state;
        window.document.getElementById("DynamicContent").innerHTML = state.content;
        window.document.getElementById("dynamicStyle").href = state.style;
    }
});

async function	setCookie(name, day, value, path = "/")
{
	let date = new Date(Date.now() + day * 24 * 60 * 60 * 1000).toUTCString(); // or 864e5
	value = encodeURIComponent(value);
	document.cookie = `${name}=${value}; expires=${date}; path=${path};`;
}

async function	getCookie(CookieName)
{
	let keyName = CookieName + "=";
	let cookieArray = document.cookie.split('; ');
    console.log(cookieArray);
	let targetCookie = cookieArray.find((cookie) => cookie.indexOf(keyName) === 0);
	if (targetCookie != null)
		return (decodeURIComponent(targetCookie.substring(keyName.length)));
	else
		return null;
}
