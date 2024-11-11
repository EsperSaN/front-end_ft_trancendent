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
    const spinner = document.createElement('div');
    spinner.classList.add('spinner-border', 'text-warning');
    spinner.setAttribute('role', 'status')
    const span = document.createElement('span');
    span.classList.add('visually-hidden');
    span.textContent = 'Loading...';
    spinner.appendChild(span);
    this.shadowRoot.appendChild(spinner);

    const meow = document.createElement('img');
    meow.classList.add('meow-loading');
    meow.src = './Src/GraphicFiles/1.png';
    this.shadowRoot.appendChild(meow);
  }
}

customElements.define(name, LoadingPage);