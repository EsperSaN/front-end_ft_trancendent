// router.js

import { renderGameMenu } from './pages/GameMenu.js';
import { renderNullPage } from './pages/NullPage.js';
import { renderPlayMenu } from './pages/PlayMenu.js';
import { renderOptionMenu } from './pages/OptionMenu.js';
import { renderLoginPage } from './pages/LoginPage.js';


const pageRoutes = 
{
    'gameMenu' : renderGameMenu,
    'optionMenu' : renderOptionMenu,
    'Login' : renderLoginPage,
    'playMenu' : renderPlayMenu
}

function navigateTo(page, isHistoryPush = true) 
{
    const DynamicContent = document.getElementById('DynamicContent');
    const body = document.body;

    // Update the layout and content based on the page
    const renderFunction = pageRoutes[page] || renderNullPage;
    DynamicContent.innerHTML = renderFunction();

    // Update the background class
    body.className = page;

    // Push state to history for browser navigation
    if (isHistoryPush) 
    {
        history.pushState({ page: page }, page, `#${page}`);
        console.log(history);
    }
}

// Handle back and forward button navigation
window.onpopstate = function(event) 
{
    if (event.state) {
        navigateTo(event.state.page, false); // false to prevent pushing state again
    }
};

// Initial load handling
document.addEventListener('DOMContentLoaded', function() {
    console.log("Hello! from Initial load handling");
    const initialPage = window.location.hash.replace('#', '') || 'gameMenu';
    navigateTo(initialPage);
});

// Onclick Handling
document.addEventListener('click', function(event) {
    console.log("Hello! from Onclick Handling");
    const page = event.target.getAttribute('href').replace('#', '');
    if (page !== 'Back'){
        navigateTo(page);
    }
    else {
        history.back();
    }
});