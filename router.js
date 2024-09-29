// router.js

import { renderNullPage } from './pages/NullPage.js';
import { renderLoginPage } from './pages/login/LoginPage.js';
import { renderRegisterPage } from './pages/register/register.js';
import { renderGameMenu } from './pages/GameMenu/GameMenu.js';

const pageRoutes = 
{
    'Login'         :   renderLoginPage,
    'register'      :   renderRegisterPage,
    'gameMenu'      :   renderGameMenu
}

export async function navigateTo(page, isHistoryPush = true) 
{
    const renderFunction = pageRoutes[page] || renderNullPage;
    await renderFunction();
    if (isHistoryPush) {
        history.pushState({ page: page }, page, `#${page}`);
    }
}

// Handle back and forward button navigation
window.onpopstate = function(event) 
{
    if (event.state) {
        navigateTo(event.state.page, false); // false to prevent pushing state again
    }
};

// oauth page load handling
document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const oauthCode = urlParams.get('code');

    if (sessionStorage.getItem('oauthRedirectInProgress')) {
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
            const profileData = await fetch("http://localhost:9000/auth/user", requestHeader);
            const profileDataJson = await profileData.json();
            console.log("profileData = " + JSON.stringify(profileDataJson));
            localStorage.setItem('profileData', JSON.stringify(profileDataJson));
            });
        } else {
            console.log("there is some error with oauthCode");
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
        history.back();
    }
});

async function	setCookie(name, day, value, path = "/")
{
	let date = new Date(Date.now() + day * 24 * 60 * 60 * 1000).toUTCString(); // or 864e5
	value = encodeURIComponent(value);
	document.cookie = `${name}=${value}; expires=${date}; path=${path};`;
	// console.log("document.cookie = " + document.cookie);
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

// async function getProfileData(key)
// {
//     if(getCookie('profileData') === null){
//         console.log("profileDate not found")
//         return null;
//     } else {
//         const profileDataString = localStorage.getItem('profileData');
//         const profileData = JSON.parse(profileDataString);
//         const value = profileData.key;
//     }
//     return value;
// }

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
