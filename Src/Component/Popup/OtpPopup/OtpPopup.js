import { Component } from "../../Component.js";

const name = "otp-popup";

const componentStyle = `
  .inputs input 
  {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
    border: #1e4950 3px solid;
  }

  #otp
  {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60%;
  }

  .otp-frame
  {
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: rgba(255, 255, 255, 1);
      height: 100vh;
      width: 100vw;
      border-radius: 15px;
      padding: 5%;
      border: 30px;
  }

  .verify-title{
      font-size: 30px;
  }

  .Validate-button{
      font-size: 30px;
  }

  #button-row{
      display: flex;
      justify-content: space-between;
  }

  #button-row button{
      margin-right: 1vw;
      margin-left: 1vw;
  }
`;

export class OtpPopup extends Component { 
  constructor() {
    super(name, componentStyle);
  }

  postCreate() {
    const otp_frame = document.createElement('div');
    otp_frame.classList.add("otp-frame");
	  otp_frame.innerHTML	=`
      <div class = "verify-title"> Please enter the one time password to verify your account </div>

      <div id="otp" class="inputs d-flex flex-row justify-content-center mt-3">

          <input class="m-2 text-center form-control rounded" type="text" id="otp-1" maxlength="1">
          <input class="m-2 text-center form-control rounded" type="text" id="otp-2" maxlength="1">
          <input class="m-2 text-center form-control rounded" type="text" id="otp-3" maxlength="1">
          <input class="m-2 text-center form-control rounded" type="text" id="otp-4" maxlength="1">
          <input class="m-2 text-center form-control rounded" type="text" id="otp-5" maxlength="1">
          <input class="m-2 text-center form-control rounded" type="text" id="otp-6" maxlength="1">

      </div>

      <div id = "button-row">
          <button class="btn btn-primary btn btn-danger Validate-button" id = "cancel"> Cancel </button>
          <button class="btn btn-primary Validate-button" id = "submit"> Submit </button>
      </div>
    `;

    this.shadowRoot.appendChild(otp_frame);

    super.addComponentEventListener(this.shadowRoot.querySelector("#cancel"),
    "click",
    this.cancel);
  }

  async cancel()
  {
    console.log("Hello cancel")
    this.classList.add("hide");
  }
}

customElements.define(name, OtpPopup);