import { Component } from "../../Component.js";

const name = "register-page";

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
        .frame {
        height: auto;
        width: 60%;
        border: #1e4950 3px solid;
        border-radius: 30px;
        background-color: rgba(146,220,253, 0.5);
        padding: 40px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        }

        .frame h1 {
        display: flex;
        flex-direction: row;
        align-self: start;
        padding-bottom: 15px;
        font-size: 45px;
        }

        .frame button {
        font-size: 30px;
        }

        #backButton {
        display: flex;
        }
`;

export class RegisterPage extends Component { 
  constructor() {
    super(name, componentStyle);
  }

  postCreate() {
    const meowTitleSrc = window.Images.getFile("MeowPongTitle.png");
    const menu = document.createElement('div');
    menu.classList.add("menu");
	menu.innerHTML	=`
    <img id = "MeowPongTitle" src=${meowTitleSrc}>

    <div class = "container-sm frame">
        <h1>REGISTER</h1>

        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="usernameInput" placeholder="Username" required>
            <label for="usernameInput">Username</label>
        </div>

        <div class="form-floating mb-3">
            <input type="email" class="form-control" id="emailInput" placeholder="name@example.com" required>
            <label for="emailInput">Email</label>
        </div>

        <div class="form-floating mb-3">
            <input type="password" class="form-control" id="passwordInput" placeholder="Password">
            <label for="passwordInput">Password</label>
        </div>

        <div class="form-floating mb-3">
            <input type="password" class="form-control" id="confirmPasswordInput" placeholder="Password">
            <label for="confirmPasswordInput">Confirm Password</label>
        </div>

        <button type="button" class="btn btn-primary">Create Account</button>
    </div>`;
    this.shadowRoot.appendChild(menu);

    super.addComponentEventListener(this.shadowRoot.querySelector(".btn-primary"),
                                    "click",
                                    this.create_account);
  }

  async create_account()
  {
    const username = this.shadowRoot.getElementById("usernameInput").value;
    const email = this.shadowRoot.getElementById("emailInput").value;
    const password = this.shadowRoot.getElementById("passwordInput").value;
    const confirm_password = this.shadowRoot.getElementById("confirmPasswordInput").value;

	// Create the request body
	const requestBody = {
		username: username,
		email: email,
		password: password,
        confirm_password: confirm_password,
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
	const response = await fetch("http://localhost:9000/auth/register/", requestHeader);

	// Handle the response
    if (response.status >= 200 && response.status <= 299) {
        console.log("Successful");
        window.Router.navigate('/guest-login/')
    } else {
        const responseData = await response.json();
        console.log("Failed with status:", response.status);
        console.log("Response error data:", responseData);
    }
  } 
}

customElements.define(name, RegisterPage);