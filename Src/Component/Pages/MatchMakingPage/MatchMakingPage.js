import { Component } from "../../Component.js";

const name = "match-making-page";

const componentStyle = `

    .match-making{
        position: absolute;
        background-color: rgba(255, 255, 255, 0.9);
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .spinner-custom{
        width: 15vw;
        height: 15vw;
        border-width: 1em;
        margin-bottom: 5vh;
    }

    .match-making-title{
        margin-bottom: 5vh;
        font-size: 5vh;
    }

`;

export class MatchMakingPage extends Component { 
  constructor() {
    super(name, componentStyle);
  }

  postCreate() {
    const match_making = document.createElement('div');
    match_making.classList.add("match-making");
	match_making.innerHTML	=`
        <div class = "match-making">
            <div class = "match-making-title">Match Making ...</div>
            <div class="spinner-border text-warning spinner-custom" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <button type="button" class="btn btn-danger btn-lg">Stop!</button>
        </div>
    `;
    this.shadowRoot.appendChild(match_making);
  }
}
``
customElements.define(name, MatchMakingPage);
