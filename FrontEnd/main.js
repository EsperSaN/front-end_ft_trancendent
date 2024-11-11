import * as App from './Src/index.js';
const pages = [];

const LoadingPage = new App.LoadingPage();
pages[LoadingPage.getElementName()] = LoadingPage
LoadingPage.render();
buildAllComponent(pages);

// const Routes = new App.Routes();
// Routes.bindPages(pages);
// window.Router = Routes; // make Router as a global object
// window.router.navigateTo('#home');
// Routes.init()


function buildAllComponent(pages){
    const HomePage = new App.HomePage();
    const RegisterPage = new App.RegisterPage();
    const LoginAsGuestPage = new App.LoginAsGuestPage();
    const GameMenuPage = new App.GameMenuPage();
    const TournamentPage = new App.TournamentPage();
    const GamePlayPage = new App.GamePlayPage();
    
    pages[HomePage.getElementName()] = HomePage;
    pages[RegisterPage.getElementName()] = RegisterPage;
    pages[LoginAsGuestPage.getElementName()] = LoginAsGuestPage;
    pages[GameMenuPage.getElementName()] = GameMenuPage;
    pages[TournamentPage.getElementName()] = TournamentPage;
    pages[GamePlayPage.getElementName()] = GamePlayPage;
}
