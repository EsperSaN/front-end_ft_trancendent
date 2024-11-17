import { Component } from "../../Component.js";

const name = "guest-login-page";

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

  .frame {
    height: auto;
    width: 60%;
    border: #1e4950 3px solid;
    border-radius: 30px;
    background-color: rgba(146,220,253, 0.5);
      padding: 35px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .frame div {
      padding-bottom: 20px;
  }

  .frame h1 {
      display: flex;
      flex-direction: row;
      align-self: start;
      padding-bottom: 20px;
      font-size: 50px;
  }

  .frame button {
      font-size: 30px;
  }

  #backButton {
      display: flex;
  }

  #MeowPongTitle{
      padding: 0;
      margin: 0;
      width: max(100%, 300px);
  }
`;

export class GuestLoginPage extends Component { 
  constructor() {
    super(name, componentStyle);
  }

  postCreate() {
    const meowTitleSrc = window.Images.getFile("MeowPongTitle.png");
    const menu = document.createElement('div');
    menu.classList.add("menu");
    menu.innerHTML = `
      <img id = "MeowPongTitle" src=${meowTitleSrc}>
  
      <div class = "container-sm frame">
              
          <h1>LOGIN</h1>

          <div class="form-floating mb-3">
              <input type="username" class="form-control" id="floatingInput" placeholder="name@example.com">
              <label for="floatingInput">Username</label>
            </div>
            <div class="form-floating">
              <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
              <label for="floatingPassword">Password</label>
          </div>

          <button type="login" class="btn btn-primary">login</button>

      </div>
    `
    this.shadowRoot.appendChild(menu);
  }

  login42() {
    console.log("HI!!!");
  }
}

document.addEventListener('click', function(event) {
  event.preventDefault();

  // Get the href attribute of the clicked element
  const href = event.target.getAttribute('href');

  // Ignore clicks where href is null or undefined
  if (!href) {
      return;
  }

  const loginType = href.replace('#', '');
  if (loginType === "42Login") {
      oauth42Api();
  }
});

async function oauth42Api() {
  const clientId = 'u-s4t2ud-8aa7d1799d4b4847f8c1284abe03fb14a44fce8c230bb53da7a86efcb26ae227';
  const redirectUri = 'http://localhost:8000/';
  const responseType = 'code';

  const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: responseType
  });
  const Oauth42Uri = `http://api.intra.42.fr/oauth/authorize?${params.toString()}`;
  console.log("Oauth42Uri = " + Oauth42Uri);
  let requestHeader = {
      method: 'GET',
      redirect: 'manual',
  };
  let response = await fetch(Oauth42Uri, requestHeader);
  sessionStorage.setItem('oauthRedirectInProgress', true);
  window.location.href = response.url;
}


customElements.define(name, GuestLoginPage);