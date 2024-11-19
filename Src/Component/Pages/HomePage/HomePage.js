import { Component } from "../../Component.js";

const name = "home-page";

const componentStyle = `
  .menu {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      color: rgb(0, 0, 0);
      font-family: 'Itim', sans-serif;
      text-align: center;
      height: 80%;
      width: 50%;
  }

  .menu ul {
      list-style: none;
      padding-top: min(25%, 50px);
      margin: 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
  }

  .menu ul li {
      margin-bottom: 5vh;
      text-decoration: none;
      color: rgb(0, 0, 0);
      font-size: max(4vw, 25px);
      transition: color 0.3s;
      cursor: pointer;
      user-select: none;
  }

  .menu ul li:hover {
      color: #FFD700;
  }

  #MeowPongTitle{
      padding: 0;
      margin: 0;
      width: max(100%, 300px);
  }
`;

  export class HomePage extends Component 
  { 
  constructor() {
    super(name, componentStyle);
  }

  postCreate() {
    const menu = document.createElement('div');
    menu.classList.add("menu");
    const imgSrc = window.Images.getFile("MeowPongTitle.png");
    menu.innerHTML = `
    <img id = "MeowPongTitle" src=${imgSrc}>

    <ul id="loginOption">
        <li id="login42"> 42 Login </li>
        <li id="guestLogin"> Guest Login </li>
        <li id="register"> Register </li>
    </ul>
    `
    this.shadowRoot.appendChild(menu);

    super.addComponentEventListener(  this.shadowRoot.querySelector("#login42"),
                                      "click",
                                      this.login42);

    this.addComponentEventListener( this.shadowRoot.querySelector("#guestLogin"),
                                    "click",
                                    () => window.Router.navigate('/guest-login/'));
                                    
    this.addComponentEventListener( this.shadowRoot.querySelector("#register"),
                                    "click",
                                    () => window.Router.navigate('/register/'));
  }

  async login42()
  {
    const clientId = 'u-s4t2ud-8aa7d1799d4b4847f8c1284abe03fb14a44fce8c230bb53da7a86efcb26ae227';
    const redirectUri = 'http://localhost:8000/';
    const responseType = 'code';
    const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: responseType
    });
    const Oauth42Uri = `http://api.intra.42.fr/oauth/authorize?${params.toString()}`;
    let requestHeader = {
        method: 'GET',
        redirect: 'manual',
    };
    let response = await fetch(Oauth42Uri, requestHeader);
    localStorage.setItem('oauthRedirectInProgress', true);
    console.log("fetch 42 api success!");
    window.location.href = response.url;
  }
}

customElements.define(name, HomePage);