import { Component } from "../../Component.js";

const name = "loading-page";

const componentStyle = `

  .spinner-border {
    position: fixed;
    width: 20vw;
    height: 20vw;
    border-width: 1em;
    top: 50%;
    left: 50%;
    margin-top: -10vw;
    margin-left: -10vw;
  }

  .meow-loading {
    position: fixed;
    width: 10vw;
    height: 10vw;
    top: 50%;
    left: 50%;
    margin-top: -5vw;
    margin-left: -5vw;
  }

`;

export class LoadingPage extends Component { 
  constructor() {
    super(name, componentStyle);
  }

  postCreate() {
    const titleContainer = document.createElement('div');
    const meowPongImage = document.createElement('img');
    meowPongImage.src = './Src/GraphicFiles/MeowPongTitle.png';
    titleContainer.appendChild(meowPongImage);
    this.shadowRoot.appendChild(titleContainer);

    const menuListContainer = document.createElement('home-menu-list');
    this.shadowRoot.appendChild(menuListContainer);
  }
}

customElements.define(name, LoadingPage);