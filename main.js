import * as App from './Src/index.js';
import {handle_42Redirect} from './utils.js';

async function initApp() {
    const app = document.querySelector('#App');
    const Images = new App.Images();
    window.Images = Images;

    await window.Images.loadFiles();

    const Router = new App.Router(app, [
        new App.Route('', 'home-page'),
        new App.Route('/guest-login/', 'guest-login-page'),
        new App.Route('/register/', 'register-page'),
        new App.Route('/loading/', 'loading-page'),
    ]);
    window.Router = Router; // make Router as a global object
    Router.init();
}

document.addEventListener('DOMContentLoaded', handle_42Redirect);
initApp();