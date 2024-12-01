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
                <input type="text" class="form-control" id="usernameInput" placeholder="Username" required>
                <label for="usernameInput">Username</label>
            </div>

            <div class="form-floating mb-3">
                <input type="password" class="form-control" id="passwordInput" placeholder="Password">
                <label for="passwordInput">Password</label>
            </div>

          <button type="login" class="btn btn-primary">login</button>

      </div>
    `
    this.shadowRoot.appendChild(menu);

    super.addComponentEventListener(this.shadowRoot.querySelector(".btn-primary"),
    "click",
    this.login_as_guest);
  }

  async login_as_guest()
  {
    const username = this.shadowRoot.getElementById("usernameInput").value;
    const password = this.shadowRoot.getElementById("passwordInput").value;

	// Create the request body
	const requestBody = {
		username: username,
		password: password,
	};

	// Set up the request headers and options for a POST request
	let requestHeader = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(requestBody)  // Convert the JavaScript object to a JSON string
	};

	// Fetch data from the server with a POST request
	const response = await fetch("http://localhost:9000/auth/login/", requestHeader);
  const responseData = await response.json();

	// Handle the response
    if (response.status >= 200 && response.status <= 299) {
        console.log("login as guset successful");
        console.log("Response data:", responseData);
        window.Router.navigate('/game-menu-page/');
    } else {
        console.log("Failed with status:", response.status);
        console.log("Response error data:", responseData);
    }
  } 

}

customElements.define(name, GuestLoginPage);