import { Component } from "../../Component.js";

const name = "play-menu-page";

const componentStyle = `
            #MeowPongTitle{
                position: fixed;
                top: 1vh;
                right: 1vw;
                width: auto;
                height: 8vh;
            }

            .flex-container {
                position: absolute;
                top: 52.5vh;
                left: 50vw;
                transform: translate(-50%, -50%);
                display:  flex;
                justify-content: space-between;
                width: 90vw;
                height: 85vh;
                padding: 1.5vw;
                border-radius: 30px;
                background: rgba(255, 255, 255, 0.5);
            }

            .profile-Block {
                max-width: 20%;
                height: auto;
                display:  flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;
                color: rgb(0, 0, 0);
                font-size: 30px;
                background-color: white;
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
                font-size: 15px;
                margin-bottom: 15px;
            }

            .profile-Block ul li div {
                color: rgb(0, 0, 0);
            }

            #profileImage {
                max-width: 40%;
                height: auto;
            }

            #profileName {
                padding: 10px 20px 10px 20px;
                background-color: rgb(94, 190, 158);
                border-radius: 10px;
                font-size: 25px;
                color: aliceblue;
            }

            #profileLine {
                background-color: rgb(94, 190, 158);
                width: 90%;
                height: 5px;
            }

            .history-block{
                display: flex;
                align-items: center;
                flex-direction: column;
                background-color: white;
                width: 40%;
                border-radius: 30px;
                padding: 15px;
            }
            
            .menu-block{
                display: flex;
                align-items: center;
                flex-direction: column;
                background-color: white;
                width: 30%;
                border-radius: 30px;
                padding: 15px;
            }

            #fight-meow{
                font-size: 60px;
                padding-top: 15%;
                padding-bottom: 15%;
            }

            #meow-pow{
                display: flex;
                justify-content: space-between;
                height: 25%;
                width: 90%;
                padding-top: 10%;
                padding-bottom: 10%;
            }

            #meow-pow-l{
                height: 100%;
                transform: rotate(90deg);
            }

            #meow-pow-r{
                height: 100%;
                transform: rotate(-90deg);
            }

            .play-button{
                height: 10%;
                width: 75%;
                font-size: 24px;
                padding-top: 2.5%;
                margin-top: 2.5%;
                margin-bottom: 2.5%;
            }
`;

export class PlayMenuPage extends Component { 
  constructor() {
    super(name, componentStyle);
  }

  postCreate() {
    const meowTitleSrc = window.Images.getFile("MeowPongTitle.png");
    const default_profile = window.Images.getFile("1.png");
    const meow_pow_l = window.Images.getFile("9.png");
    const meow_pow_r = window.Images.getFile("10.png");
    const flex_container = document.createElement('div');
    const MeowPongTitle = document.createElement('img');
    MeowPongTitle.id = "MeowPongTitle";
    MeowPongTitle.src = meowTitleSrc;
    flex_container.classList.add("flex-container");
	flex_container.innerHTML	=`
            <div class = "profile-Block">
                <img id = "profileImage" src=${default_profile}>
                <div id = "profileName">profile name</div>
                <ul id = "stat">
                    <li> <div>win streaks</div> <div>1</div> </li>
                    <li> <div>win rate</div>    <div>1</div> </li>
                    <li> <div>Total Game</div>  <div>1</div> </li>
                    <li> <div>Rank</div>        <div>1</div> </li>
                </ul>
                <div id = "profileLine"></div>
                <div id = "profileFriendTiTle">Friend list</div>
                <ul id = "profileFriendListTiTle">
                    <li> <div>win rate</div>    <i class="bi bi-chat-dots">1</i> </li>
                    <li> <div>Total Game</div>  <i class="bi bi-chat-dots">1</i> </li>
                    <li> <div>Rank</div>        <i class="bi bi-chat-dots">1</i> </li>
                </ul>
            </div>

            <div class ="history-block">
                <h1> Match History </h1>
                <div class="overflow-auto">Match History List</div>
            </div>

            <div class ="menu-block">
                <h1 id = "fight-meow"> Fight Meow~ </h1>
                <div id = "meow-pow"><img id = "meow-pow-l" src=${meow_pow_l}> <img id = "meow-pow-r" src=${meow_pow_r}></div>
                <button id = "match-making" class="btn btn-primary play-button"> Match Making </button>
                <button id = "tournament" class="btn btn-primary play-button"> Tournament </button>
                <button id = "local-play" class="btn btn-primary play-button"> Local Play </button>
            </div>
    `;
    this.shadowRoot.appendChild(flex_container);

    super.addComponentEventListener( this.shadowRoot.querySelector("#match-making"),
                                    "click",
                                    () => window.Router.navigate('/match-making-page/'));

    super.addComponentEventListener( this.shadowRoot.querySelector("#tournament"),
                                    "click",
                                    () => window.Router.navigate('/tournament-page/'));

    super.addComponentEventListener(this.shadowRoot.querySelector("#local-play"),
                                    "click",
                                    () => window.Router.navigate('/local-play-page/'));
  }

  logout()
  {
    console.log("logout");
  }
}

customElements.define(name, PlayMenuPage);
