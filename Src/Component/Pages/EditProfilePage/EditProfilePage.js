import { Component } from "../../Component.js";

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
	height: 60%;
	display: flex;
	flex-direction: column;
}

#inputBox > label {
    font-size: 40px;
    margin-bottom: 25px;
}

#inputBox > div {
    display: flex;
    justify-content:  start;
    align-items:  center;
    margin-bottom: 25px;
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

`;

export class EditProfilePage extends Component { 
  constructor() {
    super(name, componentStyle);
  }

  postCreate() {
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
  }

  logout()
  {
    console.log("logout");
  }
}
``
customElements.define(name, EditProfilePage);
