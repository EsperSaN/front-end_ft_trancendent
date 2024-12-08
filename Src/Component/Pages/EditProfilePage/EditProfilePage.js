import { Component } from "../../Component.js";
import { getCookie } from "../../../../utils.js";

const name = "edit-profile-page";

const componentStyle = `

.flex-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display:  flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    height: 90%;
}

#MeowPongTitle{
    width: 50%;
    height: auto;
}

.sub-container {
    display:  flex;
    justify-content: start;
    align-items: center;
    width: 85%;
    height: 85%;
    background-color: rgba(162, 162, 162, 0.8);
    border-radius: 30px;
}

.profile-Block {
    max-width: 25%;
    height: 90%;
    margin: 40px;
    display:  flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    color: rgb(0, 0, 0);
    font-size: 35px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 30px;
}
.profile-Block ul {
    width: 80%;
}

.profile-Block ul li {
    width : 100%;
    display:  flex;
    justify-content: space-between;
    text-align: center;
    font-size: 25px;
    margin-bottom: 15px;
}

.profile-Block ul li div {
    color: rgb(0, 0, 0);
}

#profileImage {
    max-width: 60%;
    height: auto;
}

#profileName {
    padding: 10px 20px 10px 20px;
    background-color: rgb(94, 190, 158);
    border-radius: 10px;
    color: aliceblue;
}

#inputBox {
	width: 80%;
	height: auto;
	display: flex;
	flex-direction: column;
}

#inputBox > label {
    font-size: 40px;
    margin: 10px;
}

#inputBox > div {
    display: flex;
    justify-content:  start;
    align-items:  center;
}

input {
    background-color:  white;
    width: 400px;
    border: 3px solid #000;
    border-radius: 10px;
    font-size: 30px;
    margin-right: 30px;
}

.btn {
    font-size: 24px;
    margin-right: 30px;
}

.profileconfig-Block {
    display: flex;
    width: 90%;
    flex-direction: column;
    justify-content: space-around;
    height: 75%;
    margin-right: 20px;
}

.profileconfig-Block > button {
    width: 300px;
}

.hide {
    display: none;
}

`;

export class EditProfilePage extends Component { 
  constructor() {
    super(name, componentStyle);
  }

  async postCreate() {
    const user_data = await this.get_profile_data();
    let twoFA_button;
    console.log(user_data);
    console.log("mfa_enabled: " + user_data.mfa_enabled);
    if(user_data.mfa_enabled == false)
    {
        twoFA_button = `<button type="button" class="btn btn-success" id="Two_FA">Click to enable 2FA</button>`
    }
    else
    {
        twoFA_button = `<button type="button" class="btn btn-danger" id="Two_FA">Click to unable 2FA</button>`
    }
    const meowTitleSrc = window.Images.getFile("MeowPongTitle.png");
    const default_profile = window.Images.getFile("1.png");
    const flex_container = document.createElement('div');
    flex_container.classList.add("flex-container");
	flex_container.innerHTML	=`
        <img id = "MeowPongTitle" src=${meowTitleSrc}>

        <div class = "sub-container">
            <div class = "profile-Block">
                <img id = "profileImage" src=${default_profile}>
                <div id = "profileName">profile name</div>
                <ul id = "stat">
                    <li> <div>win streaks</div> <div>1</div> </li>
                    <li> <div>win rate</div>    <div>1</div> </li>
                    <li> <div>Total Game</div>  <div>1</div> </li>
                    <li> <div>Rank</div>        <div>1</div> </li>
                </ul>
            </div>
            <div class = "profileconfig-Block">

                <div id="inputBox">
                    <label for="profileName">Edit your username</label>
                    <div>
                        <input type="text" name="profileName">
                        <button class="btn btn-primary">save</button>
                    </div>
                </div>

                ${twoFA_button}

                <div id="inputBox">
                    <label>Upload your profile picture</label>
                    <div>
                        <button class="btn btn-info">choose file</button>
                        <button class="btn btn-primary">upload</button>
                    </div>
                </div>

                <button class="btn btn-success">Done Meow~</button>
            </div>
        </div>

    `;

    this.shadowRoot.appendChild(flex_container);

    const qrcodeScript = document.createElement('script');
    qrcodeScript.src = `https://cdn.jsdelivr.net/npm/qrcode@1.4.4/build/qrcode.min.js`
    this.shadowRoot.appendChild(qrcodeScript);

    // const otp_popup = document.createElement("otp-popup");
    // otp_popup.id = "otp-popup";
    // otp_popup.classList.add("hide");
    // this.shadowRoot.appendChild(otp_popup);
    // const submitButton = otp_popup.shadowRoot.querySelector("#submit")
    
    super.addComponentEventListener(this.shadowRoot.querySelector("#Two_FA"),
    "click",
    event => this.handle_2FA(user_data.mfa_enabled));

    // if (submitButton) {
    //   submitButton.addEventListener("click", this.submit);
    // }
  }

  async get_profile_data()
  {
    const access = getCookie("access");
    console.log("access: " + access);

	let requestHeader = {
		method: 'GET',
		headers: {
            'Authorization': `Bearer ${access}`,
			'Content-Type': 'application/json',
		},
	};
	const response = await fetch("http://localhost:9000/auth/users/", requestHeader);
    const data = await response.json();
    console.log(data[0]);
    return data[0];
  }

  async handle_2FA() 
  {
        const user_data = await this.get_profile_data();
        const is_2FA_enable = user_data.mfa_enabled;
        console.log("2FA button clicked with parameter:", is_2FA_enable);
        if(is_2FA_enable)
        {
            const otp_popup = this.shadowRoot.querySelector("#otp-popup");
            otp_popup.classList.remove("hide");
        }
        else
        {
            this.enable_2FA();
        }
  }

  async enable_2FA()
  {
    const access = getCookie("access");
    console.log("access: " + access);

	let requestHeader = {
		method: 'GET',
		headers: {
            'Authorization': `Bearer ${access}`,
			'Content-Type': 'application/json',
		},
	};
	const response = await fetch("http://localhost:9000/auth/2fa/qr/", requestHeader);
    const data = await response.json();
    console.log(data);
  }


//   popup()
//   {
//     const otp_popup = this.shadowRoot.querySelector("#otp-popup");
//     otp_popup.classList.remove("hide");
//   }

//   popdown()
//   {
//     const otp_popup = this.shadowRoot.querySelector("#otp-popup");
//     otp_popup.classList.add("hide");
//   }

//   submit()
//   {
//     console.log("Hello submit");
//   }
}

customElements.define(name, EditProfilePage);
